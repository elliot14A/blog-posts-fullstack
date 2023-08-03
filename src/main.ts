import express from "express";
import http from "http";
import dotenv from "dotenv";
import { connect } from "./utils/db";
import logger from "./utils/logger";
import { initroutes } from "./routes";

async function main() {
  dotenv.config();
  const app = express();
  app.use(express.json());

  // connect to database
  await connect();

  app.use("/api", initroutes());

  const PORT = process.env.PORT || 8080;
  const server = http.createServer(app);
  server.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
}

main();
