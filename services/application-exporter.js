import fs from "fs";

export default class ApplicationExporter {
  constructor(filename) {
    this.filename = filename;
  }

  execute() {
    this.convertToCSV().then((csv_string) =>
      fs.writeFile(this.filename, csv_string, (error) => {
        if (error) console.error(error);
        else console.log(`${this.filename} exported successfully`);
      })
    );
  }

  async convertToCSV() {
    const arrays = await this.dataArrays();
    return [this.header]
      .concat(arrays)
      .map((arr) => arr.join(","))
      .join("\r\n");
  }
}
