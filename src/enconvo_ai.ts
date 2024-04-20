import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { EmbeddingsProviderBase, EmbeddingsResult } from "./embedding_provider.ts";
import { VoyageEmbeddings } from "./langchain/voyage.ts";
import { CohereEmbeddings } from "@langchain/cohere";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {

        return this.openai()
    }


    cohere() {
        // this.options.modelName = this.options.modelName.value || this.options.modelName;

        const model = new CohereEmbeddings({
            ...this.options,
            batchSize: 8,
            apiKey: "default",
            model: "embed-multilingual-v3.0"
            // basePath: "https://api.enconvo.com/v1",
            // basePath: "http://127.0.0.1:8181/v1",
        }
        );

        return {
            embeddings: model,
        }
    }

    voyage() {
        this.options.modelName = this.options.modelName.value || this.options.modelName;

        const model = new VoyageEmbeddings({
            ...this.options,
            batchSize: 8,
            apiKey: "default",
            // basePath: "https://api.enconvo.com/v1",
            basePath: "http://127.0.0.1:8181/v1",
        }
        );

        return {
            embeddings: model,
        }
    }

    openai() {
        if (this.options.modelName) {
            this.options.modelName = this.options.modelName.value || this.options.modelName;
        }


        const model = new OpenAIEmbeddings({
            ...this.options,
            batchSize: 2048,
        }, {
            // baseURL: "https://api.enconvo.com/v1"
            baseURL: "http://127.0.0.1:8181/v1"
        }
        );

        return {
            embeddings: model,
        }

    }

}


