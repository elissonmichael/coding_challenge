import neatCsv from "neat-csv";
import fs from "fs";

export default class ApplicationModel {
  static async read(parser = neatCsv) {
    const csv_file = fs.readFileSync(`csv/${this.filename}.csv`);
    return await parser(csv_file);
  }

  static async find(id) {
    const resources = await this.all();
    return resources.find((resource) => resource.id === id);
  }
}
