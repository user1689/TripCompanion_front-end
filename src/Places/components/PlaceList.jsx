import React from "react";
import "./PlaceList.css";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";


export default function PlaceList(props) {
    if (props.items === null || props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map((place) => {
                // console.log(place);
                return (
                    <PlaceItem
                        key={place.id}
                        coordinates={place.location}
                        {...place}
                    ></PlaceItem>
                );
            })}
        </ul>
    );
}
