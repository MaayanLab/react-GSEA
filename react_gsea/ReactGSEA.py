# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ReactGSEA(Component):
    """A ReactGSEA component.
A react-wrapped d3 visualization for rendering GSEA running sum visualizations in browser.

Keyword arguments:
- data (dict; required): (data): { "x": number, "y": number, "b": number }[]. data has the following type: list of dicts containing keys 'x', 'y', 'b'.
Those keys have the following types:
  - x (number; required)
  - y (number; required)
  - b (number; required)"""
    @_explicitize_args
    def __init__(self, data=Component.REQUIRED, svgRef=Component.UNDEFINED, **kwargs):
        self._prop_names = ['data']
        self._type = 'ReactGSEA'
        self._namespace = 'react_gsea'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['data']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(ReactGSEA, self).__init__(**args)
