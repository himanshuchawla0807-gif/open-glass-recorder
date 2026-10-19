# Reference renderer: separate rights and provenance

The JavaScript in this directory was recovered from the publicly delivered Liquid Glass Recorder by Whitespace:
https://experiments.thisiswhitespace.com/liquid-glass-recorder

It is third-party code, not independently authored by Himanshu Chawla. No license grant for the application-specific renderer was found in the recovered artifact. **The repository's MIT license does not cover this directory.** Public availability of this source is not a grant of rights to reuse, resell or redistribute the original component. Obtain the original author's permission/license for those uses.

The rendering bundle includes Three.js r186 code. Three.js is MIT licensed; its license is preserved separately as THREE-LICENSE.txt. The Three.js license does not license the application-specific shaders or recorder implementation.

Local modifications: preserve alpha outside the component for inline embedding; keep the hit-target diameter constant between idle and recording; replace the bundled default photograph with the supplied blue-nebula wallpaper. Also guard rapid restart until pending stop completes and isolate captured chunks per session. Other recovered source is retained with its existing notices.

For an independently written MIT component, use src/recorder.js and the examples/composer.html demo instead.
