import { Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  earningsType: "hourly",
  hourlyRate: 25,
  monthlySalary: 4000,
  workStartTime: "09:00",
  workEndTime: "17:00",
  theme: "light",
};

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem("earnings-settings", JSON.stringify(settings));
};

export const loadSettings = (): Settings => {
  const saved = localStorage.getItem("earnings-settings");
  if (saved) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
  return DEFAULT_SETTINGS;
};

export const calculateDailyRate = (settings: Settings): number => {
  if (settings.earningsType === "hourly") {
    const workHours = calculateWorkHours(
      settings.workStartTime,
      settings.workEndTime
    );
    return settings.hourlyRate * workHours;
  } else {
    // Monthly salary divided by 22 working days
    return settings.monthlySalary / 22;
  }
};

export const calculatePerSecondRate = (settings: Settings): number => {
  const dailyRate = calculateDailyRate(settings);
  const workHours = calculateWorkHours(
    settings.workStartTime,
    settings.workEndTime
  );
  const totalSeconds = workHours * 3600; // 3600 seconds in an hour
  return dailyRate / totalSeconds;
};

export const calculateWorkHours = (
  startTime: string,
  endTime: string
): number => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  let diffMinutes = endTotalMinutes - startTotalMinutes;

  // Handle overnight shifts
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  return diffMinutes / 60;
};

export const isCurrentlyWorkingHours = (
  startTime: string,
  endTime: string
): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  if (startTotalMinutes < endTotalMinutes) {
    // Same day shift
    return (
      currentTotalMinutes >= startTotalMinutes &&
      currentTotalMinutes < endTotalMinutes
    );
  } else {
    // Overnight shift
    return (
      currentTotalMinutes >= startTotalMinutes ||
      currentTotalMinutes < endTotalMinutes
    );
  }
};

export const formatTime12Hour = (time24: string): string => {
  const [hour24, minute] = time24.split(":").map(Number);
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const ampm = hour24 < 12 ? "AM" : "PM";
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const calculateEarningsForToday = (settings: Settings): number => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(
    parseInt(settings.workStartTime.split(":")[0]),
    parseInt(settings.workStartTime.split(":")[1]),
    0,
    0
  );

  const currentTime = new Date();
  const endOfWorkDay = new Date(now);
  endOfWorkDay.setHours(
    parseInt(settings.workEndTime.split(":")[0]),
    parseInt(settings.workEndTime.split(":")[1]),
    0,
    0
  );

  if (!isCurrentlyWorkingHours(settings.workStartTime, settings.workEndTime)) {
    // If outside work hours, return the full day's earnings if after work
    if (currentTime > endOfWorkDay) {
      return calculateDailyRate(settings);
    }
    // If before work starts, return 0
    return 0;
  }

  // Calculate how many seconds have passed since work started today
  const secondsSinceStart = Math.max(
    0,
    (currentTime.getTime() - startOfDay.getTime()) / 1000
  );
  const perSecondRate = calculatePerSecondRate(settings);

  return Math.min(
    secondsSinceStart * perSecondRate,
    calculateDailyRate(settings)
  );
};
