import Bill from "../model/bill.js";
import fs from "fs";

class BillsExporter {
  constructor(filename) {
    this.filename = filename;
    this.header = ["id", "title", "primary_sponsor"];
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
    const arrays = await this.dataArrays();
    return [this.header].concat(arrays).map(arr => arr.join(',')).join('\r\n');
  }

  async dataArrays() {
    const bills = await Bill.all();
    const promises_array = bills.map((bill) => this.billArray(bill));
    return Promise.all(promises_array).then(bills => { return bills });
  }

  async billArray(bill) {
    const sponsor_name = await bill.primary_sponsor();
    return [bill.id, bill.title, sponsor_name];
  }
}

new BillsExporter("bills.csv").execute();
