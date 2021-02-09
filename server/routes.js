import { Router } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import pdf from "html-pdf";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = Router();

routes.post("/create-pdf", (req, res) => {
  const { clinic, dentist, price } = req.body;

  ejs.renderFile(
    "./templates/receipt.ejs",
    {
      clinic: clinic,
      dentist: dentist,
      price: price,
    },

    (err, html) => {
      if (err) {
        return res.status(500).json({ message: "Server Error." });
      }

      const options = {
        format: "A5",
      };

      pdf.create(html, options).toFile("result.pdf", (error) => {
        try {
          res.status(200).send(Promise.resolve());
        } catch (err) {
          res.send(Promise.reject());
        }
      });
    }
  );
});

routes.get("/fetch-pdf", (req, res) => {
  try {
    res.type("pdf").status(200).sendFile(`${__dirname}/result.pdf`);
  } catch (err) {
    console.log(err);
  }
});

export default routes;
