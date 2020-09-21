def dataFromResult(input, output):
  data = []
  for i in range(len(output['ranks'])):
    if output['entities'][i] in input['up']:
      data.append({
        'x': output['ranks'][i],
        'y': -(output['ranks'][i]-(len(output['ranks'])/2)) / (len(output['ranks'])/2),
        'b':  1
      })
    elif output['entities'][i] in input['down']:
      data.append({
        'x': output['ranks'][i],
        'y': -(output['ranks'][i]-(len(output['ranks'])/2)) / (len(output['ranks'])/2),
        'b': -1
      })
    else:
      data.append({
        'x': output['ranks'][i],
        'y': -(output['ranks'][i]-(len(output['ranks'])/2)) / (len(output['ranks'])/2),
        'b':  0
      })
  return sorted(data, key=lambda r: r['x'])
