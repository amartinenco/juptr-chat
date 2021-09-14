import { Method } from "axios";

export interface ICredentials {
    email: string;
    password: string;
}

export interface IUseRequest {
    url: string,
    method: Method,
    body: ICredentials,
    onSuccess?: Function
}