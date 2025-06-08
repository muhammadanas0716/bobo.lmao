import React, { useState, useEffect } from "react";
import { Settings } from "../types";
import {
  formatCurrency,
  formatTime12Hour,
  calculateEarningsForToday,
  calculateDailyRate,
  isCurrentlyWorkingHours,
} from "../utils";

interface EarningsCounterProps {
  settings: Settings;
}

const EarningsCounter: React.FC<EarningsCounterProps> = ({ settings }) => {
  const [currentEarnings, setCurrentEarnings] = useState(0);
  const [lastEarnings, setLastEarnings] = useState(0);

  useEffect(() => {
    const updateEarnings = () => {
      const newEarnings = calculateEarningsForToday(settings);

      setLastEarnings(currentEarnings);
      setCurrentEarnings(newEarnings);
    };

    // Update immediately
    updateEarnings();

    // Set up interval to update every second
    const interval = setInterval(updateEarnings, 1000);

    return () => clearInterval(interval);
  }, [settings, currentEarnings, lastEarnings]);

  const dailyTotal = calculateDailyRate(settings);
  const isWorking = isCurrentlyWorkingHours(
    settings.workStartTime,
    settings.workEndTime
  );
  const workEndTime = formatTime12Hour(settings.workEndTime);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Main earnings counter */}
      <div className="text-center">
        <div className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white font-mono">
          {formatCurrency(currentEarnings)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
        <div
          className="bg-gray-800 dark:bg-white h-2 rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${Math.min((currentEarnings / dailyTotal) * 100, 100)}%`,
          }}
        />
      </div>

      {/* Currently earning text */}
      <div className="text-center">
        <div className="text-sm text-gray-400 dark:text-gray-500">
          Currently earning ({settings.workStartTime} - {settings.workEndTime})
        </div>
      </div>
    </div>
  );
};

export default EarningsCounter;
