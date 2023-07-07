export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: LocalDateTime;
    lastSeen: LocalDateTime;
    avatar: string | null;
    authToken: string | null;
    emailVerified: boolean;
    apiKet: string | null;
};

export type Upload = {
    author: string;
    title: string;
    uploadedAt: LocalDateTime;
    files: FileUpload[]
}

export type FileUpload = {
    fileName: string;
    hash: string;
}

export type LocalDateTime = {
    time: LocalTime;
    year: number;
    dayOfMonth: number;
    hour: number;
    minute: number;
    second: number;
    dayOfWeek: string;
    dayOfYear: number;
    month: string;
    date: LocalDate;
    nanoseconds: number;
    monthNumber: number;
}

export type LocalTime = {
    hour: number;
    minute: number;
    second: number;
    nanoseconds: number;
}

export type LocalDate = {
    year: number;
    dayOfMonth: number;
    dayOfWeek: string;
    dayOfYear: number;
    month: string;
    monthNumber: number;
}