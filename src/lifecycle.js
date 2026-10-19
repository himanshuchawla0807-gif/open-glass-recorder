/** Preserve playable audio when the browser caches a page for Back navigation. */
export function handlePageHide(event, recorders, objectUrls) {
  if (event.persisted) { for (const recorder of recorders) recorder.stop(); return; }
  for (const recorder of recorders) recorder.destroy();
  for (const url of objectUrls) URL.revokeObjectURL(url);
  objectUrls.clear();
}
