import { z } from "zod";

const OcpiVersionNumber = z.enum(["2.0", "2.1", "2.1.1", "2.2", "2.2.1", "2.3.0"]);

export const OcpiVersion = z.object({
  version: OcpiVersionNumber,
  url: z.string().url(),
});

export const OcpiVersions = z.array(OcpiVersion);

// ModuleID is an OpenEnum in 2.3.0, so a custom identifier must not fail validation.
export const OcpiModuleId = z.union([
  z.enum([
    "cdrs",
    "chargingprofiles",
    "commands",
    "credentials",
    "hubclientinfo",
    "locations",
    "sessions",
    "tariffs",
    "tokens",
  ]),
  z.string(),
]);

export const OcpiInterfaceRole = z.enum(["SENDER", "RECEIVER"]);

const OcpiEndpoint = z.object({
  identifier: OcpiModuleId,
  role: OcpiInterfaceRole,
  url: z.string().url(),
});

export const OcpiVersionDetails = z.object({
  version: OcpiVersionNumber,
  endpoints: z.array(OcpiEndpoint).nonempty(),
});
