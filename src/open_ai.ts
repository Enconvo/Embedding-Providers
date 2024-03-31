import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default function main(options: any) {


    let config: any = {
        baseURL: options.baseUrl
    }


    return new OpenAIEmbeddings({
        ...options
    },
        config
    );
}

