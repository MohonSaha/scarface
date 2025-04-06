import React from 'react';
import { DollarSign } from 'lucide-react';

interface ProgressBarProps {
  value?: number;
  maxValue?: number;
  icon?: React.ReactNode;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 6.0,
  maxValue = 10,
  icon = <DollarSign className="w-5 h-5 text-white" />
}) => {
  // Calculate number of bars based on value (max 10 bars)
  // const numberOfBars = Math.floor((value / maxValue) * 10);

  return (
    <div className="flex items-center gap-2">
      {/* Circle with icon */}
      <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
        {icon}
      </div>

      {/* Bars container */}
      <div className="flex gap-1">
        {[...Array(maxValue)].map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-5 rounded-sm ${
              index < value ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Value display */}
      <span className="ml-1 font-semibold text-lg text-gray-700">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export default ProgressBar;