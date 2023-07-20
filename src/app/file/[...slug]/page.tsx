"use client"
import {SyntheticEvent, useEffect, useState} from "react";
import {api} from "@/utils/api";
import {UploadType} from "@/utils/baseTypes";
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

  const fetchUploadData = async () => {
    setIsFetching(true)
    setRequiresPassword(false)
    api.post(`/file/getupload`, formData)
      .then((response) => {
        setUpload(response.data.data as UploadType)
      })
      .catch((error) => {
        if (error.response.data.exception === "Invalid password") {
          setRequiresPassword(true)
          if (formData.password != "") {
            setFailedPassword(failedPassword + 1)
          }
        }
      })
      .finally(() => {
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