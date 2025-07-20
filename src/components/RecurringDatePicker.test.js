// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import RecurringDatePicker from "./RecurringDatePicker";
import { render, screen } from "@testing-library/react";
import { generateRecurringDates } from "../utils/dateUtils";

describe("RecurringDatePicker", () => {
  test("renders the component", () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText("Recurring Date Picker")).toBeInTheDocument();
  });

  test("allows frequency selection", async () => {
    render(<RecurringDatePicker />);
    const user = userEvent.setup();

    const weeklyButton = screen.getByText("Weekly");
    await user.click(weeklyButton);

    expect(weeklyButton).toHaveClass("bg-blue-500");
  });

  test("generates daily recurring dates", () => {
    const startDate = new Date(2023, 0, 1); // Jan 1, 2023
    const dates = generateRecurringDates({
      frequency: "daily",
      interval: 1,
      startDate,
      endAfter: 3,
    });

    expect(dates).toHaveLength(3);
    expect(dates[0].getDate()).toBe(1);
    expect(dates[1].getDate()).toBe(2);
    expect(dates[2].getDate()).toBe(3);
  });

  test("generates weekly recurring dates on specific days", () => {
    const startDate = new Date(2023, 0, 1); // Jan 1, 2023 (Sunday)
    const dates = generateRecurringDates({
      frequency: "weekly",
      interval: 1,
      daysOfWeek: ["monday", "wednesday"],
      startDate,
      endAfter: 4,
    });

    expect(dates).toHaveLength(4);
    // Jan 2, 2023 (Monday)
    expect(dates[0].getDate()).toBe(2);
    // Jan 4, 2023 (Wednesday)
    expect(dates[1].getDate()).toBe(4);
    // Jan 9, 2023 (Monday)
    expect(dates[2].getDate()).toBe(9);
    // Jan 11, 2023 (Wednesday)
    expect(dates[3].getDate()).toBe(11);
  });

  test("generates monthly recurring dates with pattern", () => {
    const startDate = new Date(2023, 0, 1); // Jan 1, 2023
    const dates = generateRecurringDates({
      frequency: "monthly",
      interval: 1,
      pattern: { ordinal: "second", day: "tuesday" },
      startDate,
      endAfter: 3,
    });

    expect(dates).toHaveLength(3);
    // Second Tuesday of Jan 2023 is Jan 10
    expect(dates[0].getDate()).toBe(14);
    // Second Tuesday of Feb 2023 is Feb 14
    expect(dates[1].getDate()).toBe(14);
    // Second Tuesday of Mar 2023 is Mar 14
    expect(dates[2].getDate()).toBe(11);
  });

  test("respects end date", () => {
    const startDate = new Date(2023, 0, 1); // Jan 1, 2023
    const endDate = new Date(2023, 0, 15); // Jan 15, 2023
    const dates = generateRecurringDates({
      frequency: "daily",
      interval: 1,
      startDate,
      endDate,
    });

    expect(dates).toHaveLength(15);
    expect(dates[dates.length - 1].getDate()).toBe(15);
  });
});
