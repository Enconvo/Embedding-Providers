import { OllamaEmbeddings } from "langchain/embeddings/ollama";



import { EmbeddingsProvider, EmbeddingsOptions } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new OllamaEmbeddingsProvider({ options })

}


class OllamaEmbeddingsProvider extends EmbeddingsProvider {
    protected _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {

        this.options.model = this.options.model.value || this.options.model;

        const model = new OllamaEmbeddings({
            ...this.options
        });

        return model.embedDocuments(input);

    }

}
