import ApplicationModel from "./application_model.js";
import Legislator from "./legislator.js";

export default class Bill extends ApplicationModel {
  static filename = "bills";

  static async all() {
    return this.read().then((array) =>
      array.map((row) => new this(row.id, row.title, row.sponsor_id))
    );
  }

  constructor(id, title, sponsor_id) {
    super();
    this.id = id;
    this.title = title;
    this.sponsor_id = sponsor_id;
  }

  async primary_sponsor() {
    const legislator = await Legislator.find(this.sponsor_id);
    return legislator?.name || "Unknown";
  }
}
