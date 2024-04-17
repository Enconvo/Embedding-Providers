import { OllamaEmbeddings } from "langchain/embeddings/ollama";


export default function main(options: any) {
    options.model = options.model.value || options.model;

    const model = new OllamaEmbeddings({
        ...options
    });

    return model;
}

