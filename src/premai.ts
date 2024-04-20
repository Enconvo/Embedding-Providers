
import { PremEmbeddings } from "@langchain/community/embeddings/premai";


import { EmbeddingsProviderBase, EmbeddingsResult } from "./embedding_provider.ts";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {
        this.options.model = this.options.model.value || this.options.model;

        //@ts-ignore
        const embeddings = new PremEmbeddings(this.options);


        return {
            embeddings: embeddings,
        }

    }

}
