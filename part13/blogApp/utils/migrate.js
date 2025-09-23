import { runMigrations, runLatestMigration, rollBackMigrations } from "./db.js";

const action = process.argv[2];

switch (action) {
  case "down":
  case "rollback":
    await rollBackMigrations();
    break;
  case "latest":
    await runLatestMigration();
    break;
  default:
    await runMigrations();
}