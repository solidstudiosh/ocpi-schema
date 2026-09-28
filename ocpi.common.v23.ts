import { z } from "zod";

export const TaxAmount = z.object({
  name: z.string(),
  account_number: z.string().nullish(),
  percentage: z.number().nullish(),
  amount: z.number(),
});

export const Price = z.object({
  before_taxes: z.number().nonnegative(),
  taxes: z.array(TaxAmount).nullish(),
});

export const PriceLimit = z.object({
  before_taxes: z.number().nonnegative(),
  after_taxes: z.number().nonnegative().nullish(),
});

// TokenType is an OpenEnum in 2.3.0, so an unrecognised value must not fail validation
export const TokenType = z.union([
  z.enum(["AD_HOC_USER", "APP_USER", "EMAID", "OTHER", "RFID"]),
  z.string(),
]);

export const DisplayText = z.object({
  language: z.string().length(2),
  text: z.string().max(512),
});
