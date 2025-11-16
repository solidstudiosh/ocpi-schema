import { z } from "zod";

export const createOpenEnum = <T extends string>(knownValues: readonly T[]) => {
  return z.union([
    z.enum(knownValues as [T, ...T[]]),
    z.string().trim().min(1),
  ]);
};

export const TaxAmount = z.object({
  name: z.string(),
  account_number: z.string().nullish(),
  percentage: z.number().nonnegative().nullish(),
  amount:  z.number(),
});

export const Price = z.object({
  before_taxes: z.number().nonnegative(),
  taxes: z.array(TaxAmount).nullish(),
});

export const TokenType = createOpenEnum(["AD_HOC_USER", "APP_USER", "EMAID", "LICENSE_PLATE", "OTHER", "RFID"]);

export const DisplayText = z.object({
  language: z.string().length(2),
  text: z.string().max(512),
});