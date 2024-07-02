export async function getMenuData() {
  const res = await fetch("http://localhost:8000/menu");
  if (!res.ok) throw new Error("Menu items could not be found");

  const data = await res.json();

  return data;
}
