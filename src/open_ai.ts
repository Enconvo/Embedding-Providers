import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { EmbeddingsProviderBase, EmbeddingsResult } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {

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

        return {
            embeddings: model,
        }

    }

}
