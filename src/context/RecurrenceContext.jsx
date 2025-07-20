import React, { createContext, useContext, useState } from "react";

const RecurrenceContext = createContext();

export const RecurrenceProvider = ({ children }) => {
  const [recurrence, setRecurrence] = useState({
    frequency: "weekly", // daily, weekly, monthly, yearly
    interval: 1, // every X days/weeks/months/years
    daysOfWeek: ["sunday"], // for weekly (e.g., ['monday', 'wednesday'])
    dayOfMonth: null, // for monthly (e.g., 15)
    month: null, // for yearly (e.g., 6 for June)
    pattern: null, // e.g., {ordinal: 'second', day: 'tuesday'} for "second tuesday"
    startDate: new Date(),
    endDate: null, // null means no end date
    endAfter: null, // number of occurrences
  });

  const updateRecurrence = (updates) => {
    setRecurrence((prev) => ({ ...prev, ...updates }));
  };

  return (
    <RecurrenceContext.Provider value={{ recurrence, updateRecurrence }}>
      {children}
    </RecurrenceContext.Provider>
  );
};

export const useRecurrence = () => {
  const context = useContext(RecurrenceContext);
  if (!context) {
    throw new Error("useRecurrence must be used within a RecurrenceProvider");
  }
  return context;
};
