import {z} from "zod";
import {Role} from "./ocpi.credentials.v221";

const ConnectionStatus = z.enum([
  "CONNECTED",
  "OFFLINE",
  "PLANNED",
  "SUSPENDED"
]);

export const ClientInfo = z.object({
  party_id: z.string().max(3),
  country_code: z.string().length(2),
  role: Role,
  status: ConnectionStatus,
  last_updated: z.date(),
});

export const ClientInfos = z.array(ClientInfo).nullish();
