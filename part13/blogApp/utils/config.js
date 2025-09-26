import 'dotenv/config'

export const PORT = process.env.PORT || 3001
export const SECRET = process.env.SECRET

export const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL
