
import { CohereEmbeddings } from "@langchain/cohere";




import { EmbeddingsProviderBase, EmbeddingsResult } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {
        this.options.model = this.options.model.value || this.options.model;

        const embeddings = new CohereEmbeddings({
            ...this.options,
            inputType: 'classification',
        });


        return {
            embeddings: embeddings,
        }

    }

}
