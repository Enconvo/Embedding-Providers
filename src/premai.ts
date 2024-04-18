
import { PremEmbeddings } from "@langchain/community/embeddings/premai";


export default function main(options: any) {
    options.model = options.model.value || options.model;

    const embeddings = new PremEmbeddings({
        ...options
    });

    return embeddings
}

