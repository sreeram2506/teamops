import { Pool } from 'pg';

const config = useRuntimeConfig()

export const pool = new Pool({
  connectionString: config.databaseUrl
})