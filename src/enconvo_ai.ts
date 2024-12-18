import { env } from 'process';
import axios from 'axios';
import { EmbeddingsProvider } from '@enconvo/api';


export default function main(options: EmbeddingsProvider.EmbeddingsOptions) {

    return new EnConvoEmbeddingsProvider({ options })

}


export class EnConvoEmbeddingsProvider extends EmbeddingsProvider {

    constructor(fields: { options: EmbeddingsProvider.EmbeddingsOptions }) {
        super(fields);
    }

    protected async _embed(input: string[], _?: EmbeddingsProvider.EmbeddingsOptions): Promise<number[][]> {
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
