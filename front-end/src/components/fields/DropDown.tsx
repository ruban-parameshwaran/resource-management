import { DropDownOption } from "@src/interface/Fields";
import { FC } from "react";
import { Form } from "react-bootstrap";

type DropDownProps = {
	label?: string,
	name: string,
	options?: DropDownOption[],
	onChange: any
}

const DropDown: FC<DropDownProps> = ({ label, options, onChange, name }) => {
	return (
		<>
			{label ? <Form.Label>{label}</Form.Label> : ''}
			<select className="form-select" name={name} onChange={onChange}>
				{options?.map((option: DropDownOption, idx: number) => (
					<option key={idx} value={option.value} >{option.label}</option>
				))}
			</select>
		</>
	);
}

export default DropDown;