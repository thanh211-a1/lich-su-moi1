import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface OptionTiltCardProps {
  optionKey: 'A' | 'B' | 'C' | 'D';
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswerRevealed: boolean;
  isDisabled: boolean;
  onSelect: () => void;
  reducedMotion?: boolean;
}

export const OptionTiltCard: React.FC<OptionTiltCardProps> = ({
  optionKey,
  text,
  isSelected,
  isCorrect,
  isAnswerRevealed,
  isDisabled,
  onSelect,
  reducedMotion = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isDisabled) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Determine appearance status
  let cardBg = 'bg-slate-900/60 hover:bg-slate-800/80';
  let borderColor = 'border-slate-700/60 hover:border-amber-400/60';
  let glowStyle = '';
  let badgeBg = 'bg-slate-800 text-amber-300 border border-slate-700';

  if (isAnswerRevealed) {
    if (isCorrect) {
      cardBg = 'bg-amber-950/40';
      borderColor = 'border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.45)]';
      glowStyle = 'gold-box-active';
      badgeBg = 'bg-amber-500 text-slate-950 border border-amber-300 font-bold';
    } else if (isSelected && !isCorrect) {
      cardBg = 'bg-rose-950/40';
      borderColor = 'border-rose-500/80 shadow-[0_0_25px_rgba(244,63,94,0.35)]';
      badgeBg = 'bg-rose-500 text-white border border-rose-400';
    } else {
      cardBg = 'opacity-50 bg-slate-950/40';
      borderColor = 'border-slate-800';
    }
  } else if (isSelected) {
    cardBg = 'bg-amber-900/30';
    borderColor = 'border-amber-400';
    badgeBg = 'bg-amber-500 text-slate-950 font-bold';
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full h-full"
    >
      <motion.div
        onClick={() => {
          if (!isDisabled) onSelect();
        }}
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isSelected ? '15px' : '0px'})`,
          transition: 'transform 0.15s ease-out, box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        whileHover={!isDisabled && !reducedMotion ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        className={`relative w-full min-h-[96px] p-5 rounded-2xl border ${borderColor} ${cardBg} ${glowStyle} backdrop-blur-md flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer text-left select-none group overflow-hidden`}
      >
        {/* Subtle Liquid Gold Light Sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-out" />

        <div className="flex items-center gap-4 flex-1">
          {/* Key Badge: A, B, C, D */}
          <div
            className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center font-cinzel text-base transition-colors ${badgeBg}`}
          >
            {optionKey}
          </div>

          {/* Option Text */}
          <p className="text-sm sm:text-base font-medium text-slate-100 group-hover:text-amber-100 transition-colors leading-relaxed">
            {text}
          </p>
        </div>

        {/* State Indicator */}
        <div className="shrink-0 flex items-center justify-center pl-2">
          {isAnswerRevealed && isCorrect && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex items-center gap-1.5 text-amber-400"
            >
              <CheckCircle2 className="w-6 h-6 fill-amber-400 text-slate-950" />
            </motion.div>
          )}

          {isAnswerRevealed && isSelected && !isCorrect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-rose-400"
            >
              <XCircle className="w-6 h-6 fill-rose-500 text-slate-950" />
            </motion.div>
          )}

          {!isAnswerRevealed && (
            <div className="w-6 h-6 rounded-full border border-slate-600/80 group-hover:border-amber-400/80 flex items-center justify-center transition-colors">
              <Sparkles className="w-3 h-3 text-amber-400/0 group-hover:text-amber-400/80 transition-opacity" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
