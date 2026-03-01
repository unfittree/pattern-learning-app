const tokenLibrary = {
  apple: { id: "apple", emoji: "🍎", name: "apple" },
  banana: { id: "banana", emoji: "🍌", name: "banana" },
  car: { id: "car", emoji: "🚗", name: "car" },
  star: { id: "star", emoji: "⭐", name: "star" },
  ball: { id: "ball", emoji: "⚽", name: "ball" },
  flower: { id: "flower", emoji: "🌼", name: "flower" }
};

const nextPuzzles = [
  { prompt: "Apple, banana, apple, banana... what comes next?", sequence: ["apple", "banana", "apple", "banana"], answer: "apple" },
  { prompt: "Star, star, car, star, star... what comes next?", sequence: ["star", "star", "car", "star", "star"], answer: "car" },
  { prompt: "Ball, flower, flower, ball, flower, flower... what comes next?", sequence: ["ball", "flower", "flower", "ball", "flower", "flower"], answer: "ball" },
  { prompt: "Apple, banana, flower, apple, banana, flower... what comes next?", sequence: ["apple", "banana", "flower", "apple", "banana", "flower"], answer: "apple" }
];

const fillPuzzles = [
  { sequence: ["apple", "banana", "apple", "banana"], answers: ["apple", "banana"] },
  { sequence: ["star", "star", "car", "star", "star"], answers: ["star", "car"] },
  { sequence: ["ball", "flower", "flower", "ball", "flower"], answers: ["ball", "flower"] },
  { sequence: ["apple", "banana", "flower", "apple", "banana"], answers: ["apple", "banana"] }
];

const buildPalette = ["apple", "banana", "car", "star", "ball", "flower"];

let stars = 0;
let currentNext = null;
let currentFill = null;
let fillSelected = [];
let fillChoices = [];
let buildSequence = [];

const els = {
  starCount: document.getElementById("star-count"),
  tabs: document.querySelectorAll(".tab"),
  panels: document.querySelectorAll(".panel"),
  nextStrip: document.getElementById("next-strip"),
  nextChoices: document.getElementById("next-choices"),
  nextHint: document.getElementById("next-hint"),
  nextFeedback: document.getElementById("next-feedback"),
  nextPuzzle: document.getElementById("next-puzzle"),
  speakNext: document.getElementById("speak-next"),
  fillStrip: document.getElementById("fill-strip"),
  fillHint: document.getElementById("fill-hint"),
  fillFeedback: document.getElementById("fill-feedback"),
  checkFill: document.getElementById("check-fill"),
  newFill: document.getElementById("new-fill"),
  buildPalette: document.getElementById("build-palette"),
  buildOutput: document.getElementById("build-output"),
  checkBuild: document.getElementById("check-build"),
  clearBuild: document.getElementById("clear-build"),
  buildFeedback: document.getElementById("build-feedback")
};

function createTokenButton(tokenId, opts = {}) {
  const token = tokenLibrary[tokenId];
  const button = document.createElement("button");
  button.type = "button";
  button.className = `token color-${token.id}${opts.fixed ? " fixed" : ""}${opts.blank ? " blank" : ""}`;
  button.textContent = opts.blank ? "?" : token.emoji;
  button.setAttribute("aria-label", token.name);
  return button;
}

function setFeedback(el, text, status) {
  el.textContent = text;
  el.classList.remove("good", "bad");
  if (status) {
    el.classList.add(status);
  }
}

function updateStars(delta = 0) {
  stars += delta;
  els.starCount.textContent = String(stars);
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function uniqueIds(ids) {
  return [...new Set(ids)];
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

function loadNextPuzzle() {
  currentNext = randomItem(nextPuzzles);
  els.nextStrip.innerHTML = "";
  currentNext.sequence.forEach((id) => {
    els.nextStrip.appendChild(createTokenButton(id, { fixed: true }));
  });
  const blank = document.createElement("div");
  blank.className = "token blank";
  blank.setAttribute("aria-hidden", "true");
  blank.textContent = "?";
  els.nextStrip.appendChild(blank);

  const distractors = shuffle(
    uniqueIds(buildPalette.filter((id) => id !== currentNext.answer))
  ).slice(0, 2);
  const options = shuffle([currentNext.answer, ...distractors]);

  els.nextChoices.innerHTML = "";
  options.forEach((id) => {
    const button = createTokenButton(id);
    button.addEventListener("click", () => {
      if (id === currentNext.answer) {
        updateStars(1);
        setFeedback(els.nextFeedback, "Nice work! You found the pattern.", "good");
      } else {
        setFeedback(els.nextFeedback, "Try again. Say the pattern out loud.", "bad");
      }
    });
    els.nextChoices.appendChild(button);
  });

  els.nextHint.textContent = currentNext.prompt;
  setFeedback(els.nextFeedback, "", "");
}

function renderFillPuzzle() {
  els.fillStrip.innerHTML = "";
  const shown = currentFill.sequence.slice(0, currentFill.sequence.length - 2);
  shown.forEach((id) => {
    els.fillStrip.appendChild(createTokenButton(id, { fixed: true }));
  });

  fillSelected.forEach((choiceIndex, blankIndex) => {
    const tokenId = fillChoices[choiceIndex];
    const blankButton = createTokenButton(tokenId, { blank: false });
    blankButton.classList.add("blank");
    blankButton.textContent = tokenLibrary[tokenId].emoji;
    blankButton.addEventListener("click", () => {
      fillSelected[blankIndex] = (fillSelected[blankIndex] + 1) % fillChoices.length;
      renderFillPuzzle();
    });
    blankButton.setAttribute("aria-label", `blank ${blankIndex + 1}`);
    els.fillStrip.appendChild(blankButton);
  });
}

function loadFillPuzzle() {
  currentFill = randomItem(fillPuzzles);
  fillChoices = uniqueIds(currentFill.sequence);
  fillSelected = [0, 0];
  renderFillPuzzle();
  setFeedback(els.fillFeedback, "", "");
}

function checkFillAnswers() {
  const chosen = fillSelected.map((idx) => fillChoices[idx]);
  const ok = chosen.every((id, idx) => id === currentFill.answers[idx]);
  if (ok) {
    updateStars(1);
    setFeedback(els.fillFeedback, "Great pattern matching!", "good");
  } else {
    setFeedback(els.fillFeedback, "Not yet. Tap blanks and try again.", "bad");
  }
}

function renderBuildPalette() {
  els.buildPalette.innerHTML = "";
  buildPalette.forEach((id) => {
    const button = createTokenButton(id);
    button.addEventListener("click", () => {
      buildSequence.push(id);
      renderBuildOutput();
      setFeedback(els.buildFeedback, "", "");
    });
    els.buildPalette.appendChild(button);
  });
}

function renderBuildOutput() {
  els.buildOutput.innerHTML = "";
  if (!buildSequence.length) {
    const helper = document.createElement("p");
    helper.textContent = "Your pattern will appear here.";
    els.buildOutput.appendChild(helper);
    return;
  }

  buildSequence.forEach((id) => {
    els.buildOutput.appendChild(createTokenButton(id, { fixed: true }));
  });
}

function hasRepeatingUnit(sequence) {
  if (sequence.length < 4) {
    return false;
  }

  const maxCore = Math.min(4, Math.floor(sequence.length / 2));
  for (let core = 1; core <= maxCore; core += 1) {
    let matches = true;
    for (let i = 0; i < sequence.length; i += 1) {
      if (sequence[i] !== sequence[i % core]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      return true;
    }
  }
  return false;
}

function checkBuildPattern() {
  if (hasRepeatingUnit(buildSequence)) {
    updateStars(1);
    setFeedback(els.buildFeedback, "Awesome! You made a repeating pattern.", "good");
  } else {
    setFeedback(els.buildFeedback, "Try making a short part and repeating it.", "bad");
  }
}

function clearBuildPattern() {
  buildSequence = [];
  renderBuildOutput();
  setFeedback(els.buildFeedback, "", "");
}

function setupTabs() {
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      els.tabs.forEach((node) => node.classList.remove("active"));
      els.panels.forEach((node) => node.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
}

function init() {
  setupTabs();
  renderBuildPalette();
  renderBuildOutput();
  loadNextPuzzle();
  loadFillPuzzle();

  els.nextPuzzle.addEventListener("click", loadNextPuzzle);
  els.speakNext.addEventListener("click", () => speak(els.nextHint.textContent));
  els.checkFill.addEventListener("click", checkFillAnswers);
  els.newFill.addEventListener("click", loadFillPuzzle);
  els.checkBuild.addEventListener("click", checkBuildPattern);
  els.clearBuild.addEventListener("click", clearBuildPattern);
}

init();
