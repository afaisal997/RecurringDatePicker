import { useRecurrence } from "../context/RecurrenceContext";
import { generateRecurringDates } from "../utils/dateUtils";

const CalendarPreview = () => {
  const { recurrence } = useRecurrence();
  const dates = generateRecurringDates(recurrence).slice(0, 12);

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Preview</h3>
      <div className="border rounded p-4">
        {dates.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2">
            {dates.map((date, index) => (
              <li key={index} className="text-sm">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No dates match the current recurrence pattern.
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarPreview;
