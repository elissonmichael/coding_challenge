import ApplicationModel from "./application_model.js";

export default class VoteResult extends ApplicationModel {
  static filename = "vote_results";

  static all() {
    return this.read().then((array) =>
      array.map(
        (row) => new this(row.id, row.legislator_id, row.vote_id, row.vote_type)
      )
    );
  }

  constructor(id, legislator_id, vote_id, vote_type) {
    super();
    this.id = id;
    this.legislator_id = legislator_id;
    this.vote_id = vote_id;
    this.vote_type = vote_type;
  }

  support() {
    return this.vote_type === "1";
  }

  opposed() {
    return this.vote_type === "2";
  }
}
