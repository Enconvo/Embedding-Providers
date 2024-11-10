import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { EmbeddingsProviderBase, EmbeddingsResult } from "./embeddings_provider.ts";

export default function main(options: any) {

    return new EmbeddingsProvider({ options })

}


class EmbeddingsProvider extends EmbeddingsProviderBase {
    protected async _call(): Promise<EmbeddingsResult> {
        this.options.azureOpenAIApiDeploymentName = this.options.modelName.value || this.options.modelName;
        delete this.options.modelName;

        const embeddings = new OpenAIEmbeddings({
            ...this.options
        }
        );

        return {
            embeddings: embeddings,
        }
    }

}
