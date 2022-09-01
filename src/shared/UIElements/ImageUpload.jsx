import React, { useEffect, useRef, useState } from "react";
import Button from "../FormElements/Button";
import "./ImageUpload.css";

export default function ImageUpload(props) {
    const fileRef = useRef();
    const [file, setFile] = useState(null);
    const [preViewUrl, setPreViewUrl] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const pickImageHander = () => {
        fileRef.current.click();
    };
    useEffect(() => {
      if (!file) {
        return ;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreViewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }, [file]);
    const pickedHandler = (event) => {
        console.log(event);
        let pickedFile = null;
        let fileIsValid = isValid;
        if (event.target.files || event.target.files.length === 1) {
          pickedFile = event.target.files[0];
          console.log(pickedFile);
          setFile(pickedFile);
          setIsValid(true);
          fileIsValid = true;
        } else {
          setIsValid(false);
          fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };
    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {preViewUrl && <img src={preViewUrl} alt="Preview"/>}
                    {!preViewUrl && <p>please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHander}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p> }
        </div>
    );
}
