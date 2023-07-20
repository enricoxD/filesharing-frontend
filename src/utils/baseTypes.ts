export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: LocalDateTime;
  lastSeen: LocalDateTime;
  authToken: string | null;
  emailVerified: boolean;
  apiKey: string | null;
  role: string;
};

export type AuthorInformation = {
  name: string;
  lastSeen: LocalDateTime;
}

export type UploadType = {
  author: string;
  title: string;
  uploadedAt: LocalDateTime;
  files: FileUploadType[]
}

export type FileUploadType = {
  name: string;
  hash: string;
  size: number;
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