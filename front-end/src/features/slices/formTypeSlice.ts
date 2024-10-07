import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormType } from "@src/interface/Fields";

type FormSliceState = {
    formType: FormType
}

const initialState:FormSliceState = {
    formType: {
        type: "CREATE"
    }
}

const formTypeSlice = createSlice({
    name: 'formType',
    initialState,
    reducers: {
        setFormType(state, action: PayloadAction<FormType>) {
            state.formType.type = action.payload.type;
        }
    }
});

export const {setFormType} = formTypeSlice.actions;
export default formTypeSlice.reducer;