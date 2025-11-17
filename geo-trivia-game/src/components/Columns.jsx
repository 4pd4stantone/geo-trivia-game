import { useDroppable } from "@dnd-kit/core"

export default function Columns ({column, children}) {

const { setNodeRef } = useDroppable ({
    id: column.id
})

return (
     <div className="column" ref={setNodeRef}>
        <span className="number">{column.id}</span>
            {children}
    </div>
)

}


