import {z} from "zod";

import {
    TokenType
} from "./ocpi.common.v22";
import { ConnectorFormat, ConnectorType, GeoLocation, PowerType } from "./ocpi.location.v22";
import { Price } from "./ocpi.common.v22";
import { Tariff } from "./ocpi.tariff.v22";

export const AuthMethod = z.enum(["AUTH_REQUEST", "COMMAND", "WHITELIST"]);

const CdrDimensionType = z.enum([
    "CURRENT",
    "ENERGY",
    "ENERGY_EXPORT",
    "ENERGY_IMPORT",
    "MAX_CURRENT",
    "MIN_CURRENT",
    "MAX_POWER",
    "MIN_POWER",
    "PARKING_TIME",
    "POWER",
    "RESERVATION_TIME",
    "STATE_OF_CHARGE",
    "TIME",
  ]);

export const CdrDimension = z.object({
    type: CdrDimensionType,
    volume: z.number(),
  });

export const CdrToken = z.object({
    uid: z.string().max(36),
    type: TokenType.nullish(),
    contract_id: z.string().max(36),
})

export const CdrLocation = z.object({
    id: z.string().max(36),
    name: z.string().max(255).nullish(),
    address: z.string().max(45),
    city: z.string().max(45),
    postal_code: z.string().max(10),
    country: z.string().length(3),
    coordinates: GeoLocation,
    evse_uid: z.string().max(36),
    evse_id: z.string().max(48).regex(/^(([A-Z]{2}\*?[A-Z0-9]{3}\*?E[A-Z0-9\*]{1,30})|(\+?[0-9]{1,3}\*[0-9]{3}\*[0-9\*]{1,32}))$/),
    connector_id: z.string().max(36),
    connector_standard: ConnectorType,
    connector_format: ConnectorFormat,
    connector_power_type: PowerType,
})

export const ChargingPeriod = z.object({
    start_date_time: z.date(),
    dimensions: z.array(CdrDimension).nonempty(),
    tariff_id: z.string().max(36).nullish(),
})

export const SignedValue = z.object({
    nature: z.string().max(32),
    plain_data: z.string().max(512),
    signed_data: z.string().max(512)
  })
  
  export const SignedData = z.object({
    encoding_method: z.string().max(36),
    encoding_method_version: z.number().int().nullish(),
    public_key: z.string().max(512).nullish(),
    signed_values: z.array(SignedValue).nonempty(),
    url: z.string().max(512).nullish()
  })

export const Cdr = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    id: z.string().max(39),
    start_date_time: z.date(),
    end_date_time: z.date(),
    session_id: z.string().max(36).nullish(),
    cdr_token: CdrToken,
    auth_method: AuthMethod,
    authorization_reference: z.string().max(36).nullish(),
    cdr_location: CdrLocation,
    meter_id: z.string().max(255).nullish(),
    currency: z.string().length(3),
    tariffs: z.array(Tariff).nullish(),
    charging_periods: z.array(ChargingPeriod).nonempty(),
    signed_data: SignedData.nullish(),
    total_cost: Price,
    total_fixed_cost: Price.nullish(),
    total_energy: z.number().nonnegative(),
    total_energy_cost: Price.nullish(),
    total_time: z.number().nonnegative(),
    total_time_cost: Price.nullish(),
    total_parking_time: z.number().nonnegative().nullish(),
    total_parking_cost: Price.nullish(),
    total_reservation_cost: Price.nullish(),
    remark: z.string().max(255).nullish(),
    invoice_reference_id: z.string().max(39).nullish(),
    credit: z.boolean().nullish(),
    credit_reference_id: z.string().max(39).nullish(),
    last_updated: z.date(),
  });
  
  export const Cdrs = z.array(Cdr);
