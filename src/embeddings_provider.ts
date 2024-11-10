export interface EmbeddingsOptions {
    [key: string]: any;
}

export abstract class EmbeddingsProvider {
    protected options: EmbeddingsOptions;

    constructor(fields: { options: EmbeddingsOptions }) {
        this.options = fields.options;
    }

    protected abstract _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]>;

    async embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {
        return await this._embed(input, options);
    }
}
