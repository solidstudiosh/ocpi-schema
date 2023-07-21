import { z } from "zod";

export const Price = z.object({
  excl_vat: z.number().nonnegative(),
  incl_vat: z.number().nonnegative().nullish(),
})

export const TokenType = z.enum(["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]);

export const DisplayText = z.object({
  language: z.string().length(2),
  text: z.string().max(512),
});
