# Speaksify Payments Dashboard

A modern, interactive payments dashboard built with React, featuring real-time revenue analytics, transaction management, and comprehensive data visualization.

## Features

- **Real-time Revenue Analytics**: Track MRR, ARR, and growth metrics
- **Interactive Charts**: Multiple chart types including area, bar, line, and pie charts
- **Transaction Management**: Search, filter, and export transaction data
- **Responsive Design**: Works seamlessly across all device sizes
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ui/           # Reusable UI components
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main dashboard component
├── main.jsx         # React entry point
└── index.css        # Global styles
```

## Dashboard Components

### KPI Cards
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- New Revenue tracking
- Churn analysis

### Charts
- Revenue trend over time
- Revenue breakdown by plan
- Payment method distribution
- Net revenue calculations

### Transaction Table
- Real-time transaction data
- Search and filter functionality
- CSV export capabilities
- Plan-based filtering

## Customization

The dashboard uses a modular component structure, making it easy to customize:

- **Colors**: Modify the `COLORS` array in `App.jsx`
- **Data**: Update the mock data arrays to use real data sources
- **Styling**: Customize Tailwind classes or add custom CSS
- **Charts**: Extend or modify chart configurations in the chart components

## Data Structure

The dashboard expects data in the following formats:

### Revenue Trend
```javascript
{
  month: "Jan",
  mrr: 18000,
  arr: 216000,
  new: 4200,
  churn: 1200
}
```

### Transactions
```javascript
{
  id: "TXN-2025001",
  customer: "Acme Inc.",
  plan: "Starter",
  amount: 29,
  status: "Paid",
  date: "2025-01-01",
  method: "Visa"
}
```

## Export Functionality

The dashboard includes CSV export functionality for:
- All transactions
- Filtered transactions
- Custom date ranges

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes. All data is mock data for UI preview.
