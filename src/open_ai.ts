import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default function main(options: any) {

    if (options.modelName) {
        options.modelName = options.modelName.value || options.modelName;
    }


    let config: any = {
        baseURL: options.baseUrl
    }


    return new OpenAIEmbeddings({
        ...options
    },
        config
    );
}

