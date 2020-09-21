/**
 * Helper for creating ReactGSEA data from enrichment input/output
 */
export function dataFromResults({ input, output }/*: {
  input: {
    up: string[],
    down: string[],
  }
  output: {
    entities: string[],
    ranks: number[],
  },
}*/) {
  const { up, down } = input
  const { entities, ranks } = output

  var data = new Array();

  for (var i = 0; i < ranks.length; i++) {
    if (up.includes(entities[i])) {

      data.push({
        "x": ranks[i],
        "y": -(ranks[i] - (ranks.length / 2)) / (ranks.length / 2),
        "b": 1
      });
      console.log("1");
    }
    else if (down.includes(entities[i])) {
      data.push({
        "x": ranks[i],
        "y": -(ranks[i] - (ranks.length / 2)) / (ranks.length / 2),
        "b": -1
      });
    }
    else {
      data.push({
        "x": ranks[i],
        "y": -(ranks[i] - (ranks.length / 2)) / (ranks.length / 2),
        "b": 0
      });
    }
  }

  data.sort(function (a, b) {
    return b.x - a.x;
  });

  data["columns"] = ["x", "y", "b"]

  return data
}
