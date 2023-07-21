import {UploadWithoutFilesType, UserType} from "@/utils/baseTypes";
import {dateAsString} from "@/utils/stringUtils";

const UploadEntry = ({ upload, type }: { upload: UploadWithoutFilesType, type: 'own' | 'shared' }) => {
  const {id, author, title, uploadedAt, size, filesAmount } = upload

  return (
    <div className={"upload-entry"}>
      <p>{title}</p>
    </div>
  )
}

export const UserUploads = ({uploads, type}: { uploads: UploadWithoutFilesType[], type: 'own' | 'shared' }) => {
  const groupedUploads = uploads.reduce((group: {[key: string]: UploadWithoutFilesType[]}, upload) => {
    if (!group[dateAsString(upload.uploadedAt)]) {
      group[dateAsString(upload.uploadedAt)] = [];
    }
    group[dateAsString(upload.uploadedAt)].push(upload);
    return group;
  }, {});

  return (
    <div className={"user-uploads"}>
      {uploads.map((upload, index) => {
        return <UploadEntry upload={upload} type={type} key={`upload-${index}`}/>
      })}
    </div>
  )
}