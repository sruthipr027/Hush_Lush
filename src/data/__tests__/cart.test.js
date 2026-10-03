import { describe, it, expect } from "vitest";
import { MOCK_FOOD_ITEMS } from "../mockData";

describe("Cart Operations & Calculations", () => {
  it("should correctly compute subtotal and item count", () => {
    const cart = [
      { item: MOCK_FOOD_ITEMS[0], quantity: 2 },
      { item: MOCK_FOOD_ITEMS[1], quantity: 1 },
    ];

    const total = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
    const count = cart.reduce((sum, ci) => sum + ci.quantity, 0);

    expect(count).toBe(3);
    expect(total).toBeCloseTo(23.82, 2);
  });
});
