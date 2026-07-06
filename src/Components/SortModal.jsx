export function SortModal({ setIsSorted }) {
  const handleModalInputChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-200 ">
      <div className="w-full max-w-2xl  rounded-lg p-6 border border-gray-100 bg-gray-300">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2>Seleccione una opcion</h2>
          <button
            onClick={() => setIsSorted(false)}
            className="text-black px-4 py-2 rounded"
          >
            CLose
          </button>
        </div>
        <div className="flex flex-col p-2 items-center justify-center">
          <h4>1.CodAuto</h4>
          <h4>2.Placa</h4>
          <h4>3.Marca</h4>
          <h4>4.Tipo</h4>
          <h4>5.Color</h4>
          <h4>6.Año</h4>
          <h4>7.Precio</h4>
          <input
            onChange={(e) => {
              handleModalInputChange(e);
            }}
            className="border border-black m-3 "
          ></input>
          <label className="text-sm">Inserta un numero aqui.</label>
        </div>
      </div>
    </div>
  );
}
