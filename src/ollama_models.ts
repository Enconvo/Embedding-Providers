import { ListCache, RequestOptions } from "@enconvo/api";
import { Ollama } from "ollama";

const embeddingModels = [
    {
        title: "embeddinggemma",
        value: "embeddinggemma",
        context: 2000,
        dimension: 768,
    },
    {
        title: "embeddinggemma:latest",
        value: "embeddinggemma:latest",
        context: 2000,
        dimension: 768,
    },
    {
        title: "embeddinggemma:300m",
        value: "embeddinggemma:300m",
        context: 2000,
        dimension: 768,
    },
    {
        title: "nomic-embed-text",
        value: "nomic-embed-text",
        context: 2000
    },
    {
        title: "nomic-embed-text:latest",
        value: "nomic-embed-text:latest",
        context: 2000
    },
    {
        title: "nomic-embed-text:v1.5",
        value: "nomic-embed-text:v1.5",
        context: 2000
    },
    {
        title: "mxbai-embed-large",
        value: "mxbai-embed-large",
        context: 512,
        dimension: 1024,
    },
    {
        title: "mxbai-embed-large:latest",
        value: "mxbai-embed-large:latest",
        context: 512,
        dimension: 1024,
    },
    {
        title: "snowflake-arctic-embed", // Default 335M parameter model
        value: "snowflake-arctic-embed",
        context: 512,
        dimension: 1024,
    },
    {
        title: "snowflake-arctic-embed:335m", // Default 335M parameter model
        value: "snowflake-arctic-embed:335m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:137m", // 137M parameter model
        value: "snowflake-arctic-embed:137m",
        context: 8192,
    },
    {
        title: "snowflake-arctic-embed:110m", // 110M parameter model
        value: "snowflake-arctic-embed:110m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:33m", // 33M parameter model
        value: "snowflake-arctic-embed:33m",
        context: 512,
    },
    {
        title: "snowflake-arctic-embed:22m", // 22M parameter model
        value: "snowflake-arctic-embed:22m",
        context: 512,
    },
    {
        title: "all-minilm", // Embedding model trained on large sentence datasets
        value: "all-minilm",
        context: 512
    },
    {
        title: "all-minilm:latest", // Embedding model trained on large sentence datasets
        value: "all-minilm:latest",
        context: 512
    },
    {
        title: "embedding:22m", // 22M parameter embedding model
        value: "embedding:22m",
        context: 256,
        dimension: 384,
    },
    {
        title: "embedding:33m", // 33M parameter embedding model
        value: "embedding:33m",
        context: 256,
        dimension: 384,
    },
    {
        title: "bge-m3", // 33M parameter embedding model
        value: "bge-m3",
        context: 8192,
        dimension: 1024,
    },
    {
        title: "bge-m3:latest", // 33M parameter embedding model
        value: "bge-m3:latest",
        context: 8192,
        dimension: 1024,
    },
    {
        title: "bge-large", // 33M parameter embedding model
        value: "bge-large",
        context: 512,
        dimension: 1024,
    },
    {
        title: "bge-large:latest", // 33M parameter embedding model
        value: "bge-large:latest",
        context: 512,
        dimension: 1024,
    },
    {
        title: "paraphrase-multilingual", // 33M parameter embedding model
        value: "paraphrase-multilingual",
        context: 128,
        dimension: 768,
    },
    {
        title: "paraphrase-multilingual:latest", // 33M parameter embedding model
        value: "paraphrase-multilingual:latest",
        context: 128,
        dimension: 768,
    },
    {
        title: "granite-embedding", // 33M parameter embedding model
        value: "granite-embedding",
        context: 128,
        dimension: 768,
    },
    {
        title: "granite-embedding:latest", // 33M parameter embedding model
        value: "granite-embedding:latest",
        context: 128,
        dimension: 768,
    },
];

async function fetchModels(options: RequestOptions) {
    const credentials = options.credentials;

    const customHeaders: Record<string, string> = {};
    if (credentials?.customHeaders) {
        const headerString = credentials.customHeaders as string;
        const headerPairs = headerString
            .split("\n")
            .filter((line) => line.trim() && line.trim().includes("="));
        for (const pair of headerPairs) {
            const [key, value] = pair.split("=");
            if (key && value) {
                customHeaders[key.trim()] = value.trim();
            }
        }
    }

    const ollama = new Ollama({
        host: credentials?.baseUrl,
        headers: {
            ...customHeaders,
            Authorization: `Bearer ${credentials?.apiKey || ""}`,
            "User-Agent": "Enconvo/1.0",
        },
    });

    let models: ListCache.ListItem[] = [];
    try {
        const list = await ollama.list();
        models = (await Promise.all(list.models
            .map(async (item) => {
                const modelInfo = await ollama.show({ model: item.name });
                if (!modelInfo.capabilities.includes("embedding")) {
                    return null;
                }

                // console.log("modelInfo", item.name, JSON.stringify(modelInfo.capabilities, null, 2));
                const model = embeddingModels.find((em) => em.value === item.name);
                return {
                    title: item.name,
                    value: item.name,
                    providerName: item.details.family,
                    dimension: model?.dimension,
                    context: model?.context || 1024,
                };
            }))).filter((model) => model !== null);

    } catch (err) {
        console.log(err);
    }

    return models;
}

export default async function main(req: Request) {
    const options = await req.json();

    const modelCache = new ListCache(fetchModels);

    const models = await modelCache.getList(options);
    return JSON.stringify(models);
}
