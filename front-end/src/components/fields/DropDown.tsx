import { RootState } from "@src/app/store";
import { DropDownOption } from "@src/interface/Fields";
import { FC } from "react";
import { Form } from "react-bootstrap";
import {  useSelector } from "react-redux";

type DropDownProps = {
	label?: string,
	name: string,
	options?: DropDownOption[],
	onChange: any
}

const DropDown: FC<DropDownProps> = ({ label, options, onChange, name }) => {

    const { formType } = useSelector((state: RootState) => state.formType);
	const { type } = formType;
	
	return (
		<>
			{label ? <Form.Label>{label}</Form.Label> : ''}
			<select className="form-select" name={name} onChange={onChange}>
				{type === 'CREATE' &&<option>Select an option</option>}
				{options?.map((option: DropDownOption, idx: number) => (
					<option key={idx} value={option.value} >{option.label}</option>
				))}
			</select>
		</>
	);
}

export default DropDown;