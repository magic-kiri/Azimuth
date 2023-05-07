function parseValue(v: string): string | number | boolean {
  if (v === "") {
    return true;
  } else if (v === "true") {
    return true;
  } else if (v === "false") {
    return false;
  } else if (!isNaN(Number(v))) {
    return +v;
  }
  return v;
}

export const parseParams = (url: string) => {
  const u = new URL(url);
  const po: Record<string, string | number | boolean> = {};
  for (const p of u.searchParams) {
    po[p[0]] = parseValue(p[1]);
  }
  return po;
};
