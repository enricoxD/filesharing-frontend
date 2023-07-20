import {FileUploadType} from "@/utils/baseTypes";
import Icon from "@mdi/react";
import {mdiChevronDown} from "@mdi/js";
import React, {useEffect, useState} from "react";
import {FileUtils} from "@/utils/fileUtils";

interface FileListProps {
  files: FileUploadType[] | File[];
  actionIcon: string;
  iconHoverColor: 'red' | 'primary';
  actionCallback: (file: FileUploadType | File) => void;
  collapse?: boolean;
}

export const FileList = ({
  files,
  actionIcon,
  iconHoverColor,
  actionCallback,
  collapse,
}: FileListProps) => {
  const [showFiles, setShowFiles] = useState(false);

  const invokeAction = (file: FileUploadType | File) => {
    return () => actionCallback(file)
  }

  const toggleCollapse = () => {
    if (!collapse) return;
    if (files.length == 0) {
      setShowFiles(false)
      return
    }
    setShowFiles(!showFiles)
  }

  useEffect(() => {
    setShowFiles(files.length != 0)
  }, [files])

  const FileEntry = ({file, index}: { file: File | FileUploadType, index: number }) => {
    return (
      <div className={`entry ${index % 2 === 0 ? 'even' : 'odd'}`}>
        <p className="index">{index + 1}.</p>
        <p className="filename">{FileUtils.getName(file)}<span>.{FileUtils.getFileExtension(file)}</span></p>
        <p className="filesize">{FileUtils.getFormattedFileSize(file)}</p>
        <p className="action" onClick={invokeAction(file)}>
          <Icon path={actionIcon} className={`action-icon ${iconHoverColor}`}/>
        </p>
      </div>
    );
  };

  return (
    <div className={"file-list"}>
      <div className={"head"} onClick={toggleCollapse}>
        <p>Total Files: {files.length}</p>
        {collapse &&
            <div className={`collapse-button ${showFiles ? "open" : "closed"}`}>
                <Icon path={mdiChevronDown}/>
            </div>
        }
      </div>
      <div className={`list ${showFiles ? "open" : "closed"}`}>
        {files.map((file, index) => {
          return <FileEntry file={file} index={index} key={index}/>
        })}
      </div>
      <div className={"footer"}>
        <p>Total Size:</p>
        <p>{FileUtils.getFormattedSize(FileUtils.getTotalSizeOfFiles(files))}</p>
      </div>
    </div>
  )
}