import { VoyageEmbeddings } from "langchain/embeddings/voyage";




import { EmbeddingsProviderBase, EmbeddingsResult } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {
        this.options.modelName = this.options.modelName.value || this.options.modelName;

        const model = new VoyageEmbeddings({
            ...this.options
        }
        );

        return {
            embeddings: model,
        }

    }

}
