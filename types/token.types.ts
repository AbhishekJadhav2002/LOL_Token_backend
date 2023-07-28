import { NODE_ENV } from "./index";

export type Chains = "bsc" | "eth";

export type Token = {
    "id": number;
    "contract": string;
    "decimal": number;
    "symbol": string;
    "name": string;
    "gasLimit"?: number;
};

export type Tokens = {
    [key in NODE_ENV]: {
        [key in Chains]: Token;
    }
};