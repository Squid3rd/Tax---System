const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Helper function สำหรับเรียก API พร้อมแนบ token
async function fetchAPI(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

export async function register(email: string, password: string, name: string) {
  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function login(email: string, password: string) {
  const data = await fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}

export async function calculateTax(
  grossIncome: number,
  year: number,
  country: string,
) {
  return fetchAPI("/tax/calculate", {
    method: "POST",
    body: JSON.stringify({
      gross_income: grossIncome,
      year,
      country,
    }),
  });
}

export async function getTaxHistory() {
  return fetchAPI("/tax/history");
}

export function logout() {
  localStorage.removeItem("token");
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}
