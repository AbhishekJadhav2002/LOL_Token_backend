import { ethers } from "ethers";
import { NextFunction, Request, Response } from "express";
import { LOLAbi } from "./contracts/LOLAbi";
import { Chains } from "./token.types";

type Contracts = { [key in Chains]: LOLAbi; }

type Providers = { [key in Chains]: ethers.Provider; }

type Events = "Transfer" | "Approval";

type TransactionData = any[] | {};

interface TransactionControllers {
    getBalance(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTransactions(req: Request, res: Response, next: NextFunction): Promise<void>;
    // transfer(req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface EventsServices {
    getEvents: (address: string, chain: Chains, eventName?: Events) => Promise<any>;
    insertEvent: (data: TransactionData) => Promise<any>;
}

interface ContractServices {
    getBalanceOf: (address: string, chain: Chains) => Promise<string>;
}

export { ContractServices, Contracts, Events, EventsServices, Providers, TransactionControllers, TransactionData };

