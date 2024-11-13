export interface EmbeddingsOptions {
    [key: string]: any;
}

export abstract class EmbeddingsProvider {
    protected options: EmbeddingsOptions;

    constructor(fields: { options: EmbeddingsOptions }) {
        this.options = fields.options;
    }

    protected abstract _embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]>;

    async embed(input: string[], options?: EmbeddingsOptions): Promise<number[][]> {
        // If all strings are empty, return an array of empty arrays
        if (input.every(str => str.trim() === '')) {
            const dimension = this.options.modelName.dimension;
            return Array(input.length).fill(Array(dimension).fill(0));
        }


        let retries = 3;
        while (retries > 0) {
            try {
                return await this._embed(input, options);
            } catch (error) {
                console.error(`Error on attempt ${4 - retries}/3`, error.message);
                // Write error message to desktop
                // const fs = require('fs');
                // const path = require('path');
                // const desktopPath = path.join(require('os').homedir(), 'Desktop');
                // const errorLogPath = path.join(desktopPath, 'embedding_errors.json');
                // const errorMessage = JSON.stringify(input);
                // fs.writeFileSync(errorLogPath, errorMessage);
                // console.error('Error details written to:', errorLogPath);

                retries--;
                if (retries === 0) {
                    const dimension = this.options.modelName.dimension;
                    return Array(input.length).fill(Array(dimension).fill(0));
                }
                // Wait 1 second before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        // This should never be reached due to the return in the if (retries === 0) block
        throw new Error("Unexpected end of retry loop");
    }
}
