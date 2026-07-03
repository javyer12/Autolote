import { useState } from "react";
import * as XLSX from "xlsx";

export function useDandownloadsXLSX(formData ) {
  const [data, setData] = useState(formData || []);

  console.log(setData);
  console.log(formData);

  const downloadXLSX = (currentData) => {
    if (currentData.length === 0) return;

    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(currentData);
    XLSX.utils.book_append_sheet(book, sheet, "Información Actual");
    XLSX.writeFile(book, "informacion_actual.xlsx");
  };
  //   const downloadedData = downloadXLSX(data);
  return downloadXLSX(data);
}
