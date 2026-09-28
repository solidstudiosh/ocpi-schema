import { z } from "zod";
import { BusinessDetails, DisplayText, Image, TokenType } from "./ocpi.common.v23";

// 2.3.0 makes several Locations enums open: an unrecognised value must not fail validation
const open = <T extends [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.string()]);

const EVSE_ID =
  /^(([A-Z]{2}\*?[A-Z0-9]{3}\*?E[A-Z0-9\*]{1,30})|(\+?[0-9]{1,3}\*[0-9]{3}\*[0-9\*]{1,32}))$/;

export const GeoLocation = z.object({
  latitude: z.string().max(10).regex(/-?[0-9]{1,2}\.[0-9]{5,7}/),
  longitude: z.string().max(11).regex(/-?[0-9]{1,3}\.[0-9]{5,7}/),
});

export const ConnectorFormat = z.enum(["SOCKET", "CABLE"]);

export const PowerType = z.enum([
  "AC_1_PHASE",
  "AC_2_PHASE",
  "AC_2_PHASE_SPLIT",
  "AC_3_PHASE",
  "DC",
]);

export const ConnectorType = open([
  "CHADEMO", "CHAOJI",
  "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F",
  "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L",
  "DOMESTIC_M", "DOMESTIC_N", "DOMESTIC_O",
  "GBT_AC", "GBT_DC",
  "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64",
  "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO",
  "IEC_62196_T3A", "IEC_62196_T3C",
  "MCS",
  "NEMA_5_20", "NEMA_6_30", "NEMA_6_50", "NEMA_10_30", "NEMA_10_50", "NEMA_14_30", "NEMA_14_50",
  "PANTOGRAPH_BOTTOM_UP", "PANTOGRAPH_TOP_DOWN",
  "SAE_J3400",
  "TESLA_R", "TESLA_S",
]);

export const ConnectorCapability = open([
  "ISO_15118_2_PLUG_AND_CHARGE",
  "ISO_15118_20_PLUG_AND_CHARGE",
]);

export const Connector = z.object({
  id: z.string().max(36),
  standard: ConnectorType,
  format: ConnectorFormat,
  power_type: PowerType,
  max_voltage: z.number().int(),
  max_amperage: z.number().int(),
  max_electric_power: z.number().int().nullish(),
  tariff_ids: z.array(z.string().max(36).nullish()).nullish(),
  terms_and_conditions: z.string().url().nullish(),
  capabilities: z.array(ConnectorCapability).nullish(),
  last_updated: z.date(),
});

const EvseStatus = z.enum([
  "AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER",
  "PLANNED", "REMOVED", "RESERVED", "UNKNOWN",
]);

const StatusSchedule = z.object({
  period_begin: z.date(),
  period_end: z.date().nullable(),
  status: EvseStatus,
});

const Capability = open([
  "CHARGING_PROFILE_CAPABLE", "CHARGING_PREFERENCES_CAPABLE", "CHIP_CARD_SUPPORT",
  "CONTACTLESS_CARD_SUPPORT", "CREDIT_CARD_PAYABLE", "DEBIT_CARD_PAYABLE", "PED_TERMINAL",
  "REMOTE_START_STOP_CAPABLE", "RESERVABLE", "RFID_READER",
  "START_SESSION_CONNECTOR_REQUIRED", "TOKEN_GROUP_CAPABLE", "UNLOCK_CAPABLE",
]);

const ParkingRestriction = open([
  "CUSTOMERS", "DISABLED", "EMPLOYEES", "EV_ONLY", "MOTORCYCLES", "PLUGGED", "TAXIS", "TENANTS",
]);

export const VehicleType = open([
  "MOTORCYCLE", "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_WITH_TRAILER", "VAN",
  "SEMI_TRACTOR", "RIGID", "TRUCK_WITH_TRAILER", "BUS", "DISABLED",
]);

export const ParkingDirection = z.enum(["PARALLEL", "PERPENDICULAR", "ANGLE"]);

export const EVSEPosition = z.enum(["LEFT", "RIGHT", "CENTER"]);

export const EVSEParking = z.object({
  parking_id: z.string().max(36),
  evse_position: EVSEPosition.nullish(),
});

export const Parking = z.object({
  id: z.string().max(36),
  physical_reference: z.string().max(12).nullish(),
  vehicle_types: z.array(VehicleType).nonempty(),
  max_vehicle_weight: z.number().nullish(),
  max_vehicle_height: z.number().nullish(),
  max_vehicle_length: z.number().nullish(),
  max_vehicle_width: z.number().nullish(),
  parking_space_length: z.number().nullish(),
  parking_space_width: z.number().nullish(),
  dangerous_goods_allowed: z.boolean().nullish(),
  direction: ParkingDirection.nullish(),
  drive_through: z.boolean().nullish(),
  restricted_to_type: z.boolean(),
  reservation_required: z.boolean(),
  time_limit: z.number().nullish(),
  roofed: z.boolean().nullish(),
  images: z.array(Image).nullish(),
  lighting: z.boolean().nullish(),
  refrigeration_outlet: z.boolean().nullish(),
  standards: z.array(z.string().max(36)).nullish(),
  apds_reference: z.string().nullish(),
});

export const Evse = z.object({
  uid: z.string().max(39),
  evse_id: z.string().max(48).regex(EVSE_ID).nullish(),
  status: EvseStatus,
  status_schedule: z.array(StatusSchedule).nullish(),
  capabilities: z.array(Capability).nullish(),
  connectors: z.array(Connector).nonempty(),
  floor_level: z.string().max(4).nullish(),
  coordinates: GeoLocation.nullish(),
  physical_reference: z.string().max(16).nullish(),
  directions: z.array(DisplayText).nullish(),
  parking_restrictions: z.array(ParkingRestriction).nullish(),
  parking: z.array(EVSEParking).nullish(),
  images: z.array(Image).nullish(),
  accepted_service_providers: z.array(z.string().max(50)).nullish(),
  last_updated: z.date(),
});

const ParkingType = open([
  "ALONG_MOTORWAY", "ON_STREET", "ON_DRIVEWAY", "PARKING_GARAGE",
  "UNDERGROUND_GARAGE", "PARKING_LOT",
]);

const AdditionalGeoLocation = z.object({
  latitude: z.string().max(10).regex(/-?[0-9]{1,2}\.[0-9]{5,7}/),
  longitude: z.string().max(11).regex(/-?[0-9]{1,3}\.[0-9]{5,7}/),
  name: DisplayText.nullish(),
});

const Facility = open([
  "HOTEL", "RESTAURANT", "CAFE", "MALL", "SUPERMARKET", "SPORT", "RECREATION_AREA",
  "NATURE", "MUSEUM", "BIKE_SHARING", "BUS_STOP", "TAXI_STAND", "TRAM_STOP",
  "METRO_STATION", "TRAIN_STATION", "AIRPORT", "PARKING_LOT", "CARPOOL_PARKING",
  "FUEL_STATION", "WIFI",
]);

const ExceptionalPeriod = z.object({
  period_begin: z.date(),
  period_end: z.date(),
});

const RegularHours = z.object({
  weekday: z.number().int().min(1).max(7),
  period_begin: z.string().length(5).regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
  period_end: z.string().length(5).regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
});

const Hours = z.object({
  regular_hours: z.array(RegularHours).nullish(),
  twentyfourseven: z.boolean(),
  exceptional_openings: z.array(ExceptionalPeriod).nullish(),
  exceptional_closings: z.array(ExceptionalPeriod).nullish(),
});

const EnergySourceCategory = z.enum([
  "NUCLEAR", "GENERAL_FOSSIL", "COAL", "GAS", "GENERAL_GREEN", "SOLAR", "WIND", "WATER",
]);

const EnergySource = z.object({
  source: EnergySourceCategory,
  percentage: z.number().min(0).max(100),
});

const EnvironmentalImpactCategory = open(["NUCLEAR_WASTE", "CARBON_DIOXIDE"]);

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

export const PublishTokenType = z.object({
  uid: z.string().max(36).nullish(),
  type: TokenType.nullish(),
  visual_number: z.string().max(64).nullish(),
  issuer: z.string().max(64).nullish(),
  group_id: z.string().max(36).nullish(),
});

export const Location = z.object({
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  id: z.string().max(36),
  publish: z.boolean(),
  publish_allowed_to: z.array(PublishTokenType).nullish(),
  name: z.string().max(255).nullish(),
  // edition 2 widened address to 255 and state to 45
  address: z.string().max(255),
  city: z.string().max(45),
  postal_code: z.string().max(10).nullish(),
  state: z.string().max(45).nullish(),
  country: z.string().length(3),
  coordinates: GeoLocation,
  related_locations: z.array(AdditionalGeoLocation).nullish(),
  parking_type: ParkingType.nullish(),
  evses: z.array(Evse).nullish(),
  parking_places: z.array(Parking).nullish(),
  directions: z.array(DisplayText).nullish(),
  operator: BusinessDetails.nullish(),
  suboperator: BusinessDetails.nullish(),
  owner: BusinessDetails.nullish(),
  facilities: z.array(Facility).nullish(),
  time_zone: z.string().max(255),
  opening_times: Hours.nullish(),
  charging_when_closed: z.boolean().nullish(),
  images: z.array(Image).nullish(),
  energy_mix: EnergyMix.nullish(),
  help_phone: z.string().max(25).nullish(),
  last_updated: z.date(),
});

export const Locations = z.array(Location);
