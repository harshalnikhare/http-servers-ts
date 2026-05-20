import express from "express";
import { handlerReadiness } from "./api/readiness";
import {
  errorHandler,
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware";
import { handlerMetrics } from "./api/metrics";
import { handlerReset } from "./api/reset";
import { handlerValidateChirp } from "./api/validate-chirp";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);

app.post("/api/validate_chirp", handlerValidateChirp);

app.get("/admin/metrics", handlerMetrics);

app.post("/admin/reset", handlerReset);

app.use(middlewareLogResponses);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
