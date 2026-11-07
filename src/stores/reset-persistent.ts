export function clearPersistentMap(prefix: string) {
  if (typeof localStorage === "undefined") return;

  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith(prefix)) localStorage.removeItem(key);
  }
}
