import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestionItem, BRAND_INFO } from '../data/ancientIndiaQuizData';
import { OptionTiltCard } from './OptionTiltCard';
import { CountdownTimerRing } from './CountdownTimerRing';
import { sound } from '../utils/audioEngine';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  Presentation,
  Flame,
  Award
} from 'lucide-react';

interface ArenaQuizViewProps {
  questions: QuestionItem[];
  currentIndex: number;
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null>;
  score: number;
  streak: number;
  isMuted: boolean;
  reducedMotion: boolean;
  onToggleMute: () => void;
  onAnswer: (questionId: number, selectedKey: 'A' | 'B' | 'C' | 'D') => void;
  onTimeOut: (questionId: number) => void;
  onNextQuestion: () => void;
  onSwitchToPresentation: () => void;
}

export const ArenaQuizView: React.FC<ArenaQuizViewProps> = ({
  questions,
  currentIndex,
  userAnswers,
  score,
  streak,
  isMuted,
  reducedMotion,
  onToggleMute,
  onAnswer,
  onTimeOut,
  onNextQuestion,
  onSwitchToPresentation,
}) => {
  const currentQ = questions[currentIndex];
  const userAnswer = userAnswers[currentQ.id];
  const isAnswered = userAnswer !== undefined;

  // 20-second timer
  const [timeLeft, setTimeLeft] = useState(BRAND_INFO.durationPerQuestion);
  const [timerRunning, setTimerRunning] = useState(true);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(BRAND_INFO.durationPerQuestion);
    setTimerRunning(true);
  }, [currentIndex, currentQ.id]);

  // Countdown effect
  useEffect(() => {
    if (!timerRunning || isAnswered) return;

    if (timeLeft <= 0) {
      setTimerRunning(false);
      sound.playIncorrectSound();
      onTimeOut(currentQ.id);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerRunning, isAnswered, currentQ.id, onTimeOut]);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return;
    setTimerRunning(false);

    if (key === currentQ.correctAnswer) {
      sound.playCorrectSound();
    } else {
      sound.playIncorrectSound();
    }

    onAnswer(currentQ.id, key);
  };

  const isCorrect = userAnswer === currentQ.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-6xl mx-auto">
      {/* Top Bar Contract (3 Zones) */}
      <header className="flex items-center justify-between gap-4 py-3 px-4 sm:px-6 rounded-2xl glass-panel-subtle border border-amber-500/20 backdrop-blur-md mb-6">
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-cinzel font-bold text-sm sm:text-base tracking-wider text-amber-200 block whitespace-nowrap">
              {BRAND_INFO.title}
            </span>
            <span className="text-[10px] font-cinzel text-amber-400/80 tracking-widest uppercase block">
              {BRAND_INFO.creator}
            </span>
          </div>
        </div>

        {/* Zone 2: Arena Stats */}
        <div className="hidden sm:flex items-center gap-6 text-xs font-cinzel">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>ĐIỂM:</span>
            <strong className="text-sm font-bold text-amber-400 tabular-nums">{score}</strong>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 text-orange-400 animate-bounce">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span>CHUỖI x{streak}</span>
            </div>
          )}

          <div className="text-slate-400">
            CÂU <span className="text-amber-300 font-bold">{currentIndex + 1}</span> / {questions.length}
          </div>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl text-amber-300 hover:text-amber-200 bg-slate-900/60 hover:bg-slate-800 border border-amber-500/20 transition-all cursor-pointer"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onSwitchToPresentation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-cinzel text-sky-300 hover:text-white bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Trình Chiếu</span>
          </button>
        </div>
      </header>

      {/* Main Question Arena Stage */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto my-auto">
        {/* Progress Bar & Timer Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-cinzel text-amber-300/80 mb-2">
              <span className="uppercase tracking-widest font-bold">
                {BRAND_INFO.category} · {currentQ.questionNumberLabel}
              </span>
              <span className="text-slate-400 font-sans">
                {Math.round(((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100)}% Hoàn thành
              </span>
            </div>

            {/* Glowing progress track */}
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-amber-500/20 p-0.5">
              <motion.div
                initial={false}
                animate={{
                  width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
                }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-[0_0_12px_#f59e0b]"
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* 20s Circular Countdown Timer */}
          <CountdownTimerRing
            timeLeft={timeLeft}
            totalTime={BRAND_INFO.durationPerQuestion}
            isRunning={timerRunning && !isAnswered}
            onTimeUp={() => {}}
            size={68}
          />
        </div>

        {/* Question Text Box */}
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/30 text-center relative overflow-hidden mb-6 gold-box-glow"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[11px] font-sans font-semibold mb-3">
            {currentQ.tag}
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-relaxed font-sans max-w-3xl mx-auto">
            {currentQ.question}
          </h2>
        </motion.div>

        {/* 4 Interactive 3D Tilt Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQ.options.map((option) => (
            <OptionTiltCard
              key={option.key}
              optionKey={option.key}
              text={option.text}
              isSelected={userAnswer === option.key}
              isCorrect={option.key === currentQ.correctAnswer}
              isAnswerRevealed={isAnswered}
              isDisabled={isAnswered}
              onSelect={() => handleSelectOption(option.key)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Feedback & Historical Explanation Drawer */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-5 sm:p-6 rounded-2xl border backdrop-blur-md shadow-2xl ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                  <span className="font-cinzel font-bold text-xs sm:text-sm uppercase tracking-wider text-amber-300">
                    {isCorrect ? 'Chúc Mừng! Đáp Án Chính Xác (+100 Điểm)' : 'Đáp Án Chưa Đúng'}
                  </span>
                </div>

                <button
                  onClick={onNextQuestion}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>{isLastQuestion ? 'Xem Kết Quả Chung Cuộc' : 'Câu Tiếp Theo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-sans bg-black/30 p-4 rounded-xl border border-white/5">
                <strong className="text-amber-300 block mb-1">Kiến thức lịch sử:</strong>
                {currentQ.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Arena Footer */}
      <footer className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-cinzel">
        <span className="tracking-widest uppercase text-amber-400/60">{BRAND_INFO.creator}</span>
        <span className="text-[11px] text-slate-600">Đấu Trường Tri Thức Lịch Sử · Bản Quyền Trần Tiến Thành</span>
      </footer>
    </div>
  );
};
