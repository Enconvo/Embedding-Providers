import { env } from 'process';
import { EmbeddingsProvider, EmbeddingsOptions } from './embeddings_provider.ts';
import axios from 'axios';


export default function main(embeddingsOptions: EmbeddingsOptions) {

    return new EnConvoEmbeddingsProvider({ options: embeddingsOptions })

}


export class EnConvoEmbeddingsProvider extends EmbeddingsProvider {

    constructor(fields: { options: EmbeddingsOptions }) {
        super(fields);
    }

    protected async _embed(input: string[], _?: EmbeddingsOptions): Promise<number[][]> {
        // console.log("input", input)

        // const response = await axios.post('http://127.0.0.1:8181/v1/embeddings',
        const response = await axios.post('https://api.enconvo.com/v1/embeddings',
            {
                input: input,
                model: this.options.modelName.value
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "accessToken": `${env['accessToken']}`,
                    "client_id": `${env['client_id']}`,
                    "commandKey": `${env['commandKey']}`
                }
            }
        );
        console.log("response", response.data.usage)

        return response.data.data.map((item: any) => item.embedding);
    }
}
