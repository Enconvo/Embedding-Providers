import { OllamaEmbeddings } from "langchain/embeddings/ollama";


export default function main(options: any) {

    const model = new OllamaEmbeddings({
        ...options
    });

    return model;
}

