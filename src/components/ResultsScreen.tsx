import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { QuestionItem, BRAND_INFO } from '../data/ancientIndiaQuizData';
import { sound } from '../utils/audioEngine';
import {
  Trophy,
  RotateCcw,
  Shuffle,
  Presentation,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Film
} from 'lucide-react';

interface ResultsScreenProps {
  questions: QuestionItem[];
  userAnswers: Record<number, 'A' | 'B' | 'C' | 'D' | null>;
  onRetry: (shuffle: boolean) => void;
  onSwitchToPresentation: () => void;
  onReplayIntro: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  userAnswers,
  onRetry,
  onSwitchToPresentation,
  onReplayIntro,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

  // Compute metrics
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === q.correctAnswer) {
      correctCount++;
    } else if (ans !== null && ans !== undefined) {
      incorrectCount++;
    } else {
      unattemptedCount++;
    }
  });

  const total = questions.length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const points = correctCount * 100;

  // Evaluation rank based on score
  let rankTitle = 'Tập Sự Sử Học Cổ Đại';
  let rankDesc = 'Bạn đã bước đầu làm quen với những nét văn hóa rực rỡ của lưu vực Sông Ấn và Sông Hằng.';
  let rankIcon = Award;

  if (scorePercent === 100) {
    rankTitle = 'Bậc Thầy Văn Minh Ấn Độ Cổ Đại';
    rankDesc = 'Tuyệt đỉnh! Bạn am hiểu trọn vẹn từ chữ Brà-mi, Sử thi Mahabharata, kiến trúc Stupa đến kịch nghệ Kalidasa.';
    rankIcon = Trophy;
  } else if (scorePercent >= 80) {
    rankTitle = 'Học Giả Sử Thi Xuất Chúng';
    rankDesc = 'Kiến thức lịch sử rất vững vàng và sâu rộng về những thành tựu của nền văn minh cổ đại.';
    rankIcon = Trophy;
  } else if (scorePercent >= 60) {
    rankTitle = 'Dũng Sĩ Đấu Trường Tri Thức';
    rankDesc = 'Kết quả rất tốt! Hãy xem lại phần giải thích để nắm vững trọn vẹn 100% các câu hỏi.';
    rankIcon = Award;
  }

  // Confetti and score count-up
  useEffect(() => {
    sound.playTempleGong();
    if (scorePercent >= 60) {
      sound.playCorrectSound();
      // Launch 3D golden fireworks
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#fde047', '#d97706', '#ffffff'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f59e0b', '#fde047', '#0284c7'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#f59e0b', '#fde047', '#0284c7'],
          });
        }, 350);
      } catch {
        // Ignored
      }
    } else {
      sound.playIncorrectSound();
    }

    // Rolling counter
    const stepTime = Math.max(15, 1200 / (points || 1));
    let cur = 0;
    const interval = setInterval(() => {
      cur += 20;
      if (cur >= points) {
        setDisplayScore(points);
        clearInterval(interval);
      } else {
        setDisplayScore(cur);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [points, scorePercent]);

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
      {/* Top Banner Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 text-center relative overflow-hidden gold-box-glow mb-8"
      >
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs uppercase tracking-widest font-cinzel mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tổng Kết Đấu Trường Tri Thức Lịch Sử</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-cinzel tracking-wider text-white mb-2">
          {BRAND_INFO.category}
        </h1>

        <p className="text-xs sm:text-sm text-amber-300/80 font-cinzel tracking-widest uppercase mb-6">
          {BRAND_INFO.creator}
        </p>

        {/* Score and Rank Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto my-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col items-center">
            <span className="text-xs uppercase font-cinzel text-amber-300/70">Tổng Điểm Số</span>
            <span className="text-3xl sm:text-4xl font-bold font-cinzel text-amber-400 mt-1 tabular-nums">
              {displayScore}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">/ {total * 100} điểm tối đa</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col items-center">
            <span className="text-xs uppercase font-cinzel text-amber-300/70">Tỉ Lệ Chính Xác</span>
            <span className="text-3xl sm:text-4xl font-bold font-cinzel text-emerald-400 mt-1 tabular-nums">
              {scorePercent}%
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">{correctCount}/{total} câu đúng</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col items-center">
            <span className="text-xs uppercase font-cinzel text-amber-300/70">Số Câu Sai / Bỏ Qua</span>
            <span className="text-3xl sm:text-4xl font-bold font-cinzel text-rose-400 mt-1 tabular-nums">
              {incorrectCount + unattemptedCount}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">cần ôn luyện lại</span>
          </div>
        </div>

        {/* Honor Rank Title Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-400/40 max-w-xl mx-auto mb-6 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300">
            {React.createElement(rankIcon, { className: 'w-6 h-6' })}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-cinzel text-amber-400 font-bold">
              Danh Hiệu: {rankTitle}
            </div>
            <div className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
              {rankDesc}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onRetry(false)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase text-amber-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Bộ Đề</span>
          </button>

          <button
            onClick={() => onRetry(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-400/50 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Shuffle className="w-4 h-4 text-amber-400" />
            <span>Xáo Trộn Đề & Thi Tiếp</span>
          </button>

          <button
            onClick={onSwitchToPresentation}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Presentation className="w-4 h-4 text-sky-400" />
            <span>Chế Độ Trình Chiếu</span>
          </button>

          <button
            onClick={onReplayIntro}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-cinzel text-xs tracking-wider uppercase text-slate-400 hover:text-amber-300 bg-black/40 hover:bg-black/60 border border-slate-800 transition-all cursor-pointer"
          >
            <Film className="w-4 h-4" />
            <span>Xem Lại Intro</span>
          </button>
        </div>
      </motion.div>

      {/* Detailed Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg sm:text-xl font-bold font-cinzel text-amber-200 flex items-center gap-2">
            <span>Chi Tiết Lời Giải Toàn Bộ 10 Câu Hỏi</span>
          </h2>
          <span className="text-xs text-slate-400">
            Nhấp vào từng câu để xem phân tích lịch sử sâu
          </span>
        </div>

        {questions.map((q, index) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          const isExpanded = expandedQuestionId === q.id;

          const chosenOptionObj = q.options.find((o) => o.key === userAns);
          const correctOptionObj = q.options.find((o) => o.key === q.correctAnswer);

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border transition-all glass-panel overflow-hidden ${
                isCorrect
                  ? 'border-emerald-500/30 bg-emerald-950/10'
                  : userAns
                  ? 'border-rose-500/30 bg-rose-950/10'
                  : 'border-slate-700/40 bg-slate-900/20'
              }`}
            >
              {/* Question Item Header */}
              <button
                onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="mt-0.5 shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : userAns ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-400/80" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-400">
                        {q.questionNumberLabel}
                      </span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs text-slate-400 font-sans">{q.tag}</span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-slate-100 leading-snug">
                      {q.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div
                    className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : userAns
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isCorrect ? 'Đúng' : userAns ? 'Sai' : 'Hết giờ'}
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Details and Historical Context */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-800 space-y-3 bg-black/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-3 rounded-xl border ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      <span className="font-semibold block mb-0.5">Lựa chọn của bạn:</span>
                      {chosenOptionObj ? (
                        <span>
                          <strong>{chosenOptionObj.key}.</strong> {chosenOptionObj.text}
                        </span>
                      ) : (
                        <span className="italic text-slate-400">Không có câu trả lời</span>
                      )}
                    </div>

                    <div className="p-3 rounded-xl border bg-amber-950/30 border-amber-400/40 text-amber-200">
                      <span className="font-semibold block mb-0.5">Đáp án chính xác:</span>
                      <strong>{correctOptionObj?.key}.</strong> {correctOptionObj?.text}
                    </div>
                  </div>

                  {/* Historical Knowledge Explanation */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/20 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="font-cinzel text-amber-400 font-bold block mb-1 uppercase tracking-wider text-xs">
                      Phân Tích Kiến Thức Lịch Sử:
                    </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="mt-12 text-center text-xs text-slate-500 font-cinzel">
        <p className="tracking-widest uppercase text-amber-400/70">{BRAND_INFO.creator}</p>
        <p className="mt-1 text-[11px] text-slate-600">Đấu Trường Tri Thức Lịch Sử · Bản quyền tác giả Trần Tiến Thành</p>
      </div>
    </div>
  );
};
