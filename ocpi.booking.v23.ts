import { z } from "zod";
import { TokenType } from "./ocpi.common.v23";
import { Role } from "./ocpi.credentials.v23";
import {
  ConnectorFormat,
  ConnectorType,
  EVSEPosition,
  PowerType,
  VehicleType,
} from "./ocpi.location.v23";
import { OcpiInterfaceRole } from "./ocpi.versions.v23";

// Bookings 1.1 (branch 2.3.0/release/bookings @ 6ad981f) is published on core edition 1 and layered onto 2.3.0.

const AccessMethod = z.enum([
  "OPEN",
  "TOKEN",
  "LICENSE_PLATE",
  "ACCESS_CODE",
  "INTERCOM",
  "PARKING_TICKET",
]);

const AccessInformation = z.object({
  method: AccessMethod,
  value: z.string().nullish(),
});

export const BookingOption = z.object({
  evse_uid: z.string().max(36).nullish(),
  connector_id: z.string().max(36).nullish(),
  parking_id: z.string().max(36).nullish(),
  evse_position: z.array(EVSEPosition).nullish(),
  vehicle_types: z.array(VehicleType).nullish(),
  connector_format: z.array(ConnectorFormat).nullish(),
  connector_types: z.array(ConnectorType).nullish(),
  power_types: z.array(PowerType).nullish(),
  max_vehicle_weight: z.number().nonnegative().nullish(),
  max_vehicle_height: z.number().nonnegative().nullish(),
  max_vehicle_length: z.number().nonnegative().nullish(),
  max_vehicle_width: z.number().nonnegative().nullish(),
  min_parking_space_length: z.number().nonnegative().nullish(),
  min_parking_space_width: z.number().nonnegative().nullish(),
  dangerous_goods_allowed: z.boolean().nullish(),
  drive_through: z.boolean().nullish(),
  refrigeration_outlet: z.boolean().nullish(),
});

const BookingToken = z.object({
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  uid: z.string().max(36),
  type: TokenType,
  contract_id: z.string().max(36),
});

const CanceledReason = z.enum([
  "POWER_OUTAGE",
  "BROKEN_CHARGER",
  "FULL",
  "BLOCKED",
  "TRAFFIC",
  "BROKEN_VEHICLE",
  "NO_CANCELED",
  "UNKNOWN",
]);

// The table labels who_canceled a Role but links to InterfaceRole, so both value sets are accepted.
const Cancellation = z.object({
  cancellation_reason: CanceledReason,
  who_canceled: z.union([Role, OcpiInterfaceRole]),
});

const Period = z.object({
  start_date_time: z.date(),
  end_date_time: z.date(),
});

const Timeslot = z.object({
  start_date_time: z.date(),
  end_date_time: z.date(),
  min_power: z.number().nonnegative().nullish(),
  max_power: z.number().nonnegative().nullish(),
  green_energy_support: z.boolean().nullish(),
});

const Policy = z.object({
  reservation_required: z.boolean(),
  ad_hoc: z.number().int().nonnegative().nullish(),
});

const ReservationRequestStatus = z.enum(["PENDING", "ACCEPTED", "DECLINED", "FAILED"]);

const ReservationStatus = z.enum([
  "PENDING",
  "RESERVED",
  "CANCELED",
  "FAILED",
  "NO_SHOW",
  "FULFILLED",
  "REJECTED",
  "UNKNOWN",
]);

const BookingTerms = z.object({
  rfid_auth_required: z.boolean().nullish(),
  token_groups_supported: z.boolean().nullish(),
  remote_auth_supported: z.boolean().nullish(),
  supported_access_methods: z.array(AccessMethod).nonempty(),
  change_until_minutes: z.number().nonnegative(),
  cancel_until_minutes: z.number().nonnegative(),
  change_not_allowed: z.boolean().nullish(),
  early_start_allowed: z.boolean().nullish(),
  early_start_time: z.number().nonnegative().nullish(),
  noshow_timeout: z.number().nonnegative().nullish(),
  noshow_fee: z.boolean().nullish(),
  late_stop_allowed: z.boolean().nullish(),
  late_stop_time: z.number().nonnegative().nullish(),
  overlapping_bookings_allowed: z.boolean().nullish(),
  min_booking_duration: z.number().nonnegative().nullish(),
  max_booking_duration: z.number().nonnegative().nullish(),
  booking_terms: z.string().url().nullish(),
});

export const BookingRequest = z.object({
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  request_id: z.string().max(36),
  booking_option: BookingOption.nullish(),
  location_id: z.string().max(36),
  booking_location_id: z.string().max(36),
  tokens: z.array(BookingToken).nullish(),
  access_information: z.array(AccessInformation).nullish(),
  period: Period,
  authorization_reference: z.string().max(36),
  // kW, unlike the W of Timeslot.min_power / max_power
  power_required: z.number().int().nonnegative().nullish(),
  canceled: Cancellation.nullish(),
});

const BookingRequestStatus = z.object({
  request_status: ReservationRequestStatus,
  booking_request: BookingRequest,
  request_received: z.date(),
});

export const Booking = z.object({
  id: z.string().max(36),
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  request_id: z.string().max(36),
  booking_option: BookingOption.nullish(),
  location_id: z.string().max(36),
  booking_tokens: z.array(BookingToken).nullish(),
  tariff_ids: z.array(z.string().max(36)).nullish(),
  period: Timeslot,
  reservation_status: ReservationStatus,
  canceled: Cancellation.nullish(),
  access_information: z.array(AccessInformation).nullish(),
  authorization_reference: z.string().max(36),
  booking_terms: BookingTerms,
  booking_requests: z.array(BookingRequestStatus).nonempty(),
  last_updated: z.date(),
});

export const Bookings = z.array(Booking);

export const Calendar = z.object({
  id: z.string().max(36),
  begin_from: z.date(),
  end_before: z.date(),
  timeslot_increment: z.number().int().positive().nullish(),
  available_timeslots: z.array(Timeslot).nonempty(),
  last_updated: z.date(),
});

export const BookingLocation = z.object({
  country_code: z.string().length(2),
  party_id: z.string().max(3),
  id: z.string().max(36),
  location_id: z.string().max(36),
  booking_option: BookingOption.nullish(),
  policy: Policy.nullish(),
  tariff_ids: z.array(z.string().max(36)).nullish(),
  booking_terms: BookingTerms.nullish(),
  calendars: z.array(Calendar).nullish(),
  last_updated: z.date(),
});

export const BookingLocations = z.array(BookingLocation);
