import { EmbeddingsProvider } from "@enconvo/api";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export default function main(options: any) {

    return new AzureOpenAIEmbeddingsProvider({ options })

}


class AzureOpenAIEmbeddingsProvider extends EmbeddingsProvider {


    protected _embed(input: string[], options?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {

        this.options.azureOpenAIApiDeploymentName = this.options.modelName.value || this.options.modelName;
        delete this.options.modelName;

        const embeddings = new OpenAIEmbeddings({
            ...this.options
        });

        return embeddings.embedDocuments(input);

    }


}
