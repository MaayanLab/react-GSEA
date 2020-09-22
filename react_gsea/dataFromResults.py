def dataFromResult(input_set, ranked_entities):
  data = []
  for i, ranked_entity in enumerate(ranked_entities):
    if ranked_entity in input_set:
      data.append({
        'x': i,
        'y': -(i-(len(ranked_entities)/2)) / (len(ranked_entities)/2),
        'b':  1
      })
    else:
      data.append({
        'x': i,
        'y': -(i-(len(ranked_entities)/2)) / (len(ranked_entities)/2),
        'b':  0
      })
  return sorted(data, key=lambda r: r['x'])
