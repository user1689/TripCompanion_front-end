import React, { useEffect, useReducer } from "react";

import "./Input.css";
import { validate } from "../util/validators";

// initState = {value: '', isValid: false}
const inputReducer = (preState, action) => {
    // console.log(preState);
    switch (action.type) {
        case "CHANGE":
            return {
                ...preState,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH":
            return {
                ...preState,
                isTouched: true
            }
        default:
            return preState;
    }
};

export default function Input(props) {
    // store
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialValid || false,
    });

    const changeHandler = (event) => {
        // action(changeHandler -> event.target.value) -> store (dispatch)-> reducer -> state -> <input value={state.value}>
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = (event) => {
        dispatch({
            type: "TOUCH",
        });
    }

    const {isValid, value} = inputState;
    const {id, onInput} = props;
    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            ></textarea>
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid && inputState.isTouched && "form-control--invalid"
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}
