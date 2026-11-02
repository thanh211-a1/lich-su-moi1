/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ANCIENT_INDIA_QUESTIONS,
  QuestionItem,
  BRAND_INFO,
} from './data/ancientIndiaQuizData';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CinematicIntro } from './components/CinematicIntro';
import { ArenaQuizView } from './components/ArenaQuizView';
import { PresentationView } from './components/PresentationView';
import { ResultsScreen } from './components/ResultsScreen';
import { sound } from './utils/audioEngine';
import {
  Swords,
  Presentation,
  Volume2,
  VolumeX,
  Shuffle,
  RotateCcw,
  Film,
  Sparkles,
  BookOpen,
  Landmark,
  Scroll,
  HeartPulse,
  Award,
  CheckCircle2,
} from 'lucide-react';

type AppView = 'intro' | 'home' | 'quiz' | 'presentation' | 'results';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Lỗi phát nhạc:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const playMusicOnStart = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(e => console.log("Lỗi phát nhạc:", e));
      setIsMusicPlaying(true);
    }
  };
  const [view, setView] = useState<AppView>('intro');
  const [questions, setQuestions] = useState<QuestionItem[]>(ANCIENT_INDIA_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  // Sync mute state with audio engine
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleStartQuiz = (shuffle = false) => {
    let qList = [...ANCIENT_INDIA_QUESTIONS];
    if (shuffle) {
      qList = qList.sort(() => Math.random() - 0.5);
      setIsShuffled(true);
    } else {
      setIsShuffled(false);
    }
    setQuestions(qList);
    setCurrentIndex(0);
    setUserAnswers({});
    setScore(0);
    setStreak(0);
    setView('quiz');
    sound.playAncientDrum();
    sound.startAmbientLoop();
  };

  const handleStartPresentation = () => {
    setQuestions(ANCIENT_INDIA_QUESTIONS);
    setView('presentation');
    sound.playTempleGong();
  };

  const handleAnswer = (questionId: number, selectedKey: 'A' | 'B' | 'C' | 'D') => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = question.correctAnswer === selectedKey;
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedKey }));

    if (isCorrect) {
      setScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleTimeOut = (questionId: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: null }));
    setStreak(0);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      sound.playAncientDrum();
    } else {
      setView('results');
      sound.stopAmbientLoop();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      <audio ref={audioRef} src="/nhac-nen.mp3" loop />
      <button 
        onClick={toggleMusic}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-xl text-amber-300 hover:text-amber-200 bg-slate-900/60 hover:bg-slate-800 border border-amber-500/30 transition-all cursor-pointer"
      >
        {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
      {/* 3D Three.js Sacred Mandala & Star Dust Background */}
      <ThreeCanvas
        reducedMotion={reducedMotion}
        intensity={view === 'intro' ? 'high' : view === 'quiz' ? 'normal' : 'subtle'}
        cameraZoomLevel={view === 'intro' ? 1.3 : view === 'quiz' ? 1.0 : 0.9}
      />

      {/* Main Viewport Router */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <CinematicIntro
                onComplete={() => {
                  setView('home');
                  sound.startAmbientLoop();
                }}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
              />
            </motion.div>
          )}

          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col justify-between"
            >
              {/* Top Navigation Contract (Zone 1 - Zone 2 - Zone 3) */}
              <header className="flex items-center justify-between gap-8 py-4 border-b border-amber-500/20">
                {/* Zone 1: Wordmark */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-cinzel font-extrabold text-base sm:text-lg tracking-wider text-amber-200 block whitespace-nowrap">
                      {BRAND_INFO.title}
                    </span>
                    <span className="text-[10px] font-cinzel text-amber-400/90 tracking-widest uppercase block font-semibold">
                      {BRAND_INFO.creator}
                    </span>
                  </div>
                </div>

                {/* Zone 2: Links */}
                <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-cinzel text-slate-300">
                  <span className="text-amber-400 font-bold">10 Câu Hỏi Chuẩn</span>
                  <span>·</span>
                  <span>Lưu Vực Sông Ấn - Sông Hằng</span>
                  <span>·</span>
                  <span>Chữ Brà-mi & Sử Thi</span>
                </nav>

                {/* Zone 3: Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleMute}
                    className="p-2.5 rounded-xl text-amber-300 hover:text-amber-200 bg-slate-900/60 hover:bg-slate-800 border border-amber-500/30 transition-all cursor-pointer"
                    title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-cinzel border transition-all cursor-pointer hidden sm:block ${
                      reducedMotion
                        ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                        : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {reducedMotion ? 'Đã giảm 3D' : 'Hiệu ứng 3D Bật'}
                  </button>
                </div>
              </header>

              {/* Hero Banner Section */}
              <div className="my-auto py-8 sm:py-12 text-center max-w-4xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-widest font-cinzel mb-5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span>Hệ Thống Kiểm Tra Kiến Thức Lịch Sử Cao Cấp 3D</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-cinzel tracking-wider leading-tight text-white mb-4">
                  ĐẤU TRƯỜNG TRI THỨC
                  <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 gold-gradient-text drop-shadow-[0_10px_35px_rgba(245,158,11,0.5)]">
                    VĂN MINH ẤN ĐỘ CỔ ĐẠI
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
                  Khám phá cái nôi văn minh kỳ vĩ của nhân loại với bộ đề chuẩn 10 câu hỏi gồm chữ Brà-mi,
                  sử thi Mahabharata & Ramayana, Đức Phật Thích Ca, Tháp Stupa, y học Sushruta và đại thi hào Kalidasa.
                </p>

                {/* Primary Game Mode Launcher Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl mb-8">
                  {/* Mode 1: Arena Quiz */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { handleStartQuiz(false); playMusicOnStart(); }}
                    className="p-6 rounded-2xl glass-panel border border-amber-400/50 hover:border-amber-300 transition-all cursor-pointer text-left gold-box-glow group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                      <Swords className="w-6 h-6" />
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-amber-200 mb-1 group-hover:text-amber-100">
                      Chế Độ Đấu Trường
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      20 giây mỗi câu hỏi, tính điểm trực tiếp, hiệu ứng ánh sáng chiến thắng và giải thích chi tiết từng câu.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-amber-400 uppercase tracking-wider">
                      <span>Bắt Đầu Làm Bài</span>
                      <span>→</span>
                    </div>
                  </motion.div>

                  {/* Mode 2: Presentation Mode */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { handleStartPresentation(); playMusicOnStart(); }}
                    className="p-6 rounded-2xl glass-panel-subtle border border-sky-500/40 hover:border-sky-400 transition-all cursor-pointer text-left group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                      <Presentation className="w-6 h-6" />
                    </div>
                    <h3 className="font-cinzel text-lg font-bold text-sky-200 mb-1 group-hover:text-sky-100">
                      Chế Độ Trình Chiếu
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      Thiết kế riêng cho giáo viên & học sinh: toàn màn hình, chữ lớn máy chiếu, bật/tắt đáp án và lời giải.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-sky-400 uppercase tracking-wider">
                      <span>Mở Trình Chiếu</span>
                      <span>→</span>
                    </div>
                  </motion.div>
                </div>

                {/* Sub-actions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleStartQuiz(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider uppercase text-amber-200 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 transition-all cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Xáo Trộn Đề & Thi Ngay</span>
                  </button>

                  <button
                    onClick={() => {
                      setView('intro');
                      sound.playAncientDrum();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider uppercase text-slate-300 hover:text-amber-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Xem Lại Trailer Intro 3D</span>
                  </button>
                </div>
              </div>

              {/* 5 Civilization Pillars Showcase */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-amber-500/20">
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-amber-500/15 flex flex-col items-center text-center">
                  <Scroll className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-cinzel font-bold text-amber-200">Chữ Brà-mi</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Tiền thân chữ Nam Á</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-amber-500/15 flex flex-col items-center text-center">
                  <BookOpen className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-cinzel font-bold text-amber-200">Sử Thi Vĩ Đại</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Mahabharata & Ramayana</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-amber-500/15 flex flex-col items-center text-center">
                  <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-cinzel font-bold text-amber-200">Đạo Phật</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Thế kỷ VI TCN</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-amber-500/15 flex flex-col items-center text-center">
                  <Landmark className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-cinzel font-bold text-amber-200">Tháp Stupa & Hang</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Xá lợi & Chùa đá Ajanta</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-amber-500/15 flex flex-col items-center text-center col-span-2 sm:col-span-1">
                  <HeartPulse className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-cinzel font-bold text-amber-200">Y Học Cổ Đại</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">Phẫu thuật & Dược thảo</span>
                </div>
              </div>

              {/* Solemn Author Branding Footer */}
              <footer className="pt-8 pb-4 text-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-500/30 bg-amber-950/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.2em] text-amber-300">
                    {BRAND_INFO.creator}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <p className="text-[11px] text-slate-500 mt-2 font-cinzel">
                  Đấu Trường Tri Thức Lịch Sử · Bản Quyền Tác Giả Trần Tiến Thành
                </p>
              </footer>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-1 flex flex-col"
            >
              <ArenaQuizView
                questions={questions}
                currentIndex={currentIndex}
                userAnswers={userAnswers}
                score={score}
                streak={streak}
                isMuted={isMuted}
                reducedMotion={reducedMotion}
                onToggleMute={handleToggleMute}
                onAnswer={handleAnswer}
                onTimeOut={handleTimeOut}
                onNextQuestion={handleNextQuestion}
                onSwitchToPresentation={() => setView('presentation')}
              />
            </motion.div>
          )}

          {view === 'presentation' && (
            <motion.div
              key="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-1 flex flex-col"
            >
              <PresentationView
                questions={questions}
                onExit={() => setView('home')}
              />
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-1 flex flex-col justify-center"
            >
              <ResultsScreen
                questions={questions}
                userAnswers={userAnswers}
                onRetry={handleStartQuiz}
                onSwitchToPresentation={() => setView('presentation')}
                onReplayIntro={() => setView('intro')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
