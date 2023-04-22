import ApplicationModel from "./application_model.js";

export default class Legislator extends ApplicationModel {
  static filename = "legislators";

  static async all() {
    return this.read().then((array) =>
      array.map((row) => new this(row.id, row.name))
    );
  }

  constructor(id, name) {
    super();
    this.id = id;
    this.name = name;
  }
}
