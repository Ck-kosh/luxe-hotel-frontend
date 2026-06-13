const API_URL =
  import.meta.env.VITE_API_URL;

export async function createRequest(
  requestData
) {
  const response = await fetch(
    `${API_URL}/services`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        requestData
      ),
    }
  );

  return response.json();
}

export async function getRequests() {
  const response = await fetch(
    `${API_URL}/services`
  );

  return response.json();
}