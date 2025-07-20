import React from "react";
import { useRecurrence } from "../context/RecurrenceContext";

const CustomizationOptions = () => {
  const { recurrence, updateRecurrence } = useRecurrence();

  const daysOfWeek = [
    { value: "sunday", label: "Sun" },
    { value: "monday", label: "Mon" },
    { value: "tuesday", label: "Tue" },
    { value: "wednesday", label: "Wed" },
    { value: "thursday", label: "Thu" },
    { value: "friday", label: "Fri" },
    { value: "saturday", label: "Sat" },
  ];

  const ordinals = [
    { value: "first", label: "First" },
    { value: "second", label: "Second" },
    { value: "third", label: "Third" },
    { value: "fourth", label: "Fourth" },
    { value: "last", label: "Last" },
  ];

  const handleDayToggle = (day) => {
    const newDays = recurrence.daysOfWeek.includes(day)
      ? recurrence.daysOfWeek.filter((d) => d !== day)
      : [...recurrence.daysOfWeek, day];
    updateRecurrence({ daysOfWeek: newDays });
  };

  const handlePatternSelect = (ordinal, day) => {
    updateRecurrence({ pattern: { ordinal, day } });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Customization</h3>

      <div className="mb-4">
        <label className="block mb-1">Every</label>
        <div className="flex items-center">
          <input
            type="number"
            min="1"
            value={recurrence.interval}
            onChange={(e) =>
              updateRecurrence({ interval: parseInt(e.target.value) || 1 })
            }
            className="w-16 px-2 py-1 border rounded mr-2"
          />
          <span>
            {recurrence.frequency === "daily" && "day(s)"}
            {recurrence.frequency === "weekly" && "week(s)"}
            {recurrence.frequency === "monthly" && "month(s)"}
            {recurrence.frequency === "yearly" && "year(s)"}
          </span>
        </div>
      </div>

      {recurrence.frequency === "weekly" && (
        <div className="mb-4">
          <label className="block mb-1">On days</label>
          <div className="flex gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day.value}
                onClick={() => handleDayToggle(day.value)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  recurrence.daysOfWeek.includes(day.value)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrence.frequency === "monthly" && (
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!recurrence.pattern}
                onChange={() => updateRecurrence({ pattern: null })}
                className="mr-2"
              />
              On day
              <input
                type="number"
                min="1"
                max="31"
                value={recurrence.dayOfMonth || ""}
                onChange={(e) =>
                  updateRecurrence({
                    dayOfMonth: parseInt(e.target.value) || null,
                  })
                }
                className="w-16 px-2 py-1 border rounded mx-2"
                disabled={!!recurrence.pattern}
              />
              of the month
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                checked={!!recurrence.pattern}
                onChange={() =>
                  updateRecurrence({
                    pattern: { ordinal: "first", day: "monday" },
                  })
                }
                className="mr-2"
              />
              On the
              <select
                value={recurrence.pattern?.ordinal || "first"}
                onChange={(e) =>
                  updateRecurrence({
                    pattern: {
                      ...recurrence.pattern,
                      ordinal: e.target.value,
                    },
                  })
                }
                className="mx-2 px-2 py-1 border rounded"
                disabled={!recurrence.pattern}
              >
                {ordinals.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <select
                value={recurrence.pattern?.day || "monday"}
                onChange={(e) =>
                  updateRecurrence({
                    pattern: {
                      ...recurrence.pattern,
                      day: e.target.value,
                    },
                  })
                }
                className="mx-2 px-2 py-1 border rounded"
                disabled={!recurrence.pattern}
              >
                {daysOfWeek.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {recurrence.frequency === "yearly" && (
        <div className="mb-4">
          <label className="block mb-1">On</label>
          <div className="flex items-center">
            <select
              value={recurrence.month || new Date().getMonth() + 1}
              onChange={(e) =>
                updateRecurrence({ month: parseInt(e.target.value) })
              }
              className="px-2 py-1 border rounded mr-2"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="31"
              value={recurrence.dayOfMonth || new Date().getDate()}
              onChange={(e) =>
                updateRecurrence({ dayOfMonth: parseInt(e.target.value) || 1 })
              }
              className="w-16 px-2 py-1 border rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationOptions;
