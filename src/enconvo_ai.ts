import { env } from 'process';
import { EmbeddingsProvider, EmbeddingsOptions } from './embeddings_provider.ts';


export default function main(embeddingsOptions: EmbeddingsOptions) {

    return new EnConvoEmbeddingsProvider({ options: embeddingsOptions })

}


export class EnConvoEmbeddingsProvider extends EmbeddingsProvider {

    constructor(fields: { options: EmbeddingsOptions }) {
        super(fields);
    }

    protected async _embed(input: string[], _?: EmbeddingsOptions): Promise<number[][]> {
        const response = await fetch('http://127.0.0.1:8181/v1/embeddings', {
        // const response = await fetch('https://api.enconvo.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "accessToken": `${env['accessToken']}`,
                "client_id": `${env['client_id']}`,
                "commandKey": `${env['commandKey']}`
            },
            body: JSON.stringify({
                input: input,
                model: this.options.modelName
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`Embedding request failed: ${result.error?.message || response.statusText}`);
        }

        return result.data.map((item: any) => item.embedding);
    }
}
