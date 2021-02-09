import React, { useState } from "react";
import { saveAs } from "file-saver";

import api from "./services/api.js";

export default function App() {
  const [clinic, setClinic] = useState("");
  const [dentist, setDentist] = useState("");
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  function createAndDownloadPdf() {
    const today = new Date();

    api
      .post("/create-pdf", { clinic, dentist, price1, price2 })
      .then(() => api.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(
          pdfBlob,
          `${dentist} - ${clinic} (${today.getDate()}_${today.getMonth() +
            1}_${today.getFullYear()}).pdf`
        );
      });
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Clinic"
        name="clinic"
        onChange={(e) => setClinic(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dentis"
        name="dentist"
        onChange={(e) => setDentist(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        onChange={(e) => setPrice1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price 2"
        name="price2"
        onChange={(e) => setPrice2(e.target.value)}
      />

      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}
