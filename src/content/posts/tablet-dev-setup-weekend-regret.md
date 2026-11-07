---
title: "I turned a tablet into a dev machine and I'd like my weekend back"
description: "Setting up Termux, proot-distro Ubuntu, code-server, and Neovim on a Galaxy Tab S9+, and questioning whether mobile tablet dev setups are ever worth the friction."
pubDate: 2026-10-15
type: "rant"
tags: ["hardware", "android", "termux", "developer-experience", "linux"]
draft: false
---

We've all seen the aesthetic YouTube videos: a developer sitting in a sunlit café with nothing but a sleek tablet and a slim Bluetooth keyboard, effortlessly knocking out pull requests.

I had a Galaxy Tab S9+ sitting on my desk, so I decided to test the fantasy. I spent an entire weekend attempting to transform it into a self-contained local development machine.

<!-- ALI: add your take here on why tech YouTube makes tablet productivity look like magic when reality is pure pain -->

## The Rabbit Hole of Android Terminal Emulation

You quickly learn that Android's Linux kernel is locked down tight. You cannot just open a terminal and run `apt install git`.

Here is the setup path I had to fight through:
1. Downloading Termux from F-Droid (because the Google Play Store build is deprecated and breaks on modern Android versions).
2. Installing `proot-distro` to spin up an emulated Ubuntu rootfs environment.
3. Fighting Android 14's Phantom Process Killer, which aggressively murders any background process consuming CPU cycles.
4. Setting up `code-server v4.22.1` so I could access VS Code inside the Samsung Internet browser.
5. Manually hacking configuration files in `vim` and defining dozens of bash aliases just to make keybindings usable without an Escape or Control key on a mobile keyboard layout.
6. Giving up on web-based code-server performance and configuring Neovim directly in the terminal instead.

## The Reality Check: Tablet vs Cloud Environments

Once everything was finally installed and running, I sat back to write code.

That's when the friction hit. Android's input method editor constantly tries to autocorrect variable names. Key chords like `Ctrl+W` in browser tabs close the entire browser window instead of deleting a word in terminal. Context switching between a PDF assignment and the terminal triggers aggressive OS memory reclamation.

```bash
# What you feel like you spend all weekend doing inside Termux:
proot-distro login ubuntu --user dev --shared-tmp
code-server --bind-addr 127.0.0.1:8080 --auth none
# ...and then Android kills the PID 2 minutes later when you switch apps
```

Compare that tortuous setup against simply opening `github.dev` in a browser or launching a GitHub Codespace. With Codespaces, you get an instant 4-core Linux container with full extensions, zero battery drain, and no fighting proot file permissions.

<!-- ALI: add your take here on the final verdict: will you ever do real coding on your Galaxy Tab again or is it strictly for PDFs and videos? -->

The technical achievement of getting Ubuntu and Neovim running locally on an Android tablet is cool. But if your goal is getting work done, the friction cost is too high. I want my weekend back.
