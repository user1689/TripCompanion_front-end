import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../shared/FormElements/Button";
import Input from "../../shared/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import {AuthContext} from "../../shared/context/auth-context"

import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

// const PLACES = [
//     {
//         id: "p1",
//         title: "Space Needle",
//         description: "One of the attractions of Seattle",
//         imageURL: "/images/spaceNeedle.jpg",
//         address: "400 Broad Street, Seattle, 98109",
//         location: {
//             lat: 47.620671759266315,
//             lng: -122.34932127106136,
//         },
//         creator: "u1",
//     },
//     {
//         id: "p2",
//         title: "Space Needle",
//         description: "One of the attractions of Seattle",
//         imageURL: "/images/spaceNeedle.jpg",
//         address: "400 Broad Street, Seattle, 98109",
//         location: {
//             lat: 47.62048931148176,
//             lng: -122.34938162883537,
//         },
//         creator: "u1",
//     },
// ];

export default function UpdatePlace() {
    // const [isLoading, setIsLoading] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState(null);
    let placeId = useParams().placeId;
    const history = useHistory();
    const auth = useContext(AuthContext);
    // let identifiedPlace = [];
    // for (let i = 0; i < PLACES.length; i++) {
    //   console.log(PLACES[i].id);
    //   console.log(placeId);
    //   if (PLACES[i].id == placeId) {
    //     identifiedPlace = [...identifiedPlace, PLACES[i]];
    //   }
    // }
    // console.log(identifiedPlace);

    const [formState, InputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true,
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (error) {}
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    // const identifiedPlace = PLACES.find((place) => {
    //     return place.id === placeId;
    // });

    // useEffect(() => {
    //     if (identifiedPlace) {
    //         setFormData(
    //             {
    //                 title: {
    //                     value: identifiedPlace.title,
    //                     isValid: true,
    //                 },
    //                 description: {
    //                     value: identifiedPlace.description,
    //                     isValid: true,
    //                 },
    //             },
    //             true
    //         );
    //     }
    //     setIsLoading(false);
    // }, [setFormData, identifiedPlace]);

    // temporary solution for delay render our form to avoid empty data.
    // because useReducer only run once, the initialized parameter in it only be passed in once.
    // console.log(formState.inputs.title.value);
    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    const placeUpdateHandler = async (event) => {
        // console.log(111);
        // console.log(placeId);
        event.preventDefault();
        // console.log(formState.inputs);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + auth.token
                }
            );
            // console.log(11);
            history.push(`/${auth.userId}/places`);
        } catch (error) {}
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>
            {!isLoading && loadedPlace && (
                <form className="place-form" onSubmit={placeUpdateHandler}>
                    <Input
                        id="title"
                        type="text"
                        label="Title"
                        element="input"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid text"
                        onInput={InputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        label="Description"
                        element="textarea"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (at least 5 characters)."
                        onInput={InputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
}
