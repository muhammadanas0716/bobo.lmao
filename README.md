# 💰 Real-Time Earnings Counter

A beautiful, minimalistic React + TypeScript app that tracks your earnings in real-time based on your hourly rate or monthly salary.

## ✨ Features

- **Real-time earnings counter** that updates every second
- **Support for both hourly and monthly salary** calculations
- **Dark/Light mode toggle** with system preference detection
- **Configurable work hours** with smart working hours detection
- **Visual progress tracking** with animated progress bar
- **LocalStorage persistence** for all your settings
- **Responsive design** that works on all devices
- **Beautiful animations** when earnings increment

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

Click the **settings gear icon** in the top-right corner to configure:

### Earnings Type

- **Hourly Rate**: Enter your hourly wage (e.g., $25/hour)
- **Monthly Salary**: Enter your monthly salary (automatically calculates daily rate based on 22 working days)

### Work Schedule

- **Start Time**: When your workday begins (e.g., 09:00 AM)
- **End Time**: When your workday ends (e.g., 05:00 PM)

### Theme

- Toggle between light and dark modes using the sun/moon icon
- Your preference is automatically saved

## 🧮 How It Works

### Calculations

- **Daily Rate**:
  - Hourly: `hourly_rate × work_hours_per_day`
  - Monthly: `monthly_salary ÷ 22 working days`
- **Per-Second Rate**: `daily_rate ÷ total_work_seconds`
- **Real-time Earnings**: `seconds_worked_today × per_second_rate`

### Smart Features

- **Automatic Pause**: Counter automatically pauses outside working hours
- **Daily Progress**: Visual progress bar showing percentage of daily goal achieved
- **Work Status**: Clear indication of whether you're currently in working hours
- **Overnight Shifts**: Supports work schedules that span midnight

## 🎨 Visual Features

- **Large, animated counter** with smooth transitions
- **Progress bar** showing daily completion percentage
- **Status indicators** for work hours and daily totals
- **Clean, minimal interface** focused on the essential information
- **Responsive design** that adapts to any screen size

## 💾 Data Persistence

All your settings are automatically saved to browser localStorage:

- Earnings type and rates
- Work schedule
- Theme preference
- No account required, no data sent to servers

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling and dark mode
- **LocalStorage** for data persistence
- **Custom hooks** for earnings calculations
- **Responsive design** with mobile support

## 📱 Mobile Support

The app is fully responsive and works great on:

- Desktop computers
- Tablets
- Mobile phones
- Any modern web browser

## 🔒 Privacy

- **100% client-side**: All calculations happen in your browser
- **No data collection**: We don't track or store any personal information
- **No accounts required**: Just open and use
- **Offline capable**: Works without internet connection

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `build/` directory, ready to deploy to any static hosting service.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
