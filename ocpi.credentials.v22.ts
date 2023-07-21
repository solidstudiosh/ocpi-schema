import { z } from "zod";
import { BusinessDetails } from "./ocpi.common";

export const Role = z.enum([
  "CPO",
  "EMSP",
  "HUB",
  "NAP",
  "NSP",
  "OTHER",
  "SCSP"
])

export const CredentialsRole = z.object({
  role: Role,
  business_details: BusinessDetails,
  party_id: z.string().length(3),
  country_code: z.string().length(2),
})

export const OcpiCredentials = z.object({
  token: z.string().max(64),
  url: z.string().url(),
  roles: z.array(CredentialsRole).nonempty()
});
