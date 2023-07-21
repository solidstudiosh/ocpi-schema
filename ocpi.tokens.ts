import { z } from "zod";

const TokenType = z.enum(["OTHER", "RFID"]);

const WhitelistType = z.enum(["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]);

export const Token = z.object({
  uid: z.string().max(36),
  type: TokenType,
  auth_id: z.string().max(36),
  visual_number: z.string().max(64).nullish(),
  issuer: z.string().max(64),
  valid: z.boolean(),
  whitelist: WhitelistType,
  language: z.string().length(2).nullish(),
  last_updated: z.date(),
});

export const Tokens = z.array(Token);
