import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as d3 from 'd3'
import { scaleLinear } from 'd3-scale'

/*
interface ReactGSEADatum {
  x: number
  y: number
  b: number
}

export interface ReactGSEAProps {
  data: Array<ReactGSEADatum>
  svgRef?: (ref: SVGElement) => void
}

export interface ReactGSEAState {
  ref?: SVGElement
}
*/

/**
 * A react-wrapped d3 visualization for rendering GSEA running sum visualizations in browser.
 */
export class ReactGSEA extends React.Component/*<ReactGSEAProps, ReactGSEAState>*/ {
  // public static propTypes = {};

  constructor(props/*: ReactGSEAProps*/) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps = (props/*: ReactGSEAProps*/) => {
    this.plotReactGSEA()
  }

  updateRef = (ref) => {
    if (this.state.ref === undefined && ref !== undefined) {
      // React has initialized and we have a component ref
      this.setState({ ref }, () => {
        if (this.props.svgRef !== undefined) {
          this.props.svgRef(ref)
        }
        this.plotReactGSEA()
      })
    }
  }

  plotReactGSEA = () => {
    // Prepare variables
    const ref = this.state.ref
    const data = this.props.data

    // Can't do anything without the ref
    if (ref === undefined) {
      return
    }

    // Remove old content
    while (ref.firstChild) ref.removeChild(ref.firstChild)

    // Handle d3
    let running = [];

    // set the dimensions and margins of the graph
    let margin = { top: 5, right: 20, bottom: 30, left: 70 },
      width = 500 - margin.left - margin.right,
      height = 130 - margin.top - margin.bottom;

    // set the ranges
    let x = scaleLinear().range([0, width]);
    let y = scaleLinear().range([200, 0]);

    // define the line
    let valueline = d3.line/*<ReactGSEADatum>*/()
      .x(function (d/*: ReactGSEADatum*/) { return x(d.x); })
      .y(function (d/*: ReactGSEADatum*/) { return y(d.y); });

    // running sum vizualization
    let svg2 = d3.select(ref).append("g").attr("id", "ReactGSEAs")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 200 + margin.bottom)
      .attr("transform",
        "translate(" + margin.left + "," + 20 + ")");

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    let svg = d3.select(ref).append("g")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform",
        "translate(" + margin.left + "," + (200 + 2 * margin.top + margin.bottom) + ")");

    running = new Array(data.length + 1);
    running[0] = 0;

    // format the data
    let counter = 1;
    for (const d of data) {
      d.x = +d.x;
      d.y = +d.y;
      d.b = +d.b;

      if (d.b == 1) {
        running[counter] = running[counter - 1] + 1;
      } else {
        running[counter] = running[counter - 1];
      }

      counter++;
    }

    let t1 = running[running.length - 1]

    let running_xy = [];

    let miny = 0;
    let maxy = 0;

    for (let i = 0; i < running.length; i++) {
      running[i] = (running[i] - (t1 / running.length)) / (t1) - i / (running.length);

      if (running[i] < miny) {
        miny = running[i];
      }

      if (running[i] > maxy) {
        maxy = running[i];
      }

      running_xy.push({ x: i, y: +running[i] });
    }

    let ReactGSEA = d3.line/*<ReactGSEADatum>*/()
      .x(function (d/*: ReactGSEADatum*/) { return x(d.x); })
      .y(function (d/*: ReactGSEADatum*/) { return y(d.y); });

    // Scale the range of the data
    x.domain([d3.min(data, function (d) { return d.x; }), d3.max(data, function (d) { return d.x; })]);
    //y.domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })]);
    y.domain([miny, maxy]);

    console.log(maxy, miny);

    svg2.append("line")          // attach a line
      .style("stroke", "black")  // colour the line
      .style("stroke-width", "2")
      .attr("x1", -1)     // x position of the first end of the line
      .attr("y1", 200 * (maxy / (maxy - miny)))      // y position of the first end of the line
      .attr("x2", width + 1)     // x position of the second end of the line
      .attr("y2", 200 * (maxy / (maxy - miny)));

    let relZero = height * d3.max(data, function (d) { return d.y; }) / (d3.max(data, function (d) { return d.y; }) - d3.min(data, function (d) { return d.y; }))

    svg.append("line")          // attach a line
      .style("stroke", "black")  // colour the line
      .style("stroke-width", "2")
      .attr("x1", -1)     // x position of the first end of the line
      .attr("y1", relZero)      // y position of the first end of the line
      .attr("x2", width + 1)     // x position of the second end of the line
      .attr("y2", relZero);

    let path2 = svg2.append("path")
      .data([running_xy])
      .attr("class", "running_line")
      .attr("d", ReactGSEA);

    // running sum plot stuff
    svg2.append("g")
      .attr("transform", "translate(-5,0)")
      .style("font", "16px arial")
      .call(d3.axisLeft(y).ticks(6))
      .style("stroke-width", "2");

    svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", -75 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Enrichment Score");

    y = d3.scaleLinear().range([height, 0]);
    y.domain([d3.min(data, function (d) { return d.y; }), d3.max(data, function (d) { return d.y; })]);

    // Add the valueline path.
    let path = svg.append("path")
      .data/*<ReactGSEADatum[]>*/([data])
      .attr("class", "line")
      .attr("d", valueline);

    for (let i = 0; i < data.length; i++) {

      if (data[i].b == 1) {
        svg.append("line")       // attach a line
          .style("stroke", "dodgerblue")  // colour the line
          .style("stroke-width", "2")
          .attr("x1", width / 2)     // x position of the first end of the line
          .attr("y1", relZero - 30)      // y position of the first end of the line
          .attr("x2", width / 2)     // x position of the second end of the line
          .attr("y2", relZero - 1)
          .transition()
          .duration(500)
          .attr("x1", i * width / (data.length - 1))     // x position of the first end of the line
          .attr("y1", relZero - 30)      // y position of the first end of the line
          .attr("x2", i * width / (data.length - 1))     // x position of the second end of the line
          .attr("y2", relZero - 1);
      }
    }

    // Add the Y Axis
    svg.append("g")
      .attr("transform", "translate(-5,0)")
      .style("font", "16px arial")
      .call(d3.axisLeft(y).ticks(3))
      .style("stroke-width", "2");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Weights");
  }

  render = () => (
    <div style={{ width: 500, height: 350 }}>
      <style jsx global>{`
        .line {
          fill: none;
          stroke: black;
          stroke-width: 4px;
        }

        .running_line {
          fill: none;
          stroke: dodgerblue ;
          stroke-width: 4px;
        }

        @keyframes dash{
            from{
                stroke-dashoffset: 1000;
            }
            to{
                stroke-dashoffset: 0;
            }
        }
      `}</style>
      {this.state.ref === undefined ? (
        <div>Loading...</div>
      ) : null}
      <svg ref={this.updateRef} style={{ overflow: 'visible' }}></svg>
    </div>
  )
}

ReactGSEA.propTypes = {
  /**
   * (data): { "x": number, "y": number, "b": number }[]
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
    })
  ).isRequired,
  /**
   * 
   */
  svgRef: PropTypes.func,
}
