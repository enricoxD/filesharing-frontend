import {AuthorInformation, FileUploadType, UploadType} from "@/utils/baseTypes";
import Image from "next/image";
import {capitalize, dateAsString} from "@/utils/stringUtils";
import {FileList} from "@/components/fileupload/FileList";
import {mdiDownload} from "@mdi/js";
import {Button} from "@/components/Button";
import {GetUploadFormData} from "@/app/file/[...slug]/page";
import {api} from "@/utils/api";
import {useEffect, useState} from "react";
import {useCurrentUser} from "@/hooks/getCurrentUser";

export const Upload = ({upload, uploadData}: { upload: UploadType, uploadData: GetUploadFormData }) => {
  const {author, title, uploadedAt, files} = upload
  const [authorInformation, setAuthorInformation] = useState<AuthorInformation>()
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [progress, setProgress] = useState(0);
  const user = useCurrentUser()

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
    })
  }

  const requestPackageDownload = async () => {
    setDownloadStarted(true)
    api.post("/file/requestdownloadall", {
      ...uploadData
    }, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        setProgress((progressEvent.progress || 0) * 100);
      }
    }).then((response) => {
      download(response.data, `${title.toLowerCase().replaceAll(' ', '_')}-bundle.zip`)
    })
  }

  const requestDeletion = async () => {
    api.post("/file/delete", {
      ...uploadData
    }).then((response) => {
      process.env.BASE_URL && window.location.replace(process.env.BASE_URL)
    })
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
    document.title = `${upload.title} | Filesharing`
    requestAuthorInformation()
  }, [])

  return (
    <div className={"upload"}>
      <div className={"head"}>
        <h1 className={"title gradient-text"}>{title}</h1>
        <div className={"post-information"}>
          <div className={"author"}>
            <Image className={"avatar"} src={`https://api.filesharing.enricoe.de/user/avatar/${author}`} alt={author}
                   width={64} height={64}/>
            <div className={"information"}>
              <p className={"username"}>{authorInformation?.name || 'Unknown'}</p>
              {authorInformation?.lastSeen && <p className={"last-seen"}>Online</p>}
            </div>
          </div>
          <p className={"upload-date"}>{dateAsString(uploadedAt.date)}</p>
        </div>
      </div>
      <FileList
        files={upload.files}
        iconHoverColor={"primary"}
        actionIcon={mdiDownload}
        actionCallback={(file) => requestDownload(file)}
      />
      <div className={"section is-flex h-center-content"}>
        {downloadStarted ?
          <div className={"download-progress"}>
            <p>{progress.toString().split(".")[0]}% Finished</p>
            <progress max={100} value={progress}>{progress}%</progress>
          </div>
          :
          <Button onClick={requestPackageDownload} layout={"gradient"} className={"desktop-one-third"} disabled={downloadStarted}>
            <p>Download All</p>
          </Button>
        }
      </div>

      { user && (user.id == author || user.role == "ADMIN") &&
          <div className={"is-flex-column h-center-content"}>
            <p>Content Moderation</p>
            <Button onClick={requestDeletion} layout={"filled-red"} className={"desktop-one-third"}
                    disabled={downloadStarted}>
              <p>Delete Upload</p>
            </Button>
          </div>
      }
    </div>
  )
}