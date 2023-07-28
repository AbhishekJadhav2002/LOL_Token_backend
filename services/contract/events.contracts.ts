import { Chains, Contracts, Providers } from "../../types";
import { LOLAbi } from "../../types/contracts";
import EventsServices from "../database/events.database";

const { insertEvent } = EventsServices();

export default function ContractEventsServices(contracts: Contracts, providers: Providers) {

    async function init(chain: Chains) {
        try {
            if (!contracts[chain]) {
                throw new Error(`Chain ${chain} not found`);
            } else if (!contracts[chain].on) {
                throw new Error(`Contract for LOL Token does not have on method`);
            }
            let contract: LOLAbi;
            if (chain === 'bsc') {
                contract = contracts[chain];
            } else if (chain === 'eth') {
                contract = contracts[chain];
            } else {
                throw new Error(`Chain ${chain} not supported`);
            }

            const filter = {
                address: await contract.getAddress(),
            }

            providers[chain].on(filter, (log) => {
                const parsedLog = contract.interface.parseLog(log);
                console.log(parsedLog);

                insertEvent({ ...parsedLog, chain }).catch(error => {
                    console.error(error);
                });
            })
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    return {
        init,
    };
}