import { EmbeddingsProviderBase, EmbeddingsResult } from "./embedding_provider.ts";
import { NativeEmbeddings } from "./langchain/native_embedding.ts";



export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {

        this.options.modelName = this.options.modelName.value || this.options.modelName;

        const model = new NativeEmbeddings({
            ...this.options
        });

        return {
            embeddings: model,
        }
    }

}
