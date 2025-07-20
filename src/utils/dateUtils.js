export const generateRecurringDates = (recurrence) => {
  const {
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    month,
    pattern,
    startDate,
    endDate,
    endAfter,
  } = recurrence;

  // Return empty if weekly but no days selected
  if (frequency === "weekly" && (!daysOfWeek || daysOfWeek.length === 0)) {
    return [];
  }

  const dates = [];
  let currentDate = new Date(startDate);
  let occurrences = 0;
  const maxIterations = 1000; // Safety limit
  let iterations = 0;

  // For weekly frequency with multiple days, we need to handle each day in the interval
  if (frequency === "weekly") {
    while (occurrences < maxIterations && iterations < maxIterations) {
      iterations++;

      // Check end conditions
      if (endDate && currentDate > endDate) break;
      if (endAfter && occurrences >= endAfter) break;

      // For each selected day in the current week
      for (const dayName of daysOfWeek) {
        const dayIndex = getWeekdayIndex(dayName);
        const dateInWeek = new Date(currentDate);

        // Set to the specific day in the current week
        dateInWeek.setDate(
          currentDate.getDate() + (dayIndex - currentDate.getDay())
        );

        // Only add if it's on or after the start date
        if (dateInWeek >= new Date(startDate)) {
          if (matchesRecurrence(dateInWeek, recurrence)) {
            dates.push(new Date(dateInWeek));
            occurrences++;
            if (endAfter && occurrences >= endAfter) break;
          }
        }
      }

      // Move to the next interval period
      currentDate = addDays(currentDate, 7 * interval);
    }
  } else {
    // Handle other frequencies (daily, monthly, yearly) as before
    while (occurrences < maxIterations && iterations < maxIterations) {
      iterations++;

      // Check end conditions
      if (endDate && currentDate > endDate) break;
      if (endAfter && occurrences >= endAfter) break;

      // Add date if it matches the pattern
      if (matchesRecurrence(currentDate, recurrence)) {
        dates.push(new Date(currentDate));
        occurrences++;
      }

      // Move to the next potential date based on frequency
      switch (frequency) {
        case "daily":
          currentDate = addDays(currentDate, interval);
          break;
        case "monthly":
          currentDate = addMonths(currentDate, interval);
          if (pattern) {
            currentDate = getNthWeekdayInMonth(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              pattern.day,
              pattern.ordinal
            );
          } else if (dayOfMonth) {
            const daysInMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            ).getDate();
            currentDate.setDate(Math.min(dayOfMonth, daysInMonth));
          }
          break;
        case "yearly":
          currentDate = addYears(currentDate, interval);
          if (month) {
            currentDate.setMonth(month - 1);
            if (dayOfMonth) {
              const daysInMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0
              ).getDate();
              currentDate.setDate(Math.min(dayOfMonth, daysInMonth));
            }
          }
          break;
        default:
          break;
      }
    }
  }

  // Sort all dates chronologically
  dates.sort((a, b) => a - b);

  return dates;
};

const matchesRecurrence = (date, recurrence) => {
  const { frequency, daysOfWeek, dayOfMonth, month, pattern } = recurrence;

  // If it's before the start date, skip
  if (date < new Date(recurrence.startDate)) return false;

  switch (frequency) {
    case "daily":
      return true;
    case "weekly":
      return (
        daysOfWeek.length === 0 || daysOfWeek.includes(getWeekdayName(date))
      );
    case "monthly":
      if (pattern) {
        return isNthWeekdayInMonth(date, pattern.day, pattern.ordinal);
      } else {
        return !dayOfMonth || date.getDate() === dayOfMonth;
      }
    case "yearly":
      return (
        (!month || date.getMonth() === month - 1) &&
        (!dayOfMonth || date.getDate() === dayOfMonth)
      );
    default:
      return false;
  }
};

// Helper functions
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const addYears = (date, years) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

const getWeekdayName = (date) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
};

const isNthWeekdayInMonth = (date, weekday, ordinal) => {
  const dayOfMonth = date.getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const firstWeekday =
    ((7 - (firstDay.getDay() - getWeekdayIndex(weekday))) % 7) + 1;
  let nthOccurrence;

  if (ordinal === "first") nthOccurrence = firstWeekday;
  else if (ordinal === "second") nthOccurrence = firstWeekday + 7;
  else if (ordinal === "third") nthOccurrence = firstWeekday + 14;
  else if (ordinal === "fourth") nthOccurrence = firstWeekday + 21;
  else if (ordinal === "last") {
    const lastWeekday =
      lastDay.getDate() -
      ((lastDay.getDay() - getWeekdayIndex(weekday) + 7) % 7);
    nthOccurrence = lastWeekday;
  } else {
    return false;
  }

  return dayOfMonth === nthOccurrence;
};

const getNthWeekdayInMonth = (year, month, weekday, ordinal) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday =
    ((7 - (firstDay.getDay() - getWeekdayIndex(weekday))) % 7) + 1;
  let nthOccurrence;

  if (ordinal === "first") nthOccurrence = firstWeekday;
  else if (ordinal === "second") nthOccurrence = firstWeekday + 7;
  else if (ordinal === "third") nthOccurrence = firstWeekday + 14;
  else if (ordinal === "fourth") nthOccurrence = firstWeekday + 21;
  else if (ordinal === "last") {
    nthOccurrence =
      lastDay.getDate() -
      ((lastDay.getDay() - getWeekdayIndex(weekday) + 7) % 7);
  } else {
    return new Date(year, month, 1);
  }

  // Ensure the date is within the month
  nthOccurrence = Math.min(nthOccurrence, lastDay.getDate());

  return new Date(year, month, nthOccurrence);
};

const getWeekdayIndex = (weekday) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days.indexOf(weekday.toLowerCase());
};
