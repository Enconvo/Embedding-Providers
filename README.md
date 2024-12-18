# Embedding Models

## What is this?

This is an Enconvo Extension that helps you use Embedding Models. It provides multiple embedding providers to convert text into vector representations.

## Available Providers

### 1. EnConvo Cloud Plan
- Provider: EnConvo AI
- Features:
  - Multiple model options:
    - voyage-3 (1024 dimensions, 32k context)
    - voyage-3-lite (512 dimensions, 32k context)
    - voyage-finance-2 (1024 dimensions, 32k context)
    - voyage-multilingual-2 (1024 dimensions)

### 2. Ollama
- Local embeddings powered by Ollama
- Run embeddings locally on your machine

### 3. Voyage AI
- Direct integration with Voyage AI's embedding services

## How to use it?

![](https://raw.githubusercontent.com/Enconvo/Embedding-Providers/main/metadata/Screenshot.png)

1. Choose your preferred embedding provider
2. Configure the necessary settings (API keys, model selection, etc.)
3. Start using embeddings in your Enconvo workflows

## Installation

Visit the Enconvo Store to install:
https://store.enconvo.com/plugins/Embedding-Providers

## Requirements

This extension requires the following dependencies:
- @enconvo/api
- @langchain/azure-openai
- @langchain/cohere
- And other related packages

## License

MIT License

## Author

EnconvoAI
