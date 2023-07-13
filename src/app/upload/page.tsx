"use client"
import {SyntheticEvent, useState} from "react";
import {Button} from "@/components/Button";
import DragAndDropArea from "@/components/fileupload/DragAndDropArea";
import Textfield from "@/components/Textfield";
import {mdiDelete, mdiLock, mdiTextRecognition} from "@mdi/js";
import {apiFormData} from "@/utils/api";
import {FileList} from "@/components/fileupload/FileList";
import {FileUploadType} from "@/utils/baseTypes";

export interface UploadData {
    title: string,
    password: string,
    files: File[],
    deleteIn: string
}

enum DeleteIn {
    ONE_DAY = "1 Day",
    ONE_WEEK = "1 Week",
    TWO_WEEKS = "2 Weeks",
    ONE_MONTH = "1 Month",
    THREE_MONTH = "3 Months",
}

export default function File() {
    const [uploadData, setUploadData] = useState<UploadData>({
        title: "",
        password: "",
        deleteIn: DeleteIn.ONE_WEEK,
        files: []
    });
    const [showException, setShowException] = useState<boolean>(false);
    const [exception, setException] = useState<String | false>(false);
    const [uploadStarted, setUploadStarted] = useState(false)
    const [progress, setProgress] = useState(0);

    const uploadFiles = async () => {
        setUploadStarted(true)
        const formData = new FormData();
        formData.append("title", uploadData.title)
        formData.append("password", uploadData.password)
        formData.append("deleteIn", uploadData.deleteIn)
        uploadData.files.forEach((file, index) => {
            formData.append(`file`, file);
        });

        try {
            const response = await apiFormData.post('/file/upload', formData, {
                withCredentials: true,
                onUploadProgress: (progressEvent) => {
                    setProgress((progressEvent.progress || 0) * 100);
                },
            });
            if (response.data.data) {
                process.env.BASE_URL && window.location.replace(`${process.env.BASE_URL}/file/${response.data.message}`);
                return
            }

            if (response.data.message) {
                setExceptionMessage(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const setExceptionMessage = (message: String) => {
        setException(message);
        setShowException(true);
        setTimeout(() => {
            setShowException(false);

            setTimeout(() => {
                setException(false);
            }, 1000)
        }, 7500)
    }

    const setFiles = (files: File[]) => {
        setUploadData((prevData: UploadData) => ({
            ...prevData,
            files: files
        }))
    }

    const removeFile = (file: File | FileUploadType) => {
        setFiles(uploadData.files.filter((aFile) => aFile != file))
    }

    const setDeleteIn = (deleteIn: string) => {
        setUploadData((prevData: UploadData) => ({
            ...prevData,
            deleteIn: deleteIn
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
                <FileList files={uploadData.files} actionIcon={mdiDelete} iconHoverColor={'red'} actionCallback={(file) => removeFile(file)} collapse />
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
                {/* TODO <div className={"delete-in-selection"}>
                    <p>Delete In</p>
                    <select>
                        {Object.entries(DeleteIn).map(([key, value]) => {
                            return <option value={key} key={key} onClick={() => setDeleteIn(key)}>
                                {value}
                            </option>
                        })}
                    </select>
                </div>*/}
            </form>
            {uploadStarted &&
                <div className={"upload-progress"}>
                    <p>{progress.toString().split(".")[0]}% Finished</p>
                    <progress max={100} value={progress}>{progress}%</progress>
                </div>
            }
            <div className={"section submit-button"}>
                {<p className={`exception ${showException ? "shown" : "hidden"}`}>{exception}</p>}
                <Button layout={"gradient"} disabled={uploadData.files.length == 0 || uploadStarted} onClick={uploadFiles}>
                    <p>{uploadStarted ? "Upload started" : "Upload"}</p>
                </Button>
            </div>
        </main>
    )
}
