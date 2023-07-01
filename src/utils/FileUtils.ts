export class FileUtils {
  static getName(file: File): string {
    return file.name.substring(0, file.name.lastIndexOf("."));
  }

  static getFileExtension(file: File): string {
    return file.name.substring(file.name.lastIndexOf(".") + 1);
  }

  static getFormattedFileSize(file: File): string {
    return this.getFormattedSize(file.size);
  }

  static getFormattedSize(sizeInBytes: number): string {
    // Convert the file size to GB or MB, depending on the size
    if (sizeInBytes >= 1000 * 1000) {
      // Size is at least 1 GB
      return ((sizeInBytes / 1000) * 1000).toFixed(2) + " GB";
    } else if (sizeInBytes >= 1000) {
      // Size is at least 1 MB
      return (sizeInBytes / 1000).toFixed(2) + " MB";
    } else {
      // Size is less than 1 MB
      return sizeInBytes + " bytes";
    }
  }
}
