import React from "react";
import { useRecurrence } from "../context/RecurrenceContext";

const FrequencySelector = () => {
  const { recurrence, updateRecurrence } = useRecurrence();

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Recurrence Pattern</h3>
      <div className="flex flex-wrap gap-2">
        {frequencies.map((freq) => (
          <button
            key={freq.value}
            onClick={() => updateRecurrence({ frequency: freq.value })}
            className={`px-4 py-2 rounded-md ${
              recurrence.frequency === freq.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {freq.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequencySelector;
