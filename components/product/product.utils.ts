export function uniqueValues(
  values: Array<string | null | undefined>,
): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

export function formatDescription(
  description: string,
): string[] {
  return description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export type ParsedSpec = {
  label: string;
  value: string;
};

export function parseSpecs(
  specs?: string | null,
): ParsedSpec[] {
  if (!specs) {
    return [];
  }

  return specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");

      if (!rest.length) {
        return {
          label: line,
          value: "",
        };
      }

      return {
        label: label.trim(),
        value: rest.join(":").trim(),
      };
    });
}