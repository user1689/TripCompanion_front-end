import React, { useContext } from "react";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

export default function NewPlace() {
    const auth = useContext(AuthContext);
    const [formState, InputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const histroy = useHistory();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        // console.log(auth.userId);
        // console.log(formState.inputs);
        try {
            await sendRequest(
                "http://localhost:5999/api/places",
                "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            // redirect user to success page
            histroy.push('/');
        } catch (error) {}
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>
            <form className="place-form" onSubmit={placeSubmitHandler}>
                { isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <Input
                    id="title"
                    type="text"
                    label="Title"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid text"
                    onInput={InputHandler}
                />
                <Input
                    id="description"
                    label="Description"
                    element="textarea"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={InputHandler}
                />
                <Input
                    id="address"
                    label="Address"
                    element="input"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={InputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
}
