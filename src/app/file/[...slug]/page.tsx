"use client"
import {SyntheticEvent, useEffect, useState} from "react";
import {api} from "@/utils/api";
import {UploadType} from "@/utils/baseTypes";
import "@/styles/styles.scss"
import {FilePageContent} from "@/components/files/FilePageContent";

export interface GetUploadFormData {
    author: string;
    id: string;
    password: string;
}

export default function Page({params}: { params: { slug: string[] } }) {
    const [author, id] = params.slug
    const [formData, setFormData] = useState<GetUploadFormData>({
        author: author,
        id: id,
        password: ""
    });
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [requiresPassword, setRequiresPassword] = useState<boolean>(false)
    const [upload, setUpload] = useState<UploadType>()
    const [failedPassword, setFailedPassword] = useState(0)

    const handleResponse = async (data: any) => {
        if (data.data) {
            setUpload(data.data as UploadType)
        } else if (data.message === "Invalid password") {
            setRequiresPassword(true)
            if (formData.password != "") {
                setFailedPassword(failedPassword + 1)
            }
        }
    }

    const fetchUploadData = async () => {
        setIsFetching(true)
        setRequiresPassword(false)
        api.post(`/file/getupload`, formData, {
            withCredentials: true
        }).then((response) => {
            console.log(response.data)
            handleResponse(response.data)
        }).finally(() => {
            setIsFetching(false)
        })
    }

    const handleTextfieldChange = (event: SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        setFormData((prevFormData: GetUploadFormData) => ({...prevFormData, [name]: value}));
    };

    useEffect(() => {
        fetchUploadData()
    }, [])

    return (
        <main className={"container"}>
            <section className="section">
                <FilePageContent
                    upload={upload}
                    isFetching={isFetching}
                    requiresPassword={requiresPassword}
                    failedPasswordTries={failedPassword}
                    onPasswordChange={handleTextfieldChange}
                    onPasswordSubmit={fetchUploadData}
                    formData={formData}
                />
            </section>
        </main>
    )
}