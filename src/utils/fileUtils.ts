import {FileUploadType} from "@/utils/baseTypes";

export class FileUtils {
  static getName(file: File | FileUploadType): string {
    return file.name.substring(0, file.name.lastIndexOf("."));

  }

  static getFileExtension(file: File | FileUploadType): string {
    return file.name.substring(file.name.lastIndexOf(".") + 1);
  }

  static getFormattedFileSize(file: File | FileUploadType): string {
    return this.getFormattedSize(file.size);
  }

  static getFormattedSize(sizeInBytes: number): string {
    const units = ["bytes", "KB", "MB", "GB"];
    let formattedSize = sizeInBytes;
    let unitIndex = 0;

    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
      formattedSize /= 1024;
      unitIndex++;
    }

    let formattedSizeString: string
    if (units[unitIndex] == "GB" || units[unitIndex] == "MB") {
      formattedSizeString = formattedSize.toFixed(2)
    } else {
      formattedSizeString = formattedSize.toString().split('.')[0]
    }

    return `${formattedSizeString} ${units[unitIndex]}`;
  }

  static getTotalSizeOfFiles(files: File[] | FileUploadType[]): number {
    let sum = 0;
    files.forEach((file) => sum += file.size);
    return sum;
  }
}
