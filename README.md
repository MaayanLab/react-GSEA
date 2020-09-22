# react-GSEA

A react-wrapped d3 visualization for rendering GSEA running sum visualizations in browser.

![Screenshot](./screenshot.png)

## Installation

### Python
```bash
pip install react_gsea@git+git://github.com/maayanlab/react-GSEA.git
```

### Node
```
npm i --save maayanlab/react-gsea
```

#### Usage
```jsx
import { ReactGSEA, dataFromResults } from 'react-gsea'

const your_viz = (
  <ReactGSEA
    data={
      dataFromResults({
        input_set: [
          'STAT3', 'CD58', // ...
        ],
        ranked_entities: [
          'STAT3', 'STAT2', 'CD58', 'STAT1', // ...
        ]
      })
    }
  />
)
```

## Development
```
# install npm dependencies
npm install

# start development server
npm run dev
```
