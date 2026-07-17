import { useState } from "react";

const sortAttributes = {
  1: "CodAuto",
  2: "Placa",
  3: "Marca",
  4: "Tipo",
  5: "Color",
  6: "Año",
  7: "Precio",
};

export function AscOrDescPriceAndYear({
  setIsPriceYearSorted,
  // enviarDatos,
  enviarDatosPrecioYear,
}) {
  const [sortOption, setSortOption] = useState();

  const handleModalInputChange = () => {
    const direction = Number(sortOption);
    if (direction !== 1 && direction !== 2 && direction !== 3) {
      alert("Seleccione 1 para ascendente o 2 para descendente.");
      return false;
    }

    // enviarDatos({ type: "direction", direction });
    enviarDatosPrecioYear({ type: "direction", direction });

    return true;
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-200">
      <div className="w-full max-w-2xl  rounded-lg p-6 border border-gray-100 bg-gray-100">
        <div className="mb-4 flex items-center justify-between px-4">
          <div></div>
          <button
            onClick={() => setIsPriceYearSorted(false)}
            className="text-black px-4 py-2 rounded bg-red-300 border border-red"
          >
            CLose
          </button>
        </div>
        <div className="flex flex-col p-2 items-center justify-center ">
          <h1>1. Mayor a</h1>
          <h1>2. Menor a</h1>
          <h1>3. Entre</h1>
          <input
            onChange={(e) => {
              setSortOption(e.target.value);
            }}
            className="border border-black m-3 "
          ></input>
          <button
            onClick={(e) => {
              if (handleModalInputChange(e)) {
                setIsPriceYearSorted(false);
              }
            }}
            className="border border-gray-600 bg-gray-200 p-1 rounded"
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
export function AscOrDesc({
  setOpenModal,
  enviarDatos,
  enviarDatosPlaca,
  enviarDatosMarca,
  enviarDatosTipo,
  enviarDatosColor,
  enviarDatosPrecioYear,
  enviarDatosPrecio,
}) {
  const [sortOption, setSortOption] = useState(false);
  const handleModalInputChange = () => {
    const direction = Number(sortOption);

    if (direction !== 1 && direction !== 2 && direction !== 3) {
      alert("Seleccione 1 para ascendente o 2 para descendente.");
      return false;
    }
    enviarDatos({ type: "direction", direction });
    enviarDatosPlaca({ type: "direction", direction });
    enviarDatosMarca({ type: "direction", direction });
    enviarDatosTipo({ type: "direction", direction });
    enviarDatosColor({ type: "direction", direction });
    enviarDatosPrecioYear({ type: "direction", direction });
    enviarDatosPrecio({ type: "direction", direction });

    return true;
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-200">
      <div className="w-full max-w-2xl  rounded-lg p-6 border border-gray-100 bg-gray-900/60">
        <div className="mb-4 flex items-center justify-between px-4">
          <div></div>
          <button
            onClick={() => setOpenModal(false)}
            className="text-black px-4 py-2 rounded bg-red-300 border border-red"
          >
            CLose
          </button>
        </div>
        <div className="flex flex-col p-2 items-center justify-center ">
          <div>
            <h1>1. Asc</h1>
            <h1>2. Desc</h1>
          </div>
          <input
            onChange={(e) => {
              setSortOption(e.target.value);
            }}
            className=" border-black border-2 m-3 bg-white text-black"
          ></input>

          <button
            onClick={(e) => {
              if (handleModalInputChange(e)) {
                setOpenModal(false);
              }
            }}
            className="border border-gray-600 bg-gray-200 p-1 rounded text-black"
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}
export function SortModal({
  setIsSorted,
  enviarDatos,
  enviarDatosPlaca,
  enviarDatosMarca,
  enviarDatosTipo,
  enviarDatosColor,
  enviarDatosPrecioYear,
  enviarDatosPrecio,
  setNumOrStrOption,
}) {
  const [sortOption, setSortOption] = useState(false);
  const handleModalInputChange = () => {
    const attribute = sortAttributes[Number(sortOption)];
    if (!attribute) {
      alert("Seleccione un número válido del 1 al 7.");
      return false;
    }

    enviarDatos({ type: "attribute", attribute });
    enviarDatosPlaca({ type: "attribute", attribute });
    enviarDatosMarca({ type: "attribute", attribute });
    enviarDatosTipo({ type: "attribute", attribute });
    enviarDatosColor({ type: "attribute", attribute });
    enviarDatosPrecioYear({ type: "direction", attribute });
    enviarDatosPrecio({ type: "direction", attribute });
    setNumOrStrOption(attribute);
    return true;
  };
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-100 text-white">
      <div className="w-full max-w-2xl  rounded-lg p-6 border border-gray-100 bg-gray-900/60 ">
        <div className="mb-4 flex items-center justify-between px-4">
          <div></div>
          <button
            onClick={() => setIsSorted(false)}
            className="text-black px-4 py-2 rounded bg-red-300 border border-red"
          >
            CLose
          </button>
        </div>
        <div className="flex flex-col p-2 items-center justify-center">
          <h1 className="m-3">Seleccione una Opcion</h1>
          <h4>1.CodAuto</h4>
          <h4>2.Placa</h4>
          <h4>3.Marca</h4>
          <h4>4.Tipo</h4>
          <h4>5.Color</h4>
          <h4>6.Año</h4>
          <h4>7.Precio</h4>
        </div>

        {/* =========================== */}
        <div className="flex flex-row p-2 items-center justify-center">
          <input
            onChange={(e) => {
              setSortOption(e.target.value);
            }}
            className=" border-black border-2 m-3 bg-white text-black"
          ></input>
          <button
            onClick={(e) => {
              if (handleModalInputChange(e)) {
                setIsSorted(false);
              }
              // setAscOrDesc(true);
            }}
            className="border border-gray-600 bg-gray-200 p-1 rounded text-black"
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}
