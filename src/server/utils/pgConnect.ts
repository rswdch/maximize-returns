import { Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import pg from "pg";
import * as dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export { db };
