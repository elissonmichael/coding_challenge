import ApplicationModel from "./application_model.js";
import Legislator from "./legislator.js";
import Vote from "./vote.js";

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

  async vote() {
    const votes = await Vote.all();
    return votes.find((vote) => vote.bill_id === this.id);
  }

  async supports() {
    return this.vote().then((vote) => vote.supports());
  }

  async oppositions() {
    return this.vote().then((vote) => vote.oppositions());
  }

  async primary_sponsor() {
    const legislator = await Legislator.find(this.sponsor_id);
    return legislator?.name || "Unknown";
  }
}
