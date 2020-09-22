/**
 * Helper for creating ReactGSEA data from enrichment input/output
 */
export function dataFromResults({ input_set, ranked_entities }) {
  var data = new Array();

  for (var i = 0; i < ranked_entities.length; i++) {
    if (input_set.includes(ranked_entities[i])) {

      data.push({
        "x": i,
        "y": -(i - (ranked_entities.length / 2)) / (ranked_entities.length / 2),
        "b": 1
      });
    } else {
      data.push({
        "x": i,
        "y": -(i - (ranked_entities.length / 2)) / (ranked_entities.length / 2),
        "b": 0
      });
    }
  }

  data.sort(function (a, b) {
    return b.x - a.x;
  });

  return data
}
