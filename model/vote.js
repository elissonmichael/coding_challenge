import ApplicationModel from "./application_model.js";

export default class Vote extends ApplicationModel {
  static filename = "votes";

  static async all() {
    return this.read().then((array) =>
      array.map((row) => new this(row.id, row.bill_id))
    );
  }

  constructor(id, bill_id) {
    super();
    this.id = id;
    this.bill_id = bill_id;
  }
}
