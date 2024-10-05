import Card from "@src/components/card";
import ActionDropdown from "@src/components/fields/ActionDropdown";
import LoadingIndicator from "@src/components/loader/LoadingIndicator";
import { Category } from "@src/interface/Category";
import { FC } from "react";

type CategoryListProps = {
    categoryLists: Category[]
    isCategoryLoading: boolean,
    handleDelete: (id: number) => void,
    handleEdit: (id: number) => void
}

const CategoryList: FC<CategoryListProps> = ({ categoryLists, isCategoryLoading, handleDelete, handleEdit }) => {

    return (
        <LoadingIndicator isLoading={isCategoryLoading}>
            <Card>
                <div className="card-body">
                    <ul className="list-group">
                        {categoryLists.map((category: Category) => (
                            <li className="list-group-item d-flex align-items-center" key={category.id}>
                            <i className="ti ti-box fs-4 me-2 text-primary"></i>
                            {category.name}
                                <span className="badge bg-light-primary text-primary ms-auto">
                                    <ActionDropdown
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        id={category?.id}
                                        />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </LoadingIndicator>
    );
}

export default CategoryList;

