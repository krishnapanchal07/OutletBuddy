import { describe, expect, it } from "vitest";
import { seedOutlets } from "../data/seed";
import { addToOutlets, removeFromOutlets, updateInOutlets } from "./outletMutations";

const sample = seedOutlets[0];
const newOutlet = {
  name: "New outlet",
  owner: "New owner",
  phone: "9876543210",
  address: "Sample road",
  city: "Ahmedabad",
  latitude: 23.02,
  longitude: 72.57,
  status: "Active" as const,
  lastVisit: "2026-01-01",
};

describe("outlet mutations", () => {
  it("adds an outlet without modifying the previous array", () => {
    const original = [sample];
    const next = addToOutlets(original, newOutlet, "OUT-NEW", "2026-01-01T00:00:00Z");

    expect(original).toHaveLength(1);
    expect(next).toHaveLength(2);
    expect(next[0]).toMatchObject({ ...newOutlet, id: "OUT-NEW" });
  });

  it("updates only the selected outlet without changing its identity", () => {
    const original = [...seedOutlets];
    const next = updateInOutlets(original, sample.id, { ...sample, name: "Updated" });

    expect(next[0]).toMatchObject({ id: sample.id, createdAt: sample.createdAt, name: "Updated" });
    expect(original[0].name).toBe(sample.name);
    expect(next[1]).toBe(original[1]);
  });

  it("deletes only the selected outlet", () => {
    const next = removeFromOutlets(seedOutlets, sample.id);

    expect(next).toHaveLength(seedOutlets.length - 1);
    expect(next.some((outlet) => outlet.id === sample.id)).toBe(false);
    expect(seedOutlets.some((outlet) => outlet.id === sample.id)).toBe(true);
  });

  it("retains consecutive edits when applying each change to the latest state", () => {
    const added = addToOutlets(seedOutlets, newOutlet, "OUT-NEW", "2026-01-01T00:00:00Z");
    const edited = updateInOutlets(added, "OUT-NEW", { ...newOutlet, name: "Edited outlet" });
    const deleted = removeFromOutlets(edited, sample.id);

    expect(deleted[0].name).toBe("Edited outlet");
    expect(deleted.some((outlet) => outlet.id === sample.id)).toBe(false);
  });
});
