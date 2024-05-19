export async function isTagTaken(tag: string) {
  const res = await fetch("/api/tag/taken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tag }),
  });
  const data = await res.json();
  const tagTaken = data.tagTaken as boolean;
  return tagTaken;
}

export async function isTagReserved(tag: string) {
  return ["portfolio", "api", "settings", "signin"].includes(tag);
}
