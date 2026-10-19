/** Small, independently written helpers shared by the component and tests. */
export function formatTime(seconds) {
  const value = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}
export function advanceSpring(position, velocity, target, dt, stiffness = 150, damping = 21) {
  const step = Math.max(0, Math.min(dt, 1 / 30));
  const nextVelocity = velocity + ((target - position) * stiffness - velocity * damping) * step;
  return [position + nextVelocity * step, nextVelocity];
}
export function recordingError(error) {
  if (['NotAllowedError', 'SecurityError'].includes(error?.name)) return 'Microphone access was blocked. Allow it in your browser and try again.';
  if (['NotFoundError', 'NotReadableError'].includes(error?.name)) return 'No available microphone was found. Connect one and try again.';
  return error?.message || 'Recording is unavailable in this browser.';
}

/** Fit the largest state once so recording can expand without resizing the button. */
export function fitGeometry(width, height, { radius = 56, idleWidth = 168, recordingWidth = 340, maxScale = 1.25 } = {}, progress = 0) {
  const diameter = radius * 2;
  const startWidth = Math.max(diameter, idleWidth);
  const endWidth = Math.max(startWidth, recordingWidth);
  const scale = Math.max(.05, Math.min(maxScale, Math.max(1, width - 24) / endWidth, Math.max(1, height - 24) / diameter));
  const amount = Math.min(1, Math.max(0, progress));
  const bodyWidth = (startWidth + (endWidth - startWidth) * amount) * scale;
  const buttonDiameter = diameter * scale;
  return { scale, radius: buttonDiameter / 2, buttonDiameter, bodyWidth, extension: (bodyWidth - buttonDiameter) / 2, buttonOffset: (endWidth - diameter) * .5 * scale * amount };
}
