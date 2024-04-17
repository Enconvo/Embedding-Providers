import { OllamaEmbeddings } from "langchain/embeddings/ollama";


export default function main(options: any) {
    console.log("options", options);
    options.model = options.model.value || options.model;

    const model = new OllamaEmbeddings({
        ...options
    });

    return model;
}

