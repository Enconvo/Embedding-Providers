import { EmbeddingsProvider } from "@enconvo/api";
import axios from "axios";

export default function main(options: any) {

    return new OllamaEmbeddingsProvider({ options })

}


class OllamaEmbeddingsProvider extends EmbeddingsProvider {
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
        const credentials = this.options.credentials
        const baseUrl = credentials.baseUrl.endsWith('/') ? credentials.baseUrl : `${credentials.baseUrl}/`;
        const api = `${baseUrl}api/embed`;
        console.log("input", input, api, this.options)
        try {
            const response = await axios.post(
                api,
                {
                    input: input,
                    model: this.options.modelName.value
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log("response", response.data)

            return response.data.embeddings;
        } catch (error) {
            // console.error("Error fetching embeddings:", error);
            throw error;
        }
    }

}
