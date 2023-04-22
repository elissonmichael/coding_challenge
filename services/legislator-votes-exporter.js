import ApplicationExporter from "./application-exporter.js";
import Legislator from "../model/legislator.js";

class LegislatorVoterExporter extends ApplicationExporter {
  constructor(filename) {
    super(filename)
    this.header = ["id", "name", "num_supported_bills", "num_opposed_bills"];
  }

  async dataArrays() {
    const legislators = await Legislator.all();
    const promises_array = legislators.map((legislator) =>
      this.legislatorArray(legislator)
    );
    return Promise.all(promises_array).then((legislators) => {
      return legislators;
    });
  }

  async legislatorArray(legislator) {
    const supports = await legislator.supports();
    const oppositions = await legislator.oppositions();
    return [
      legislator.id,
      legislator.name,
      supports.length,
      oppositions.length,
    ];
  }
}

new LegislatorVoterExporter("legislators-support-oppose-count.csv").execute();
