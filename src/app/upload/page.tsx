"use client"
import {SyntheticEvent, useState} from "react";
import {Button} from "@/components/Button";
import DragAndDropArea from "@/components/fileupload/DragAndDropArea";
import FileList from "@/components/fileupload/FileList";
import "@/styles/styles.scss"
import Textfield from "@/components/Textfield";
import {mdiEmail, mdiLock, mdiTextRecognition} from "@mdi/js";

export interface UploadData {
    title: string,
    password: string,
    files: File[]
}

export default function File() {
    const [uploadData, setUploadData] = useState<UploadData>({
        title: "",
        password: "",
        files: []
    });
    const [response, setResponse] = useState<string>("");

    const uploadFiles = async () => {
        console.log("Upload!");
        const formData = new FormData();
        uploadData.files.forEach((file, index) => {
            formData.append(`file`, file);
        });

        const response = await fetch("/api/files", {
            method: "POST",
            body: formData,
        });

        // Check the status code of the response
        if (response.ok) {
            // The file was successfully uploaded
            setResponse("File uploaded successfully");
        } else {
            // There was an error uploading the file
            setResponse("Error uploading file");
        }
    };

    const setFiles = (files: File[]) => {
        setUploadData((prevData: UploadData) => ({
            ...prevData,
            files: files
        }))
    }

    const handleTextfieldChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        setUploadData((prevData: UploadData) => ({...prevData, [name]: value}));
    };

    return (
        <main className={"upload-page container"}>
            <section className="section file-upload">
                <DragAndDropArea files={uploadData.files}
                                 onFileChange={(files) => setFiles(files)}
                                 allowMultiple
                />
            </section>
            <section className={"section filelist"}>
                <FileList files={uploadData.files}
                          onFileChange={(files) => setFiles(files)}
                />
            </section>

            <form className={"section form"}>
                <Textfield
                    placeholder={"Title"}
                    name={"title"}
                    onChange={handleTextfieldChange}
                    isRequired={true}
                    icon={mdiTextRecognition}
                />
                <Textfield
                    placeholder={"Password"}
                    name={"password"}
                    password
                    onChange={handleTextfieldChange}
                    isRequired={true}
                    icon={mdiLock}
                />
                <Button layout={"filled"} onClick={uploadFiles}>
                    Submit
                </Button>
            </form>
        </main>
    )
}
