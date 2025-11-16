import { z } from "zod";
import { ConnectorFormat, EvsePosition, VehicleType } from "./ocpi.location.v23";
import { OcpiInterfaceRole } from "./ocpi.versions.v23";
import { TokenType } from "./ocpi.common.v23";

export const BookableParkingOptions = z.object({
    evse_position: EvsePosition.nullish(),
    vehicle_types: z.array(VehicleType).nonempty(),
    format: ConnectorFormat,
    max_vehicle_weight: z.number().nonnegative().nullish(),
    max_vehicle_height: z.number().nonnegative().nullish(),
    max_vehicle_length: z.number().nonnegative().nullish(),
    max_vehicle_width: z.number().nonnegative().nullish(),
    parking_space_length: z.number().nonnegative().nullish(),
    parking_space_width: z.number().nonnegative().nullish(),
    dangerous_goods_allowed: z.boolean().nullish(),
    drive_through: z.boolean().nullish(),
    restricted_to_type: z.boolean().nullish(),
    refrigeration_outlet: z.boolean().nullish(),
});

export const CanceledReason = z.enum([
    "POWER_OUTAGE",
    "BROKEN_CHARGER",
    "FULL",
    "BLOCKED",
    "TRAFFIC",
    "BROKEN_VEHICLE",
    "NO_CANCELED",
    "UNKNOWN",
]);

export const Cancellation = z.object({
    cancellation_reason: CanceledReason,
    who_canceled: OcpiInterfaceRole,
});

export const LocationAccess = z.enum([
    "OPEN",
    "TOKEN",
    "LICENSE_PLATE",
    "ACCESS_CODE",
    "INTERCOM",
    "PARKING_TICKET",
]);

export const AccessMethod = z.object({
    location_access: LocationAccess,
    value: z.string().nullish(),
});

export const ReservationRequestStatus = z.enum([
    "PENDING",
    "ACCEPTED",
    "DECLINED",
    "FAILED",
]);

export const BookingToken = z.object({
    country_code: z.string().max(2),
    party_id: z.string().max(3),
    uid: z.string().max(36).nullish(),
    type: TokenType,
    contract_id: z.string().max(36).nullish(),
});

export const Timeslot = z.object({
    start_from: z.date(),
    end_from: z.date(),
    min_power: z.number().nonnegative().nullish(),
    max_power: z.number().nonnegative().nullish(),
    green_energy_support: z.boolean().nullish(),
});

export const BookingRequest = z.object({
    country_code: z.string().max(2),
    party_id: z.string().max(3),
    request_id: z.string().max(36),
    bookable_parking_option: BookableParkingOptions.nullish(),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36).nullish(),
    connector_id: z.string().max(36).nullish(),
    tokens: z.array(BookingToken).nullish(),
    period: Timeslot,
    authorization_reference: z.string().max(36),
    power_required: z.number().int().nullish(),
    cancelled: Cancellation.nullish(),
});

export const BookingRequestStatus = z.object({
    request_status: ReservationRequestStatus,
    booking_request: BookingRequest,
    request_received: z.date(),
});

export const Bookable = z.object({
    reservation_required: z.boolean(),
    ad_hoc: z.number().nonnegative().nullish(),
});

export const BookingTerms = z.object({
    RFID_auth_required: z.boolean().nullish(),
    token_groups_supported: z.boolean().nullish(),
    remote_auth_supported: z.array(LocationAccess).nonempty(),
    supported_access_methods: z.number().nonnegative().nullish(),
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
    booking_terms: z.string().url().nullish(),
});

export const Calendar = z.object({
    id: z.string().max(36),
    begin_from: z.date(),
    end_before: z.date(),
    step_size: z.number().int().nullish(),
    available_timeslots: z.array(Timeslot).nonempty(),
    last_updated: z.date(),
});

export const BookingLocation = z.object({
    country_code: z.string().max(2),
    party_id: z.string().max(3),
    id: z.string().max(36),
    location_id: z.string().max(36),
    evse_uid: z.string().max(36).nullish(),
    connector_id: z.string().max(36).nullish(),
    bookable_parking_options: z.array(BookableParkingOptions).nullish(),
    bookable: Bookable.nullish(),
    tariff_id: z.string().max(36).nullish(),
    booking_terms: z.array(BookingTerms).nullish(),
    calendars: z.array(Calendar).nullish(),
    last_updated: z.date(),
});