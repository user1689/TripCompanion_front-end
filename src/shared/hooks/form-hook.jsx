import { useCallback, useReducer } from "react";

const formReducer = (preState, action) => {
    // console.log(action);
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            // console.log(preState.inputs['title']);
            for (const inputId in preState.inputs) {
                if (!preState.inputs[inputId]) {
                    continue;
                }
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid =
                        formIsValid && preState.inputs[inputId].isValid;
                }
            }
            // console.log('@',{...preState});
            return {
                ...preState,
                inputs: {
                    ...preState.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        case "SET_DATA": 
            return {
                inputs: action.inputs,
                isValid: action.formIsValid
            }
        default:
            return preState;
    }
};

export const useForm = (initialInputs, initialFormValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    // useCallback makes the function unchanged
    const InputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidity
        });
    // function will no be created
    }, []);

    return [formState, InputHandler, setFormData];

    
};
