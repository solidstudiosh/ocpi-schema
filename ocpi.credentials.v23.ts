import { z } from "zod";
import { BusinessDetails } from "./ocpi.common";

// HUB was removed from Role in 2.3.0 and replaced by hub_party_id on Credentials.
export const Role = z.enum([
  "CPO",
  "EMSP",
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
  hub_party_id: z.string().max(5).optional(),
  roles: z.array(CredentialsRole).nonempty()
});
