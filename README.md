# Pasal

This is my submission for the React JS assessment. It's a small shop website where you can browse products, add them to a cart and add your own products.

Live site: https://ecommerce-site-two-chi.vercel.app/

I made it with React + Vite, TypeScript, React Router and Tailwind. The product data comes from the [Fake Store API](https://fakestoreapi.com/products).

## Running it locally

You need Node installed. Then:

```bash
npm install
npm run dev
```

and open http://localhost:5173

## What it does

- Home page loads the products from the API (with `useEffect`). It shows loading skeletons while it's fetching and an error message if the fetch fails.
- You can search products by name, filter by category and sort by price.
- Clicking "Add to Cart" updates the cart count in the navbar.
- Clicking a product opens its details page (`/product/:id`).
- The cart page (`/cart`) lets you change quantity, remove items and see the total.
- The add product page (`/add-product`) has a form with validation. If it's valid, the new product shows up at the top of the list.
- Any other url shows a 404 page.
- There's a dark mode button in the navbar (bonus).

## Folders

```
src/
  pages/       each page has its own folder, home page components are inside HomePage/components
  shared/      navbar
  store/       context for products and cart
  theme/       context for dark mode
```

I used context for the products and cart because the navbar, home page, details page and cart page all need them.

## Assumptions / things to know

- Nothing is saved to a database, so the cart and the products you add are gone when you refresh.
- The form doesn't send anything to the API, it only adds the product in the app.
- Prices are in dollars because that's what the API gives.
- The checkout button doesn't do a real checkout, it just shows an alert.
- To see the error message, change `API_URL` in `src/pages/HomePage/HomePage.tsx` to a wrong url.
