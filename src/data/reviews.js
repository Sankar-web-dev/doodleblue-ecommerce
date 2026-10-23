// Dummy review pool — stands in for a real reviews API.
// getReviewsForProduct picks a stable slice per product so each
// product shows a different, but consistent, set of reviews.

export const REVIEWS = [
  {
    id: 1,
    author: 'Priya Sharma',
    rating: 5,
    date: '2026-09-28',
    title: 'Exceeded my expectations',
    body: 'Quality is much better than I expected for the price. Arrived quickly and was packed well. Would definitely buy again.',
  },
  {
    id: 2,
    author: 'Arun Kumar',
    rating: 4,
    date: '2026-09-15',
    title: 'Good value for money',
    body: 'Does exactly what it says. Knocked off one star because delivery took a couple of days longer than promised.',
  },
  {
    id: 3,
    author: 'Meena Iyer',
    rating: 5,
    date: '2026-09-02',
    title: 'Highly recommended',
    body: 'Been using it daily for a month now and it still looks and works like new. Great purchase.',
  },
  {
    id: 4,
    author: 'Rahul Verma',
    rating: 3,
    date: '2026-08-21',
    title: 'Decent, not amazing',
    body: 'It is okay for the price. The finish could be better and it feels a bit cheaper than the photos suggest.',
  },
  {
    id: 5,
    author: 'Divya Nair',
    rating: 5,
    date: '2026-08-10',
    title: 'Perfect gift',
    body: 'Bought this as a gift and it was a hit. The packaging was lovely and the product itself feels premium.',
  },
  {
    id: 6,
    author: 'Karthik Raja',
    rating: 4,
    date: '2026-07-30',
    title: 'Happy with the purchase',
    body: 'Solid build quality and works as described. Customer support was quick to answer my question before ordering.',
  },
  {
    id: 7,
    author: 'Sneha Patel',
    rating: 2,
    date: '2026-07-18',
    title: 'Not for me',
    body: 'The product is fine but it did not suit my needs. Returns were easy though, so no complaints about the service.',
  },
  {
    id: 8,
    author: 'Vikram Reddy',
    rating: 5,
    date: '2026-07-05',
    title: 'Best in this range',
    body: 'Compared a few similar products before choosing this one. Glad I did — the quality is a clear step above the rest.',
  },
  {
    id: 9,
    author: 'Anita Desai',
    rating: 4,
    date: '2026-06-24',
    title: 'Does the job well',
    body: 'No frills, just works. Setup was straightforward and it has been reliable so far.',
  },
  {
    id: 10,
    author: 'Suresh Menon',
    rating: 3,
    date: '2026-06-11',
    title: 'Average experience',
    body: 'Nothing wrong with the product itself, but the description oversells it a little. Manage your expectations.',
  },
  {
    id: 11,
    author: 'Lakshmi Pillai',
    rating: 5,
    date: '2026-05-29',
    title: 'Will order again',
    body: 'This is my second order of the same item. Consistent quality both times — that says a lot.',
  },
  {
    id: 12,
    author: 'Nikhil Joshi',
    rating: 4,
    date: '2026-05-16',
    title: 'Good, minor gripe',
    body: 'Works great overall. The only thing I would change is the size options — a middle option would be perfect.',
  },
]

// Deterministic: same product id always returns the same reviews,
// but different products see different slices of the pool.
export function getReviewsForProduct(productId, count = 4) {
  const start = (Number(productId) * 3) % REVIEWS.length
  return Array.from(
    { length: Math.min(count, REVIEWS.length) },
    (_, i) => REVIEWS[(start + i) % REVIEWS.length]
  )
}
