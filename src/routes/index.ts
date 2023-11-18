import { Router } from "express";
import { readdirSync } from "fs";

const router = Router();

function cleanFile(file: string) {
  const clean = file.split(".").shift();
  if (typeof clean == "undefined") return "";
  return clean;
}

// IMPORTADOR DINÁMICO DE RUTAS
readdirSync(__dirname).map((file) => {
  const response = cleanFile(file);
  if (response !== "index") {
    import(`./${response}`).then((module) => {
      router.use(`/${response}`, module.router);
    });
  }
});

export { router };
