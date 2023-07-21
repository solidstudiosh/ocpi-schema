import {
  ZodArray,
  ZodNullable,
  ZodObject,
  ZodOptional,
  ZodTuple,
  ZodTypeAny,
} from "zod";

/**
 * Custom deepPartial implementation for OCPI
 * Based on https://github.com/colinhacks/zod/blob/f455e3284f7a5cbe11259477073b15256b946133/src/types.ts#L1421
 *
 * All properties are made optional AND nullable
 */
export const ocpiDeepPartial = (schema: ZodTypeAny): any => {
  if (schema instanceof ZodObject) {
    const newShape: any = {};

    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(
        ocpiDeepPartial(fieldSchema),
      ).nullable();
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape,
    }) as any;
  } else if (schema instanceof ZodArray) {
    return ZodArray.create(ocpiDeepPartial(schema.element));
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(ocpiDeepPartial(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(ocpiDeepPartial(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(
      schema.items.map((item: any) => ocpiDeepPartial(item)),
    );
  } else {
    return schema;
  }
};
