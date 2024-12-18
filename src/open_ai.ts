import { EmbeddingsProvider } from "@enconvo/api";
import axios from "axios";

export default function main(options: any) {

    return new OpenAIEmbeddingsProvider({ options })

}


class OpenAIEmbeddingsProvider extends EmbeddingsProvider {
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        // console.log("input", input)
        const baseUrl = this.options.baseUrl.endsWith('/') ? this.options.baseUrl : `${this.options.baseUrl}/`;
        const response = await axios.post(`${baseUrl}embeddings`,
            {
                input: input,
                model: this.options.modelName.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.options.openAIApiKey}`,
                }
            }
        );
        console.log("response", response.data.usage)

        return response.data.data.map((item: any) => item.embedding);
    }

}
