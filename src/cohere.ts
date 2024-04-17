
import { CohereEmbeddings } from "@langchain/cohere";


export default function main(options: any) {
    options.model = options.model.value || options.model;

    const embeddings = new CohereEmbeddings({
        ...options,
        inputType: 'classification'
    });

    return embeddings
}

