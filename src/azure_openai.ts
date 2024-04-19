import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default function main(options: any) {


    options.azureOpenAIApiDeploymentName = options.modelName.value || options.modelName;
    delete options.modelName;

    return new OpenAIEmbeddings({
        ...options
    }
    );
}

