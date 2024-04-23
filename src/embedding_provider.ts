import { res } from "@enconvo/api";
import { Embeddings } from "langchain/embeddings/base";
import { parse } from "path";


export type EmbeddingsOptions = {
    [key: string]: any;
};
export type EmbeddingsResult = {
    embeddings: Embeddings;
    dimension?: number;
};


export abstract class EmbeddingsProviderBase {
    protected options: EmbeddingsOptions;


    constructor(fields: { options: EmbeddingsOptions }) {
        this.options = fields.options
    }

    protected abstract _call(): Promise<EmbeddingsResult>;

    async call(): Promise<EmbeddingsResult> {

        let dimension = this.options.modelName ? this.options.modelName.dimension : null || this.options.model ? this.options.model.dimension : null;
        if (dimension) {
            try {
                dimension = JSON.parse(dimension)
            } catch (e) {
                dimension = null
            }
        }

        const result = await this._call()
        if (dimension) {
            result.dimension = dimension
        }
        console.log("dimension", result)
        if (!result.dimension) {
            const embeddings = result.embeddings
            const tt = await embeddings.embedQuery("1")
            result.dimension = tt.length
        }
        return result
    }
}

