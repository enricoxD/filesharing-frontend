import React, {SyntheticEvent} from "react";
import {UploadType} from "@/utils/baseTypes";
import {Loading} from "@/components/files/fallback/Loading";
import {RequestPassword} from "@/components/files/fallback/RequestPassword";
import {Upload} from "@/components/files/Upload";
import {GetUploadFormData} from "@/app/file/[...slug]/page";

interface FilePageContentProps {
    upload: UploadType | undefined;
    isFetching: boolean;
    requiresPassword: boolean;
    failedPasswordTries: number
    onPasswordChange: (event: SyntheticEvent<HTMLInputElement>) => void;
    onPasswordSubmit: () => void;
    formData: GetUploadFormData;
}

export const FilePageContent = ({upload, isFetching, requiresPassword, failedPasswordTries, onPasswordChange, onPasswordSubmit, formData}: FilePageContentProps) => {
    if (isFetching) return <Loading/>
    if (requiresPassword) return <RequestPassword failedTries={failedPasswordTries} onChange={onPasswordChange} onSubmit={onPasswordSubmit}/>
    return upload ? <Upload upload={upload} uploadData={formData}/> : <p>?</p>
};