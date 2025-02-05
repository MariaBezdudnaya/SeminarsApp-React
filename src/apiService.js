async function fetchData() {
  try {
    const response = await fetch('http://localhost:3002/seminars');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("fetchData возвращает:", data);
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
}

async function deleteData(id) {
  const response = await fetch(`http://localhost:3002/seminars/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return;
}

async function updateData(updatedSeminar) {
  const seminarToSend = { ...updatedSeminar, id: Number(updatedSeminar.id) };
  const response = await fetch(`http://localhost:3002/seminars/${seminarToSend.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(seminarToSend),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export { fetchData, deleteData, updateData };