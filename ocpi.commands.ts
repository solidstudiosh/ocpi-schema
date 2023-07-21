import { z } from "zod";
import { Token } from "./ocpi.tokens";

export const ReserveNowCommand = z.object({
  response_url: z.string().url(),
  token: Token,
  expiry_date: z.date(),
  reservation_id: z.number().int(),
  location_id: z.string().max(39),
  evse_uid: z.string().max(39).nullish(),
});

export const StartSessionCommand = z.object({
  response_url: z.string().url(),
  token: Token,
  location_id: z.string().max(39),
  evse_uid: z.string().max(39).nullish(),
});

export const StopSessionCommand = z.object({
  response_url: z.string().url(),
  session_id: z.string().max(36),
});

export const UnlockConnectorCommand = z.object({
  response_url: z.string().url(),
  location_id: z.string().max(39),
  evse_uid: z.string().max(39),
  connector_id: z.string().max(36),
});

const CommandResponseType = z.enum([
  "NOT_SUPPORTED",
  "REJECTED",
  "ACCEPTED",
  "TIMEOUT",
  "UNKNOWN_SESSION",
]);

export const CommandResponse = z.object({
  result: CommandResponseType,
});
