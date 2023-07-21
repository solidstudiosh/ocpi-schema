import {z} from "zod";
import { AuthMethod, CdrToken, ChargingPeriod } from "./ocpi.cdrs.v22";
import { Price } from "./ocpi.common.v22";


export const SessionStatus = z.enum(["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]);
export const ProfileType = z.enum(["CHEAP", "FAST", "GREEN", "REGULAR"]);

export const Session = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    start_date_time: z.date(),
    end_date_time: z.date().nullish(),
    kwh: z.number().nonnegative(),
    cdr_token: CdrToken,
    auth_method: AuthMethod,
    authorization_reference: z.string().max(36).nullish(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36),
    connector_id: z.string().max(36),
    meter_id: z.string().max(255).nullish(),
    currency: z.string().length(3),
    charging_periods: z.array(ChargingPeriod).nullish(),
    total_cost: Price.nullish(),
    status: SessionStatus,
    last_updated: z.date(),
});

export const Sessions = z.array(Session);
