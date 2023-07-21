import { z } from "zod";
import {
  DisplayText,
} from "./ocpi.common.v221";
import {
    Token,
} from "./ocpi.tokens.v221";


export const ReserveNowCommand = z.object({
  response_url: z.string().url(),
  token: Token,
  expiry_date: z.date(),
  reservation_id:  z.string().max(36),
  location_id: z.string().max(36),
  evse_uid: z.string().max(36).nullish(),
  authorization_reference: z.string().max(36).nullish(),
});

export const CancelReservationCommand = z.object({
  response_url: z.string().url(),
  reservation_id:  z.string().max(36),
});

export const StartSessionCommand = z.object({
  response_url: z.string().url(),
  token: Token,
  location_id: z.string().max(36),
  evse_uid: z.string().max(36).nullish(),
  connector_id: z.string().max(36).nullish(),
  authorization_reference: z.string().max(36).nullish(),
});

export const StopSessionCommand = z.object({
  response_url: z.string().url(),
  session_id: z.string().max(36),
});

export const UnlockConnectorCommand = z.object({
  response_url: z.string().url(),
  location_id: z.string().max(36),
  evse_uid: z.string().max(36),
  connector_id: z.string().max(36),
});

const CommandResponseType = z.enum([
  "NOT_SUPPORTED",
  "REJECTED",
  "ACCEPTED",
  "UNKNOWN_SESSION",
]);

export const CommandResponse = z.object({
  result: CommandResponseType,
  timeout:  z.number().int().nonnegative(),
  message:  z.array(DisplayText).nullish(),
});

const CommandResultType = z.enum([
    "ACCEPTED",
    "CANCELED_RESERVATION",
    "EVSE_OCCUPIED",
    "EVSE_INOPERATIVE",
    "FAILED",
    "NOT_SUPPORTED",
    "REJECTED",
    "TIMEOUT",
    "UNKNOWN_RESERVATION",
]);

export const CommandResult = z.object({
  result: CommandResultType,
  message:  z.array(DisplayText).nullish(),
});

const CommandType = z.enum([
    "CANCEL_RESERVATION",
    "RESERVE_NOW",
    "START_SESSION",
    "STOP_SESSION",
    "UNLOCK_CONNECTOR"
]);



