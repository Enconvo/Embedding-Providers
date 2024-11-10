
import { CohereEmbeddings } from "@langchain/cohere";




import { EmbeddingsOptions, EmbeddingsProvider } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new CohereEmbeddingsProvider({ options })

}


class CohereEmbeddingsProvider extends EmbeddingsProvider {
    protected _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {
        this.options.model = this.options.model.value || this.options.model;

        const embeddings = new CohereEmbeddings({
            ...this.options,
            inputType: 'classification',
        });


        return embeddings.embedDocuments(input);

    }

}
