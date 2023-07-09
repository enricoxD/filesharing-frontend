import {AuthorInformation, FileUploadType, UploadType} from "@/utils/baseTypes";
import Image from "next/image";
import {capitalize} from "@/utils/stringUtils";
import {FileList} from "@/components/fileupload/FileList";
import {mdiDownload} from "@mdi/js";
import {Button} from "@/components/Button";
import {GetUploadFormData} from "@/app/file/[...slug]/page";
import {api} from "@/utils/api";
import {useEffect, useState} from "react";

export const Upload = ({upload, uploadData}: { upload: UploadType, uploadData: GetUploadFormData }) => {
    const { author, title, uploadedAt, files} = upload;
    const uploadDate = `${uploadedAt.dayOfMonth} ${capitalize(uploadedAt.month)} ${uploadedAt.year}`
    const [authorInformation, setAuthorInformation] = useState<AuthorInformation>();

    const requestAuthorInformation = async () => {
        api.post("/file/authorinformation", uploadData)
            .then((response) => {
                setAuthorInformation(response.data.data)
            })
    }

    const requestDownload = async (file: File | FileUploadType) => {
        if (file instanceof File) return
        api.post("/file/requestdownload", {
            fileUpload: file,
            ...uploadData
        }, {
            responseType: "blob"
        }).then((response) => {
            download(response.data, file.name)
        });
    }

    const requestPackageDownload = async () => {
        api.post("/file/requestdownloadall", {
            ...uploadData
        }, {
            responseType: "blob"
        }).then((response) => {
            download(response.data, `${title.toLowerCase().replaceAll(' ', '_')}-bundle.zip`)
        });
    }

    const download = (content: string, fileName: string) => {
        const url = window.URL.createObjectURL(new Blob([content]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(() => {
        requestAuthorInformation()
    }, [requestAuthorInformation])

    return (
        <div className={"upload"}>
            <div className={"head"}>
                <h1 className={"title gradient-text"}>{title}</h1>
                <div className={"post-information"}>
                    <div className={"author"}>
                        <Image className={"avatar"} src={"https://dummyimage.com/128/000/fff.png&text=Yeah"} alt={author} width={64} height={64}/>
                        <div className={"information"}>
                            <p className={"username"}>{authorInformation?.username || 'Unknown'}</p>
                            {authorInformation?.lastSeen && <p className={"last-seen"}>Online</p>}
                        </div>
                    </div>
                    <p className={"upload-date"}>{uploadDate}</p>
                </div>
            </div>
            <FileList
                files={upload.files}
                iconHoverColor={"primary"}
                actionIcon={mdiDownload}
                actionCallback={(file) => requestDownload(file)}
            />
            <div className={"section is-flex h-center-content"}>
                <Button onClick={requestPackageDownload} layout={"filled"} className={"desktop-one-third"}>
                    <p>Download All</p>
                </Button>
            </div>
        </div>
    )
}