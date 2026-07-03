import {
  ModificarRegistro,
  VerRegistro,
  DanwloadsXLSX,
  RemoveRegister,
} from "./classes/Functions";
import {
  SaveButton,
  FirstRegisterButton,
  LoadRegisterButton,
  NextRegisterButton,
  PrevRegisterButton,
  LastRegisterButton,
  UpdateRegisterButton,
  AddRegisterButton,
  DeleteRegisterButton,
  ReadRegisterButton,
  CleanRegisterButton,
  SortRegisterButton,
  FilterRegisterButton,
} from "./classes/Buttons";
import Pagination from "./classes/Pagination";
import { useState } from "react";
import TableRegisters from "./Components/Table";

const styles =
  "bg-gray-500 text-white px-4 py-2 rounded-md mt-4 mr-2 pointer-events-auto hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export function AutoloteComponent() {
  //custuma hook para modificar la data de los registros
  const [data, setData] = useState(() => VerRegistro());
  //carga la data hasta que se presione el boton LoadRegister
  const [isLoaded, setLoadedData] = useState(false);
  const [infoRegister, setInfoRegister] = useState(0); //contiene el index que se esta renderizando en la tabla y los inputs
  const [numRegister, setNumRegister] = useState(0); //
  const [selectedIndex, setSelectedIndex] = useState(null);
  //guarda los valores de la data en variables para poder mostrarlas en los inputs
  const formData = selectedIndex !== null ? data[selectedIndex] : {};
  const [dataForDownload, setDataForDownload] = useState({
    data: selectedIndex !== null ? data[selectedIndex] : data,
  }); //controla el estado de la data que esta renderizada en la tabla en el momento que se ejecuta una descarga
  // //
  // const [msg, setMessage] = useState(""); //variable para controlar los mensajes exitoso/fallo
  // const currentRegister = data[infoRegister];

  // const removeRegister = (indexToRemove) => {
  //   //muestra el mensaje de exito
  //   setMessage("Eliminado correctamente");
  //   setTimeout(() => setMessage(""), 3000);

  //   const newData = data.filter((_, index) => index !== indexToRemove);
  //   setData(newData);

  //   //valida que exista al menos un item
  //   if (newData.length === 0) {
  //     setInfoRegister(0);
  //   } else if (indexToRemove >= newData.length) {
  //     setInfoRegister(newData.length - 1);
  //   } else {
  //     setInfoRegister(indexToRemove);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedIndex === null) return;

    setData((prevData) => {
      setDataForDownload(prevData);
      const updatedData = prevData.map((item, index) =>
        index === selectedIndex ? { ...item, [name]: value } : item,
      );

      ModificarRegistro(selectedIndex, updatedData[selectedIndex]);

      return updatedData;
    });
  };
  const handleFormSubmit = (e) => {
    e?.preventDefault();
    alert("Para guardar el registro, presione el boton Actualizar");
    console.log(formData);
  };

  const selectRegister = (index, registerType) => {
    setInfoRegister(index + 1);
    setNumRegister(registerType);
    setSelectedIndex(index);
    setLoadedData(true);
  };

  // const handleDeleteRegister = () => {
  //   let index = dataForDownload.data[infoRegister - 1].CodAuto;
  //   let confirmRemove = confirm(
  //     "Seguro que quiere eliminar el Registro con codigo de Registro " + index,
  //   );
  //   if (confirmRemove) {
  //     console.log(index);
  //     RemoveRegister(index);
  //   }
  //   alert("Registro Eliminado");
  // };
  return (
    <div className="m-2 w-full">
      {/* Inputs component*/}
      <div className="flex flex-row gap-4">
        <form className="flex flex-row gap-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            <label htmlFor="codAuto">CodAuto:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="codAuto"
              name="CodAuto"
              value={formData.CodAuto}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="placa">Placa:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="placa"
              name="Placa"
              value={formData.Placa ?? ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="marca">Marca:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="marca"
              name="Marca"
              value={formData.Marca ?? ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tipo">Tipo:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="tipo"
              name="Tipo"
              value={formData.Tipo ?? ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="color">Color:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="color"
              name="Color"
              value={formData.Color ?? ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="year">Año:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="year"
              name="Año"
              value={formData.Año ?? ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="precio">Precio:</label>
            <input
              className="border w-40 mt-2 rounded-md"
              type="text"
              id="precio"
              name="Precio"
              value={formData.Precio ?? ""}
              onChange={handleInputChange}
            />
          </div>
          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Submit
          </button> */}
        </form>
      </div>
      {/* Table component*/}
      <div className="mt-8 w-full">
        <TableRegisters
          formData={formData}
          isLoaded={isLoaded}
          data={data}
          info={infoRegister}
          numRegister={numRegister}
          onSelectRegister={(index) => selectRegister(index, 2)}
        />
      </div>
      {/* Pagination Content */}
      <div>
        <Pagination />
      </div>
      {/* Buttons component*/}
      <div>
        <LoadRegisterButton
          onClick={() => {
            setInfoRegister(0);
            setNumRegister(0);
            setSelectedIndex(0);
            setLoadedData(true);
          }}
          classStyles={styles}
        >
          Ver Registro
        </LoadRegisterButton>
        <FirstRegisterButton
          onClick={() => selectRegister(0, 1)}
          classStyles={styles}
        >
          Primero
        </FirstRegisterButton>
        <NextRegisterButton
          disabled={selectedIndex !== null && selectedIndex >= data.length - 1}
          onClick={() => {
            const nextIndex =
              selectedIndex === null
                ? 0
                : Math.min(selectedIndex + 1, data.length - 1);
            selectRegister(nextIndex, 2);
          }}
          classStyles={styles}
        >
          Siguiente
        </NextRegisterButton>
        <PrevRegisterButton
          onClick={() => {
            const prevIndex =
              selectedIndex === null ? 0 : Math.max(selectedIndex - 1, 0);
            selectRegister(prevIndex, 3);
          }}
          disabled={selectedIndex === null || selectedIndex < 1}
          classStyles={styles}
        >
          Anterior
        </PrevRegisterButton>
        <LastRegisterButton
          onClick={() => selectRegister(data.length - 1, -1)}
          classStyles={styles}
        >
          Ultimo
        </LastRegisterButton>
        <UpdateRegisterButton
          onClick={() => handleFormSubmit()}
          classStyles={styles}
          type="submit"
        >
          Actualizar
        </UpdateRegisterButton>

        <SaveButton
          classStyles={styles}
          onClick={() =>
            DanwloadsXLSX(
              infoRegister === 0
                ? dataForDownload.data
                : [dataForDownload.data[infoRegister - 1]],
            )
          }
        >
          Descargar
        </SaveButton>
        <AddRegisterButton
          onClick={() => console.log("add register")}
          classStyles={styles}
        >
          Agregar
        </AddRegisterButton>

        <DeleteRegisterButton
          classStyles={styles}
          onClick={() => RemoveRegister(infoRegister)}
        >
          Eliminar
        </DeleteRegisterButton>
        <ReadRegisterButton
          onClick={() => console.log("read register")}
          classStyles={styles}
        >
          Leer
        </ReadRegisterButton>
        <CleanRegisterButton
          onClick={() => console.log("clean register")}
          classStyles={styles}
        >
          Limpiar
        </CleanRegisterButton>
        <SortRegisterButton
          onClick={() => console.log("sort register")}
          classStyles={styles}
        >
          Ordenar
        </SortRegisterButton>
        <FilterRegisterButton
          onClick={() => console.log("filter register")}
          classStyles={styles}
        >
          Filtrar
        </FilterRegisterButton>
      </div>
    </div>
  );
}
//cargar datos en memeoria usando js
