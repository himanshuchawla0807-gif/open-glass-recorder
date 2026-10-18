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
