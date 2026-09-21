// =============================================================================
// OBJECT QUIZ ENGINE
// Component Inspection Quiz Generator & Scoring System
// =============================================================================

let quizQuestions = [];
let currentQuestionIndex = 0;
let quizScore = 0;

async function startQuiz() {
  const obj = OBJECTS[currentObjectId];
  if (!obj || !obj.parts || obj.parts.length === 0) return;

  const btn = document.getElementById('startQuizBtn');
  const originalHtml = btn ? btn.innerHTML : '';

  // Loading state while ensuring every part has its explanation fetched and cached
  if (btn) {
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-wait');
    btn.innerHTML = `
      <div class="w-3.5 h-3.5 border-2 border-sky-400/20 border-t-sky-400 rounded-full animate-spin"></div>
      <span>Preparing Quiz...</span>
    `;
  }

  try {
    const fetchPromises = obj.parts.map((part) => {
      const cacheKey = `${currentObjectId}:${part.id}`;
      if (descriptionCache[cacheKey]) return Promise.resolve(descriptionCache[cacheKey]);
      return getDescription(currentObjectId, part.id, obj.label, part.name);
    });
    await Promise.all(fetchPromises);
  } catch (e) {
    console.warn('Quiz pre-fetch fallback:', e);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.classList.remove('opacity-75', 'cursor-wait');
      btn.innerHTML = originalHtml;
    }
  }

  // Build questions
  buildQuizQuestions();
  currentQuestionIndex = 0;
  quizScore = 0;

  // Open modal
  const modal = document.getElementById('quizModal');
  const objSub = document.getElementById('quizObjectSubhead');
  if (objSub) objSub.textContent = `Model: ${obj.label} (${obj.category || 'General'})`;
  if (modal) modal.classList.remove('hidden');

  renderCurrentQuizQuestion();
}

function buildQuizQuestions() {
  const obj = OBJECTS[currentObjectId];
  if (!obj || !obj.parts) return;

  const allParts = obj.parts;
  quizQuestions = [];

  allParts.forEach((part) => {
    const cacheKey = `${currentObjectId}:${part.id}`;
    const cached = descriptionCache[cacheKey];
    const explanation =
      (cached && cached.description) ||
      part.description ||
      part.explanation ||
      `Core engineered component of ${obj.label}.`;

    // Distractors: other parts of the SAME object
    const otherParts = allParts.filter((p) => p.id !== part.id);
    const shuffledOthers = [...otherParts].sort(() => 0.5 - Math.random());
    const chosenDistractors = shuffledOthers.slice(0, 3).map((p) => p.name);

    // Combined options with correct answer + distractors (minimum 2 options)
    const allOptions = [part.name, ...chosenDistractors].sort(() => 0.5 - Math.random());

    quizQuestions.push({
      partId: part.id,
      partName: part.name,
      explanation,
      options: allOptions,
      correctAnswer: part.name,
    });
  });

  // Shuffle question sequence
  quizQuestions.sort(() => 0.5 - Math.random());
}

function renderCurrentQuizQuestion() {
  const contentArea = document.getElementById('quizContentArea');
  if (!contentArea) return;

  if (currentQuestionIndex >= quizQuestions.length) {
    renderQuizSummary();
    return;
  }

  const q = quizQuestions[currentQuestionIndex];
  const total = quizQuestions.length;

  contentArea.innerHTML = `
    <div class="space-y-4">
      <!-- Progress Bar & Question Counter -->
      <div class="flex items-center justify-between text-xs">
        <span class="font-mono text-sky-400 font-semibold uppercase tracking-wider">
          Question ${currentQuestionIndex + 1} of ${total}
        </span>
        <span class="font-mono text-slate-400">Score: <strong class="text-white">${quizScore}</strong> / ${currentQuestionIndex}</span>
      </div>
      <div class="w-full bg-[#1c2433] h-1.5 rounded-full overflow-hidden">
        <div class="bg-sky-400 h-full transition-all duration-300 rounded-full" style="width: ${
          (currentQuestionIndex / total) * 100
        }%"></div>
      </div>

      <!-- Description Card -->
      <div class="p-4 rounded-xl bg-[#141b26] border border-[#242e40]">
        <span class="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">Component Role & Description</span>
        <p class="text-sm text-slate-100 leading-relaxed">${q.explanation}</p>
      </div>

      <!-- Question Prompt & Multiple Choice Grid -->
      <div>
        <h4 class="text-xs font-semibold text-slate-200 mb-3">Which part does this describe?</h4>
        <div id="quizOptionsGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${q.options
            .map(
              (opt, i) => `
            <button type="button" class="quiz-option-btn p-3 rounded-xl bg-[#131924] border border-[#253245] hover:border-sky-500/60 hover:bg-[#182232] text-left text-xs font-medium text-slate-200 transition-all flex items-center justify-between group" data-option="${opt}">
              <span class="truncate pr-2">${opt}</span>
              <span class="w-5 h-5 rounded-md border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 group-hover:border-sky-400 group-hover:text-sky-300 shrink-0 font-mono">
                ${String.fromCharCode(65 + i)}
              </span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Feedback Area (revealed on answer) -->
      <div id="quizFeedbackBox" class="hidden pt-1">
        <div id="quizFeedbackMessage" class="p-3 rounded-lg text-xs font-medium mb-3 flex items-center gap-2"></div>
        <div class="flex justify-end">
          <button id="quizNextBtn" type="button" class="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md">
            <span>${currentQuestionIndex + 1 === total ? 'View Score Summary' : 'Next Question'}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach option click handlers
  const optionBtns = contentArea.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.option;
      handleAnswerSelection(selected, q, optionBtns);
    });
  });

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      renderCurrentQuizQuestion();
    });
  }
}

function handleAnswerSelection(selected, question, allBtns) {
  allBtns.forEach((b) => {
    b.disabled = true;
    b.classList.remove('hover:border-sky-500/60', 'hover:bg-[#182232]', 'cursor-pointer');
    b.classList.add('cursor-default');
  });

  const isCorrect = selected === question.correctAnswer;
  if (isCorrect) {
    quizScore++;
  }

  allBtns.forEach((b) => {
    if (b.dataset.option === question.correctAnswer) {
      b.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-300', 'font-semibold');
    } else if (b.dataset.option === selected && !isCorrect) {
      b.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
    } else {
      b.classList.add('opacity-45');
    }
  });

  const feedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackMsg = document.getElementById('quizFeedbackMessage');
  if (feedbackBox && feedbackMsg) {
    feedbackBox.classList.remove('hidden');
    if (isCorrect) {
      feedbackMsg.className =
        'p-3 rounded-lg text-xs font-medium mb-3 flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300';
      feedbackMsg.innerHTML = `
        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Correct! That is the <strong>${question.correctAnswer}</strong>.</span>
      `;
    } else {
      feedbackMsg.className =
        'p-3 rounded-lg text-xs font-medium mb-3 flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 text-rose-300';
      feedbackMsg.innerHTML = `
        <svg class="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Incorrect. The correct answer is <strong>${question.correctAnswer}</strong>.</span>
      `;
    }
  }
}

function renderQuizSummary() {
  const contentArea = document.getElementById('quizContentArea');
  if (!contentArea) return;

  const total = quizQuestions.length;
  const percentage = Math.round((quizScore / total) * 100);
  const obj = OBJECTS[currentObjectId];

  let badgeText = 'Knowledge Explorer';
  let badgeColor = 'text-sky-400 border-sky-500/30 bg-sky-500/10';
  let headline = 'Good effort!';
  if (percentage === 100) {
    badgeText = 'Master Engineer';
    badgeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    headline = 'Flawless Knowledge!';
  } else if (percentage >= 70) {
    badgeText = 'Certified Specialist';
    badgeColor = 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    headline = 'Great Performance!';
  } else if (percentage >= 40) {
    badgeText = 'Apprentice Inspector';
    badgeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    headline = 'Solid Attempt!';
  }

  contentArea.innerHTML = `
    <div class="text-center py-4 space-y-5">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#141b26] border border-[#253245] shadow-xl text-3xl">
        ${percentage >= 70 ? '🏆' : '🔬'}
      </div>

      <div>
        <span class="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeColor} inline-block mb-2 font-semibold">
          ${badgeText}
        </span>
        <h3 class="text-lg font-bold text-white">${headline}</h3>
        <p class="text-xs text-slate-400 mt-1">
          You completed the component inspection quiz for <strong class="text-slate-200">${obj.label}</strong>.
        </p>
      </div>

      <!-- Score Card -->
      <div class="p-5 rounded-2xl bg-[#141b26] border border-[#242e40] max-w-sm mx-auto">
        <div class="text-3xl font-extrabold text-white font-mono tracking-tight">${quizScore} / ${total}</div>
        <div class="text-xs font-mono text-sky-400 mt-0.5">${percentage}% Accuracy</div>
        <div class="w-full bg-[#1c2433] h-2 rounded-full overflow-hidden mt-3">
          <div class="bg-gradient-to-r from-sky-500 to-blue-500 h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-center gap-3 pt-2">
        <button id="retakeQuizBtn" type="button" class="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Retake Quiz</span>
        </button>
        <button id="finishQuizBtn" type="button" class="px-4 py-2 rounded-xl bg-[#161d28] hover:bg-[#1e2736] border border-[#2a364a] text-slate-300 hover:text-white font-medium text-xs transition-colors">
          Close Quiz
        </button>
      </div>
    </div>
  `;

  document.getElementById('retakeQuizBtn').addEventListener('click', () => {
    buildQuizQuestions();
    currentQuestionIndex = 0;
    quizScore = 0;
    renderCurrentQuizQuestion();
  });

  document.getElementById('finishQuizBtn').addEventListener('click', () => {
    document.getElementById('quizModal').classList.add('hidden');
  });
}
