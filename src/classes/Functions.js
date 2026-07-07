//veregistro = carga todos los datos en la tabla
//Primero = carga el primer registro en la tabla
//Siguiente = permite recorrer los registros de la tabla 1x1
//Anterior = permite recorrer los registros de la tabla 1x1
//Ultimo = carga el ultimo registro en la tabla
//actualizar = permite modificar un registro en la tabla
//Guardar = crear un archivo descargable con los datos de la tabla
//agregar = permite agregar un nuevo registro a la tabla
//eliminar = permite eliminar un registro de la tabla
//leer = permite leer un archivo y cargar los datos en la tabla
// limpiar = permite limpiar los campos de entrada de datos
// ordenar = permite ordenar los registros de la tabla por un campo especifico
//filtrar = permite filtrar los registros de la tabla por un campo especifico

import { mockData } from "./MockData";
import * as XLSX from "xlsx";

const STORAGE_KEY = "autolote-data";

function cargarDataGuardada() {
  if (typeof localStorage === "undefined") {
    return [...mockData];
  }

  const dataGuardada = localStorage.getItem(STORAGE_KEY);

  if (!dataGuardada) {
    return [...mockData];
  }

  try {
    return JSON.parse(dataGuardada);
  } catch {
    return [...mockData];
  }
}

function guardarData() {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
  }
}

//la variable data almacenara todos los datos que estan en el archivo MOCK_DATA.js, cuando se cree, elimine o modifique un item, se modificara en la variable, sin modificar el archivo MOCK_DATA.js,
let DATA = cargarDataGuardada();

export function VerRegistro() {
  return DATA;
}

export function CargarRegistros() {
  if (DATA.length === 0) {
    DATA = [...mockData];
    guardarData();
  }

  return DATA;
}

export function ModificarRegistro(index, registroActualizado) {
  DATA = DATA.map((item, itemIndex) =>
    itemIndex === index ? { ...item, ...registroActualizado } : item,
  );

  guardarData();

  return DATA;
}

export function AgregarRegistro(registroNuevo, registros = DATA) {
  DATA = [...registros, registroNuevo];
  guardarData();

  return DATA;
}

export function ReemplazarRegistros(registros) {
  DATA = registros;
  guardarData();

  return DATA;
}

export function LimpiarRegistros() {
  DATA = [];
  guardarData();

  return DATA;
}

//funcion para generar ids
export function GenerateIds() {
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  let ids = [];
  //guarda los caracteres del abecedario en el arreglo ids
  for (const char of abc) {
    ids.push(char);
  }
  //guarda los numeros del 0 al 9 en el arreglo ids
  for (const num of numbers) {
    ids.push(num);
  }
  const randomIndex = ids.sort(() => Math.random() - 0.5);
  const randomId = randomIndex.slice(0, 50).join("");

  return randomId;
}

//function para exportar la data en un archivo xlsx
export function DanwloadsXLSX(data) {
  if (data.length === 0) {
    alert("No hay datos para descargar");
    return;
  }
  const book = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(book, sheet, "Información Actual");
  XLSX.writeFile(book, "informacion_actual.xlsx");
}

//funcion para borrar registro
export function RemoveRegister(index, registros = DATA) {
  if (index < 0 || index >= registros.length) {
    return DATA;
  }

  DATA = registros.filter((_, itemIndex) => itemIndex !== index);
  guardarData();

  return DATA;
}

export function OrdenarPorCodAuto(direccion, registros = DATA) {
  const orden = Number(direccion);

  if (orden !== 1 && orden !== 2) {
    return registros;
  }

  DATA = [...registros].sort((registroA, registroB) => {
    const codAutoA = Number(registroA.CodAuto);
    const codAutoB = Number(registroB.CodAuto);

    if (!Number.isFinite(codAutoA) || !Number.isFinite(codAutoB)) {
      return String(registroA.CodAuto).localeCompare(String(registroB.CodAuto));
    }

    return orden === 1 ? codAutoA - codAutoB : codAutoB - codAutoA;
  });

  guardarData();

  return DATA;
}

export function OrdenarPorPlaca(direccion, registros = DATA) {
  const orden = Number(direccion);
  // if (orden !== 1 && orden !== 2) {
  //   return registros;
  // }
  DATA = [...registros].sort((registroA, registroB) => {
    // const placaA = Number(registroA.Placa);
    // const placaB = Number(registroB.Placa);
  const placaA = registroA.Placa;
  const placaB = registroB.Placa;
    // if (!Number.isFinite(placaA) || !Number.isFinite(placaB)) {
    //   return String(registroA.Placa).localeCompare(String(registroB.Placa));
    // }
    return orden === 1 ? placaA > placaB : placaB > placaA;
  });
  guardarData();
  return DATA;
}
