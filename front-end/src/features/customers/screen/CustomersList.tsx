import Card from "@src/components/card";
import LoadingIndicator from "@src/components/loader/LoadingIndicator";
import ActionDropdown from "@src/components/fields/ActionDropdown";
import { Customer } from "@src/interface/customer";
import { FC } from "react";

type CustomersListProps = {
	customers: Customer[],
	isLoading?: boolean,
	handleEdit: (id: number) => void,
	handleDelete: (id: number) =>  void
}

const CustomersList: FC<CustomersListProps> = ({isLoading = true, customers, handleEdit, handleDelete}) => {
	return (
		<LoadingIndicator isLoading={isLoading}>
			<Card>
				<div className="card-body">
					<ul className="list-group">
						{customers.map((customer: Customer) => (
							<li className="list-group-item d-flex align-items-center" key={customer.id}>
								<i className="ti ti-box fs-4 me-2 text-primary"></i>
								{customer.name}
								<span className="badge bg-light-primary text-primary ms-auto">
									<ActionDropdown
										onDelete={handleDelete}
										onEdit={handleEdit}
										id={customer?.id ?? null}/>
								</span>
							</li>
						))}
					</ul>
				</div>
			</Card>
		</LoadingIndicator>
	)
}

export default CustomersList;