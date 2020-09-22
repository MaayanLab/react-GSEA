import sys; sys.path.insert(0, '..') # not necessary when pip installed
import os
import json
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
from react_gsea import ReactGSEA, dataFromResult

app = dash.Dash(__name__)

app.layout = html.Div(className='row', children=[
  html.Div(
    className='col-sm-6',
    children=[
      ReactGSEA(
        data=dataFromResult(
          input_set=[
            'STAT3', 'CD58'
          ],
          ranked_entities=[
            'STAT3', 'STAT2', 'CD58', 'STAT1'
          ]
        ),
      ),
    ],
  ),
])

app.run_server(
  host=os.environ.get('HOST', '0.0.0.0'),
  port=json.loads(os.environ.get('PORT', '8050')),
  debug=json.loads(os.environ.get('DEBUG', 'true')),
)
