# Pattern Playground

Pattern Playground is a browser-based pattern-learning app for ages 3-5.

## March 5, 2026 Update Summary

- Replaced text-based tokens (`AP`, `DOG`, `CIR`, etc.) with visual tokens.
- Fruits and animals now render as cartoon-style emoji figures.
- Shapes now render as filled geometric icons (circle, square, triangle, diamond, star, hexagon, oval, rectangle).
- Colors now render as pure color dots (no color words shown on tokens).
- Simplified activity language and controls for 3-year-old usability.
- Increased touch target sizes and improved focus/high-contrast states.
- Refreshed the in-app materials panel with online resources for parent/teacher extension.

## What It Does

- Offers 4 non-mixed picture families: `fruits`, `colors`, `shapes`, `animals`
- Lets learners choose repeat size (2-6)
- Generates random repeating cycles
- Includes three activities:
  - **What Next?**
  - **Fill Blanks**
  - **Make Pattern**
- Tracks stars earned
- Supports speech playback of prompt text

## Start The App

```powershell
cd C:\Users\guwei\pattern-learning-app
python -m http.server 8000
```

Open `http://localhost:8000` in a browser.

## Project Files

- `index.html` - UI structure and activity panels
- `styles.css` - toddler-first visual styling and responsive layout
- `app.js` - pattern generation, puzzle flow, scoring, and token rendering
- `FUTURE_ITERATIONS.md` - current status and next roadmap

## Online Materials Used (Reviewed March 5, 2026)

- https://www.mathlearningcenter.org/apps/pattern-shapes
- https://toytheater.com/pattern-blocks/
- https://www.pbssocal.org/education/pbs-socal-family-math/patterns
- https://www.k5learning.com/free-preschool-kindergarten-worksheets/patterns/objects
- https://www.k5learning.com/free-preschool-kindergarten-worksheets/patterns/shapes
- https://www.k5learning.com/free-preschool-kindergarten-worksheets/colors
- https://www.education.com/worksheet/article/pattern-practice-complete-pattern-2/
- https://www.education.com/worksheet/article/patterns-animals-prek/
- https://www.prekinders.com/pattern-block-safari/

