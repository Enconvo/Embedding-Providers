

const embeddingModels = [
    {
        title: 'nomic-embed-text',
        value: 'nomic-embed-text',
        context: 8192,
        dimension: 768
    },
    {
        title: 'mxbai-embed-large',
        value: 'mxbai-embed-large',
        context: 512,
        dimension: 1024
    },
    {
        title: 'snowflake-arctic-embed', // Default 335M parameter model
        value: 'snowflake-arctic-embed',
        context: 512,
        dimension: 1024
    },
    {
        title: 'snowflake-arctic-embed:335m', // Default 335M parameter model
        value: 'snowflake-arctic-embed:335m',
        context: 512,
        dimension: 1024
    },
    {
        title: 'snowflake-arctic-embed:137m', // 137M parameter model
        value: 'snowflake-arctic-embed:137m',
        context: 8192,
        dimension: 768
    },
    {
        title: 'snowflake-arctic-embed:110m', // 110M parameter model
        value: 'snowflake-arctic-embed:110m',
        context: 512,
        dimension: 768
    },
    {
        title: 'snowflake-arctic-embed:33m', // 33M parameter model
        value: 'snowflake-arctic-embed:33m',
        context: 512,
        dimension: 384
    },
    {
        title: 'snowflake-arctic-embed:22m', // 22M parameter model
        value: 'snowflake-arctic-embed:22m',
        context: 512,
        dimension: 384
    },
    {
        title: 'all-minilm', // Embedding model trained on large sentence datasets
        value: 'all-minilm',
        context: 256,
        dimension: 384
    },
    {
        title: 'embedding:22m', // 22M parameter embedding model
        value: 'embedding:22m',
        context: 256,
        dimension: 384
    },
    {
        title: 'embedding:33m', // 33M parameter embedding model
        value: 'embedding:33m',
        context: 256,
        dimension: 384
    },
    {
        title: 'bge-m3', // 33M parameter embedding model
        value: 'bge-m3',
        context: 8192,
        dimension: 1024
    },
    {
        title: 'bge-large', // 33M parameter embedding model
        value: 'bge-large',
        context: 512,
        dimension: 1024
    },
    {
        title: 'paraphrase-multilingual', // 33M parameter embedding model
        value: 'paraphrase-multilingual',
        context: 128,
        dimension: 768
    },

]

async function fetch_model(options: any) {

    const baseUrl = options.baseUrl || "http://127.0.0.1:11434";
    // console.log('baseUrl', baseUrl,options)

    let models = []
    try {
        const resp = await fetch(`${baseUrl}/api/tags`)
        const json = await resp.json()
        // Filter and map models, checking if they are embedding models or regular models
        models = json.models
            .filter((item: any) => {
                // Only include models that match our known embedding models
                return embeddingModels.some(em => item.name.includes(em.value));
            })
            .map((item: any) => {
                // Find the matching embedding model definition
                const embeddingModel = embeddingModels.find(em => item.name.includes(em.value));
                
                return {
                    "title": item.name,
                    "value": item.name,
                    "dimension": embeddingModel?.dimension,
                    "context": embeddingModel?.context
                }
            });
    } catch (err) {
        console.log(err)
    }

    return models
}

export default async function main(req: Request) {
    const { options } = await req.json()

    let models = []

    try {
        models = await fetch_model(options)
    } catch (err) {
        console.log(err)
    }

    return JSON.stringify(models)
}



