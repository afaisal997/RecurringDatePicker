import React from "react";
import { RecurrenceProvider } from "../context/RecurrenceContext";
import FrequencySelector from "./FrequencySelector";
import CustomizationOptions from "./CustomizationOptions";
import DateRangePicker from "./DateRangePicker";
import CalendarPreview from "./CalendarPreview";

const RecurringDatePicker = () => {
  return (
    <RecurrenceProvider>
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recurring Date Picker</h2>

        <div className="space-y-6">
          <FrequencySelector />
          <CustomizationOptions />
          <DateRangePicker />
          <CalendarPreview />
        </div>
      </div>
    </RecurrenceProvider>
  );
};

export default RecurringDatePicker;
