// import { Embeddings, EmbeddingsParams } from "langchain/embeddings/base";
// import { parentPort, workerData } from "worker_threads";
// import { JsonRpcMethod } from "./common/methods.ts";
// import JsonPayload from "./common/jsonpayload.ts";
// import JsonRequest, { JsonRpcType } from "./common/jsonrequest.ts";
// import { v4 as uuidv4 } from "uuid";

// const messagePromises: any = {};
// export function send(method: JsonRpcMethod, payloads: any = {}, requestId: string = "", runId: string = ""): Promise<JsonPayload> {
//   if (parentPort?.listenerCount("message") === 0) {

//     parentPort?.addListener("message", (msg: JsonRequest) => {
//       if (messagePromises[msg.requestId]) {
//         const payloads = msg.payloads
//         let output: any = {
//         }
//         if (typeof payloads === "string") {
//           output.type = "text";
//           output.content = payloads;
//         } else if (payloads instanceof Response) {
//         }

//         messagePromises[msg.requestId].resolve(output);
//         delete messagePromises[msg.requestId];
//       }
//     });
//   }

//   return new Promise<any>((resolve, reject) => {
//     if (!runId) {
//       const { callId } = workerData;
//       runId = callId;
//     }

//     requestId = requestId || uuidv4();
//     messagePromises[requestId] = { resolve, reject };

//     const output = {
//       method: method,
//       callId: runId,
//       requestId: requestId,
//       payloads: payloads,
//       type: JsonRpcType.request,
//       needResult: true,
//       extensionName: process.env.extensionName,
//       commandName: process.env.commandName,
//     };
//     parentPort?.postMessage(output);
//   });
// }

// export async function getEmbeddings(texts: string[]) {
//   const resp = await send(JsonRpcMethod.embedding, { texts });
//   const text = resp.content;
//   return text;
// }

// /**
//  * Interface for NativeEmbeddings parameters. Extends EmbeddingsParams and
//  * defines additional parameters specific to the NativeEmbeddings class.
//  */
// export interface NativeEmbeddingsParams extends EmbeddingsParams {
//   /** Model name to use */
//   modelName?: string;

// }

// /**
//  * Class for generating embeddings using the Native API. Extends the
//  * Embeddings class and implements NativeEmbeddingsParams
//  */
// export class NativeEmbeddings
//   extends Embeddings
//   implements NativeEmbeddingsParams {

//   modelName = "distilbert";

//   constructor(
//     fields?: Partial<NativeEmbeddingsParams>
//   ) {
//     const fieldsWithDefaults = { maxConcurrency: 2, ...fields };
//     super(fieldsWithDefaults);

//   }

//   protected async _embedText(text: string): Promise<number[]> {
//     // replace newlines, which can negatively affect performance.
//     if (!text) {
//       return [];
//     }

//     const cleanedText = text.replace(/\n/g, " ");
//     const res = await getEmbeddings([cleanedText])
//     return res[0] ?? [];
//   }

//   /**
//    * Method that takes a document as input and returns a promise that
//    * resolves to an embedding for the document. It calls the _embedText
//    * method with the document as the input.
//    * @param document Document for which to generate an embedding.
//    * @returns Promise that resolves to an embedding for the input document.
//    */
//   embedQuery(document: string): Promise<number[]> {
//     return this.caller.callWithOptions(
//       {},
//       this._embedText.bind(this),
//       document
//     );
//   }

//   /**
//    * Method that takes an array of documents as input and returns a promise
//    * that resolves to a 2D array of embeddings for each document. It calls
//    * the _embedText method for each document in the array.
//    * @param documents Array of documents for which to generate embeddings.
//    * @returns Promise that resolves to a 2D array of embeddings for each input document.
//    */
//   embedDocuments(documents: string[]): Promise<number[][]> {
//     return Promise.all(documents.map((document) => this._embedText(document)));
//   }


// }
