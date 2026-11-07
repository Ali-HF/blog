---
title: "Verified Call: proving a human is on the line"
description: "A hackathon concept pairing WebAuthn passkeys and live random camera challenges to fight deepfake and voice-cloning caller fraud."
pubDate: 2026-11-01
type: "build"
tags: ["cybersecurity", "webauthn", "passkeys", "identity", "hackathon"]
draft: false
status: "in-progress"
stack: ["WebAuthn", "TypeScript", "Next.js", "Cryptographic Signatures"]
---

Audio deepfakes and AI voice cloning have turned incoming phone calls and audio chats into a security hazard. If someone calls a finance department or a family member claiming an emergency, how do you verify that an actual human is on the line rather than an audio clone driven by an LLM?

Inspired by Max Kolysh's YC essay *"Proving You're Human"*, I entered this project into the Cybersecurity track of the YE Digital Hackathon.

<!-- ALI: add your take here on why voice cloning scams feel particularly urgent right now -->

## The Core Concept

Verified Call explores a zero-trust verification flow before or during sensitive communications:
1. **Passkey (WebAuthn) Enrollment**: Users register their device using hardware-backed WebAuthn authenticators. Every user is assigned a pseudonymous public key identifier. Crucially, **no biometric data is ever stored** on any server—biometrics remain strictly isolated on the user's local secure enclave as standard WebAuthn dictates.
2. **Live Random On-Camera Challenge**: During verification, the system generates an unpredictable, non-repeatable challenge (such as a time-bounded spatial motion or unique phonetic prompt) that real-time video/audio generation models struggle to fake with zero latency.
3. **Cryptographically Signed Verification**: The client's hardware authenticator signs the challenge payload.
4. **Verification API for Third Parties**: An external verification API returns a signed attestation receipt that other apps, banking portals, or callers can verify independently.

```typescript
// Illustrative WebAuthn challenge attestation payload
interface HumanVerificationAssertion {
  credentialId: string;
  pseudonymousId: string;
  clientChallengeHash: string;
  authenticatorSignature: string;
  verifiedAt: number;
}
```

## Current Status: Prototype in Progress

To be completely accurate: **this project is currently an in-progress hackathon prototype and does not work end-to-end yet**.

The WebAuthn enrollment dance and asymmetric signature verification work reliably in isolated browser test cases, and the verification payload structure is fully mapped out. However, tying the live on-camera gesture challenge directly into the cryptographic attestation chain without adding intolerable latency or false rejections is a complex problem that still needs work.

<!-- ALI: add your take here on the biggest engineering roadblock when trying to combine WebAuthn with live vision checks -->
