import { EmbeddingsProvider } from "@enconvo/api";
import axios from "axios";

export default function main(options: any) {

    return new VoyageEmbeddingsProvider({ options })

}


class VoyageEmbeddingsProvider extends EmbeddingsProvider {
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        // console.log("input", input)
        const baseUrl = "https://api.voyageai.com/v1/embeddings";
        const response = await axios.post(baseUrl,
            {
                input: input,
                model: this.options.modelName.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.options.apiKey}`,
                }
            }
        );
        console.log("response", response.data.usage)

        return response.data.data.map((item: any) => item.embedding);
    }

}
