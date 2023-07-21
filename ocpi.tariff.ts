import { z } from "zod";
import { DisplayText } from "./ocpi.common";
import { EnergyMix } from "./ocpi.location";

const TariffDimensionType = z.enum(["ENERGY", "FLAT", "PARKING_TIME", "TIME"]);

const PriceComponent = z.object({
  type: TariffDimensionType,
  price: z.number().nonnegative(),
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

const TariffRestrictions = z.object({
  start_time: z
    .string()
    .length(5)
    .regex(/[0-2][0-9]:[0-5][0-9]/)
    .nullish(),
  end_time: z
    .string()
    .length(5)
    .regex(/[0-2][0-9]:[0-5][0-9]/)
    .nullish(),
  start_date: z.string().length(10).nullish(),
  end_date: z.string().length(10).nullish(),
  min_kwh: z.number().nonnegative().nullish(),
  max_kwh: z.number().nonnegative().nullish(),
  min_power: z.number().nonnegative().nullish(),
  max_power: z.number().nonnegative().nullish(),
  min_duration: z.number().nonnegative().nullish(),
  max_duration: z.number().nonnegative().nullish(),
  day_of_week: DayOfWeek.nullish(),
});

const TariffElement = z.object({
  price_components: z.array(PriceComponent).nonempty(),
  restrictions: TariffRestrictions.nullish(),
});

export const Tariff = z.object({
  id: z.string().max(36),
  currency: z.string().length(3),
  tariff_alt_text: z.array(DisplayText).nullish(),
  tariff_alt_url: z.string().url().nullish(),
  elements: z.array(TariffElement).nonempty(),
  energy_mix: EnergyMix.nullish(),
  last_updated: z.date(),
});

export const Tariffs = z.array(Tariff);
