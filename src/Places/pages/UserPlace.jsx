import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttpClient from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";


import PlaceList from "../components/PlaceList";

// const PLACES = [
//     {
//         id: "p1",
//         title: "Space Needle",
//         description: "One of the attractions of Seattle",
//         imageURL: "/images/spaceNeedle.jpg",
//         address: "400 Broad Street, Seattle, 98109",
//         location: {
//             lat: 47.620671759266315, 
//             lng: -122.34932127106136
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
//             lng: -122.34938162883537
//         },
//         creator: "u1",
//     },
// ];

export default function UserPlace() {
    const userId = useParams().userId;
    const [loadedPlaces, setLoadedPlaces] = useState(null);
    const { isLoading, error, sendRequest, clearError}  = useHttpClient();
    console.log(userId);
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5999/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (error) {
                
            }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    // const loadPlaces = PLACES.filter((place) => {
    //     return place.creator === userId;
    // });
    return (
       <React.Fragment>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
         <PlaceList items={loadedPlaces}></PlaceList>
       </React.Fragment>
       
       
    );
}
