import ApplicationExporter from "./application-exporter.js";
import Bill from "../model/bill.js";

class BillsExporter extends ApplicationExporter {
  constructor(filename) {
    super(filename);
    this.header = [
      "id",
      "title",
      "supporter_count",
      "opposer_count",
      "primary_sponsor",
    ];
  }

  async dataArrays() {
    const bills = await Bill.all();
    const promises_array = bills.map((bill) => this.billArray(bill));
    return Promise.all(promises_array).then((bills) => {
      return bills;
    });
  }

  async billArray(bill) {
    const sponsor_name = await bill.primary_sponsor();
    const supports = await bill.supports();
    const oppositions = await bill.oppositions();
    return [
      bill.id,
      bill.title,
      supports.length,
      oppositions.length,
      sponsor_name,
    ];
  }
}

new BillsExporter("bills.csv").execute();
