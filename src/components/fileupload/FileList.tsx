import React, {useState} from "react";
import {FileUtils} from "@/utils/FileUtils";
import Icon from "@mdi/react";
import {mdiChevronDown, mdiClose, mdiDelete} from "@mdi/js";

type FileListProps = {
    files: File[];
    onFileChange: (files: File[]) => void
};

type FileEntryProps = {
    file: File;
    index: number;
};

const FileList: React.FC<FileListProps> = (props) => {
    const files = props.files;
    const onFileChange = props.onFileChange;
    const [showFiles, setShowFiles] = useState(true);

    const removeFile = (file: File) => {
        if (files.length < 2) {
            setShowFiles(false);
        }
        onFileChange(files.filter((aFile) => aFile != file));
    };

    const toggleFileOverview = () => {
        if (files.length == 0 && !showFiles) return;
        setShowFiles(!showFiles);
    };

    const totalFileSize = (files: File[]): number => {
        return files.reduce(
            (totalSize, currentFile) => totalSize + currentFile.size,
            0
        );
    };

    const FileEntry = (props: FileEntryProps) => {
        const index = props.index + 1,
            file = props.file;
        return (
            <tr className={"entry"}>
                <th className="index">{index}.</th>
                <td className="filename">{FileUtils.getName(file)}</td>
                <td className="filetype">{FileUtils.getFileExtension(file)}</td>
                <td className="filesize">{FileUtils.getFormattedFileSize(file)}</td>
                <td className="action" onClick={() => {removeFile(file)}}>
                    <Icon path={mdiDelete} className={"delete-icon"}/>
                </td>
            </tr>
        );
    };


    return (
        <div className={"file-list"}>
            <section className={"head"} onClick={() => setShowFiles(!showFiles)}>
                <p className="title">Selected Files: {files.length}</p>
                <div className={`collapse-button ${showFiles ? "open" : "closed"}`}>
                    <Icon path={mdiChevronDown}/>
                </div>
            </section>
            <section className={`content ${showFiles && files.length > 0 ? "open" : "closed"}`}>
                <table className={`table is-striped is-hoverable`}>
                    <thead>
                    <tr>
                        <th><abbr title="Position">Pos</abbr></th>
                        <th>File</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {files.map((file, index) => {
                        return (
                            <FileEntry key={`file-${index}`} file={file} index={index}/>
                        );
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>{files.length}</th>
                        <th/>
                        <th/>
                        <th>{FileUtils.getFormattedSize(totalFileSize(files))}</th>
                        <th/>
                    </tr>
                    </tfoot>
                </table>
            </section>
        </div>
    )
};

export default FileList;
