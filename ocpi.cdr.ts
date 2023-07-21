import { z } from "zod";
import { AuthMethod, ChargingPeriod, SessionLocation } from "./ocpi.session";
import { Tariff } from "./ocpi.tariff";

export const Cdr = z.object({
  id: z.string().max(36),
  start_date_time: z.date(),
  stop_date_time: z.date(),
  auth_id: z.string().max(36),
  auth_method: AuthMethod,
  location: SessionLocation,
  meter_id: z.string().max(255).nullish(),
  currency: z.string().length(3),
  tariffs: z.array(Tariff).nullish(),
  charging_periods: z.array(ChargingPeriod).nonempty(),
  total_cost: z.number().nonnegative(),
  total_energy: z.number().nonnegative(),
  total_time: z.number().nonnegative(),
  total_parking_time: z.number().nonnegative().nullish(),
  remark: z.string().max(255).nullish(),
  last_updated: z.date(),
});

export const Cdrs = z.array(Cdr);
