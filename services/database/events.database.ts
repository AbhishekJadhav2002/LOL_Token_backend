import { ethers } from "ethers";
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

    async function getEvents(address: string, eventName: Events, chain: Chains) {
        try {
            const result = await EventsModel.find({ "args.1": ethers.zeroPadValue(address, 32), $name: eventName, chain });
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

