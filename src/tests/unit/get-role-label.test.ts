import { describe, it, expect } from "vitest";

// Example utility function
export function getRoleLabel(role: "admin" | "user"): string {
  const MAP = { admin: "Administrator", user: "User" } as const;
  return MAP[role];
}

describe("getRoleLabel", () => {
  it("maps admin role to Administrator", () => {
    expect(getRoleLabel("admin")).toBe("Administrator");
  });

  it("maps user role to User", () => {
    expect(getRoleLabel("user")).toBe("User");
  });
});

