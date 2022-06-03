import { setupWorker } from "msw";
import { prouctsHandler, cartsHandler, userHandler } from "./handlers";

export const worker = setupWorker(
  ...prouctsHandler,
  ...cartsHandler,
  ...userHandler
);
