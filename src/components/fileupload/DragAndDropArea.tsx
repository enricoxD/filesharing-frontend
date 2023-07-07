import React, { useRef } from "react";
import Icon from "@mdi/react";
import {mdiFolderZip} from "@mdi/js";

type DragAndDropProps = {
  files: File[];
  onFileChange: (files: File[]) => void,
  allowMultiple: boolean;
  backgroundIcon?: string;
};

const DragAndDropArea: React.FC<DragAndDropProps> = (props) => {
  const files = props.files;
  const onFileChange = props.onFileChange;
  const inputRef = useRef<HTMLInputElement>(null);
  const openFileBrowser = () => {
    inputRef.current?.click();
  };

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    let allFiles = [...files, ...newFiles];
    allFiles = allFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex((t) => t.name === file.name && t.size === file.size)
    );

    onFileChange(allFiles);
  };

  return (
    <div
      className="drag-and-drop-area"
      onClick={openFileBrowser}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
      }}
    >
      <p className="title gradient-text">Drag and drop a file here</p>
      <p className="subtitle">or click the area to select a file</p>
      <p className="max-upload">You may upload up to 3 GB</p>
      <Icon path={mdiFolderZip} className={"icon"} />

      <input
        ref={inputRef}
        className="is-hidden"
        type="file"
        multiple={props.allowMultiple}
        onChange={(e) => {
          const files = e.target.files;
          if (files) onFileChange(Array.from(files));
        }}
      />
    </div>
  );
};

export default DragAndDropArea;
