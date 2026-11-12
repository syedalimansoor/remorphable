export function withBase(path: string) {
  const configuredBase = import.meta.env.BASE_URL;
  const base = configuredBase.endsWith("/")
    ? configuredBase
    : `${configuredBase}/`;
  return `${base}${path.replace(/^\/+/, "")}`;
}
