import { OllamaEmbeddings } from "langchain/embeddings/ollama";


export default function main(options: any) {

    options.modelName = options.modelName.value || options.modelName;

    const model = new OllamaEmbeddings({
        ...options
    });

    return model;
}

