const STORAGE_PREFIX = ".";

export function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
}

export function readSession(key, fallback) {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
}

export function readStorage(key, fallback) {
  let value = readSession(key, null);
  if (value === null) {
    value = readLocal(key, fallback);
  }
  return value;
}

export function writeLocal(key, value) {
  try {
    const raw = JSON.stringify(value);
    localStorage.setItem(STORAGE_PREFIX + key, raw);
  } catch {
    // Handle write error if needed
  }
}

export function writeSession(key, value) {
  try {
    const raw = JSON.stringify(value);
    sessionStorage.setItem(STORAGE_PREFIX + key, raw);
  } catch {
    // Handle write error if needed
  }
}

export function writeStorage(key, value, remember) {
  writeSession(key, value);
  if (remember) {
    writeLocal(key, value);
  }
}

export function removeLocal(key) {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // Handle remove error if needed
  }
}

export function removeSession(key) {
  try {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // Handle remove error if needed
  }
}

export function removeStorage(key) {
  removeSession(key);
  removeLocal(key);
}