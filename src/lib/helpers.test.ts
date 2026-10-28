import { describe, expect, it } from "vitest";
import { seedOutlets } from "../data/seed";
import { filterOutlets, formatDate, getPercent, initials } from "./helpers";
import { validateOutlet } from "./validation";

describe("outlet search, filters, sorting", () => {
  it("matches outlet name and owner name regardless of case", () => {
    expect(filterOutlets(seedOutlets, "URBAN")[0].name).toBe("Urban Basket");
    expect(filterOutlets(seedOutlets, "Diya Patel")[0].name).toBe(
      "The Daily Mart",
    );
  });
  it("filters by selected status", () => {
    const active = filterOutlets(seedOutlets, "", "Active");
    expect(active.length).toBeGreaterThan(0);
    expect(active.every((o) => o.status === "Active")).toBe(true);
  });
  it("sorts most recent last visit first", () => {
    const sorted = filterOutlets(seedOutlets, "", "All", "recent-visit");
    expect(sorted[0].lastVisit >= sorted[1].lastVisit).toBe(true);
  });
  it("returns zero when no data matches", () =>
    expect(filterOutlets(seedOutlets, "zzzznotanoutlet")).toHaveLength(0));
});

describe("validation and display helpers", () => {
  const valid = {
    name: "Sample Shop",
    owner: "Taylor Singh",
    phone: "9876543210",
    address: "123 Long Street",
    city: "Ahmedabad",
    latitude: 23.02,
    longitude: 72.57,
    status: "Active" as const,
    lastVisit: "2026-01-02",
  };
  it("accepts a valid outlet", () => expect(validateOutlet(valid)).toEqual({}));
  it("rejects impossible coordinates", () => {
    expect(validateOutlet({ ...valid, latitude: 91 }).latitude).toBeDefined();
    expect(
      validateOutlet({ ...valid, longitude: -181 }).longitude,
    ).toBeDefined();
    expect(validateOutlet({ ...valid, latitude: NaN }).latitude).toBeDefined();
  });
  it("requires a valid mobile phone", () =>
    expect(validateOutlet({ ...valid, phone: "12" }).phone).toBeDefined());
  it("rejects dates in the future", () =>
    expect(
      validateOutlet({ ...valid, lastVisit: "2099-01-01" }).lastVisit,
    ).toBeDefined());
  it("formats percentages and initials", () => {
    expect(getPercent(3, 10)).toBe(30);
    expect(initials("Urban Basket")).toBe("UB");
  });
  it("formats an ISO date", () =>
    expect(formatDate("2026-01-02")).toContain("2026"));
});
