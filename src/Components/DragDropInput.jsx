import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
// Componente del objeto que se puede arrastrar
function DraggableItem() {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "objeto-arrastrable",
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "grab",
    borderRadius: "4px",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      ¡Arrástrame!
    </div>
  );
}

// Componente de la zona donde se suelta
function DroppableArea({ isOverTarget, onUploadFile }) {
  const { setNodeRef } = useDroppable({
    id: "zona-destino",
  });

  const style = {
    width: "200px",
    height: "200px",
    border: "2px dashed #ccc",
    backgroundColor: isOverTarget ? "#e0f2fe" : "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {isOverTarget ? (
        "¡Suéltalo aquí!"
      ) : (
        <input
          className="text-sn w-full h-1/6"
          type="file"
          accept=".xlsx, .xls"
          onChange={onUploadFile}
        />
      )}
    </div>
  );
}

// Componente Principal
export default function DraggableItemApp({ onUploadFile }) {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    const { over } = event;
    // Si se soltó sobre la zona de destino correcta
    if (over && over.id === "zona-destino") {
      setIsDropped(true);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? <DraggableItem /> : <p>¡Completado con éxito!</p>}
      <DroppableArea isOverTarget={false} onUploadFile={onUploadFile} />
    </DndContext>
  );
}
