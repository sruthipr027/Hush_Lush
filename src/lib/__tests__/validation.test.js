import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword, validatePhone, validateLoginForm } from "../validation";

describe("Validation Logic", () => {
  it("should validate emails correctly", () => {
    expect(validateEmail("")).toBe("Email address is required");
    expect(validateEmail("invalid-email")).toBe("Please enter a valid email address (e.g. user@example.com)");
    expect(validateEmail("user@hushlush.com")).toBeNull();
  });

  it("should validate phone numbers correctly", () => {
    expect(validatePhone("")).toBe("Phone number is required");
    expect(validatePhone("123")).toBe("Please enter a valid phone number (min 10 digits)");
    expect(validatePhone("+971501234567")).toBeNull();
  });

  it("should validate passwords correctly", () => {
    expect(validatePassword("")).toBe("Password is required");
    expect(validatePassword("12345")).toBe("Password must be at least 6 characters long");
    expect(validatePassword("Password123!")).toBeNull();
  });

  it("should validate complete login form input", () => {
    const invalidRes = validateLoginForm("bad-email", "123", false);
    expect(invalidRes.isValid).toBe(false);
    expect(invalidRes.errors.email).toBeDefined();
    expect(invalidRes.errors.password).toBeDefined();

    const validRes = validateLoginForm("alex@hushlush.com", "Password123!", false);
    expect(validRes.isValid).toBe(true);
    expect(Object.keys(validRes.errors).length).toBe(0);
  });
});
