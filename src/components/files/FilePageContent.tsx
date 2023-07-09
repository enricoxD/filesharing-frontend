import React, {SyntheticEvent} from "react";
import {UploadType} from "@/utils/baseTypes";
import {LoadingSpinner} from "@/components/files/fallback/LoadingSpinner";
import {RequestPassword} from "@/components/files/fallback/RequestPassword";
import {Upload} from "@/components/files/Upload";
import {GetUploadFormData} from "@/app/file/[...slug]/page";

interface FilePageContentProps {
    upload: UploadType | undefined;
    isFetching: boolean;
    requiresPassword: boolean;
    onPasswordChange: (event: SyntheticEvent<HTMLInputElement>) => void;
    onPasswordSubmit: () => void;
    formData: GetUploadFormData;
}

export const FilePageContent = ({upload, isFetching, requiresPassword, onPasswordChange, onPasswordSubmit, formData}: FilePageContentProps) => {
    if (isFetching) return <LoadingSpinner/>
    if (requiresPassword) return <RequestPassword onChange={onPasswordChange} onSubmit={onPasswordSubmit}/>
    return upload ? <Upload upload={upload} uploadData={formData}/> : <p>?</p>
};