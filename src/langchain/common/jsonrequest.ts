import JsonPayload from "./jsonpayload.ts";
import { JsonRpcMethod } from "./methods.ts";


export default interface JsonRequest {
    method: JsonRpcMethod;
    callId: string;
    requestId: string;
    payloads?: JsonPayload;
}
export enum JsonRpcType {
    request = "request",
    response = "response",
}