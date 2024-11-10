import { VoyageEmbeddings } from "langchain/embeddings/voyage";

import { EmbeddingsProvider, EmbeddingsOptions } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new VoyageEmbeddingsProvider({ options })

}


class VoyageEmbeddingsProvider extends EmbeddingsProvider {
    protected _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {
        this.options.modelName = this.options.modelName.value || this.options.modelName;

        const model = new VoyageEmbeddings({
            ...this.options
        }
        );

        return model.embedDocuments(input);

    }

}
