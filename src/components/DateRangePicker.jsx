import React, { useState } from "react";
import { useRecurrence } from "../context/RecurrenceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const { recurrence, updateRecurrence } = useRecurrence();
  const [showEndOptions, setShowEndOptions] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Date Range</h3>

      <div className="mb-4">
        <label className="block mb-1">Start Date</label>
        <DatePicker
          selected={recurrence.startDate}
          onChange={(date) => updateRecurrence({ startDate: date })}
          className="px-2 py-1 border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showEndOptions}
            onChange={() => setShowEndOptions(!showEndOptions)}
            className="mr-2"
          />
          Set end date/occurrences
        </label>
      </div>

      {showEndOptions && (
        <div className="space-y-4 pl-6">
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="endOption"
                checked={recurrence.endDate !== null && !recurrence.endAfter}
                onChange={() =>
                  updateRecurrence({ endDate: new Date(), endAfter: null })
                }
                className="mr-2"
              />
              End by
              <DatePicker
                selected={recurrence.endDate}
                onChange={(date) =>
                  updateRecurrence({ endDate: date, endAfter: null })
                }
                className="px-2 py-1 border rounded mx-2"
                minDate={recurrence.startDate}
              />
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="endOption"
                checked={!!recurrence.endAfter}
                onChange={() =>
                  updateRecurrence({ endAfter: 1, endDate: null })
                }
                className="mr-2"
              />
              End after
              <input
                type="number"
                min="1"
                value={recurrence.endAfter || ""}
                onChange={(e) =>
                  updateRecurrence({
                    endAfter: parseInt(e.target.value) || null,
                    endDate: null,
                  })
                }
                className="w-16 px-2 py-1 border rounded mx-2"
              />
              occurrences
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
