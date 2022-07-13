import express from "express";
import path from "path";
import morgan from "morgan";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Config } from "src/config/config";
import { logger, stream } from "src/config/logger";
import indexRotuer from "src/route/index";
import apiRotuer from "src/route/api";

const app = express();

/**
 * express JSON & URLENCODED
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

/**
 * Logger [ morgan ]
 */
app.use(morgan("combined", { stream }));

/**
 * Route
 */
app.use("/", indexRotuer);
app.use("/api", apiRotuer);

/**
 * Swagger
 */
if (Config.server.mode !== "production") {
  logger.info("Swagger On : /api-docs");
  const swaggerSpec = YAML.load(path.join(__dirname, "../../dist/swagger.yaml"));
  const swaggerOptions = { docExpansion: "none" };
  const swaggerUiOptions = { explorer: true };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions, swaggerOptions));
}

export default app;
