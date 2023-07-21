import { z } from "zod";
import { DisplayText } from "./ocpi.common";
import { Price } from "./ocpi.common.v221";
import { EnergyMix } from "./ocpi.location.v221";

const TariffDimensionType = z.enum(["ENERGY", "FLAT", "PARKING_TIME", "TIME"]);

const PriceComponent = z.object({
  type: TariffDimensionType,
  price: z.number().nonnegative(),
  vat: z.number().nonnegative().nullish(),
  step_size: z.number().int().nonnegative(),
});

const DayOfWeek = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const ReservationRestrictionType = z.enum(["RESERVATION", "RESERVATION_EXPIRES"])

const TariffRestrictions = z.object({
  start_time: z
    .string()
    .length(5)
    .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
    .nullish(),
  end_time: z
    .string()
    .length(5)
    .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
    .nullish(),
  start_date: z
    .string()
    .length(10)
    .regex(/([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)
    .nullish(),
  end_date: z
    .string()
    .length(10)
    .regex(/([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)
    .nullish(),
  min_kwh: z.number().nonnegative().nullish(),
  max_kwh: z.number().nonnegative().nullish(),
  min_current: z.number().nonnegative().nullish(),
  max_current: z.number().nonnegative().nullish(),
  min_power: z.number().nonnegative().nullish(),
  max_power: z.number().nonnegative().nullish(),
  min_duration: z.number().int().nonnegative().nullish(),
  max_duration: z.number().int().nonnegative().nullish(),
  day_of_week: z.array(DayOfWeek).nullish(),
  reservation: ReservationRestrictionType.nullish()
});

const TariffElement = z.object({
  price_components: z.array(PriceComponent).nonempty(),
  restrictions: TariffRestrictions.nullish(),
});

const TariffType = z.enum([
  "AD_HOC_PAYMENT",
  "PROFILE_CHEAP",
  "PROFILE_FAST",
  "PROFILE_GREEN",
  "REGULAR"
])

export const Tariff = z.object({
  id: z.string().max(36),
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  currency: z.string().length(3),
  type: TariffType.nullish(),
  tariff_alt_text: z.array(DisplayText).nullish(),
  tariff_alt_url: z.string().url().nullish(),
  min_price: Price.nullish(),
  max_price: Price.nullish(),
  elements: z.array(TariffElement).nonempty(),
  energy_mix: EnergyMix.nullish(),
  start_date_time: z.date().nullish(),
  end_date_time: z.date().nullish(),
  last_updated: z.date(),
});

export const Tariffs = z.array(Tariff);
