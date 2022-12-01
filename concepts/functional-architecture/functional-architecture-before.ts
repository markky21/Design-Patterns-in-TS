import fs from "fs";
import path from "path";
import os from "os";

/**
 * Before
 */

interface IFileSystem {
  getFiles: (directoryName: string) => string[];
  writeAllText: (filePath: string, content: string) => void;
  readAllLines: (filePath: string) => string[];
}

export class FileSystem implements IFileSystem {
  getFiles(directoryName: string): string[] {
    return fs.readdirSync(directoryName);
  }

  writeAllText(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
  }

  readAllLines(filePath: string): string[] {
    const buffer = fs.readFileSync(filePath, "utf-8");
    return buffer.split(os.EOL).filter(Boolean);
  }
}

export class AuditManager {
  constructor(
    private readonly maxEntriesPerFile: number,
    private readonly directoryName: string,
    private readonly fileSystem: IFileSystem
  ) {}

  addRecord(visitorName: string, timeOfVisit: Date): void {
    const filesNames = this.fileSystem
      .getFiles(path.join(__dirname, this.directoryName))
      .sort((a, b) => a.localeCompare(b));

    const newRecord = `${visitorName}; ${timeOfVisit.toTimeString()}`;

    if (filesNames.length === 0) {
      const newFile = this.getPathToFile(filesNames.length);
      this.fileSystem.writeAllText(newFile, newRecord);
      return;
    }
    const lastFilePath = this.getPathToFile(--filesNames.length);
    const lines = this.fileSystem.readAllLines(lastFilePath);

    if (lines.length < this.maxEntriesPerFile) {
      const content = [...lines, newRecord];
      this.fileSystem.writeAllText(lastFilePath, content.join(os.EOL));
    } else {
      const newFile = this.getPathToFile(++filesNames.length);
      this.fileSystem.writeAllText(newFile, newRecord);
    }
  }

  private getPathToFile(index: number): string {
    return path.join(__dirname, this.directoryName, `audit-${index}.txt`);
  }
}
