import { z } from "zod";

const ChargingProfileResponseType = z.enum([
  "ACCEPTED",
  "NOT_SUPPORTED",
  "REJECTED",
  "TOO_OFTEN",
  "UNKNOWN_SESSION"
]);

const ChargingRateUnit = z.enum([
  "W",
  "A"
]);

const ChargingProfilePeriod = z.object({
  start_period: z.number().int().nonnegative(),
  limit: z.number().multipleOf(0.1).nonnegative(),
});

export const ChargingProfile = z.object({
  start_date_time: z.date().nullish(),
  duration: z.number().int().nonnegative().nullish(),
  charging_rate_unit: ChargingRateUnit,
  min_charging_rate: z.number().multipleOf(0.1).nonnegative().nullish(),
  charging_profile_period: z.array(ChargingProfilePeriod).nullish()
});

const ChargingProfileResultType = z.enum([
  "ACCEPTED",
  "REJECTED",
  "UNKNOWN"
]);

export const ActiveChargingProfile = z.object({
  start_date_time: z.date(),
  charging_profile: ChargingProfile
});

export const SetChargingProfile = z.object({
  charging_profile: ChargingProfile,
  response_url: z.string().url(),
});

export const ChargingProfileResponse = z.object({
  result: ChargingProfileResponseType,
  timeout:  z.number().int().nonnegative(),
});

export const ActiveChargingProfileResult = z.object({
  result: ChargingProfileResultType,
  profile:  ActiveChargingProfile.nullish(),
});

export const ChargingProfileResult = z.object({
  result: ChargingProfileResultType,
});

export const ClearProfileResult = z.object({
  result: ChargingProfileResultType,
});



