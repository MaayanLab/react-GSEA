import * as React from 'react';
interface ReactGSEADatum {
    x: number;
    y: number;
    b: number;
}
export interface ReactGSEAProps {
    data: Array<ReactGSEADatum>;
    svgRef?: (ref: SVGElement) => void;
}
export interface ReactGSEAState {
    ref?: SVGElement;
}
/**
 * A react-wrapped d3 visualization for rendering GSEA running sum visualizations in browser.
 */
export declare class ReactGSEA extends React.Component<ReactGSEAProps, ReactGSEAState> {
    static propTypes: {};
    constructor(props: ReactGSEAProps);
    componentWillReceiveProps: (props: ReactGSEAProps) => void;
    updateRef: (ref: any) => void;
    plotReactGSEA: () => void;
    render: () => JSX.Element;
}
export {};
