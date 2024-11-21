const sessionStorageKey = "treeName";

export const getTreeNameFromSS = (): string | null => {
  return sessionStorage.getItem(sessionStorageKey);
};

export const setTreeNameToSS = (value: string): void => {
  sessionStorage.setItem(sessionStorageKey, value);
};
