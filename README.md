# Hush Lush & Warely Pass — Restaurant Menu & Auth Web Application

A functional, responsive web application built with **React.js (Vite)**, **JavaScript (JSX)**, **Tailwind CSS**, and **Framer Motion**, recreating the provided Figma UI designs for Hush Lush Advertising & Technologies and Warely Pass.

---

## 📌 Submission Checklist & Task Summary

### ✅ TASK 1 — IMPLEMENT THE LOGIN SCREEN
- **Figma Design Fidelity**: Recreated the login screen with Hush Lush branding, monogram logo, and slogan (*"Warely Pass Grants Access to Log in at any of Our Partnered Restaurants."*).
- **Form Layout**: Input fields for Email/Mobile ID, Password with toggleable eye visibility (`Eye` / `EyeOff` icons).
- **Social Logins**: Integrated Facebook, Telegram, and Google authentication buttons.
- **Terms & Privacy**: Interactive links opening pop-up modals for **Terms of Use** and **Privacy Policy**.

### ✅ TASK 2 — EMAIL AND PASSWORD VALIDATION
- **Email Regex**: Enforces standard format (`user@example.com`).
- **Phone Validation**: Supports switching to Mobile Number mode with min 10-digit validation.
- **Password Check**: Requires minimum 6 characters.
- **Real-Time Feedback**: Inline red error indicators and field highlighting.

### ✅ TASK 3 — AUTHENTICATION LOGIC
- **Authentication Flow**: Handles loading spinners, submission delays, error states, and success state.
- **Session Persistence**: Saves active user sessions in `localStorage` across page reloads.

### ✅ TASK 4 — GUEST ACCESS
- **"Sign as Guest"**: 1-click guest sign-in bypassing credentials.
- Assigns a guest identity (`Guest #4921`) with a dedicated guest badge and routes straight to the Home Screen.

### ✅ TASK 5 — IMPLEMENT THE RESTAURANT HOME SCREEN
- **Header Bar**: Displays Hush Lush logo, interactive **Table 13 (4 PAX)** table selector modal (Table 1–20 & 1–10 PAX), and expandable search filter bar.
- **Hero Carousel Banner**: *"UAE New Year Promo — From March 1 to April 1"* carousel banner with animated slides and pagination dots.
- **Category Filter Pills**: Tabs for *"For You"*, *"Chicken Chop"*, *"Fish"*, *"Burger"*, *"Biryani"*, *"Beverages"*, *"Desserts"*.
- **Food Cards Grid**: Displays menu dishes (*"103 Black Pepper Chicken Chop"*, *"Chicken Dum Briyani"*, etc.) with top-right floating `+` add-to-cart button, red price tag (`$6.90`), and red arrow (`->`) button.
- **Item Details Modal**: Detailed pop-up with spice rating, prep time, calories, special instructions textarea, and quantity selector.
- **Cart Drawer & Checkout**: Slide-over order summary drawer with item list, quantity adjusters (`-`/`+`), subtotal, 5% tax, total price, and order placement.
- **Sweet Alert Order Confirmation**: Centered glassmorphic order confirmation dialog with ticket ID (`#HL-8492`), table number, estimated prep time, and celebration animation.
- **Bottom Navigation**: Outlet, Menu, Account, and More options tabs.

### ✅ TASK 6 — MICRO-INTERACTIONS AND ANIMATIONS
- Powered by **Framer Motion**: Smooth modal pop-ups, slide-over cart drawer, toast notifications, floating cart button bounce, and button press feedback without layout jumping.

### ✅ TASK 7 — CODE QUALITY AND RESPONSIVENESS
- **Pure JavaScript (JSX)**: 100% clean `.js` and `.jsx` codebase.
- **Reusable Components**: Separated into clear folders (`components/auth`, `components/home`, `components/cart`, `components/account`, `components/ui`, `context/`).
- **State Separation**: Auth state managed in `AuthContext`, cart & dining state managed in `CartContext`.
- **Responsive Layout**: Adapts smoothly from mobile screens (2 columns) to desktop monitors (4 columns).
- **Unit Tests**: Built with Vitest & React Testing Library (5 passing tests).

---

## 🔑 Test Credentials (Mock Authentication)

| Login Method | Email / Identifier | Password | Instructions |
| :--- | :--- | :--- | :--- |
| **Demo User** | `user@hushlush.com` | `Password123!` | Enters full user session. |
| **Any Custom Email** | `your-email@domain.com` | Min 6 chars (e.g. `Password123!`) | Accepts any valid email format. |
| **Guest Access (1-Click)** | *None required* | *None required* | Click **"Sign as Guest"** on the login screen. |
| **Auto-Fill Helper** | *1-Click button* | *1-Click button* | Click **"Auto-fill Demo Credentials"** above Submit. |

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: React 19 (JavaScript JSX)
- **Build Tool**: Vite v8
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest & React Testing Library (`jsdom`)

---

## 🚀 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server (http://localhost:3000)
npm run dev

# 3. Run unit test suite
npm test

# 4. Production build verification
npm run build

```


## 📌 Features Completed & Known Limitations

### Completed Features
- Full fidelity implementation of Figma Login and Restaurant Home screens.
- Responsive mobile & desktop layouts.
- Email/Password and Mobile Number validation.
- Guest login flow & session persistence.
- Table & PAX number selection modal.
- Category filtering & real-time dish search.
- Dish detail modal with special instructions.
- Full shopping cart with quantity controls & tax calculation.
- Centered sweet-alert style order confirmation modal.
- Unit tests for validation rules and cart calculations.

### Known Limitations
- Payment processing is simulated for demo purposes.
- Menu items and prices are served via a client-side mock dataset (`mockData.js`).
