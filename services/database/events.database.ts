import { Events as EventsModel } from "../../models";
import { Chains, Events, EventsServices, TransactionData } from "../../types";

export default function EventsServices(): EventsServices {
    async function insertEvent(data: TransactionData) {
        try {
            const result = await EventsModel.create({ ...data });
            return result;
        } catch (error) {
            throw error;
        }
    };

    async function getEvents(address: string, chain: Chains, eventName?: Events) {
        try {
            const result = await EventsModel.find({  "args.0": address, chain, [eventName ? "name" : '']: eventName }, 'chain name args fragment createdAt');
            return result;
        } catch (error) {
            throw error;
        }
    };

    return {
        insertEvent,
        getEvents
    }
};

