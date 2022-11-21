import fs from "fs";
import * as path from "path";
import { csvParse, DSVRowArray } from "d3-dsv";
import { marked } from "marked";

abstract class FileParser<T> {
  protected abstract parseFile(content: string): T;

  public parse(fileName: string): void {
    const content = this.readFile(fileName);
    const fileParsed = this.parseFile(content);
    this.processData(fileParsed);
  }

  private readFile(filePath: string): string {
    return fs.readFileSync(path.join(__dirname, "../assets", filePath), "utf8");
  }

  private processData(fileData: T): void {
    console.dir(fileData);
  }
}

class CsvParser extends FileParser<string> {
  protected parseFile(content: string): string {
    return marked.parse(content);
  }
}

class MarkdownParser extends FileParser<DSVRowArray<string>> {
  protected parseFile(content: string): DSVRowArray<string> {
    return csvParse(content);
  }
}

/*
 * USAGE
 */

const csvParser = new CsvParser();
const markdownParser = new MarkdownParser();

csvParser.parse("addresses.csv");
markdownParser.parse("sample.md");
