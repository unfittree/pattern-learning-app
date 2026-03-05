const categories = {
  fruits: {
    id: "fruits",
    label: "Fruits",
    tokenIds: [
      "apple",
      "banana",
      "orange",
      "grape",
      "strawberry",
      "watermelon",
      "pear",
      "pineapple"
    ]
  },
  colors: {
    id: "colors",
    label: "Colors",
    tokenIds: [
      "red",
      "blue",
      "green",
      "yellow",
      "orangeColor",
      "purple",
      "brown",
      "pink"
    ]
  },
  shapes: {
    id: "shapes",
    label: "Shapes",
    tokenIds: [
      "circle",
      "square",
      "triangle",
      "diamond",
      "starShape",
      "hexagon",
      "oval",
      "rectangle"
    ]
  },
  animals: {
    id: "animals",
    label: "Animals",
    tokenIds: [
      "cat",
      "dog",
      "rabbit",
      "lion",
      "elephant",
      "monkey",
      "turtle",
      "bird"
    ]
  }
};

const tokenLibrary = {
  apple: { id: "apple", kind: "emoji", emoji: "🍎", name: "apple", tint: "#ffd7dc" },
  banana: { id: "banana", kind: "emoji", emoji: "🍌", name: "banana", tint: "#fff4b7" },
  orange: { id: "orange", kind: "emoji", emoji: "🍊", name: "orange", tint: "#ffe1bb" },
  grape: { id: "grape", kind: "emoji", emoji: "🍇", name: "grape", tint: "#ead5ff" },
  strawberry: { id: "strawberry", kind: "emoji", emoji: "🍓", name: "strawberry", tint: "#ffd5df" },
  watermelon: { id: "watermelon", kind: "emoji", emoji: "🍉", name: "watermelon", tint: "#d7f8d3" },
  pear: { id: "pear", kind: "emoji", emoji: "🍐", name: "pear", tint: "#e7f7c2" },
  pineapple: { id: "pineapple", kind: "emoji", emoji: "🍍", name: "pineapple", tint: "#fff0b0" },

  red: { id: "red", kind: "color", name: "red", color: "#f94144", tint: "#ffd6d6" },
  blue: { id: "blue", kind: "color", name: "blue", color: "#3a86ff", tint: "#d9ebff" },
  green: { id: "green", kind: "color", name: "green", color: "#4caf50", tint: "#d6f5da" },
  yellow: { id: "yellow", kind: "color", name: "yellow", color: "#ffd60a", tint: "#fff5c7" },
  orangeColor: { id: "orangeColor", kind: "color", name: "orange", color: "#ff922b", tint: "#ffe4c9" },
  purple: { id: "purple", kind: "color", name: "purple", color: "#9d4edd", tint: "#ecd9ff" },
  brown: { id: "brown", kind: "color", name: "brown", color: "#8d5524", tint: "#f0dfcf" },
  pink: { id: "pink", kind: "color", name: "pink", color: "#ff6fae", tint: "#ffd9f0" },

  circle: { id: "circle", kind: "shape", shape: "circle", name: "circle", fill: "#3a86ff", tint: "#e5f0ff" },
  square: { id: "square", kind: "shape", shape: "square", name: "square", fill: "#22b573", tint: "#dff5ef" },
  triangle: { id: "triangle", kind: "shape", shape: "triangle", name: "triangle", fill: "#ff7f50", tint: "#fff0d4" },
  diamond: { id: "diamond", kind: "shape", shape: "diamond", name: "diamond", fill: "#b565f2", tint: "#f6defd" },
  starShape: { id: "starShape", kind: "shape", shape: "star", name: "star", fill: "#f5b700", tint: "#ffe8a8" },
  hexagon: { id: "hexagon", kind: "shape", shape: "hexagon", name: "hexagon", fill: "#5abf90", tint: "#e5e8ff" },
  oval: { id: "oval", kind: "shape", shape: "oval", name: "oval", fill: "#ff8fab", tint: "#ffe2e2" },
  rectangle: { id: "rectangle", kind: "shape", shape: "rectangle", name: "rectangle", fill: "#34c0d3", tint: "#def6f8" },

  cat: { id: "cat", kind: "emoji", emoji: "🐱", name: "cat", tint: "#ffe8d4" },
  dog: { id: "dog", kind: "emoji", emoji: "🐶", name: "dog", tint: "#ffe3cc" },
  rabbit: { id: "rabbit", kind: "emoji", emoji: "🐰", name: "rabbit", tint: "#f4e3ff" },
  lion: { id: "lion", kind: "emoji", emoji: "🦁", name: "lion", tint: "#ffe6b6" },
  elephant: { id: "elephant", kind: "emoji", emoji: "🐘", name: "elephant", tint: "#dde8f7" },
  monkey: { id: "monkey", kind: "emoji", emoji: "🐵", name: "monkey", tint: "#f3dbc7" },
  turtle: { id: "turtle", kind: "emoji", emoji: "🐢", name: "turtle", tint: "#daf4d3" },
  bird: { id: "bird", kind: "emoji", emoji: "🐦", name: "bird", tint: "#d8ecff" }
};

const generatorState = {
  category: "fruits",
  cycleLength: 2
};

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

  categorySelect: document.getElementById("category-select"),
  cycleLengthSelect: document.getElementById("cycle-length-select"),
  generatePattern: document.getElementById("generate-pattern"),
  generatorStrip: document.getElementById("generator-strip"),
  generatorFeedback: document.getElementById("generator-feedback"),

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

  buildConfig: document.getElementById("build-config"),
  buildPalette: document.getElementById("build-palette"),
  buildOutput: document.getElementById("build-output"),
  checkBuild: document.getElementById("check-build"),
  clearBuild: document.getElementById("clear-build"),
  buildFeedback: document.getElementById("build-feedback")
};

function createTokenVisual(token) {
  const visual = document.createElement("span");
  visual.className = "token-visual";

  if (token.kind === "emoji") {
    visual.classList.add("emoji-icon");
    visual.textContent = token.emoji;
    return visual;
  }

  if (token.kind === "color") {
    visual.classList.add("color-dot");
    visual.style.backgroundColor = token.color;
    return visual;
  }

  if (token.kind === "shape") {
    visual.classList.add("shape-icon", `shape-${token.shape}`);
    visual.style.setProperty("--shape-fill", token.fill);
    return visual;
  }

  visual.textContent = "?";
  return visual;
}

function createTokenButton(tokenId, opts = {}) {
  const token = tokenLibrary[tokenId];
  const button = document.createElement("button");
  button.type = "button";
  button.className = `token${opts.fixed ? " fixed" : ""}${opts.slot ? " slot" : ""}`;
  button.setAttribute("aria-label", opts.label || (token ? token.name : "blank"));

  if (token) {
    button.style.backgroundColor = token.tint;
    button.appendChild(createTokenVisual(token));
  } else {
    button.textContent = "?";
  }

  return button;
}

function createPlaceholderToken() {
  const placeholder = document.createElement("div");
  placeholder.className = "token slot fixed";
  placeholder.textContent = "?";
  placeholder.setAttribute("aria-hidden", "true");
  return placeholder;
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function getActiveTokenPool() {
  return categories[generatorState.category].tokenIds;
}

function updateCycleLengthOptions() {
  const current = Number(els.cycleLengthSelect.value) || generatorState.cycleLength;
  const maxCycleLength = Math.min(6, getActiveTokenPool().length);

  els.cycleLengthSelect.innerHTML = "";
  for (let length = 2; length <= maxCycleLength; length += 1) {
    const option = document.createElement("option");
    option.value = String(length);
    option.textContent = String(length);
    els.cycleLengthSelect.appendChild(option);
  }

  generatorState.cycleLength = Math.min(Math.max(2, current), maxCycleLength);
  els.cycleLengthSelect.value = String(generatorState.cycleLength);
}

function applyGeneratorSettings() {
  generatorState.category = els.categorySelect.value;
  generatorState.cycleLength = Number(els.cycleLengthSelect.value);
}

function createRandomPatternBlueprint() {
  const tokenPool = getActiveTokenPool();
  const cycle = shuffle(tokenPool).slice(0, generatorState.cycleLength);
  const rotation = randomInt(0, cycle.length - 1);
  const rotatedCycle = cycle.map((_, idx) => cycle[(idx + rotation) % cycle.length]);
  const repeats = randomInt(3, 5);
  const sequence = [];

  for (let i = 0; i < repeats; i += 1) {
    sequence.push(...rotatedCycle);
  }

  return {
    category: generatorState.category,
    cycleLength: generatorState.cycleLength,
    cycle: rotatedCycle,
    repeats,
    sequence
  };
}

function renderGeneratorPreview(pattern) {
  els.generatorStrip.innerHTML = "";
  const previewLength = Math.min(pattern.sequence.length, pattern.cycleLength * 2 + 1);
  pattern.sequence.slice(0, previewLength).forEach((id) => {
    els.generatorStrip.appendChild(createTokenButton(id, { fixed: true }));
  });

  const familyLabel = categories[pattern.category].label.toLowerCase();
  setFeedback(
    els.generatorFeedback,
    `New ${familyLabel} pattern ready. Cycle size: ${pattern.cycleLength}.`,
    ""
  );
}

function buildNextPuzzleFromPattern(pattern) {
  const minReveal = Math.max(pattern.cycleLength + 1, 4);
  const maxReveal = pattern.sequence.length - 1;
  const revealLength = randomInt(minReveal, maxReveal);

  return {
    pattern,
    shownSequence: pattern.sequence.slice(0, revealLength),
    answer: pattern.sequence[revealLength],
    answered: false,
    prompt: "Look at the pictures. Tap what comes next."
  };
}

function renderNextPuzzle() {
  if (!currentNext) {
    return;
  }

  els.nextStrip.innerHTML = "";
  currentNext.shownSequence.forEach((id) => {
    els.nextStrip.appendChild(createTokenButton(id, { fixed: true }));
  });
  els.nextStrip.appendChild(createPlaceholderToken());

  const optionPool = categories[currentNext.pattern.category].tokenIds.filter(
    (id) => id !== currentNext.answer
  );
  const distractors = shuffle(optionPool).slice(0, Math.min(3, optionPool.length));
  const options = shuffle([currentNext.answer, ...distractors]);

  els.nextChoices.innerHTML = "";
  options.forEach((id) => {
    const button = createTokenButton(id);
    button.addEventListener("click", () => {
      if (currentNext.answered) {
        return;
      }

      if (id === currentNext.answer) {
        currentNext.answered = true;
        updateStars(1);
        setFeedback(els.nextFeedback, "Great job! You found it.", "good");
        els.nextChoices.querySelectorAll("button").forEach((choice) => {
          choice.disabled = true;
        });
      } else {
        setFeedback(els.nextFeedback, "Try again. Tap and say the pattern.", "bad");
      }
    });
    els.nextChoices.appendChild(button);
  });

  els.nextHint.textContent = currentNext.prompt;
  setFeedback(els.nextFeedback, "", "");
}

function loadNextPuzzle() {
  applyGeneratorSettings();
  const pattern = createRandomPatternBlueprint();
  currentNext = buildNextPuzzleFromPattern(pattern);
  renderGeneratorPreview(pattern);
  renderNextPuzzle();
}

function buildFillPuzzleFromPattern(pattern) {
  const blankCount = Math.min(3, Math.max(2, Math.floor(pattern.cycleLength / 2) + 1));
  const splitIndex = pattern.sequence.length - blankCount;
  const shownSequence = pattern.sequence.slice(0, splitIndex);
  const answers = pattern.sequence.slice(splitIndex);

  return {
    pattern,
    blankCount,
    shownSequence,
    answers
  };
}

function renderFillPuzzle() {
  if (!currentFill) {
    return;
  }

  els.fillStrip.innerHTML = "";
  currentFill.shownSequence.forEach((id) => {
    els.fillStrip.appendChild(createTokenButton(id, { fixed: true }));
  });

  fillSelected.forEach((choiceIndex, blankIndex) => {
    const tokenId = fillChoices[choiceIndex];
    const blankButton = createTokenButton(tokenId, {
      slot: true,
      label: `blank ${blankIndex + 1}: ${tokenLibrary[tokenId].name}`
    });
    blankButton.addEventListener("click", () => {
      fillSelected[blankIndex] = (fillSelected[blankIndex] + 1) % fillChoices.length;
      renderFillPuzzle();
    });
    els.fillStrip.appendChild(blankButton);
  });
}

function loadFillPuzzle() {
  applyGeneratorSettings();
  const pattern = createRandomPatternBlueprint();
  currentFill = buildFillPuzzleFromPattern(pattern);
  fillChoices = shuffle(uniqueIds(pattern.cycle));
  fillSelected = new Array(currentFill.blankCount).fill(0);

  renderGeneratorPreview(pattern);
  renderFillPuzzle();
  setFeedback(els.fillFeedback, "", "");
}

function checkFillAnswers() {
  if (!currentFill) {
    return;
  }

  const chosen = fillSelected.map((idx) => fillChoices[idx]);
  const ok = chosen.every((id, idx) => id === currentFill.answers[idx]);

  if (ok) {
    updateStars(1);
    setFeedback(els.fillFeedback, "Nice matching!", "good");
  } else {
    setFeedback(els.fillFeedback, "Keep trying. Tap blanks again.", "bad");
  }
}

function renderBuildConfig() {
  const familyLabel = categories[generatorState.category].label;
  els.buildConfig.textContent = `${familyLabel} pictures, ${generatorState.cycleLength} in each repeat.`;
}

function renderBuildPalette() {
  els.buildPalette.innerHTML = "";

  getActiveTokenPool().forEach((id) => {
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
    helper.textContent = "Tap pictures to build your pattern.";
    els.buildOutput.appendChild(helper);
    return;
  }

  buildSequence.forEach((id) => {
    els.buildOutput.appendChild(createTokenButton(id, { fixed: true }));
  });
}

function hasRepeatingUnit(sequence, coreLength) {
  if (coreLength < 2 || sequence.length < coreLength * 2) {
    return false;
  }

  if (sequence.length % coreLength !== 0) {
    return false;
  }

  for (let i = 0; i < sequence.length; i += 1) {
    if (sequence[i] !== sequence[i % coreLength]) {
      return false;
    }
  }

  return true;
}

function checkBuildPattern() {
  if (hasRepeatingUnit(buildSequence, generatorState.cycleLength)) {
    updateStars(1);
    setFeedback(els.buildFeedback, "Awesome repeat pattern!", "good");
  } else {
    setFeedback(
      els.buildFeedback,
      `Repeat ${generatorState.cycleLength} pictures at least two times.`,
      "bad"
    );
  }
}

function clearBuildPattern() {
  buildSequence = [];
  renderBuildOutput();
  setFeedback(els.buildFeedback, "", "");
}

function generateAllPuzzles() {
  applyGeneratorSettings();
  const pattern = createRandomPatternBlueprint();

  currentNext = buildNextPuzzleFromPattern(pattern);
  currentFill = buildFillPuzzleFromPattern(pattern);
  fillChoices = shuffle(uniqueIds(pattern.cycle));
  fillSelected = new Array(currentFill.blankCount).fill(0);

  clearBuildPattern();
  renderBuildPalette();
  renderBuildConfig();
  renderGeneratorPreview(pattern);
  renderNextPuzzle();
  renderFillPuzzle();
  setFeedback(els.fillFeedback, "", "");
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

function setupGeneratorControls() {
  els.categorySelect.addEventListener("change", () => {
    generatorState.category = els.categorySelect.value;
    updateCycleLengthOptions();
    renderBuildPalette();
    clearBuildPattern();
    renderBuildConfig();
  });

  els.cycleLengthSelect.addEventListener("change", () => {
    generatorState.cycleLength = Number(els.cycleLengthSelect.value);
    clearBuildPattern();
    renderBuildConfig();
  });

  els.generatePattern.addEventListener("click", generateAllPuzzles);
}

function init() {
  setupTabs();
  setupGeneratorControls();

  els.categorySelect.value = generatorState.category;
  updateCycleLengthOptions();
  renderBuildPalette();
  renderBuildOutput();
  renderBuildConfig();
  generateAllPuzzles();

  els.nextPuzzle.addEventListener("click", loadNextPuzzle);
  els.speakNext.addEventListener("click", () => speak(els.nextHint.textContent));
  els.checkFill.addEventListener("click", checkFillAnswers);
  els.newFill.addEventListener("click", loadFillPuzzle);
  els.checkBuild.addEventListener("click", checkBuildPattern);
  els.clearBuild.addEventListener("click", clearBuildPattern);
}

init();
