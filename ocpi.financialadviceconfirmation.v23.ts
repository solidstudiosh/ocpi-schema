import { z } from "zod";
import { Price } from "./ocpi.common.v23";

export const InvoiceCreator = z.enum(["CPO", "PTP"]);

export const CaptureStatusCode = z.enum(["SUCCESS", "PARTIAL_SUCCESS", "FAILED"]);

export const FinancialAdviceConfirmation = z.object({
  id: z.string().max(36),
  authorization_reference: z.string().max(36),
  total_costs: Price,
  currency: z.string().max(3),
  eft_data: z.array(z.string().min(1).max(255)).nonempty(),
  capture_status_code: CaptureStatusCode,
  capture_status_message: z.string().min(1).max(255).nullish(),
  last_updated: z.date(),
});

export const FinancialAdviceConfirmations = z.array(FinancialAdviceConfirmation);