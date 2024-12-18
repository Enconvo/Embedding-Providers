import { EmbeddingsProvider } from "@enconvo/api";
import axios from "axios";

export default function main(options: any) {

    return new CohereEmbeddingsProvider({ options })

}


class CohereEmbeddingsProvider extends EmbeddingsProvider {

    protected async _embed(input: string[], options?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        // console.log("input", input)
        const baseUrl = "https://api.cohere.ai/v1/embed";
        const response = await axios.post(baseUrl,
            {
                texts: input,
                model: this.options.modelName.value,
                input_type: "search_document"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.options.apiKey}`,
                }
            }
        );
        // console.log("response", response.data.texts)

        return response.data.embeddings;
    }

}
