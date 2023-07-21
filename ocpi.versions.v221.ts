import { z } from "zod";

const OcpiVersionNumber = z.enum(["2.0", "2.1", "2.1.1", "2.2.1"]);

export const OcpiVersion = z.object({
  version: OcpiVersionNumber,
  url: z.string().url(),
});

export const OcpiVersions = z.array(OcpiVersion);

export const OcpiModuleId = z.enum([
  "cdrs",
  "chargingprofiles",
  "commands",
  "credentials",
  "hubclientinfo",
  "locations",
  "sessions",
  "tariffs",
  "tokens",
]);

export const OcpiInterfaceRole= z.enum([
  "SENDER",
  "RECEIVER"
]);

const OcpiEndpoint = z.object({
  identifier: OcpiModuleId,
  role: OcpiInterfaceRole,
  url: z.string().url(),
});

export const OcpiVersionDetails = z.object({
  version: OcpiVersionNumber,
  endpoints: z.array(OcpiEndpoint).nonempty(),
});
