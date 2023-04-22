import ApplicationModel from "./application_model.js";
import VoteResult from "./vote_result.js";

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

  async results() {
    const all_results = await VoteResult.all();
    return all_results.filter((result) => result.legislator_id === this.id);
  }

  async supports() {
    const results = await this.results();
    return results.filter((result) => result.support());
  }

  async oppositions() {
    const results = await this.results();
    return results.filter((result) => result.opposed());
  }
}
