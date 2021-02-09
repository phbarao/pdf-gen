import { Router } from "express";
import pdf from "html-pdf";
import { dirname } from "path";
import { fileURLToPath } from "url";

import pdfTemplate from "./templates/receipt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = Router();

routes.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
    try {
      res.status(200).send(Promise.resolve());
    } catch (err) {
      res.send(Promise.reject());
    }
  });
});

routes.get("/fetch-pdf", (req, res) => {
  try {
    res.status(200).sendFile(`${__dirname}/result.pdf`);
  } catch (err) {
    console.log(err);
  }
});

export default routes;
