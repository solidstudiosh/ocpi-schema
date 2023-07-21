import { z, ZodTypeAny } from "zod";

export const GeoLocation = z.object({
  latitude: z
    .string()
    .max(10)
    .regex(/-?[0-9]{1,2}\.[0-9]{6}/),
  longitude: z
    .string()
    .max(11)
    .regex(/-?[0-9]{1,3}\.[0-9]{6}/),
});

export const DisplayText = z.object({
  language: z.string().length(2),
  text: z.string().max(512),
});

export const ImageCategory = z.enum([
  "CHARGER",
  "ENTRANCE",
  "LOCATION",
  "NETWORK",
  "OPERATOR",
  "OTHER",
  "OWNER",
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

export const ocpiSuccessResponse = (dataSchema: ZodTypeAny) =>
  z.object({
    data: dataSchema,
    status_code: z.number().int().min(1000).max(1999),
    status_message: z.string().nullish(),
    timestamp: z.date(),
  });

export const OcpiErrorResponse = z.object({
  data: z.any().nullish(),
  status_code: z.number().int().min(2000).max(4999),
  status_message: z.string().nullish(),
  timestamp: z.date(),
});

export const OcpiEmpty = z.void();
