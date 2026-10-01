# Pasal

A small e-commerce site made for the React JS assessment. Built with React (Vite), TypeScript, React Router and Tailwind CSS.

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in the browser.

To make a production build: `npm run build`

## Features

- Product list fetched from [Fake Store API](https://fakestoreapi.com/products) with `useEffect`
- Loading skeletons while fetching, and an error message if the fetch fails
- Search by name, filter by category, sort by price (low-high / high-low)
- Add to cart, with the cart count shown in the navbar
- Product details page (`/product/:id`)
- Cart page (`/cart`) where you can change quantity or remove items
- Add product form (`/add-product`) with validation and inline error messages
- 404 page for unknown routes
- Dark mode toggle (saved in localStorage)

## Folder structure

```
src/
  pages/          one folder per page (HomePage, CartPage, ...)
  shared/         components used on many pages (Navbar)
  store/          context for products and cart
  theme/          context for dark mode
```

## Assumptions

- Cart and products are kept in React context only, so they reset when the page is refreshed.
- Products added with the form are only stored in memory (the API is not updated).
- Prices from the API are in US dollars.
- Checkout is not implemented, the button only shows an alert.
- To test the error message, change `API_URL` in `src/pages/HomePage/HomePage.tsx` to a wrong url.
