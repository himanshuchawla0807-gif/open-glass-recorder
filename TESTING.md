# Testing

The project uses Node's built-in test runner and no test packages. Run `npm test` and `npm run check` on Node 22+.

Unit tests in `test/` cover spring settling, timer boundaries, error messages, permission denial/retry, late permission resolution and rejection, cancellation, overlapping audio initialization, resource cleanup, duplicate starts, image failure, image clearing and out-of-order loading. Browser integration checks cover the renderer, wallpapers, audio capture/playback/download and lifecycle. The browser checks use synthetic audio, not the owner's physical microphone.

Manual verification:

1. Start with `npm start` and open localhost.
2. Confirm the glass renders on the nebula. Use Next scene for each wallpaper.
3. Start recording, permit the mic, speak, stop, play back and download.
4. Deny microphone permission; verify a useful error and that retry remains possible.
5. Tab to the recorder and activate with Enter or Space.
6. Test a narrow viewport and reduced motion. Test without WebGL2 for CSS fallback.
7. Close/unmount while permission is pending or recording. Check microphone tracks are released.

CI runs the unit tests and syntax checks. Browser observations and limitations are recorded in `docs/verification.json`. Actual physical microphone and cross-browser/device validation remain manual; full branch coverage is not claimed.

## Stable-size browser regression harness

Open `/test/browser.html` on the local server (or the deployed demo) and press **Run checks**. The harness creates its own 440 Hz tone; it never requests the physical microphone. It checks idle/requesting/recording diameter equality, expansion, audio output, resource release, transparent pixels, live configuration, denied permission and disposal. Ten checks passed in Chromium. `npm test` now runs 20 unit/lifecycle tests. `npm run check` syntax-checks all runtime, example, harness, test and check-script JavaScript files.

The lab was also verified at 390×844 with no horizontal overflow. Changing its radius, tint and transparency applies through the public API. The inline chat's button stayed at 93.671875 px before and during capture, and measured 80.09375 px on mobile.
