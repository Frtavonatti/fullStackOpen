import { runMigrations, rollBackMigrations } from "./db.js";

const action = process.argv[2];

if (action === "down" || action === "rollback") {
  await rollBackMigrations();
} else {
  await runMigrations();
}