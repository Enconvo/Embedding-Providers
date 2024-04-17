import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default function main(options: any) {

    options.modelName = options.modelName.value || options.modelName;


    let config: any = {
        baseURL: options.baseUrl
    }


    return new OpenAIEmbeddings({
        ...options
    },
        config
    );
}

