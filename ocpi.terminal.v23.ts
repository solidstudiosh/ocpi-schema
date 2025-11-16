import { z } from "zod";
import { GeoLocation } from "./ocpi.location.v23";

export const InvoiceCreator = z.enum(["CPO", "PTP"]);

export const Terminal = z.object({
  terminal_id: z.string().max(36),
  customer_reference: z.string().max(36).nullish(),
  party_id: z.string().max(3).nullish(),
  country_code: z.string().max(2).nullish(),
  address: z.string().max(45).nullish(),
  city: z.string().max(45).nullish(),
  postal_code: z.string().max(10).nullish(),
  state: z.string().max(20).nullish(),
  country: z.string().max(3).nullish(),
  coordinates: GeoLocation.nullish(),
  invoice_base_url: z.string().url().nullish(),
  invoice_creator: InvoiceCreator.nullish(),
  reference: z.string().max(36).nullish(),
  location_ids: z.array(z.string().max(36).nullish()).nullish(),
  evse_uids: z.array(z.string().max(36).nullish()).nullish(),
  last_updated: z.date(),
});

// https://github.com/ocpi/ocpi/blob/release-2.3.0-bugfixes/mod_payments.asciidoc#request-body-1
export const TerminalWithOptionalId = Terminal.extend({
    terminal_id: z.string().max(36).nullish(),
});

export const Terminals = z.array(Terminal);
