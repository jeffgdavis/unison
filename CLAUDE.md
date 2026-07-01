# UNISON — project notes for Claude

Suite of browser-based synthesizers (MONO, FM, DRUM, STRING, METAL) built with
Tone.js and vanilla JavaScript. No build step, no framework — each instrument
is a self-contained module (`mono/`, `fm/`, etc.) with shared CSS/JS/presets in
`shared/`. Deployed via GitHub Pages: https://jeffgdavis.github.io/unison/
(updates automatically on push to main).

## Working style

- Morgan (the user) is not comfortable with git/GitHub — explain git operations
  in plain language and never assume git vocabulary.
- Auto-sync hooks live in `.claude/settings.json`: session start pulls from
  GitHub; when Claude stops, unpushed commits are pushed automatically.
  Therefore: **commit completed work proactively without being asked** — the
  hooks handle pull/push, but only commits travel.
- Keep the no-build, vanilla-JS approach unless Morgan explicitly decides to
  migrate to a toolchain (open question as of July 2026).

## Machine setup (new computer)

This Mac (and possibly others) has git globally authenticated as a different
GitHub account (`jeffdavis-studio`, used by a separate local agent — do not
disturb its global git config). This repo must authenticate as `jeffgdavis`.
On a new machine, after `gh auth login` as jeffgdavis, run inside the repo:

    git config credential.helper ''
    git config --add credential.helper '!gh auth git-credential'
