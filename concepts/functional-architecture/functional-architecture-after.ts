const path = require("path");
const fs = require("fs");
const os = require("os");

/**
 * After
 */

export class FileSystem {
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

export class FileUpdate {
  constructor(
    public readonly name: string,
    public readonly contentLines: string[]
  ) {}
}

export class FileContent {
  constructor(
    public readonly name: string,
    public readonly contentLines: string[]
  ) {}
}

export class AuditManager {
  constructor(private readonly maxEntriesPerFile: number) {}

  addRecord(
    files: FileContent[],
    visitorName: string,
    timeOfVisit: Date
  ): FileUpdate {
    const filesSorted = files.sort((a, b) => a.name.localeCompare(b.name));
    const newRecord = `${visitorName}; ${timeOfVisit.toTimeString()}`;

    if (filesSorted.length === 0) {
      return new FileUpdate(this.getFileName(0), [newRecord]);
    }
    const lastFileContent = filesSorted[filesSorted.length - 1];
    const lines = lastFileContent.contentLines;

    if (lines.length < this.maxEntriesPerFile) {
      const content = [...lines, newRecord];
      return new FileUpdate(lastFileContent.name, content);
    } else {
      return new FileUpdate(this.getFileName(filesSorted.length), [newRecord]);
    }
  }

  private getFileName(index: number): string {
    return `audit-${index}.txt`;
  }
}

export class Persister {
  constructor(private readonly fileSystem: FileSystem) {}

  readDirectory(directoryName: string): FileContent[] {
    return this.fileSystem
      .getFiles(path.join(__dirname, directoryName))
      .map(
        (fileName) =>
          new FileContent(
            fileName,
            this.fileSystem.readAllLines(
              path.join(__dirname, directoryName, fileName)
            )
          )
      );
  }

  applyUpdate(directoryName: string, fileUpdate: FileUpdate): void {
    this.fileSystem.writeAllText(
      path.join(__dirname, directoryName, fileUpdate.name),
      fileUpdate.contentLines.join(os.EOL)
    );
  }
}

export class ApplicationService {
  constructor(
    private readonly directoryName: string,
    private readonly auditManager: AuditManager,
    private readonly persister: Persister
  ) {}

  addRecord(visitorName: string, timeOfVisit: Date): void {
    const files = this.persister.readDirectory(this.directoryName);
    const update = this.auditManager.addRecord(files, visitorName, timeOfVisit);
    this.persister.applyUpdate(this.directoryName, update);
  }
}
