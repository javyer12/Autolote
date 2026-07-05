export function SortModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2>Seleccione una opcion</h2>
          <button className="text-black px-4 py-2 rounded">CLose</button>
        </div>
        <div className="flex flex-col p-2 items-center justify-center">
          <p>1.CodAuto</p>
          <p>2.Placa</p>
          <p>3.Marca</p>
          <p>4.Tipo</p>
          <p>5.Color</p>
          <p>6.Año</p>
          <p>7.Precio</p>
          <input></input>
        </div>
      </div>
    </div>
  );
}
