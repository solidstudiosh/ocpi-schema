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

export const ImageCategory = z.union([
  z.enum(["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]),
  z.string(),
]);

export const Image = z.object({
  url: z.string().url(),
  thumbnail: z.string().url().nullish(),
  category: ImageCategory,
  type: z.string().max(4),
  width: z.number().int().max(99999).nullish(),
  height: z.number().int().max(99999).nullish(),
});

export const BusinessDetails = z.object({
  name: z.string().max(100),
  website: z.string().url().nullish(),
  logo: Image.nullish(),
});
