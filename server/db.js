import pg from 'pg'
import crypto from 'node:crypto'

const { Pool } = pg

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required. Use a PostgreSQL database for this app.')
}

export const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

export async function query(text, params = []) {
  const result = await pool.query(text, params)
  return result
}

export async function getOne(text, params = []) {
  const result = await query(text, params)
  return result.rows[0] || null
}

export async function initDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      avatar_path TEXT NOT NULL,
      avatar_token TEXT UNIQUE,
      avatar_data BYTEA,
      avatar_mime TEXT,
      ai_uses INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at BIGINT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_uses INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_token TEXT UNIQUE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_data BYTEA;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_mime TEXT;
  `)

  const usersWithoutTokens = await query(
    `SELECT id
     FROM users
     WHERE avatar_token IS NULL
       AND avatar_data IS NOT NULL
       AND avatar_mime IS NOT NULL`,
  )

  for (const user of usersWithoutTokens.rows) {
    const token = crypto.randomBytes(32).toString('hex')
    await query('UPDATE users SET avatar_token = $1, avatar_path = $2 WHERE id = $3', [
      token,
      `/api/headshots/${token}`,
      user.id,
    ])
  }
}
