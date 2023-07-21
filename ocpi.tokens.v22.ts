import {z} from "zod";
import { TokenType } from "./ocpi.common.v22";
import { ProfileType } from "./ocpi.sessions.v22";

const WhitelistType = z.enum(["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]);

const EnergyContract = z.object({
    supplier_name: z.string().max(64),
    contract_id: z.string().max(64).nullish(),
})

export const LocationReferences = z.object({
    location_id: z.string().max(36).nullish(),
    evse_uids: z.array(z.string().max(36)).nullish(),
})

export const Token = z.object({
    country_code: z.string().length(2),
    party_id: z.string().max(3),
    uid: z.string().max(36),
    type: TokenType,
    contract_id: z.string().max(36),
    visual_number: z.string().max(64).nullish(),
    issuer: z.string().max(64),
    group_id: z.string().max(36).nullish(),
    valid: z.boolean(),
    whitelist: WhitelistType,
    language: z.string().length(2).nullish(),
    default_profile_type: ProfileType.nullish(),
    energy_contract: EnergyContract.nullish(),
    last_updated: z.date(),
}) 

export const Tokens = z.array(Token);
