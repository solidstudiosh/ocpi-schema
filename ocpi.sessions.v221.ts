import {z} from "zod";
import { AuthMethod, CdrToken } from "./ocpi.cdrs.v221";
import { Price } from "./ocpi.common.v221";


export const SessionStatus = z.enum(["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]);
export const ProfileType = z.enum(["CHEAP", "FAST", "GREEN", "REGULAR"]);

const CdrDimensionType = z.enum([
    "CURRENT",
    "ENERGY",
    "ENERGY_EXPORT",
    "ENERGY_IMPORT",
    "MAX_CURRENT",
    "MIN_CURRENT",
    "MAX_POWER",
    "MIN_POWER",
    "PARKING_TIME",
    "POWER",
    "RESERVATION_TIME",
    "STATE_OF_CHARGE",
    "TIME",
  ]);

export const CdrDimension = z.object({
    type: CdrDimensionType,
    volume: z.number(),
  });

export const ChargingPeriod = z.object({
    start_date_time: z.date(),
    dimensions: z.array(CdrDimension).nonempty(),
    tariff_id: z.string().max(36).nullish(),
})

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
