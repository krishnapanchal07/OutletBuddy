const SESSION_KEY = "outletBUddy:demo:session";

export const getDemoSession = (): boolean => {
  try {
    return localStorage.getItem(SESSION_KEY) === "active";
  } catch {
    return false;
  }
};

export const setDemoSession = (active: boolean): void => {
  try {
    if (active) {
      localStorage.setItem(SESSION_KEY, "active");
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.error("Failed to set demo session:", e);
  }
};
