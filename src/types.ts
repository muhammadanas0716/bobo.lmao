export interface Settings {
  earningsType: "hourly" | "monthly";
  hourlyRate: number;
  monthlySalary: number;
  workStartTime: string; // HH:MM format
  workEndTime: string; // HH:MM format
  theme: "light" | "dark";
}

export interface EarningsData {
  currentEarnings: number;
  dailyTotal: number;
  perSecondRate: number;
  isWorkingHours: boolean;
  workEndTime: string;
}
