# ConsultAnythingTech Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build and publish a high-performance, responsive showcase website for ConsultAnythingTech on GitHub Pages (`consultanything-tech.github.io`) showcasing consultancy services, featured software products (HyperFetch, ProofPath, IndiaCrafted, SpendWise), and an inquiry form.

**Architecture:** A static, zero-build modern website using semantic HTML5, Tailwind CSS, and Vanilla JavaScript. Includes automated verification tests (Python/Node) to ensure HTML5 compliance, accessibility (WCAG), metadata/SEO, and link integrity, plus a GitHub Actions workflow for automatic Pages deployment.

**Tech Stack:** HTML5, Tailwind CSS, Vanilla JS, Lucide Icons (SVG), Python/Playwright/Http server for verification, GitHub Pages, GitHub Actions.

---

### Task 1: Initialize Git Repository and Remote Configuration

**Files:**
- Create: `README.md`
- Create: `.gitignore`
- Create: `CNAME` (optional placeholder or custom domain note)

**Step 1: Write failing verification test**
- Test command: Verify repository initialization and GitHub remote `git remote -v` pointing to `consultanything-tech/consultanything-tech.github.io`.

**Step 2: Run verification test to observe failure**
- Run: `git status`
- Expected: Not a git repository.

**Step 3: Implement minimal repository initialization**
- Initialize git repo on branch `main`.
- Create `.gitignore` and `README.md`.
- Use `gh repo create consultanything-tech/consultanything-tech.github.io --public --source=. --remote=origin` (or create and link remote).

**Step 4: Verify repository and remote**
- Run: `git remote -v && git branch`
- Expected: origin pointing to `https://github.com/consultanything-tech/consultanything-tech.github.io.git` on branch `main`.

**Step 5: Commit initial structure**
- Run: `git add .gitignore README.md && git commit -m "chore: initialize repository and project documentation"`

---

### Task 2: Core Design System, SEO Metadata, and Semantic Layout Structure

**Files:**
- Create: `index.html`
- Create: `assets/css/styles.css`
- Create: `assets/js/main.js`
- Create: `robots.txt`
- Create: `sitemap.xml`

**Step 1: Write the failing test**
- Create `tests/test_structure.py` to verify:
  - Page title and meta tags (viewport, description, OpenGraph, Twitter cards, canonical URL).
  - JSON-LD structured data for `Organization` and `ProfessionalService`.
  - Header with navigation links (`#services`, `#products`, `#capabilities`, `#about`, `#contact`).
  - Dark mode support with `--ease-standard` motion tokens and `@media (prefers-reduced-motion: reduce)` compliance.

**Step 2: Run test to verify failure**
- Run: `python3 tests/test_structure.py`
- Expected: FAIL with missing index.html or assertions.

**Step 3: Write minimal implementation**
- Build `index.html` skeleton with high-contrast, modern dark-tech palette (slate-950 background, indigo/cyan glow accents, inter font).
- Implement responsive navbar with desktop menu, mobile drawer toggle, and smooth scrolling.
- Create `assets/css/styles.css` with motion tokens, custom glow effects, and reduced motion overrides.

**Step 4: Run test to verify pass**
- Run: `python3 tests/test_structure.py`
- Expected: PASS.

**Step 5: Commit**
- Run: `git add index.html assets/ robots.txt sitemap.xml tests/ && git commit -m "feat: setup core layout, SEO metadata and styling"`

---

### Task 3: Hero Section & Consultancy Services Component

**Files:**
- Modify: `index.html`
- Modify: `assets/js/main.js`
- Modify: `tests/test_structure.py`

**Step 1: Write failing test**
- Add tests to `tests/test_structure.py` for:
  - Hero section headline, badge, subheadline, and primary/secondary CTAs.
  - Services section listing 4 core capabilities:
    1. Cloud & Distributed Architecture
    2. High-Performance Web & Native Apps
    3. AI Systems & Agentic Workflows
    4. Security Hardening & Performance Optimization

**Step 2: Run test to verify failure**
- Run: `python3 tests/test_structure.py`
- Expected: FAIL due to missing section IDs `#services` and required service cards.

**Step 3: Write minimal implementation**
- Add Hero section with interactive badge, animated gradient backdrop, and clear action buttons.
- Add Services grid with clear technical icons, problem/solution focus, and tech highlights.

**Step 4: Run test to verify pass**
- Run: `python3 tests/test_structure.py`
- Expected: PASS.

**Step 5: Commit**
- Run: `git add index.html assets/ tests/ && git commit -m "feat: add hero section and consulting services showcase"`

---

### Task 4: Product Studio Portfolio Showcase

**Files:**
- Modify: `index.html`
- Modify: `assets/js/main.js`
- Modify: `tests/test_structure.py`

**Step 1: Write failing test**
- Add tests to verify presence of `#products` section showcasing the 4 studio projects:
  - HyperFetch (Native macOS download manager in Swift 6/SwiftUI)
  - ProofPath (Evidence-backed QA browser automation for AI hackathons)
  - IndiaCrafted (Modern artisan marketplace storefront & platform)
  - SpendWise (Personal finance forecasting and budgeting platform)
- Verify external links, badges (Live, Open Source, macOS, etc.), and GitHub repo links.

**Step 2: Run test to verify failure**
- Run: `python3 tests/test_structure.py`
- Expected: FAIL due to missing `#products` section and project items.

**Step 3: Write minimal implementation**
- Build `#products` section with card grid, tech tags, metrics/status indicators, and external project links.
- Add interactive hover state and filter tabs (All, Apps, Web, AI) in `assets/js/main.js`.

**Step 4: Run test to verify pass**
- Run: `python3 tests/test_structure.py`
- Expected: PASS.

**Step 5: Commit**
- Run: `git add index.html assets/ tests/ && git commit -m "feat: add product studio showcase for studio projects"`

---

### Task 5: Technical Capabilities, Contact Form & Footer

**Files:**
- Modify: `index.html`
- Modify: `assets/js/main.js`
- Modify: `tests/test_structure.py`

**Step 1: Write failing test**
- Add tests to verify:
  - Technical capabilities radar/grid (TypeScript, Python, Swift, Go, GCP, Cloudflare, React/Next.js, Docker).
  - `#contact` form with name, email, project type, message fields, and client-side validation logic.
  - Footer with social/GitHub links, copyright notice, and back-to-top button.

**Step 2: Run test to verify failure**
- Run: `python3 tests/test_structure.py`
- Expected: FAIL due to missing `#contact` section and form inputs.

**Step 3: Write minimal implementation**
- Add technical capabilities chips/matrix.
- Implement contact form with accessible validation, inline error messages, and success confirmation toast/modal.
- Add mailto fallback link and direct GitHub profile link (`https://github.com/consultanything-tech`).
- Complete footer with year auto-update in `main.js`.

**Step 4: Run test to verify pass**
- Run: `python3 tests/test_structure.py`
- Expected: PASS.

**Step 5: Commit**
- Run: `git add index.html assets/ tests/ && git commit -m "feat: add technical capabilities, contact form, and footer"`

---

### Task 6: GitHub Actions Workflow, Verification & Deployment to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`
- Test: Local verification with Python test runner and HTTP server
- Push: Push `main` branch to remote repository on GitHub and verify GitHub Pages configuration.

**Step 1: Write failing test / check**
- Verify `.github/workflows/deploy.yml` exists and conforms to GitHub Actions `actions/deploy-pages@v4` and `actions/upload-pages-artifact@v3` syntax.

**Step 2: Implement deployment workflow**
- Create `.github/workflows/deploy.yml` with automated test run and Pages deployment on push to `main`.

**Step 3: Run comprehensive end-to-end verification**
- Execute full test suite `python3 tests/test_structure.py`.
- Run localhost security & static inspection check.

**Step 4: Push to GitHub and configure GitHub Pages**
- Push `main` branch to `origin/main`.
- Configure Pages settings via `gh api` or `gh repo edit` to enable GitHub Pages deployment.

**Step 5: Commit and finalize**
- Run: `git status` and verify clean working tree.
