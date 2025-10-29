import { safeParse, type BaseSchema, type InferInput } from "valibot";
import type { Resolver } from "react-hook-form";

export function valibotResolver<TSchema extends BaseSchema<any, any, any>>(
  schema: TSchema
): Resolver<InferInput<TSchema>> {
  return async (values) => {
    const result = safeParse(schema, values as any);

    if (result.success) {
      return {
        values: result.output as any,
        errors: {},
      };
    }

    const errors: Record<string, any> = {};

    const setNestedError = (
      obj: any,
      path: string[],
      message: string,
      type: string
    ) => {
      let current = obj;
      for (let i = 0; i < path.length; i++) {
        const key = path[i];
        if (i === path.length - 1) {
          current[key] = { type, message };
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      }
    };

    for (const issue of result.issues) {
      // Usar tu mensaje personalizado si existe, si no, el default de valibot
      const message = issue.message ?? "Invalid value";
      const type = issue.code ?? "validation";

      // Convertir path de Valibot a string[]
      const path =
        Array.isArray(issue.path) && issue.path.length
          ? issue.path.map((p: any) =>
              typeof p === "string"
                ? p
                : typeof p.key === "string"
                ? p.key
                : typeof p.index !== "undefined"
                ? String(p.index)
                : String(p)
            )
          : [];

      if (path.length) {
        setNestedError(errors, path, message, type);
      } else {
        // error de nivel raíz
        errors._error = { type, message };
      }
    }

    return {
      values: {},
      errors,
    };
  };
}
