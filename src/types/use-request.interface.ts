import { Method } from "axios";
import { ICredentials } from "./credentials.interface";

export interface IUseRequest {
    url: string,
    method: Method,
    body: ICredentials,
    onSuccess?: Function
}