import { FC } from "react";

type DropDownProps = {
    id: number,
    onDelete: (id: number) =>  void,
    onEdit: (id: number) =>  void
}

const DropDown: FC<DropDownProps> = ({ onDelete, onEdit, id }) => {
    return (
        <div className="btn-group">
            <button 
                className="btn bg-secondary-subtle text-secondary btn-sm dropdown-toggle" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false"
            >
                Actions
            </button>
            <ul className="dropdown-menu">
                <li>
                    <button 
                        className="dropdown-item" 
                        type="button" 
                        onClick={() => onEdit(id)}
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button 
                        className="dropdown-item" 
                        type="button" 
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default DropDown;
