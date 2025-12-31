export interface Product {
  id: string;
  name: string;
  ratingAvg: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function getProductById(productId: string): Promise<Product> {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const res = await fetch(`/api/products/${productId}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function createReview(
  productId: string,
  payload: { rating: number; comment: string }
) {
  const res = await fetch(`/api/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to submit review");
  return res.json();
}
