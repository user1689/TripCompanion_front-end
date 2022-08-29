import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/FormElements/Button";
import Input from "../../shared/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import useHttpClient from "../../shared/hooks/http-hook";

import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./Auth.css";

export default function Auth() {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, InputHandler, setFormData] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const authSubmitHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5999/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                // setIsLoading(false);
                auth.login(responseData.user.id);
            } catch (error) {
                // setIsLoading(false);
                // setError(
                //     error.message || "Something went wrong, please try again"
                // );
            }
        } else {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5999/api/users/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                // setIsLoading(false);
                auth.login(responseData.user.id);
            } catch (error) {
                // setIsLoading(false);
                // setError(
                //     error.message || "Something went wrong, please try again"
                // );
            }
        }
    };
    const switchModeHandler = (event) => {
        event.preventDefault();
        if (!isLoginMode) {
            // sign up mode
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            // login mode
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        valid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };
    const errorHandler = () => {
        clearError();
    };
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}></ErrorModal>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            onInput={InputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                        />
                    )}
                    <Input
                        id="email"
                        type="text"
                        element="input"
                        label="E-mail"
                        onInput={InputHandler}
                        errorText="Please enter a valid email address."
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    ></Input>
                    <Input
                        id="password"
                        type="text"
                        element="input"
                        label="Password"
                        onInput={InputHandler}
                        errorText="Please enter a valid password, at least 5 characters."
                        validators={[
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MINLENGTH(5),
                        ]}
                    ></Input>
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? "LOG IN" : "SIGN UP"}
                    </Button>
                    <Button inverse onClick={switchModeHandler}>
                        SWITCH TO {isLoginMode ? "SIGN UP" : "LOG IN"}
                    </Button>
                </form>
            </Card>
        </React.Fragment>
    );
}
