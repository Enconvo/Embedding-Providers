import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { EmbeddingsProvider, EmbeddingsOptions } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new OpenAIEmbeddingsProvider({ options })

}


class OpenAIEmbeddingsProvider extends EmbeddingsProvider {
    protected _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {

        if (this.options.modelName) {
            this.options.modelName = this.options.modelName.value || this.options.modelName;
        }


        let config: any = {
            baseURL: this.options.baseUrl
        }


        const model = new OpenAIEmbeddings({
            ...this.options,
            batchSize: 2048,
        },
            config
        );

        return model.embedDocuments(input);

    }

}
