import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestionItem, BRAND_INFO } from '../data/ancientIndiaQuizData';
import { sound } from '../utils/audioEngine';
import {
  Maximize,
  Minimize,
  Eye,
  EyeOff,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  LogOut,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface PresentationViewProps {
  questions: QuestionItem[];
  onExit: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  questions,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentQ = questions[currentIndex];

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setShowExplanation(false);
      sound.playAncientDrum();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setShowExplanation(false);
      sound.playAncientDrum();
    }
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentIndex(idx);
    setShowAnswer(false);
    setShowExplanation(false);
    sound.playAncientDrum();
  };

  const handleToggleAnswer = () => {
    const nextState = !showAnswer;
    setShowAnswer(nextState);
    if (nextState) {
      sound.playTempleGong();
      sound.playCorrectSound();
    }
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-[#05070d]/90 via-[#070912]/95 to-[#05070d]/90 text-slate-100 select-none">
      {/* Top Presentation Bar */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-cinzel uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Thoát Trình Chiếu</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-cinzel text-amber-300/80 tracking-widest uppercase">
            <span>CHẾ ĐỘ GIẢNG DẠY & TRÌNH CHIẾU MÁY CHIẾU</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">{BRAND_INFO.creator}</span>
          </div>
        </div>

        {/* Quick Question Selector Grid */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => handleSelectQuestion(idx)}
              className={`w-8 h-8 rounded-lg font-cinzel font-bold text-xs transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_#f59e0b] scale-110'
                  : 'bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={handleToggleFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 transition-all cursor-pointer"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
        </button>
      </header>

      {/* Main Presentation Stage */}
      <main className="flex-1 max-w-5xl w-full mx-auto my-auto py-6 sm:py-10 flex flex-col justify-center">
        {/* Category & Question Number Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel uppercase tracking-widest text-amber-400 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{currentQ.questionNumberLabel.toUpperCase()} · {currentQ.category}</span>
          </div>

          <span className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question Title (Large Projector-Optimized Font) */}
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-400/40 shadow-2xl relative overflow-hidden mb-6 gold-box-glow"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed tracking-wide font-sans">
            {currentQ.question}
          </h2>
        </motion.div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((opt) => {
            const isCorrect = opt.key === currentQ.correctAnswer;
            const highlighted = showAnswer && isCorrect;

            return (
              <motion.div
                key={opt.key}
                animate={{
                  scale: highlighted ? 1.02 : 1,
                }}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                  highlighted
                    ? 'bg-amber-950/70 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] gold-box-active'
                    : 'bg-slate-900/60 border-slate-700/60 backdrop-blur-md'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-cinzel font-bold text-lg shrink-0 ${
                      highlighted
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-amber-300 border border-slate-700'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span
                    className={`text-base sm:text-xl font-medium leading-relaxed ${
                      highlighted ? 'text-amber-100 font-bold' : 'text-slate-100'
                    }`}
                  >
                    {opt.text}
                  </span>
                </div>

                {highlighted && (
                  <CheckCircle2 className="w-8 h-8 text-amber-400 shrink-0 fill-amber-400 text-slate-950" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Explanation Panel for Teacher */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-5 sm:p-6 rounded-2xl bg-amber-950/40 border border-amber-400/50 backdrop-blur-md shadow-xl text-slate-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-cinzel font-bold uppercase tracking-wider text-amber-300">
                  Lời Giải Chi Tiết & Bối Cảnh Lịch Sử:
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-amber-100/90 font-sans">
                {currentQ.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Teacher Bottom Control Deck */}
      <footer className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleAnswer}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              showAnswer
                ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_#f59e0b]'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50'
            }`}
          >
            {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showAnswer ? 'Ẩn Đáp Án' : 'Hiện Đáp Án'}</span>
          </button>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              showExplanation
                ? 'bg-sky-500 text-slate-950'
                : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{showExplanation ? 'Ẩn Lời Giải' : 'Hiện Lời Giải'}</span>
          </button>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel uppercase tracking-wider bg-slate-900/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu Trước</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 transition-all shadow-lg cursor-pointer"
          >
            <span>Câu Tiếp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
