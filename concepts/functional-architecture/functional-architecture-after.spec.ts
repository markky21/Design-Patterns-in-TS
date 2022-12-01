import {
  AuditManager,
  FileContent,
  FileSystem,
  FileUpdate, Persister,
} from "./functional-architecture-after";
const os = require("os");
const fs = require("fs");

jest.mock("fs");

describe(AuditManager.name, () => {
  it("A new file is created when there are no history records", () => {
    const timeOfVisit = new Date();
    const visitorName = "a";
    const fileContents: FileContent[] = [];
    const sut = new AuditManager(2);

    const result = sut.addRecord(fileContents, visitorName, timeOfVisit);

    expect(result).toEqual(
      new FileUpdate("audit-0.txt", [
        `${visitorName}; ${timeOfVisit.toTimeString()}`,
      ])
    );
  });

  it("To last file new record is added", () => {
    const timeOfVisit = new Date();
    const visitorName = "a";
    const contentLines = ["1"];
    const fileContents: FileContent[] = [
      new FileContent("audit-0.txt", contentLines),
    ];
    const sut = new AuditManager(2);

    const result = sut.addRecord(fileContents, visitorName, timeOfVisit);

    expect(result).toEqual(
      new FileUpdate("audit-0.txt", [
        ...contentLines,
        `${visitorName}; ${timeOfVisit.toTimeString()}`,
      ])
    );
  });

  it("A new file is created when last file has max records amount", () => {
    const timeOfVisit = new Date();
    const visitorName = "a";
    const contentLines = ["1", "2"];
    const fileContents: FileContent[] = [
      new FileContent("audit-0.txt", contentLines),
    ];
    const sut = new AuditManager(2);

    const result = sut.addRecord(fileContents, visitorName, timeOfVisit);

    expect(result).toEqual(
      new FileUpdate("audit-1.txt", [
        `${visitorName}; ${timeOfVisit.toTimeString()}`,
      ])
    );
  });
});

describe(FileSystem.name, () => {
  it("List files in given directory", () => {
    fs.readdirSync.mockReturnValue(["a"]);

    const result = new FileSystem().getFiles("directory");

    expect(fs.readdirSync).toHaveBeenCalledWith("directory");
    expect(result).toEqual(["a"]);
  });

  it("Write given content to given file", () => {
    fs.writeFileSync.mockReturnValue();

    new FileSystem().writeAllText("filePath", "content");

    expect(fs.writeFileSync).toHaveBeenCalledWith("filePath", "content");
  });

  it("Read file in given path", () => {
    fs.readFileSync.mockReturnValue(`a${os.EOL}b${os.EOL}`);

    const result = new FileSystem().readAllLines("filePath");

    expect(fs.readFileSync).toHaveBeenCalledWith("filePath", "utf-8");
    expect(result).toEqual(["a", "b"]);
  });
});

describe(Persister.name, () => {
  it("List files in given directory", () => {
    fs.readdirSync.mockReturnValue(["a"]);

    const result = new FileSystem().getFiles("directory");

    expect(fs.readdirSync).toHaveBeenCalledWith("directory");
    expect(result).toEqual(["a"]);
  });

  it("Write given content to given file", () => {
    fs.writeFileSync.mockReturnValue();

    new FileSystem().writeAllText("filePath", "content");

    expect(fs.writeFileSync).toHaveBeenCalledWith("filePath", "content");
  });

  it("Read file in given path", () => {
    fs.readFileSync.mockReturnValue(`a${os.EOL}b${os.EOL}`);

    const result = new FileSystem().readAllLines("filePath");

    expect(fs.readFileSync).toHaveBeenCalledWith("filePath", "utf-8");
    expect(result).toEqual(["a", "b"]);
  });
});
