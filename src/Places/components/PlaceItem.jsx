import React, { useContext, useState } from "react";
import "./PlaceItem.css";

import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import Modal from "../../shared/UIElements/Modal";
import Map from "../../shared/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";



export default function PlaceItem(props) {
    console.log(props)
    const auth = useContext(AuthContext);
    //   console.log(props.imageURL);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const openMapHandler = () => {
        setShowMap(true);
    };
    const closeMapHandler = () => {
        setShowMap(false);
    };
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };
    const cancelDeleteWarningHandler = () => {
        setShowConfirmModal(false);
    };
    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("deleting...");
    };
    // console.log(props);
    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>close</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                header="Are you sure?"
                footerClass="place-item__model-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteWarningHandler}>
                            CANCEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </React.Fragment>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please node
                    that it can not be undone thereafter.
                </p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.discription}</p>
                        <div className="place-item__actions">
                            <Button inverse onClick={openMapHandler}>
                                VIEW ON MAP
                            </Button>
                            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
                            {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>}
                        </div>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}
