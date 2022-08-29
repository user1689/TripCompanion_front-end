import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "../UIElements/Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.className}`}>
                <h2>{props.header}</h2>
            </header>
            {/* prevent automatically submission if we add button */}
            <form
                onSubmit={
                    props.onSubmit
                        ? props.onSubmit
                        : (event) => event.preventDefault()
                }
            >
                <div className={`modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("modal-hook")
    );
};

export default function Modal(props) {
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel}></Backdrop>}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props}>
                    
                </ModalOverlay>
            </CSSTransition>
        </React.Fragment>
    );
}