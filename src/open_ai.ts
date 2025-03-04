import { EmbeddingsProvider } from "@enconvo/api";

import OpenAI from "openai";

export default function main(options: any) {

    return new OpenAIEmbeddingsProvider({ options })

}


class OpenAIEmbeddingsProvider extends EmbeddingsProvider {
    openai: OpenAI
    constructor(options: any) {
        super(options)
        const baseUrl = this.options.baseUrl.endsWith('/') ? this.options.baseUrl : `${this.options.baseUrl}/`;
        this.openai = new OpenAI({
            baseURL: baseUrl,
            apiKey: this.options.openAIApiKey
        })
    }
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {

        console.log("open input start", input[0].slice(0, 10))

        try {

            const response = await this.openai.embeddings.create({
                model: this.options.modelName.value,
                input: input,
                encoding_format: "float",
            });
      
            console.log("response ", input[0].slice(0, 10), response.usage)

            return response.data.map((item: OpenAI.Embeddings.Embedding) => item.embedding);
        } catch (error) {
            console.error("openai error", error)
            throw error
        }
    }

}
