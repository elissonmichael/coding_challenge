import ApplicationModel from "./application_model.js";
import VoteResult from "./vote_result.js";

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

  async results() {
    return await VoteResult.filter_by('vote_id', this.id);
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
