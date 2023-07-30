import { NextFunction, Request, Response } from "express";
import { EventsServices } from "../services";
import { Chains, ContractServices, Events, TransactionControllers } from "../types";

const { getEvents } = EventsServices();

export default function TransactionControllers(ContractServices: ContractServices): TransactionControllers {
    async function getBalance(req: Request, res: Response, next: NextFunction) {
        try {
            const { address, chain } = req.params;
            const results = await ContractServices.getBalanceOf(address as string, chain as Chains);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    async function getTransactions(req: Request, res: Response, next: NextFunction) {
        try {
            const { address, chain } = req.params;
            const { eventName } = req.query;
            const results = await getEvents(address as string, chain as Chains, eventName as Events | undefined);
            res.status(200).json(results);
        } catch (error) {
            next(error);
        }
    }

    return {
        getBalance,
        getTransactions,
    };
};