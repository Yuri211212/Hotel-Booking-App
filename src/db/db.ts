import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

//db connection via pg with connect, disconnect and query methods

dotenv.config();
const USER_DB = process.env.USER_DB;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = Number(process.env.DB_PORT);

let pool: Pool | null = null;

const createPool = () => {
  return new Pool({
    user: USER_DB,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
  });
};

export default {
  connect: async (cb?: (err?: Error) => void) => {
    if (pool === null) {
      pool = createPool();
    }
    if (cb) {
      cb();
    }
    return pool;
  },
  disconnect: async (cb?: ((err?: Error) => void) | undefined) => {
    if (cb) {
      cb();
    }
    if (pool) {
      await pool.end();
    }
  },
  query: async (
    queryReq: string,
    params?: Array<string>
  ): Promise<QueryResult> => {
    if (pool === null) {
      pool = createPool();
    }
    return pool.query(queryReq, params);
  }
};