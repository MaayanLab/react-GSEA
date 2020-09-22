import React from 'react'
import { ReactGSEA, dataFromResults } from '../src/index'

function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function random_choice(L) {
  return L[randint(0, L.length-1)]
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    const entities = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let shuffled_entities = entities
    shuffle(shuffled_entities)
    const input_set = shuffled_entities.slice(0, 10)
    shuffle(shuffled_entities)
    const ranked_entities = shuffled_entities
    console.log({ input_set, ranked_entities })
    return (
      <div>
        <ReactGSEA
          data={dataFromResults({
            input_set,
            ranked_entities,
          })}
        />
      </div>
    )
  }
}
