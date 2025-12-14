# Smilox Web App - Deliverables

## 1. How to Run Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
3.  **Open the browser**:
    Go to [http://localhost:3000](http://localhost:3000).

## 2. How to Build for Production

1.  **Build the application**:
    ```bash
    npm run build
    ```
    This creates an optimized production build in the `.next` folder.
2.  **Start production server**:
    ```bash
    npm run start
    ```

## 3. Deployment (Vercel)

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your repository.
4.  **Environment Variables**:
    - Add `NEXT_PUBLIC_ADMIN_PASS`: Set your desired admin password (default: `smilox2025`).
5.  Click **Deploy**.

## 4. Where to Edit Content

-   **Text / Translations**: Edit `src/i18n/fr.ts` (French) and `src/i18n/en.ts` (English).
-   **Locations Data (Base)**: Edit `src/data/locations.json`.
-   **Locations (Dynamic)**: Use the Admin Dashboard at `/admin/locations` to add/edit locations. These are saved to your browser's Local Storage.
-   **Email/Phone**: Edit `src/app/contact/page.tsx`.
-   **Styles**: `src/app/globals.css` contains the Glass UI theme.

## 5. Admin Access

-   URL: `/admin/locations`
-   Default Password: `smilox2025` (or set via env var).
