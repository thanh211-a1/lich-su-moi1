import React, { useEffect } from 'react';
import { sound } from '../utils/audioEngine';
import { Clock } from 'lucide-react';

interface CountdownTimerRingProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
  size?: number;
}

export const CountdownTimerRing: React.FC<CountdownTimerRingProps> = ({
  timeLeft,
  totalTime,
  isRunning,
  onTimeUp,
  size = 72,
}) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, timeLeft / totalTime));
  const strokeDashoffset = circumference * (1 - progress);

  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      sound.playTimerTick(isUrgent);
    }
  }, [timeLeft, isRunning, isUrgent]);

  const strokeColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#fbbf24';

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease',
          }}
        />
      </svg>

      {/* Center numerical display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-cinzel font-bold text-lg leading-none ${
            isUrgent ? 'text-rose-400 animate-pulse' : 'text-amber-200'
          }`}
        >
          {timeLeft}s
        </span>
        <Clock className={`w-3 h-3 mt-0.5 ${isUrgent ? 'text-rose-400' : 'text-amber-400/70'}`} />
      </div>
    </div>
  );
};
