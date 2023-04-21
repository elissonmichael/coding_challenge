import VoteResult from "../model/vote_result.js";
import fs from "fs";

class BillsExporter {
  constructor(filename) {
    this.filename = filename;
    this.header = ["id", "voteType"];
  }

  execute() {
    this.convertToCSV().then(csv_string => 
      fs.writeFile(this.filename, csv_string, (error) => {
        if (error) console.error(error);
        else console.log(`${this.filename} exported successfully`);
      })
    )
  }

  async convertToCSV() {
    return this.dataArrays().then(arrays => 
      [this.header].concat(arrays).map(arr => arr.join(',')).join('\r\n')
    );
  }

  // This was just to test, will be changed to a Bill object
  async dataArrays() {
    return VoteResult.all().then((results) =>
      results.map((result) => [result.id, result.vote_type])
    );
  }
}

new BillsExporter("bills.csv").execute();
