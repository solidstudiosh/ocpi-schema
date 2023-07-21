import { z } from "zod";
import { BusinessDetails } from "./ocpi.common";

export const OcpiCredentials = z.object({
  token: z.string().max(64),
  url: z.string().url(),
  business_details: BusinessDetails,
  party_id: z.string().length(3),
  country_code: z.string().length(2),
});
