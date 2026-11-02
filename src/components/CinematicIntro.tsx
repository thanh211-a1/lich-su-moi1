import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audioEngine';
import { Volume2, VolumeX, FastForward, Play, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onComplete,
  isMuted,
  onToggleMute,
}) => {
  // Step ranges from 1 to 10
  const [step, setStep] = useState<number>(1);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    // Automated cinematic sequence
    const timers: NodeJS.Timeout[] = [];

    // Step 1: Dark (0 - 1.2s)
    timers.push(setTimeout(() => {
      setStep(2); // Golden beam
      sound.playAncientDrum();
    }, 1200));

    // Step 2 -> 3: Golden dust (2.5s)
    timers.push(setTimeout(() => {
      setStep(3);
    }, 2600));

    // Step 3 -> 4: Ancient Map (4.0s)
    timers.push(setTimeout(() => {
      setStep(4);
      sound.playTempleGong();
    }, 4200));

    // Step 4 -> 5: Temple Architecture zoom (6.0s)
    timers.push(setTimeout(() => {
      setStep(5);
    }, 6200));

    // Step 5 -> 6: Sacred Mandala glowing (8.0s)
    timers.push(setTimeout(() => {
      setStep(6);
      sound.playTempleGong();
    }, 8200));

    // Step 6 -> 7: Sanskrit glyphs flying (10.0s)
    timers.push(setTimeout(() => {
      setStep(7);
      sound.playAncientDrum();
    }, 10200));

    // Step 7 -> 8: Drum roll & cinematic climax (12.2s)
    timers.push(setTimeout(() => {
      setStep(8);
      sound.playAncientDrum();
    }, 12200));

    // Step 8 -> 9: 3D Metallic Gold Logo (13.8s)
    timers.push(setTimeout(() => {
      setStep(9);
      sound.playTempleGong();
      sound.playCorrectSound();
    }, 13800));

    // Step 9 -> 10: CREATED BY TRẦN TIẾN THÀNH (15.5s)
    timers.push(setTimeout(() => {
      setStep(10);
    }, 15500));

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleStartWithSound = () => {
    setHasInteracted(true);
    sound.setMuted(false);
    sound.startAmbientLoop();
    sound.playTempleGong();
    sound.playAncientDrum();
  };

  const handleSkip = () => {
    sound.playAncientDrum();
    onComplete();
  };

  // Ancient Sanskrit symbols
  const sanskritGlyphs = [
    { char: 'ॐ', name: 'Om', x: '18%', y: '24%', delay: 0.1 },
    { char: 'ज्ञान', name: 'Jnana (Tri thức)', x: '78%', y: '28%', delay: 0.3 },
    { char: 'धर्म', name: 'Dharma (Đạo)', x: '22%', y: '72%', delay: 0.5 },
    { char: 'सत्य', name: 'Satya (Chân lý)', x: '74%', y: '68%', delay: 0.7 },
    { char: 'इतिहास', name: 'Itihasa (Lịch sử)', x: '50%', y: '84%', delay: 0.9 },
  ];

  return (
    <div className="relative w-full h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden bg-[#05070d] text-slate-100 select-none">
      {/* Top utility controls */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-amber-400/80 font-cinzel">
            Cinematic Trailer · Cảnh {step}/10
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-black/40 hover:bg-black/60 border border-amber-500/30 text-amber-300 transition-all cursor-pointer backdrop-blur-md"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{isMuted ? "Bật âm thanh" : "Âm thanh"}</span>
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Bỏ qua Intro</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* STEP 1: Total Dark Void */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#05070d] flex items-center justify-center z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.2 }}
            className="text-xs tracking-widest text-amber-400/40 uppercase font-cinzel"
          >
            Văn Minh Sông Ấn · Khởi nguồn ngàn năm
          </motion.p>
        </motion.div>
      )}

      {/* STEP 2: Golden Light Beam from Center */}
      {step >= 2 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2.5, 4], opacity: [0, 0.9, 0.4] }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.85) 0%, rgba(217,119,6,0.3) 45%, rgba(0,0,0,0) 70%)',
            filter: 'blur(30px)'
          }}
        />
      )}

      {/* STEP 3: Golden Dust and 3D Aura Sparks */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-500/20 animate-pulse pointer-events-none" />
        </motion.div>
      )}

      {/* STEP 4: Ancient Indian Map Overlay */}
      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: step >= 8 ? 0.2 : 0.65, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-[90%] max-w-3xl aspect-[16/9] border border-amber-500/25 rounded-2xl p-6 glass-panel-subtle flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Ancient parchment grid styling */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
            
            <div className="relative z-10 flex items-center justify-between text-xs font-cinzel text-amber-300/80">
              <span>BẢN ĐỒ LƯU VỰC SÔNG ẤN & SÔNG HẰNG</span>
              <span>THẾ KỶ VI TCN</span>
            </div>

            {/* Stylized river curves and ancient centers */}
            <svg className="w-full h-44 my-auto opacity-75" viewBox="0 0 600 200" fill="none">
              {/* Indus River */}
              <path
                d="M 50 180 Q 150 100 220 130 T 320 60"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
              <text x="70" y="160" fill="#7dd3fc" fontSize="11" fontFamily="Cinzel">Sông Ấn (Indus)</text>
              <circle cx="160" cy="115" r="5" fill="#f59e0b" />
              <text x="175" y="120" fill="#fde047" fontSize="10">Mohenjo-Daro</text>
              <circle cx="230" cy="125" r="5" fill="#f59e0b" />
              <text x="245" y="130" fill="#fde047" fontSize="10">Harappa</text>

              {/* Ganges River */}
              <path
                d="M 280 50 Q 380 90 460 70 T 560 150"
                stroke="#67e8f9"
                strokeWidth="2.5"
              />
              <text x="420" y="60" fill="#a5f3fc" fontSize="11" fontFamily="Cinzel">Sông Hằng (Ganges)</text>
              <circle cx="360" cy="80" r="5" fill="#f59e0b" />
              <text x="375" y="85" fill="#fde047" fontSize="10">Varanasi</text>
              <circle cx="470" cy="78" r="5" fill="#f59e0b" />
              <text x="485" y="82" fill="#fde047" fontSize="10">Pataliputra</text>
              <circle cx="310" cy="140" r="5" fill="#f59e0b" />
              <text x="325" y="145" fill="#fde047" fontSize="10">Đại Tháp Sanchi</text>
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/60 font-sans">
              <span>Hệ thống chữ Brà-mi cổ đại</span>
              <span>Cái nôi Phật giáo & Sử thi Mahabharata</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 5: Ancient Stupa & Temple Architectural Zoom */}
      {step >= 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: step >= 8 ? 0.35 : 0.85, scale: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Stupa Architectural Dome SVG with Golden Rim */}
          <div className="relative w-80 h-72 flex flex-col items-center justify-end">
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              {/* Spire / Harmika / Yasti */}
              <rect x="97" y="10" width="6" height="35" fill="#fde047" />
              <ellipse cx="100" cy="18" rx="14" ry="4" fill="#f59e0b" />
              <ellipse cx="100" cy="28" rx="18" ry="5" fill="#f59e0b" />
              <rect x="90" y="45" width="20" height="15" fill="#d97706" rx="2" />
              {/* Anda (Dome of Stupa) */}
              <path
                d="M 30 140 A 70 70 0 0 1 170 140 Z"
                fill="url(#stupaGrad)"
                stroke="#facc15"
                strokeWidth="2.5"
              />
              {/* Medhi (Terrace base) */}
              <rect x="20" y="140" width="160" height="16" rx="4" fill="#92400e" stroke="#f59e0b" strokeWidth="1.5" />
              <rect x="10" y="156" width="180" height="18" rx="3" fill="#78350f" stroke="#d97706" strokeWidth="1.5" />

              <defs>
                <linearGradient id="stupaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.95" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center mt-2 font-cinzel text-xs text-amber-300 tracking-widest uppercase">
              Tháp Stupa Sanchi · Di sản xá lợi Phật giáo
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 6: Sacred Golden Mandala Rotating */}
      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 0.9, rotate: 360, scale: 1 }}
          transition={{
            opacity: { duration: 1.5 },
            scale: { duration: 2 },
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[520px] h-[520px] rounded-full border border-amber-400/30 flex items-center justify-center">
            <div className="w-[420px] h-[420px] rounded-full border border-dashed border-amber-300/40 flex items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border-2 border-amber-400/50 flex items-center justify-center">
                <div className="w-[180px] h-[180px] rounded-full border border-amber-200/60" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 7: Sanskrit Glyphs Flying Around */}
      {step >= 7 && (
        <div className="absolute inset-0 pointer-events-none">
          {sanskritGlyphs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: [0, 0.9, 0.7],
                scale: [0.6, 1.2, 1],
                y: [20, -10, 0],
              }}
              transition={{
                duration: 2.2,
                delay: item.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{ left: item.x, top: item.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <span className="text-3xl md:text-5xl font-cinzel text-amber-300/90 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]">
                {item.char}
              </span>
              <span className="text-[10px] uppercase font-sans tracking-widest text-amber-200/60 mt-1">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* STEP 9 & 10: 3D Metallic Gold Title & Creator Branding */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence>
          {step >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-2 mb-3 text-xs md:text-sm uppercase tracking-[0.25em] text-amber-300/90 font-cinzel"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Chuyên Mục Kiểm Tra Kiến Thức Lịch Sử Đỉnh Cao</span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            </motion.div>
          )}

          {step >= 9 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, type: 'spring', damping: 14 }}
              className="mb-4"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-cinzel tracking-wider leading-tight gold-gradient-text drop-shadow-[0_10px_35px_rgba(245,158,11,0.5)]">
                ĐẤU TRƯỜNG TRI THỨC
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 text-white">
                  LỊCH SỬ
                </span>
              </h1>
            </motion.div>
          )}

          {step >= 10 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Solemn Author Branding */}
              <div className="relative inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-amber-950/60 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-sm sm:text-base font-cinzel tracking-[0.2em] font-bold text-amber-200">
                  CREATED BY TRẦN TIẾN THÀNH
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              {/* Category highlight */}
              <div className="text-amber-300/80 font-sans text-xs sm:text-sm tracking-wide max-w-xl">
                Bộ đề chuẩn xác 10 câu hỏi trắc nghiệm chuyên sâu về{' '}
                <strong className="text-amber-300 font-semibold uppercase">VĂN MINH ẤN ĐỘ CỔ ĐẠI</strong>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                {!hasInteracted && (
                  <button
                    onClick={handleStartWithSound}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-cinzel font-semibold text-sm tracking-wider uppercase text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-[0_0_35px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Bắt Đầu Đấu Trường</span>
                  </button>
                )}

                <button
                  onClick={onComplete}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-cinzel font-bold text-sm tracking-widest uppercase text-white bg-amber-600/30 hover:bg-amber-600/40 border border-amber-400/60 transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Vào Trang Chủ Ngay</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 max-w-[80vw] flex items-center gap-1 z-30">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              s <= step ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
