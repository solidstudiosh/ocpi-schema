import { z } from "zod";
import { createOpenEnum } from "./ocpi.common.v23";

const OcpiVersionNumber = createOpenEnum(["2.0", "2.1", "2.1.1", "2.2", "2.2.1" ,"2.3"]);

export const OcpiVersion = z.object({
  version: OcpiVersionNumber,
  url: z.string().url(),
});

export const OcpiVersions = z.array(OcpiVersion);

export const OcpiModuleId = createOpenEnum([
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
  "RECEIVER",
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
