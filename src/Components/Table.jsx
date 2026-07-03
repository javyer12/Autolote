const columns = ["CodAuto", "Placa", "Marca", "Tipo", "Color", "Año", "Precio"];

function RegisterTable({ rows, startIndex = 0, onSelectRegister }) {
  return (
    <table className="table-auto border-collapse border border-gray-400 w-full">
      <thead className="bg-gray-700 text-white">
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {rows.map((item, index) => (
          <tr
            key={item.id}
            className="cursor-pointer hover:bg-gray-500"
            onClick={() => onSelectRegister?.(startIndex + index)}
          >
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//0 => todo
//1 => primero
//2 => siguiente
//3 => anterior
export default function TableRegisters({
  isLoaded,
  data,
  info,
  numRegister,
  onSelectRegister,
}) {
  if (!isLoaded) {
    return null;
  }

  if (info === 0) {
    return <RegisterTable rows={data} onSelectRegister={onSelectRegister} />;
  }

  const currentIndex = Math.max(info - 1, 0);
  const tableIndex = numRegister === -1 ? data.length - 1 : currentIndex;
  const currentItem = data[tableIndex];

  if (!currentItem) {
    return null;
  }

  return (
    <RegisterTable
      rows={[currentItem]}
      startIndex={tableIndex}
      onSelectRegister={onSelectRegister}
    />
  );
}
