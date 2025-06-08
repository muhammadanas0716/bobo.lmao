import React, { useState, useEffect } from "react";
import { Settings } from "../types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<Settings>(settings);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to ensure DOM is ready before starting animation
      const timer = setTimeout(() => setIsAnimating(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.earningsType === "hourly" && formData.hourlyRate <= 0) {
      newErrors.hourlyRate = "Hourly rate must be greater than 0";
    }

    if (formData.earningsType === "monthly" && formData.monthlySalary <= 0) {
      newErrors.monthlySalary = "Monthly salary must be greater than 0";
    }

    if (formData.workStartTime === formData.workEndTime) {
      newErrors.workTime = "Start and end times cannot be the same";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange = (field: keyof Settings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md p-6 rounded-2xl bg-white dark:bg-black border dark:border-gray-800 shadow-xl transform transition-transform duration-300 ${
          isAnimating ? "translate-y-0" : "translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Earnings Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Earnings Type
            </label>
            <div className="flex items-center space-x-6">
              {["hourly", "monthly"].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="earningsType"
                    value={type}
                    checked={formData.earningsType === type}
                    onChange={(e) =>
                      handleInputChange("earningsType", e.target.value)
                    }
                    className="accent-black dark:accent-white"
                  />
                  <span className="text-sm text-black dark:text-white capitalize">
                    {type === "hourly" ? "Hourly Rate" : "Monthly Salary"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rate Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {formData.earningsType === "hourly"
                ? "Hourly Rate ($)"
                : "Monthly Salary ($)"}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={
                formData.earningsType === "hourly"
                  ? formData.hourlyRate
                  : formData.monthlySalary
              }
              onChange={(e) =>
                handleInputChange(
                  formData.earningsType === "hourly"
                    ? "hourlyRate"
                    : "monthlySalary",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              placeholder={
                formData.earningsType === "hourly" ? "25.00" : "4000.00"
              }
            />
            {errors.hourlyRate && (
              <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
            )}
            {errors.monthlySalary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.monthlySalary}
              </p>
            )}
          </div>

          {/* Work Times */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Work Hours
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                value={formData.workStartTime}
                onChange={(e) =>
                  handleInputChange("workStartTime", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <input
                type="time"
                value={formData.workEndTime}
                onChange={(e) =>
                  handleInputChange("workEndTime", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            {errors.workTime && (
              <p className="text-red-500 text-sm mt-1">{errors.workTime}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
