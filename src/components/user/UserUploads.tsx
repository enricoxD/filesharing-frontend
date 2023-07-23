import {UploadListEntry} from "@/utils/baseTypes";
import {dateAsString, timeAsString} from "@/utils/stringUtils";
import {FileUtils} from "@/utils/fileUtils";
import {BASE_URL} from "@/utils/api";
import Link from "next/link";

const UploadEntry = ({upload, type}: { upload: UploadListEntry, type: 'own' | 'shared' }) => {
  const {id, author, authorName, title, uploadedAt, size, filesAmount} = upload

  return (
    <Link className={"upload-entry"} href={`${BASE_URL}/file/${author}/${id}`}>
      <p className={"title"}>{title}{title}{title}{title}</p>
      <p className={"author"}>{authorName}</p>
      <p className={"time"}>{timeAsString(uploadedAt)}</p>
      <p className={"file-amount"}>{filesAmount}</p>
      <p className={"file-size"}>{FileUtils.getFormattedSize(size)}</p>
    </Link>
  )
}

const UploadGroup = ({dateString, type, uploads}: {
  dateString: string,
  type: 'own' | 'shared',
  uploads: UploadListEntry[]
}) => {
  return (
    <div className={"upload-group"}>
      <p className={"date"}>{dateString}</p>
      {uploads.map((upload, index) => {
        return <UploadEntry upload={upload} type={type} key={`upload-${dateString}-${index}`}/>
      })}
    </div>
  )
}

export const UserUploads = ({uploads, type}: { uploads: UploadListEntry[], type: 'own' | 'shared' }) => {
  const groupedUploads = uploads.reduce((group: { [key: string]: UploadListEntry[] }, upload) => {
    const date = upload.uploadedAt.date
    if (!group[dateAsString(date)]) {
      group[dateAsString(date)] = [];
    }
    group[dateAsString(date)].push(upload);
    return group;
  }, {});

  return (
    <div className={"user-uploads"}>
      {uploads.length == 0 ?
        <div className={"no-uploads"}>
          <p>No Uploads founds</p>
        </div>
        :
        <>
          <div className={"upload-group dummy"}>
            <div className={"upload-entry"}>
              <p className={"title"}>Title</p>
              <p className={"author"}>Author</p>
              <p className={"time"}>Time</p>
              <p className={"file-amount"}>Files</p>
              <p className={"file-size"}>Size</p>
            </div>
          </div>
          {Object.keys(groupedUploads).map((key) => {
            const uploads = groupedUploads[key]
            return <UploadGroup dateString={key} type={type} uploads={uploads} key={key}/>
          })}
        </>
      }
    </div>
  )
}