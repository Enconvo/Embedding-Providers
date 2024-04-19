import { AzureOpenAI } from "@langchain/azure-openai";


export default function main(options: any) {


    const model = new AzureOpenAI(options);
    return model
}

