export async function deleteOrder(id) {
  const options = {
    method: "DELETE",
  };
  await fetch(`http://localhost:8000/orders/${id}`, options);
}

export async function getOrder(userPassword) {
  const res = await fetch(
    `http://localhost:8000/orders?password=${userPassword}`
  );
  if (!res.ok) throw new Error("There was an error fetching order");
  const data = await res.json();
  return data;
}

export async function updateOrder(data) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(`http://localhost:8000/orders/${data.id}`, options);
}

export async function uploadOrder(order) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  await fetch(`http://localhost:8000/orders`, options);
}
