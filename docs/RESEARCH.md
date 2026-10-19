# Implementation scope update (0.0.1.2)

The independent implementation findings below apply to src/recorder.js and its lab, composer and independent.html demo. The default page now uses a recovered third-party reference renderer in vendor/reference-recorder/, whose rights and modifications are documented in THIRD_PARTY.md. No originality or MIT-license claim below applies to that vendor directory.

# REA-assisted investigation and independent implementation

The starting reference was the public Liquid Glass Recorder page from Whitespace. Himanshu reported discovering it on Twitter/X. The original page advertised a paid component. The initial goal was a free open-source implementation of the interaction. That independent implementation remains available; version 0.0.1.2 also includes the recovered reference renderer under the separate rights notice described above.

## What happened

1. REA statically inspected the public JavaScript downloaded for a local investigation.
2. Playwright observed browser layout, recording controls and visuals. That earlier local recovery preserved deployed code for inspection.
3. New JavaScript, shaders and UI were authored with Codex for the independent implementation. Version 0.0.1.2 also includes recovered source under `vendor/reference-recorder/`, excluded from the MIT license.
4. Browser checks exercise the independent implementation separately from the restored reference renderer. Both demos use owner-supplied wallpapers instead of reference-site imagery.

This is independent rewriting after inspection, not a claim of a legally audited clean-room process. It is not the original source repository and is not endorsed by the original creator.

## Evidence boundaries

Initial REA analysis summary identifiers:

- `ev_045b7de6eec413954373a26a64023f1b9899c09218f5a4125ed911d4bb6f0ed0`: framework summary. Broad semantic analysis was partial due to resource limits.
- `ev_a8e11722b1c9cc7909831d2d1f4eba3d645dad49ac083203ec2019665676a269`: focused page/defaults summary. Static inventory completed; semantic unknowns remained.
- `ev_6c178095ee840c56f4088a56c1e519137b047537892717a3d593d3381ee5f4f0`: extracted engine summary. The isolated excerpt was not a complete standalone application.

Identifiers document the investigation trail; they are not public source download links. Static inspection does not demonstrate execution. Earlier pixel-match measurements for the recovered build do not apply to this newly written implementation.

## This implementation

The renderer samples a wallpaper through an independently authored capsule distance field. An analytic bevel normal displaces separate RGB samples, adds frost, edge light and audio-reactive color. A damped spring expands the capsule during capture. Browser-native MediaRecorder supplies audio blobs.

This is a compact visual approximation. It does not reproduce the paid implementation's complete optical model, tuning controls or physical simulation. There is no transcription or AI backend.

References for browser APIs:

- [MDN: Using the MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API)
- [MDN: MediaRecorder stop event](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/stop_event)
- [Khronos WebGL 2 reference](https://www.khronos.org/files/webgl20-reference-guide.pdf)

## Public source inspection

REA inspected the current seven runtime modules in `src/` on 19 October 2026. Summary evidence `ev_083a0fa1fbedf608f0e14577ad6db8b9194823f29559959eae4383a2e3e2b1ea` reports 32,217 source bytes, seven parsed files and zero parse failures. Application inventory coverage is complete; conservative semantic unknowns remain. See [the sanitized summary](rea-source-update.json). This is a syntax/inventory observation, not formal verification of originality, licensing or complete runtime behavior.

## Fixed-size component update

The old recovered integration changed its action radius from 41 to 26.5 during recording. The independent implementation keeps radius and scale independent of capture state. Only capsule width and the horizontal button position interpolate. Browser checks measured 93.671875 CSS pixels both before and during recording in the local chat integration; mobile measured 80.09375 pixels.
