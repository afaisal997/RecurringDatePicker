# Recurring Date Picker Component

A customizable React component for selecting recurring dates with various frequency patterns.

## Features

- **Multiple Recurrence Patterns**:
  - Daily, Weekly, Monthly, Yearly
  - Custom intervals (every X days/weeks/months/years)
  
- **Flexible Customization**:
  - Select specific days of the week
  - Advanced patterns like "2nd Tuesday of every month"
  - Start date and optional end date/occurrence limit

- **Interactive Preview**:
  - Visual calendar showing generated dates
  - Real-time updates as options change

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recurring-date-picker.git
```

3. Install dependencies:
```
npm install
```

## Tech Stack
- Framework: React 18+
- Styling: Tailwind CSS
- State Management: React Context API
- Testing: Jest + React Testing Library
- Date Handling: Native JavaScript Date

## Development Scripts
``` bash
# Run development server
npm start

# Run tests
npm test

# Build for production
npm run build
```
## Testing Approach
- We use Jest with:
- Unit tests for date calculation logic
- Integration tests for component interactions
- Snapshot tests for UI consistency

