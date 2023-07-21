import { z } from "zod";
import { Connector, Evse, Location } from "./ocpi.location";

export const AuthMethod = z.enum(["AUTH_REQUEST", "WHITELIST"]);

const CdrDimensionType = z.enum([
  "ENERGY",
  "FLAT",
  "MAX_CURRENT",
  "MIN_CURRENT",
  "PARKING_TIME",
  "TIME",
]);

const CdrDimension = z.object({
  type: CdrDimensionType,
  volume: z.number(),
});

export const ChargingPeriod = z.object({
  start_date_time: z.date(),
  dimensions: z.array(CdrDimension).nonempty(),
});

const SessionStatus = z.enum(["ACTIVE", "COMPLETED", "INVALID", "PENDING"]);

export const SessionLocation = Location.merge(
  z.object({
    evses: z
      .array(
        Evse.merge(
          z.object({
            connectors: z.array(Connector).length(1),
          }),
        ),
      )
      .length(1),
  }),
); // Overriden Location to force single EVSE and Connector

export const Session = z.object({
  id: z.string().max(36),
  start_datetime: z.date(),
  end_datetime: z.date().nullish(),
  kwh: z.number().nonnegative(),
  auth_id: z.string().max(36),
  auth_method: AuthMethod,
  location: SessionLocation,
  meter_id: z.string().max(255).nullish(),
  currency: z.string().length(3),
  charging_periods: z.array(ChargingPeriod).nullish(),
  total_cost: z.number().nonnegative().nullish(),
  status: SessionStatus,
  last_updated: z.date(),
});

export const Sessions = z.array(Session);
