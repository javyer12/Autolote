import {
  ModificarRegistro,
  VerRegistro,
  DanwloadsXLSX,
  RemoveRegister,
  GenerateIds,
  LimpiarRegistros,
  ReemplazarRegistros,
  CargarRegistros,
  AgregarRegistro,
  OrdenarPorCodAuto,
  OrdenarPorPlaca,
  OrdenarPorMarca,
  OrdenarPorTipo,
  OrdenarPorColor,
  OrdenarPorYear,
  OrdenarPorPrecio,
  // ==============
  FiltrarAttribute,
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
// import Pagination from "./classes/Pagination";
import { useState } from "react";
import TableRegisters from "./Components/Table";
import DraggableItemApp from "./Components/DragDropInput";
import * as XLSX from "xlsx";
// import { mockData } from "./classes/MockData";
import {
  SortModal,
  AscOrDesc,
  // AscOrDescPriceAndYear,
} from "./Components/SortModal";
import { FilterModal, AscOrDescFilter } from "./Components/FilterModal";

const tableColumns = [
  "CodAuto",
  "Placa",
  "Marca",
  "Tipo",
  "Color",
  "Año",
  "Precio",
];

const styles =
  "bg-gray-500 text-white px-4 py-2 rounded-md mt-4 mr-2 pointer-events-auto hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export function AutoloteComponent() {
  // const autoloteData = VerRegistro();
  //custuma hook para modificar la data de los registros
  const [data, setData] = useState(() => VerRegistro());
  //carga la data hasta que se presione el boton LoadRegister
  const [isLoaded, setLoadedData] = useState(false);
  const [infoRegister, setInfoRegister] = useState(0); //contiene el index que se esta renderizando en la tabla y los inputs
  const [numRegister, setNumRegister] = useState(0); //
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [readOnlyInput, setReadOnlyInput] = useState(true); //controla los inputs que son solo de lecutura
  const [isAddingRegister, setIsAddingRegister] = useState(false);
  const [uploadFileAble, setUploadFileAble] = useState(false); //controla el estado del input para subir archivos
  const emptyRegister = {
    CodAuto: "",
    Placa: "",
    Marca: "",
    Tipo: "",
    Color: "",
    Año: "",
    Precio: "",
  };
  const [newRegister, setNewRegister] = useState(emptyRegister); //vacia los inputs para agregar un registro nuevo

  const [isSorted, setIsSorted] = useState(false); //controla la variable de estado del modal de ordenamiento
  const [sortAtt, setSortAtt] = useState(false);
  const [sortAttribute, setSortAttribute] = useState("");
  const [numOrStrOption, setNumOrStrOption] = useState("");

  const [filteredAttribute, setFilteredAttribute] = useState("false"); //controla la variable de estado del modal de filtrado
  const [isFiltering, setIsFiltering] = useState("");
  const [filterAtt, setFilterAtt] = useState();
  //guarda los valores de la data en variables para poder mostrarlas en los inputs
  const formData = isAddingRegister
    ? newRegister
    : selectedIndex !== null
      ? (data[selectedIndex] ?? {})
      : {};
  const [dataForDownload, setDataForDownload] = useState({
    data: selectedIndex !== null ? data[selectedIndex] : data,
  }); //controla el estado de la data que esta renderizada en la tabla en el momento que se ejecuta una descarga

  // ========================Componente Modal====================
  const recibirDatos = (datosHijo) => {
    // Object.entries(emptyRegister).forEach(([clave, valor]) => {
    //   if (datosHijo.attribute !== clave) {
    //     alert("Por ahora solo está disponible el ordenamiento por CodAuto.");
    //     return;
    //   }
    //   console.log(`${clave}: ${valor}`);
    // });

    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }

    if (datosHijo.type === "direction" && sortAttribute === "CodAuto") {
      const sortedData = OrdenarPorCodAuto(datosHijo.direction, data);

      setData(sortedData);
      setDataForDownload({ data: sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };

  //==================placa===================
  const recibirDatosPlaca = (datosHijo) => {
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && sortAttribute === "Placa") {
      const sortedData = OrdenarPorPlaca(datosHijo.direction, data);
      setData(sortedData);
      setDataForDownload({ sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };

  //==================Marca===================
  const recibirDatosMarca = (datosHijo) => {
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && sortAttribute === "Marca") {
      const sortedData = OrdenarPorMarca(datosHijo.direction, data);
      setData(sortedData);
      setDataForDownload({ sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };
  //==================Tipo===================
  const recibirDatosTipo = (datosHijo) => {
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && sortAttribute === "Tipo") {
      const sortedData = OrdenarPorTipo(datosHijo.direction, data);
      setData(sortedData);
      setDataForDownload({ sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };
  //==================Color===================
  const recibirDatosColor = (datosHijo) => {
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && sortAttribute === "Color") {
      const sortedData = OrdenarPorColor(datosHijo.direction, data);
      setData(sortedData);
      setDataForDownload({ sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };
  // ========================Año====================
  const recibirDatosYear = (datosHijo) => {
    // const value = datosHijo.value;
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && numOrStrOption === "Año") {
      const sortedData = OrdenarPorYear(datosHijo.direction, data);

      setData(sortedData);
      setDataForDownload({ data: sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };
  // ========================Precio====================
  const recibirDatosPrecio = (datosHijo) => {
    // const value = datosHijo.value;
    if (datosHijo.type === "attribute") {
      setSortAttribute(datosHijo.attribute);
      setSortAtt(true);
      return;
    }
    if (datosHijo.type === "direction" && numOrStrOption === "Precio") {
      const sortedData = OrdenarPorPrecio(datosHijo.direction, data);

      setData(sortedData);
      setDataForDownload({ data: sortedData });
      setInfoRegister(0);
      setNumRegister(0);
      setSelectedIndex(sortedData.length > 0 ? 0 : null);
      setLoadedData(true);
      setSortAttribute("");
    }
  };

  // =========================Filtrado==========================
  // =========================CodAuto==========================
  const recibirDatosFiltrados = (datosHijo) => {
    let sortedData;

    if (datosHijo.type === "attribute") {
      setFilteredAttribute(datosHijo.attribute);
      setFilterAtt(true);
      return;
    }

    if (datosHijo.type === "direction" && filteredAttribute === "CodAuto") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Placa") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Marca") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Tipo") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Color") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Año") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    if (datosHijo.type === "direction" && filteredAttribute === "Precio") {
      sortedData = FiltrarAttribute(
        datosHijo.direction,
        filteredAttribute,
        data,
      );
    }
    setData(sortedData);
    setDataForDownload({ data: sortedData });
    setInfoRegister(0);
    setNumRegister(0);
    setSelectedIndex(sortedData.length > 0 ? 0 : null);
    setLoadedData(true);
    setFilteredAttribute("");
  };

  // ========================Inputs=============================
  //funcion que controla los valores de los inputs
  const handleInputChange = (e) => {
    e?.preventDefault();
    const { name, value } = e.target;

    if (isAddingRegister) {
      setNewRegister((currentRegister) => ({
        ...currentRegister,
        [name]: value,
      }));
      return;
    }

    // ================================actualizar ==================
    if (selectedIndex === null) return;

    setData((prevData) => {
      const updatedData = prevData.map((item, index) =>
        index === selectedIndex ? { ...item, [name]: value } : item,
      );
      setDataForDownload({ data: updatedData });

      ModificarRegistro(selectedIndex, updatedData[selectedIndex]);

      return updatedData;
    });
  }; //termina el handleSubmit

  const handleAddRegister = () => {
    const codAuto = Number(newRegister.CodAuto);
    const year = Number(newRegister.Año);
    const precio = Number(newRegister.Precio);
    const requiredFields = tableColumns.filter(
      (column) => String(newRegister[column] ?? "").trim() === "",
    );

    if (requiredFields.length > 0) {
      alert("Complete todos los campos antes de agregar el registro.");
      return;
    }

    if (!Number.isFinite(codAuto) || codAuto <= data.length) {
      alert(
        "CodAuto debe ser un número mayor a la cantidad actual de registros.",
      );
      return;
    }

    const registerToAdd = {
      id: GenerateIds(),
      CodAuto: codAuto,
      Placa: newRegister.Placa,
      Marca: newRegister.Marca,
      Tipo: newRegister.Tipo,
      Color: newRegister.Color,
      Año: year,
      Precio: precio,
    };
    const updatedData = AgregarRegistro(registerToAdd, data);
    const newIndex = updatedData.length - 1;

    setData(updatedData);
    setDataForDownload({ data: updatedData });
    setSelectedIndex(newIndex);
    setInfoRegister(newIndex + 1);
    setNumRegister(2);
    setLoadedData(true);
    setReadOnlyInput(true);
    setIsAddingRegister(false);
    alert("Registro agregado");
    setNewRegister(emptyRegister);
  };

  //mensaje para actualizar
  const handleFormSubmit = (e) => {
    e?.preventDefault();
    alert("Para guardar el registro, presione el boton Actualizar");
  };

  //funcion para borrar registros
  const handleDeleteRegister = () => {
    if (selectedIndex === null || !data[selectedIndex]) {
      alert("Seleccione un registro para eliminar");
      return;
    }

    const currentRegister = data[selectedIndex];
    const confirmRemove = confirm(
      "Seguro que quiere eliminar el Registro con codigo de Registro " +
        currentRegister.CodAuto,
    );

    if (!confirmRemove) return;

    const updatedData = RemoveRegister(selectedIndex, data);
    const nextIndex =
      updatedData.length === 0
        ? null
        : Math.min(selectedIndex, updatedData.length - 1);
    setData(updatedData);
    setDataForDownload({ data: updatedData });
    setSelectedIndex(nextIndex);
    setInfoRegister(nextIndex === null ? 0 : nextIndex + 1);
    setNumRegister(2);
    setLoadedData(true);

    alert("Registro Eliminado");
  };

  const selectRegister = (index, registerType) => {
    setInfoRegister(index + 1);
    setNumRegister(registerType);
    setSelectedIndex(index);
    setLoadedData(true);
  };

  const normalizeUploadedRow = (row, index) => {
    const normalizedRow = tableColumns.reduce(
      (register, column) => ({
        ...register,
        [column]: row[column] ?? "",
      }),
      {},
    );

    return {
      id: row.id ?? GenerateIds(),
      CodAuto: normalizedRow.CodAuto || index + 1,
      Placa: normalizedRow.Placa,
      Marca: normalizedRow.Marca,
      Tipo: normalizedRow.Tipo,
      Color: normalizedRow.Color,
      Año: normalizedRow.Año,
      Precio: normalizedRow.Precio,
    };
  };

  //maneja la carga del archivo
  const handleUploadFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      try {
        const workbook = XLSX.read(readerEvent.target.result, {
          type: "array",
        });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const uploadedData = XLSX.utils.sheet_to_json(firstSheet, {
          defval: "",
        });

        if (uploadedData.length === 0) {
          alert("El archivo no contiene registros para cargar.");
          return;
        }

        const updatedData = uploadedData.map(normalizeUploadedRow);

        ReemplazarRegistros(updatedData);
        setData(updatedData);
        setDataForDownload({ data: updatedData });
        setInfoRegister(0);
        setNumRegister(0);
        setSelectedIndex(null);
        setLoadedData(true);
        setUploadFileAble(false);
      } catch (error) {
        alert(
          "No se pudo leer el archivo. Verifique que sea un archivo XLSX o XLS válido." +
            error,
        );
      } finally {
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      alert("Ocurrió un error al leer el archivo.");
      event.target.value = "";
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="m-2 w-full p-4">
      {/* Inputs component*/}
      <div className="flex flex-row gap-4 w-full p-6  rounded-lg shadow">
        <form
          className=" gap-4 w-full flex flex-col md:flex-row "
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col ">
            <label htmlFor="codAuto">CodAuto:</label>
            <input
              className="border w-40 mt-2 rounded-md "
              type="text"
              id="codAuto"
              name="CodAuto"
              value={formData.CodAuto}
              onChange={handleInputChange}
              disabled={readOnlyInput}
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
              onBlur={isAddingRegister ? handleAddRegister : undefined}
            />
          </div>
        </form>
        {/* input para subir archivo */}
      </div>
      <div>
        {uploadFileAble && (
          <div className="w-48 m-4 items-center justify-center ">
            <DraggableItemApp onUploadFile={handleUploadFile} />
            <button onClick={() => setUploadFileAble()}>cancel</button>
          </div>
        )}

        {isLoaded && isSorted && (
          <SortModal
            enviarDatos={recibirDatos}
            enviarDatosPlaca={recibirDatosPlaca}
            enviarDatosMarca={recibirDatosMarca}
            enviarDatosTipo={recibirDatosTipo}
            enviarDatosColor={recibirDatosColor}
            enviarDatosPrecioYear={recibirDatosYear}
            enviarDatosPrecio={recibirDatosPrecio}
            setNumOrStrOption={setNumOrStrOption}
            setIsSorted={setIsSorted}
          />
        )}
        {sortAtt && (
          <AscOrDesc
            enviarDatos={recibirDatos}
            enviarDatosPlaca={recibirDatosPlaca}
            enviarDatosMarca={recibirDatosMarca}
            enviarDatosTipo={recibirDatosTipo}
            enviarDatosColor={recibirDatosColor}
            enviarDatosPrecioYear={recibirDatosYear}
            enviarDatosPrecio={recibirDatosPrecio}
            setOpenModal={setSortAtt}
            numOrStrOption={numOrStrOption}
          />
        )}
        {isLoaded && isFiltering && (
          <FilterModal
            setOpenModal={setIsFiltering}
            enviarDatos={recibirDatosFiltrados}
          />
        )}
        {filterAtt && (
          <AscOrDescFilter
            enviarDatos={recibirDatosFiltrados}
            setOpenModal={setFilterAtt}
          />
        )}
      </div>
      {/* Table component*/}
      <div className="mt-8 w-full  bg-red/40 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl p-8 ">
        {isLoaded ? (
          <TableRegisters
            formData={formData}
            isLoaded={isLoaded}
            data={data}
            info={infoRegister}
            numRegister={numRegister}
            onSelectRegister={(index) => selectRegister(index, 2)}
          />
        ) : (
          <h2 className="text-center ">NO DATA</h2>
        )}
      </div>
      {/* Pagination Content */}
      {/* <div>
        <Pagination />
      </div> */}
      {/* Buttons component*/}
      <div>
        <LoadRegisterButton
          onClick={() => {
            const loadedData = CargarRegistros();

            setData(loadedData);
            setDataForDownload({ data: loadedData });
            setInfoRegister(0);
            setNumRegister(0);
            setSelectedIndex(loadedData.length > 0 ? 0 : null);
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
          onClick={() => {
            // handleFormSubmit();
            alert("Cambia el valor en el input correspondiente!.");
          }}
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
          onClick={() => {
            setNewRegister(emptyRegister);
            setSelectedIndex(null);
            setInfoRegister(0);
            setNumRegister(0);
            setReadOnlyInput(false);
            setIsAddingRegister(true);
            alert(
              "Complete los campos. El registro se agregará al terminar el campo Precio.",
            );
          }}
          classStyles={styles}
        >
          Agregar
        </AddRegisterButton>

        <DeleteRegisterButton
          classStyles={styles}
          onClick={handleDeleteRegister}
        >
          Eliminar
        </DeleteRegisterButton>
        <ReadRegisterButton
          onClick={() => setUploadFileAble(true)}
          classStyles={styles}
        >
          Leer
        </ReadRegisterButton>
        <CleanRegisterButton
          onClick={() => {
            const cleanedData = LimpiarRegistros();

            setData(cleanedData);
            setDataForDownload({ data: cleanedData });
            setLoadedData(false);
            setSelectedIndex(null);
            setInfoRegister(0);
            setNumRegister(0);
          }}
          classStyles={styles}
        >
          Limpiar
        </CleanRegisterButton>
        <SortRegisterButton
          onClick={() => setIsSorted(true)}
          classStyles={styles}
        >
          Ordenar
        </SortRegisterButton>
        <FilterRegisterButton
          onClick={() => {
            if (isLoaded) {
              setIsFiltering(true);
            } else {
              alert("No hay data cargada!.");
            }
          }}
          classStyles={styles}
        >
          Filtrar
        </FilterRegisterButton>
      </div>
    </div>
  );
}
//cargar datos en memeoria usando js
