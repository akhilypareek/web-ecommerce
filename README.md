# Web E-Commerce (React + TypeScript)

"This project is a modern e-commerce frontend app that provides product listings, category/price filtering, product detail views, and a shopping cart flow.

## Key Features

- Product listing from the live API
- Category filter and price range filter
- Filter state persistence via URL query parameters
- Product detail page with add/remove quantity controls
- Cart management using global context
- Cart data persisted in localStorage
- Responsive layout (desktop + mobile sidebar)

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS 4
- Lucide React Icons

## API

The following endpoints are used for products and categories in the project :

- `https://api.escuelajs.co/api/v1/products`
- `https://api.escuelajs.co/api/v1/categories`

## Routes

- `/` -> All products page
- `/products/:id` -> Single product details
- `/cart` -> Cart page

## Project Structure

```text
src/
  components/
    Controls/
    Layout/
    Products/
  constants/
    ApiRoutes.ts
  context/
    CartContext.tsx
  App.tsx
  main.tsx
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Notes

- Cart state is saved in the browser’s localStorage.
- Filters are reflected in the URL, so the selected filter state is maintained even after a page refresh.

This project is a modern e-commerce frontend app that provides product listing, category/price filtering, product detail views, and a shopping cart flow

## Routes

- `/` -> All products page
- `/products/:id` -> Single product details
- `/cart` -> Cart page

## Project Structure

```text
src/
  components/
    Controls/
    Layout/
    Products/
  constants/
    ApiRoutes.ts
  context/
    CartContext.tsx
  App.tsx
  main.tsx
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Notes

- Cart state browser `localStorage` me save hoti hai.
- Filters URL me reflect hote hain, isliye page refresh ke baad bhi selected filter state maintain rehti hai.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
#