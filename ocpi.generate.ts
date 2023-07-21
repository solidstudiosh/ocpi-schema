import zodToJsonSchema from "zod-to-json-schema";
import fs from "fs";
import { Connector, Evse, Location, Locations } from "./ocpi.location";
import {
  Token as TokenV22,
  Tokens as TokensV22
} from "./ocpi.tokens.v22";
import {
  Token as TokenV221,
  Tokens as TokensV221
} from "./ocpi.tokens.v221";
import {
  Connector as ConnectorV22,
  Evse as EvseV22,
  Location as LocationV22,
  Locations as LocationsV22
} from "./ocpi.location.v22";
import {
  Connector as ConnectorV221,
  Evse as EvseV221,
  Location as LocationV221,
  Locations as LocationsV221
} from "./ocpi.location.v221";
import {
  Session as SessionV22,
  Sessions as SessionsV22,
} from "./ocpi.sessions.v22";
import {
  Session as SessionV221,
  Sessions as SessionsV221,
} from "./ocpi.sessions.v221"
import {
  Cdr as CdrV22,
  Cdrs as CdrsV22,
} from "./ocpi.cdrs.v22";
import {
  Cdr as CdrV221,
  Cdrs as CdrsV221,
} from "./ocpi.cdrs.v221";
import {
  Tariff as TariffV22,
  Tariffs as TariffsV22,
} from "./ocpi.tariff.v22";
import {
  Tariff as TariffV221,
  Tariffs as TariffsV221,
} from "./ocpi.tariff.v221";
import {
  OcpiEmpty,
  OcpiErrorResponse,
  ocpiSuccessResponse,
} from "./ocpi.common";
import { Session, Sessions } from "./ocpi.session";
import { ZodTypeAny } from "zod";
import { OcpiVersionDetails, OcpiVersions } from "./ocpi.version";
import { OcpiVersionDetails as OcpiVersionDetailsV22, OcpiVersions as OcpiVersionsV22 } from "./ocpi.versions.v22";
import { OcpiVersionDetails as OcpiVersionDetailsV221, OcpiVersions as OcpiVersionsV221 } from "./ocpi.versions.v221";
import { OcpiCredentials } from "./ocpi.credentials";
import { OcpiCredentials as OcpiCredentialsV22 } from "./ocpi.credentials.v22";
import { OcpiCredentials as OcpiCredentialsV221 } from "./ocpi.credentials.v221";
import { Cdr, Cdrs } from "./ocpi.cdr";
import { Tariff, Tariffs } from "./ocpi.tariff";
import { Token, Tokens } from "./ocpi.tokens";
import {
  CommandResponse,
  ReserveNowCommand,
  StartSessionCommand,
  StopSessionCommand,
  UnlockConnectorCommand,
} from "./ocpi.commands";
import {
  CommandResponse as CommandResponseV22,
  CommandResult as CommandResultV22,
  ReserveNowCommand as ReserveNowCommandV22,
  CancelReservationCommand as CancelReservationCommandV22,
  StartSessionCommand as StartSessionCommandV22,
  StopSessionCommand as StopSessionCommandV22,
  UnlockConnectorCommand as UnlockConnectorCommandV22
} from "./ocpi.commands.v22";
import {
  CommandResponse as CommandResponseV221,
  CommandResult as CommandResultV221,
  ReserveNowCommand as ReserveNowCommandV221,
  CancelReservationCommand as CancelReservationCommandV221,
  StartSessionCommand as StartSessionCommandV221,
  StopSessionCommand as StopSessionCommandV221,
  UnlockConnectorCommand as UnlockConnectorCommandV221
} from "./ocpi.commands.v221";

import { ocpiDeepPartial } from "./ocpi.utils";

import {
  ActiveChargingProfile,
  ActiveChargingProfileResult,
  ChargingProfileResponse,
  ChargingProfileResult, ClearProfileResult,
  SetChargingProfile
} from "./ocpi.chargingprofiles.v22";
import {
  ActiveChargingProfile as ActiveChargingProfileV221,
  ActiveChargingProfileResult as ActiveChargingProfileResultV221,
  ChargingProfileResponse as ChargingProfileResponseV221,
  ChargingProfileResult as ChargingProfileResultV221, 
  ClearProfileResult as ClearProfileResultV221,
  SetChargingProfile as SetChargingProfileV221 
} from "./ocpi.chargingprofiles.v221";

import {ClientInfo, ClientInfos} from "./ocpi.hubclientinfo.v22";
import {
  ClientInfo as ClientInfoV221, 
  ClientInfos as ClientInfosV221
} from "./ocpi.hubclientinfo.v221";

const OCPI_SCHEMA_DIR = ".ocpi-schema";

const saveSchema = (schemaName: string, schema: ZodTypeAny) => {
  if (!fs.existsSync(OCPI_SCHEMA_DIR)) {
    fs.mkdirSync(OCPI_SCHEMA_DIR);
  }
  fs.writeFileSync(
    `${OCPI_SCHEMA_DIR}/${schemaName}.json`,
    JSON.stringify(zodToJsonSchema(schema, schemaName), null, 2),
  );
};

saveSchema("ocpi.2_1_1.empty", OcpiEmpty);

/* Versions */
saveSchema("ocpi.2_1_1.versions", OcpiVersions);
saveSchema("ocpi.2_1_1.versions.response", ocpiSuccessResponse(OcpiVersions));

/* Version details */
saveSchema("ocpi.2_1_1.version_details", OcpiVersionDetails);
saveSchema(
  "ocpi.2_1_1.version_details.response",
  ocpiSuccessResponse(OcpiVersionDetails),
);

/* Versions 2.2 */
saveSchema("ocpi.2_2.versions", OcpiVersionsV22);
saveSchema("ocpi.2_2.versions.response", ocpiSuccessResponse(OcpiVersionsV22));

/* Version details 2.2 */
saveSchema("ocpi.2.2.version_details", OcpiVersionDetailsV22);
saveSchema(
    "ocpi.2_2.version_details.response",
    ocpiSuccessResponse(OcpiVersionDetailsV22),
);

/* Versions 2.2.1 */
saveSchema("ocpi.2_2_1.versions", OcpiVersionsV221);
saveSchema("ocpi.2_2_1.versions.response", ocpiSuccessResponse(OcpiVersionsV221));

/* Version details 2.2.1 */
saveSchema("ocpi.2_2_1.version_details", OcpiVersionDetailsV221);
saveSchema(
  "ocpi.2_2_1.version_details.response",
  ocpiSuccessResponse(OcpiVersionDetailsV221),
);

/* Credentials */
saveSchema("ocpi.2_1_1.credentials", OcpiCredentials);
saveSchema(
  "ocpi.2_1_1.credentials.response",
  ocpiSuccessResponse(OcpiCredentials),
);

/* Credentials 2.2 */
saveSchema("ocpi.2_2.credentials", OcpiCredentialsV22);
saveSchema(
  "ocpi.2_2.credentials.response",
  ocpiSuccessResponse(OcpiCredentialsV22),
);

/* Credentials 2.2.1 */
saveSchema("ocpi.2_2_1.credentials", OcpiCredentialsV221);
saveSchema(
  "ocpi.2_2_1.credentials.response",
  ocpiSuccessResponse(OcpiCredentialsV221),
);

/* Locations */
saveSchema("ocpi.2_1_1.locations", Locations);
saveSchema("ocpi.2_1_1.locations.response", ocpiSuccessResponse(Locations));
saveSchema("ocpi.2_1_1.location", Location);
saveSchema("ocpi.2_1_1.location.partial", ocpiDeepPartial(Location));
saveSchema("ocpi.2_1_1.location.response", ocpiSuccessResponse(Location));
saveSchema("ocpi.2_1_1.evse", Evse);
saveSchema("ocpi.2_1_1.evse.partial", ocpiDeepPartial(Evse));
saveSchema("ocpi.2_1_1.evse.response", ocpiSuccessResponse(Evse));
saveSchema("ocpi.2_1_1.connector", Connector);
saveSchema("ocpi.2_1_1.connector.partial", ocpiDeepPartial(Connector));
saveSchema("ocpi.2_1_1.connector.response", ocpiSuccessResponse(Connector));

/* Locations 2.2 */
saveSchema("ocpi.2_2.locations", LocationsV22);
saveSchema("ocpi.2_2.locations.response", ocpiSuccessResponse(LocationsV22));
saveSchema("ocpi.2_2.location", LocationV22);
saveSchema("ocpi.2_2.location.partial", ocpiDeepPartial(LocationV22));
saveSchema("ocpi.2_2.location.response", ocpiSuccessResponse(LocationV22));
saveSchema("ocpi.2_2.evse", EvseV22);
saveSchema("ocpi.2_2.evse.partial", ocpiDeepPartial(EvseV22));
saveSchema("ocpi.2_2.evse.response", ocpiSuccessResponse(EvseV22));
saveSchema("ocpi.2_2.connector", ConnectorV22);
saveSchema("ocpi.2_2.connector.partial", ocpiDeepPartial(ConnectorV22));
saveSchema("ocpi.2_2.connector.response", ocpiSuccessResponse(ConnectorV22));

/* Locations 2.2.1 */
saveSchema("ocpi.2_2_1.locations", LocationsV221);
saveSchema("ocpi.2_2_1.locations.response", ocpiSuccessResponse(LocationsV221));
saveSchema("ocpi.2_2_1.location", LocationV221);
saveSchema("ocpi.2_2_1.location.partial", ocpiDeepPartial(LocationV221));
saveSchema("ocpi.2_2_1.location.response", ocpiSuccessResponse(LocationV221));
saveSchema("ocpi.2_2_1.evse", EvseV221);
saveSchema("ocpi.2_2_1.evse.partial", ocpiDeepPartial(EvseV221));
saveSchema("ocpi.2_2_1.evse.response", ocpiSuccessResponse(EvseV221));
saveSchema("ocpi.2_2_1.connector", ConnectorV221);
saveSchema("ocpi.2_2_1.connector.partial", ocpiDeepPartial(ConnectorV221));
saveSchema("ocpi.2_2_1.connector.response", ocpiSuccessResponse(ConnectorV221));

/* Sessions */
saveSchema("ocpi.2_1_1.sessions", Sessions);
saveSchema("ocpi.2_1_1.sessions.response", ocpiSuccessResponse(Sessions));
saveSchema("ocpi.2_1_1.session", Session);
saveSchema("ocpi.2_1_1.session.partial", ocpiDeepPartial(Session));
saveSchema("ocpi.2_1_1.session.response", ocpiSuccessResponse(Session));

/* Sessions 2.2 */
saveSchema("ocpi.2_2.sessions", SessionsV22);
saveSchema("ocpi.2_2.sessions.response", ocpiSuccessResponse(SessionsV22));
saveSchema("ocpi.2_2.session", SessionV22);
saveSchema("ocpi.2_2.session.partial", ocpiDeepPartial(SessionV22));
saveSchema("ocpi.2_2.session.response", ocpiSuccessResponse(SessionV22));

/* Sessions 2.2.1 */
saveSchema("ocpi.2_2_1.sessions", SessionsV221);
saveSchema("ocpi.2_2_1.sessions.response", ocpiSuccessResponse(SessionsV221));
saveSchema("ocpi.2_2_1.session", SessionV221);
saveSchema("ocpi.2_2_1.session.partial", ocpiDeepPartial(SessionV221));
saveSchema("ocpi.2_2_1.session.response", ocpiSuccessResponse(SessionV221));

/* CDRs */
saveSchema("ocpi.2_1_1.cdrs", Cdrs);
saveSchema("ocpi.2_1_1.cdrs.response", ocpiSuccessResponse(Cdrs));
saveSchema("ocpi.2_1_1.cdr", Cdr);
saveSchema("ocpi.2_1_1.cdr.partial", ocpiDeepPartial(Cdr));
saveSchema("ocpi.2_1_1.cdr.response", ocpiSuccessResponse(Cdr));

/* CDRs 2.2 */
saveSchema("ocpi.2_2.cdrs", CdrsV22);
saveSchema("ocpi.2_2.cdrs.response", ocpiSuccessResponse(CdrsV22));
saveSchema("ocpi.2_2.cdr", CdrV22);
saveSchema("ocpi.2_2.cdr.partial", ocpiDeepPartial(CdrV22));
saveSchema("ocpi.2_2.cdr.response", ocpiSuccessResponse(CdrV22));

/* CDRs 2.2.1 */
saveSchema("ocpi.2_2_1.cdrs", CdrsV221);
saveSchema("ocpi.2_2_1.cdrs.response", ocpiSuccessResponse(CdrsV221));
saveSchema("ocpi.2_2_1.cdr", CdrV221);
saveSchema("ocpi.2_2_1.cdr.partial", ocpiDeepPartial(CdrV221));
saveSchema("ocpi.2_2_1.cdr.response", ocpiSuccessResponse(CdrV221));

/* Charging Profiles 2.2 */
saveSchema("ocpi.2_2.chargingprofiles", SetChargingProfile);
saveSchema("ocpi.2_2.chargingprofiles.active", ActiveChargingProfile);
saveSchema("ocpi.2_2.chargingprofiles.response", ocpiSuccessResponse(ChargingProfileResponse));
saveSchema("ocpi.2_2.chargingprofiles.active_charging_profile.result", ActiveChargingProfileResult);
saveSchema("ocpi.2_2.chargingprofiles.charging_profile.result", ChargingProfileResult);
saveSchema("ocpi.2_2.chargingprofiles.clear_profile.result", ClearProfileResult);

/* Charging Profiles 2.2.1 */
saveSchema("ocpi.2_2_1.chargingprofiles", SetChargingProfileV221);
saveSchema("ocpi.2_2_1.chargingprofiles.active", ActiveChargingProfileV221);
saveSchema("ocpi.2_2_1.chargingprofiles.response", ocpiSuccessResponse(ChargingProfileResponseV221));
saveSchema("ocpi.2_2_1.chargingprofiles.active_charging_profile.result", ActiveChargingProfileResultV221);
saveSchema("ocpi.2_2_1.chargingprofiles.charging_profile.result", ChargingProfileResultV221);
saveSchema("ocpi.2_2_1.chargingprofiles.clear_profile.result", ClearProfileResultV221);

/* Hub Client Info 2.2 */
saveSchema("ocpi.2_2.hubclientinfo", ClientInfo);
saveSchema("ocpi.2_2.hubclientinfo.response", ocpiSuccessResponse(ClientInfo));
saveSchema("ocpi.2_2.hubclientinfos", ocpiSuccessResponse(ClientInfos));

/* Hub Client Info 2.2.1 */
saveSchema("ocpi.2_2_1.hubclientinfo", ClientInfoV221);
saveSchema("ocpi.2_2_1.hubclientinfo.response", ocpiSuccessResponse(ClientInfoV221));
saveSchema("ocpi.2_2_1.hubclientinfos", ocpiSuccessResponse(ClientInfosV221));

/* Tariffs */
saveSchema("ocpi.2_1_1.tariffs", Tariffs);
saveSchema("ocpi.2_1_1.tariffs.response", ocpiSuccessResponse(Tariffs));
saveSchema("ocpi.2_1_1.tariff", Tariff);
saveSchema("ocpi.2_1_1.tariff.partial", ocpiDeepPartial(Tariff));
saveSchema("ocpi.2_1_1.tariff.response", ocpiSuccessResponse(Tariff));

/* Tariffs 2.2 */
saveSchema("ocpi.2_2.tariffs", TariffsV22);
saveSchema("ocpi.2_2.tariffs.response", ocpiSuccessResponse(TariffsV22));
saveSchema("ocpi.2_2.tariff", TariffV22);
saveSchema("ocpi.2_2.tariff.partial", ocpiDeepPartial(TariffV22));
saveSchema("ocpi.2_2.tariff.response", ocpiSuccessResponse(TariffV22));

/* Tariffs 2.2.1 */
saveSchema("ocpi.2_2_1.tariffs", TariffsV221);
saveSchema("ocpi.2_2_1.tariffs.response", ocpiSuccessResponse(TariffsV221));
saveSchema("ocpi.2_2_1.tariff", TariffV221);
saveSchema("ocpi.2_2_1.tariff.partial", ocpiDeepPartial(TariffV221));
saveSchema("ocpi.2_2_1.tariff.response", ocpiSuccessResponse(TariffV221));

/* Tokens */
saveSchema("ocpi.2_1_1.tokens", Tokens);
saveSchema("ocpi.2_1_1.tokens.response", ocpiSuccessResponse(Tokens));
saveSchema("ocpi.2_1_1.token", Token);
saveSchema("ocpi.2_1_1.token.partial", ocpiDeepPartial(Token));
saveSchema("ocpi.2_1_1.token.response", ocpiSuccessResponse(Token));

/* Tokens 2.2 */
saveSchema("ocpi.2_2.tokens", TokensV22);
saveSchema("ocpi.2_2.tokens.response", ocpiSuccessResponse(TokensV22));
saveSchema("ocpi.2_2.token", TokenV22);
saveSchema("ocpi.2_2.token.partial", ocpiDeepPartial(TokenV22));
saveSchema("ocpi.2_2.token.response", ocpiSuccessResponse(TokenV22));

/* Tokens 2.2 */
saveSchema("ocpi.2_2_1.tokens", TokensV221);
saveSchema("ocpi.2_2_1.tokens.response", ocpiSuccessResponse(TokensV221));
saveSchema("ocpi.2_2_1.token", TokenV221);
saveSchema("ocpi.2_2_1.token.partial", ocpiDeepPartial(TokenV221));
saveSchema("ocpi.2_2_1.token.response", ocpiSuccessResponse(TokenV221));

/* Commands */
saveSchema("ocpi.2_1_1.commands.reserve_now.request", ReserveNowCommand);
saveSchema("ocpi.2_1_1.commands.start_session.request", StartSessionCommand);
saveSchema("ocpi.2_1_1.commands.stop_session.request", StopSessionCommand);
saveSchema(
  "ocpi.2_1_1.commands.unlock_connector.request",
  UnlockConnectorCommand,
);
saveSchema(
  "ocpi.2_1_1.commands.response",
  ocpiSuccessResponse(CommandResponse),
);

/* Commands 2.2*/
saveSchema("ocpi.2_2.commands.reserve_now.request", ReserveNowCommandV22);
saveSchema("ocpi.2_2.commands.cancel_reservation.request", CancelReservationCommandV22);
saveSchema("ocpi.2_2.commands.start_session.request", StartSessionCommandV22);
saveSchema("ocpi.2_2.commands.stop_session.request", StopSessionCommandV22);
saveSchema("ocpi.2_2.commands.unlock_connector.request", UnlockConnectorCommandV22);
saveSchema("ocpi.2_2.commands.response", ocpiSuccessResponse(CommandResponseV22));
saveSchema("ocpi.2_2.commands.result", CommandResultV22);

/* Commands 2.2.1 */
saveSchema("ocpi.2_2_1.commands.reserve_now.request", ReserveNowCommandV221);
saveSchema("ocpi.2_2_1.commands.cancel_reservation.request", CancelReservationCommandV221);
saveSchema("ocpi.2_2_1.commands.start_session.request", StartSessionCommandV221);
saveSchema("ocpi.2_2_1.commands.stop_session.request", StopSessionCommandV221);
saveSchema("ocpi.2_2_1.commands.unlock_connector.request", UnlockConnectorCommandV221);
saveSchema("ocpi.2_2_1.commands.response", ocpiSuccessResponse(CommandResponseV221));
saveSchema("ocpi.2_2_1.commands.result", CommandResultV221);

/* Errors */
saveSchema("ocpi.error", OcpiErrorResponse);
