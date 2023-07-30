import { TransactionControllers } from "../controllers";
import { ContractEventsServices, ContractServices } from "../services";
import contracts, { providers } from "./contracts.config";

const contractServices = ContractServices(contracts);

const { init } = ContractEventsServices(contracts, providers);

const transactionsControllers = TransactionControllers(contractServices);

export { init, transactionsControllers };
