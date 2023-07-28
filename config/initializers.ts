// import { ContractControllers } from "../controllers";
// import { ContractRoutes } from "../routes";
import { ContractEventsServices, ContractServices } from "../services";
import contracts, { providers } from "./contracts.config";

const contractServices = ContractServices(contracts);

const { init } = ContractEventsServices(contracts, providers);

// const contractControllers = ContractControllers(contractServices);

// const contractRoutes = ContractRoutes(contractControllers);

export { init };

