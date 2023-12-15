export function deleteChild(id) {
  const e = document.getElementById(id);
  let child = e?.lastElementChild;
  while (child) {
    e?.removeChild(child);
    child = e?.lastElementChild;
  }
}

