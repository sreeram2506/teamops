import { Pool } from 'pg'

let pool: Pool | null = null
let schemaReady: Promise<void> | null = null

function getConnectionString() {
  const config = useRuntimeConfig()
  const raw = String(
    config.databaseUrl
    || process.env.DATABASE_URL
    || process.env.NUXT_DATABASE_URL
    || ''
  ).trim()

  if (!raw) {
    return ''
  }

  try {
    const url = new URL(raw)
    url.searchParams.delete('channel_binding')
    if (!url.searchParams.get('sslmode')) {
      url.searchParams.set('sslmode', 'require')
    }
    return url.toString()
  } catch {
    return raw
  }
}

export function getPool() {
  if (!pool) {
    const connectionString = getConnectionString()

    if (!connectionString) {
      throw createError({
        statusCode: 500,
        statusMessage: 'DATABASE_URL is not configured'
      })
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false
      },
      max: 1,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000
    })
  }

  return pool
}

export async function query(text: string, params?: any[]) {
  try {
    await ensureSchema()
    return await getPool().query(text, params)
  } catch (error) {
    console.error('Database query failed')
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Database query failed'
    })
  }
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
    })().catch((error) => {
      schemaReady = null
      throw error
    })
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
