# EventEase
Planning and organizing an event involve sourcing a variety of products such as sound systems, lightning, furniture, decorations, and more. However, purchasing these items for one-time use can be expensive and inefficient. EventEase seeks to offer a rental marketplace, allowing users to easily rent event-related products instead of purchasing them.
---

## 🔧 Project Setup

### 📁 Backend (`/EventEase-api`)
#### 📦 Install dependencies
```bash
cd EventEase-api
npm install
```

```bash
npm run redis
```

```bash
npm start
```
### 💻 Frontend (/EventEase-ui)
#### 📦 Install dependencies

```bash
cd EventEase-ui
npm install
```

```bash
npm run dev
```

### ⚙️ ImageMagick Setup (Required)

Make sure to install **ImageMagick** before running the backend:

- 🔗 [Download ImageMagick](ImageMagick-7.1.1-47-Q16-HDRI-x64-dll.exe)

After installation, ensure `magick` is available in your system's PATH. You can verify it by running:

```bash
magick -version
```

### 🔑 Authentication
- Uses Firebase Authentication for login/register.

- Supports email/password login and social logins (Google, Facebook).

- Token-based authorization is used for protecting routes.

### 🧠 Tech Stack
- Frontend: React.js, Tailwind CSS, React Router

- Backend: Express.js, MongoDB, Firebase Admin SDK

- Authentication: Firebase Auth

- Caching/Session Control: Redis

- Image Handling: ImageMagick

- CSV Handling: PapaParse

### 📦 Features
- 🔐 Secure vendor and renter login

- 🛍️ Add/rent products with media (images/videos)

- 🛒 Cart system with rental date tracking

- 💳 Checkout simulation with credit card UI

- 📈 Vendor dashboard for orders and listings

- 🔍 Search and category filtering

- 📁 CSV upload/import for product listings
