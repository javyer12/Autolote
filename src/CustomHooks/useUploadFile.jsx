import { useState } from "react";
import * as XLSX from "xlsx";

export function UploadFile() {
  const [dataXLSX, setDataXLSX] = useState();
  console.log(dataXLSX);
  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      console.log(e);
      const binaryDatya = e.target.result;

      const workSpace = XLSX.read(binaryDatya, { type: "buffer" });
      const nameFisrtSheet = workSpace.SheetNames[0];
      const currentSheet = workSpace.Sheets(nameFisrtSheet);

      const dataJSON = XLSX.utils.sheet_to_json(currentSheet);

      setDataXLSX(dataJSON);
    };
  };
  return handleUploadFile;
}
