const BASE_URL = 'https://fakestoreapi.com'

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}
