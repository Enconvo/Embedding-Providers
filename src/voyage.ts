import { VoyageEmbeddings } from "langchain/embeddings/voyage";



export default function main(options: any) {
    options.modelName = options.modelName.value || options.modelName;

    return new VoyageEmbeddings({
        ...options,
    }
    );
}

