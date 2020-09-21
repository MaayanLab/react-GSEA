/**
 * Helper for creating ReactGSEA data from enrichment input/output
 */
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
