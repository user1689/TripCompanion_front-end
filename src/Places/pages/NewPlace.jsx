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
import ImageUpload from "../../shared/UIElements/ImageUpload";

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
            image: {
                value: null,
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
            const formData = new FormData();
            formData.append("title", formState.inputs.title.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("creator", auth.userId);
            formData.append("image", formState.inputs.image.value);
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/places",
                "POST",
                // JSON.stringify({
                //     title: formState.inputs.title.value,
                //     description: formState.inputs.description.value,
                //     address: formState.inputs.address.value,
                //     creator: auth.userId,
                // }),
                // {
                //     "Content-Type": "application/json",
                // }
                formData,
                {
                    Authorization: "Bearer " + auth.token,
                }
            );
            // redirect user to success page
            histroy.push("/");
        } catch (error) {}
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <ImageUpload
                    center
                    id="image"
                    onInput={InputHandler}
                    // errorText="Please provide an image"
                ></ImageUpload>
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
