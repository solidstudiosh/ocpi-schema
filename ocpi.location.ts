import { z } from "zod";
import {
  BusinessDetails,
  DisplayText,
  GeoLocation,
  Image,
} from "./ocpi.common";

const ConnectorFormat = z.enum(["SOCKET", "CABLE"]);
const PowerType = z.enum(["AC_1_PHASE", "AC_3_PHASE", "DC"]);
const ConnectorType = z.enum([
  "CHADEMO",
  "DOMESTIC_A",
  "DOMESTIC_B",
  "DOMESTIC_C",
  "DOMESTIC_D",
  "DOMESTIC_E",
  "DOMESTIC_F",
  "DOMESTIC_G",
  "DOMESTIC_H",
  "DOMESTIC_I",
  "DOMESTIC_J",
  "DOMESTIC_K",
  "DOMESTIC_L",
  "IEC_60309_2_single_16",
  "IEC_60309_2_three_16",
  "IEC_60309_2_three_32",
  "IEC_60309_2_three_64",
  "IEC_62196_T1",
  "IEC_62196_T1_COMBO",
  "IEC_62196_T2",
  "IEC_62196_T2_COMBO",
  "IEC_62196_T3A",
  "IEC_62196_T3C",
  "TESLA_R",
  "TESLA_S",
]);

export const Connector = z.object({
  id: z.string().max(36),
  standard: ConnectorType,
  format: ConnectorFormat,
  power_type: PowerType,
  voltage: z.number().int(),
  amperage: z.number().int(),
  tariff_id: z.string().max(36).nullish(),
  terms_and_conditions: z.string().url().nullish(),
  last_updated: z.date(),
});

const EvseStatus = z.enum([
  "AVAILABLE",
  "BLOCKED",
  "CHARGING",
  "INOPERATIVE",
  "OUTOFORDER",
  "PLANNED",
  "REMOVED",
  "RESERVED",
  "UNKNOWN",
]);

const StatusSchedule = z.object({
  period_begin: z.date(),
  period_end: z.date().nullish(),
  status: EvseStatus,
});

const Capability = z.enum([
  "CHARGING_PROFILE_CAPABLE",
  "CREDIT_CARD_PAYABLE",
  "REMOTE_START_STOP_CAPABLE",
  "RESERVABLE",
  "RFID_READER",
  "UNLOCK_CAPABLE",
]);

const ParkingRestriction = z.enum([
  "EV_ONLY",
  "PLUGGED",
  "DISABLED",
  "CUSTOMERS",
  "MOTORCYCLES",
]);

export const Evse = z.object({
  uid: z.string().max(39),
  evse_id: z.string().max(48).regex(/^(([A-Z]{2}\*?[A-Z0-9]{3}\*?E[A-Z0-9\*]{1,30})|(\+?[0-9]{1,3}\*[0-9]{3}\*[0-9\*]{1,32}))$/).nullish(),
  status: EvseStatus,
  status_schedule: z.array(StatusSchedule).nullish(),
  capabilities: z.array(Capability).nullish(),
  connectors: z.array(Connector).nonempty(),
  floor_level: z.string().max(4).nullish(),
  coordinates: GeoLocation.nullish(),
  physical_reference: z.string().max(16).nullish(),
  directions: z.array(DisplayText).nullish(),
  parking_restrictions: z.array(ParkingRestriction).nullish(),
  images: z.array(Image).nullish(),
  last_updated: z.date(),
});

const LocationType = z.enum([
  "ON_STREET",
  "PARKING_GARAGE",
  "UNDERGROUND_GARAGE",
  "PARKING_LOT",
  "OTHER",
  "UNKNOWN",
]);

const AdditionalGeoLocation = z.object({
  latitude: z
    .string()
    .max(10)
    .regex(/-?[0-9]{1,2}\.[0-9]{6}/),
  longitude: z
    .string()
    .max(11)
    .regex(/-?[0-9]{1,3}\.[0-9]{6}/),
  name: DisplayText.nullish(),
});

const Facility = z.enum([
  "HOTEL",
  "RESTAURANT",
  "CAFE",
  "MALL",
  "SUPERMARKET",
  "SPORT",
  "RECREATION_AREA",
  "NATURE",
  "MUSEUM",
  "BUS_STOP",
  "TAXI_STAND",
  "TRAIN_STATION",
  "AIRPORT",
  "CARPOOL_PARKING",
  "FUEL_STATION",
  "WIFI",
]);

const ExceptionalPeriod = z.object({
  period_begin: z.date(),
  period_end: z.date(),
});

const RegularHours = z.object({
  weekday: z.number().int().min(1).max(7),
  period_begin: z
    .string()
    .length(5)
    .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
  period_end: z
    .string()
    .length(5)
    .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
});

const Hours = z.object({
  regular_hours: z.array(RegularHours).nullish(),
  twentyfourseven: z.boolean(),
  exceptional_openings: z.array(ExceptionalPeriod).nullish(),
  exceptional_closings: z.array(ExceptionalPeriod).nullish(),
});

const EnergySourceCategory = z.enum([
  "NUCLEAR",
  "GENERAL_FOSSIL",
  "COAL",
  "GAS",
  "GENERAL_GREEN",
  "SOLAR",
  "WIND",
  "WATER",
]);

const EnergySource = z.object({
  source: EnergySourceCategory,
  percentage: z.number().min(0).max(100),
});

const EnvironmentalImpactCategory = z.enum(["NUCLEAR_WASTE", "CARBON_DIOXIDE"]);

const EnvironmentalImpact = z.object({
  source: EnvironmentalImpactCategory,
  amount: z.number(),
});

export const EnergyMix = z.object({
  is_green_energy: z.boolean(),
  energy_sources: z.array(EnergySource).nullish(),
  environ_impact: z.array(EnvironmentalImpact).nullish(),
  supplier_name: z.string().max(64).nullish(),
  energy_product_name: z.string().max(64).nullish(),
});

export const Location = z.object({
  id: z.string().max(39),
  type: LocationType,
  name: z.string().max(255).nullish(),
  address: z.string().max(45),
  city: z.string().max(45),
  postal_code: z.string().max(10),
  country: z.string().length(3),
  coordinates: GeoLocation,
  related_locations: z.array(AdditionalGeoLocation).nullish(),
  evses: z.array(Evse).nullish(),
  directions: z.array(DisplayText).nullish(),
  operator: BusinessDetails.nullish(),
  suboperator: BusinessDetails.nullish(),
  owner: BusinessDetails.nullish(),
  facilities: z.array(Facility).nullish(),
  time_zone: z.string().max(255).nullish(),
  opening_times: Hours.nullish(),
  charging_when_closed: z.boolean().nullish(),
  images: z.array(Image).nullish(),
  energy_mix: EnergyMix.nullish(),
  last_updated: z.date(),
});

export const Locations = z.array(Location);
