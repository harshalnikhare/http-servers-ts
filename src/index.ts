import express from "express";
import { handlerReadiness } from "./api/readiness";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware";
import { handlerMetrics } from "./api/metrics";
import { handlerReset } from "./api/reset";

const app = express();

const PORT = 8080;

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);

app.get("/api/metrics", handlerMetrics);

app.get("/api/reset", handlerReset);

app.use(middlewareLogResponses);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
