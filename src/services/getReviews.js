export async function getReviews() {
  const res = await fetch("http://localhost:8000/reviews");

  if (!res.ok) throw new Error("Failed to fetch reviews");
  const data = await res.json();
  return data;
}
