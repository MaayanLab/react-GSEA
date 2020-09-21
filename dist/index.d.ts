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
export declare function dataFromResults({ input, output }: {
    input: {
        up: string[];
        down: string[];
    };
    output: {
        entities: string[];
        ranks: number[];
    };
}): any[];
export declare class ReactGSEA extends React.Component<ReactGSEAProps, ReactGSEAState> {
    constructor(props: ReactGSEAProps);
    componentWillReceiveProps: (props: ReactGSEAProps) => void;
    updateRef: (ref: any) => void;
    plotReactGSEA: () => void;
    render: () => JSX.Element;
}
export default ReactGSEA;
