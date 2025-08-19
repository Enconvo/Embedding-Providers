import { env } from 'process';
import { EmbeddingsProvider } from '@enconvo/api';
import OpenAI from 'openai';


export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {

    return new EnConvoEmbeddingsProvider({ options })

}


export class EnConvoEmbeddingsProvider extends EmbeddingsProvider {
    openai: OpenAI
    constructor(options: any) {
        super(options)
        const headers = {
            "accessToken": `${env['accessToken']}`,
            "client_id": `${env['client_id']}`,
            "commandKey": `${env['commandKey']}`
        }
        const baseURL = "https://api.enconvo.com/v1"
        // const baseURL = "http://127.0.0.1:8181/v1"
        this.openai = new OpenAI({
            baseURL: baseURL,
            apiKey: "enconvo",
            defaultHeaders: headers
        })
    }
    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {

        console.log("enconvo input start", input[0].slice(0, 10))

        try {

            const response = await this.openai.embeddings.create({
                model: this.options.modelName.value,
                input: input
            });

            console.log("response --", input[0].slice(0, 10), response.usage)

            return response.data.map((item: OpenAI.Embeddings.Embedding) => item.embedding);
        } catch (error) {
            console.error("openai error", error)
            throw error
        }
    }
}
