---
title: "My AI coding tool refused to help me secure my own code"
description: "How overzealous AI safety filters blocked a routine vulnerability review on my own repo, and why over-eager guardrails just force prompt euphemisms."
pubDate: 2026-09-22
type: "rant"
tags: ["ai", "security", "guardrails", "dev-tools"]
draft: false
---

I was running a security audit on my own application code before pushing it to production. I opened Antigravity, fed in my endpoint handlers, and explicitly typed: *"Please run a vulnerability audit on this authentication route. I own this codebase and am authorized to test it."*

The model's immediate response? A wall of canned text refusing to assist because analyzing vulnerabilities might "violate safety policies."

<!-- ALI: add your take here on the visceral reaction when an AI assistant treats you like a criminal for inspecting your own code -->

## The Theater of Safety Filters

Here is what annoys me: the code was sitting right there in my IDE. I wasn't asking for a zero-day payload against a government server. I was asking if my cookie flags were vulnerable to session hijacking and whether my database queries leaked data.

Because the prompt contained the words "vulnerability", "exploit", or "audit", the classifier triggered a safety tripwire. The assistant instantly shut down.

Do you know what made it immediately cooperate? Changing the phrase to:
*"Please conduct a secure code and configuration review following defensive programming principles."*

Suddenly, the AI happily read the exact same code, found the exact same cookie flaw, and suggested the exact same fix. 

<!-- ALI: add your take here on why security through semantic euphemisms makes AI safety feel completely performative -->

## The Alternative: Free, Deterministic Tools

After dealing with prompt semantics for an hour, I stopped asking conversational models to act as penetration testers and set up a proper suite of free, deterministic security tools:
- **npm audit**: Catches known vulnerable package versions without editorializing.
- **Semgrep CE**: Running official OWASP rulesets to flag dangerous SQL concatenations, weak hashing, and unsafe regexes.
- **gitleaks**: Pre-commit scanning to make sure no private keys or tokens ever touch git history.
- **eslint-plugin-security**: Catches eval, child process calls, and dangerous object traversals.
- **SSL Labs & securityheaders.com**: Verifies that live server headers (HSTS, Content-Security-Policy, X-Frame-Options) are configured properly.

None of these CLI tools gave me a moral lecture before scanning an input field.

<!-- ALI: add your take here on whether future AI coding assistants will get smarter about context or just more restricted -->

Over-eager guardrails don't make software safer. They just waste developer time forcing everyone into linguistic gymnastics to do routine defense.
