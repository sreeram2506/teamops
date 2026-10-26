import { Pool } from 'pg'

let pool: Pool | null = null
let schemaReady: Promise<void> | null = null

export function getPool() {
  if (!pool) {
    const config = useRuntimeConfig()
    const connectionString = config.databaseUrl

    if (!connectionString) {
      throw createError({
        statusCode: 500,
        statusMessage: 'DATABASE_URL is not configured'
      })
    }

    pool = new Pool({
      connectionString: String(connectionString),
      ssl: {
        rejectUnauthorized: false
      }
    })
  }

  return pool
}

export async function query(text: string, params?: any[]) {
  await ensureSchema()
  return getPool().query(text, params)
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = getPool()

      await db.query(`
        CREATE TABLE IF NOT EXISTS members (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL,
          role VARCHAR NOT NULL,
          email VARCHAR UNIQUE NOT NULL,
          project VARCHAR
        )
      `)

      await db.query(`
        CREATE TABLE IF NOT EXISTS activity (
          id SERIAL PRIMARY KEY,
          actor VARCHAR NOT NULL,
          action VARCHAR NOT NULL,
          target VARCHAR NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)

      const members = await db.query('SELECT COUNT(*)::int AS n FROM members')

      if (members.rows[0].n === 0) {
        await db.query(`
          INSERT INTO members (name, role, email, project)
          VALUES
            ('John Doe', 'Administrator', 'john.doe@teamops.io', 'HR Portal'),
            ('Sarah Wilson', 'Product Designer', 'sarah.wilson@teamops.io', 'Mobile Application'),
            ('Mike Smith', 'Backend Engineer', 'mike.smith@teamops.io', 'Analytics Platform'),
            ('Priya Patel', 'Frontend Engineer', 'priya.patel@teamops.io', 'HR Portal')
        `)
      }
    })()
  }

  await schemaReady
}

export function mapTask(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    assignee: row.assignee,
    projectId: row.project_id ?? row.projectId
  }
}

export async function logActivity(actor: string, action: string, target: string) {
  await query(
    `
    INSERT INTO activity (actor, action, target)
    VALUES ($1, $2, $3)
    `,
    [actor, action, target]
  )
}
