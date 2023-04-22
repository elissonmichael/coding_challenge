import Legislator from "../model/legislator.js";
import fs from "fs";

class LegislatorVoterExporter {
  constructor(filename) {
    this.filename = filename;
    this.header = ["id", "name", "num_supported_bills", "num_opposed_bills"];
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

  async dataArrays() {
    const legislators = await Legislator.all();
    const promises_array = legislators.map((legislator) =>
      this.legislatorArray(legislator)
    );
    return Promise.all(promises_array).then((legislators) => {
      return legislators;
    });
  }

  async legislatorArray(legislator) {
    const supports = await legislator.supports();
    const oppositions = await legislator.oppositions();
    return [
      legislator.id,
      legislator.name,
      supports.length,
      oppositions.length,
    ];
  }
}

new LegislatorVoterExporter("legislators-support-oppose-count.csv").execute();
