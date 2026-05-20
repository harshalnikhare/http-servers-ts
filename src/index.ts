import express from "express";
import { handlerReadiness } from "./api/readiness";
import {
  errorMiddleWare,
  middlewareLogResponse,
  middlewareMetricsInc,
} from "./api/middleware";
import { handlerMetrics } from "./api/metrics";
import { handlerReset } from "./api/reset";
import { handlerChirpsValidate } from "./api/chirps";

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);

app.post("/api/validate_chirp", handlerChirpsValidate);

app.get("/admin/metrics", handlerMetrics);

app.post("/admin/reset", handlerReset);

app.use(middlewareLogResponse);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
