# EventEase
Planning and organizing an event involve sourcing a variety of products such as sound systems, lightning, furniture, decorations, and more. However, purchasing these items for one-time use can be expensive and inefficient. EventEase seeks to offer a rental marketplace, allowing users to easily rent event-related products instead of purchasing them.
---

# GitHub repo

-   https://github.com/Manav1026/EventEase


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

## Create .env file in root folder

```
FIREBASE_SERVICE_JSON={"type":"service_account","project_id":"eventease-784af","private_key_id":"75fcb1c4244db8489758aaf0dea071eb27a25599","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrzPK8f6aYs8ck\\nggkS9UfWf0sLYx3lA3KCrDuzRAYhtUNnMyIJA8MylxyKBWU5zi8wgnoiHhJVQsbD\\nVrGe4BJoZJGdwfLi7BlAOoMIYxmUsVcNf+8sA44ZdoN5rk1yGkIoR59tNLRylxVJ\\nkfjBGU5Vd+4uGPyKsHlHGGtNOaJ0dLk6B/J4YlcaNUsps1CeZpsjE7AFuQi0uRsC\\nnV9R+SAIHsc0FH9xxANaKWzEGHmsBhXN79hPqueElareF/mQdpTDAyJYYrZvB8JZ\\nFuGFHkKoMtukYGsbaWJ1kaUz3Hn50ZW5Syid7RYtz+ZNeyCYUzDm70OOX9ksHstE\\n4lic3YKTAgMBAAECggEAEnbWznDhJEBLne26yoEUx38/P/HaeOuMr3PPgZ7tgKfi\\nJ8txZQBQ7Ci4uOFpnEhWGffVms9SWIUlQvg1FL+aDBJNSWuoWnbqFpqeVm1K0axo\\nqIDLQzM3Ziy0EzaquikZOMXm/ipW3kmQsVVHWSON++kAvcZXcYAWdxKP8G5MwiPt\\nPVuvbiPo5WgStcFiGZ75PZaSLbqRIjaKDnqKEGAoeUq9hY154Xim+aWI7U51tcng\\nMfnoTVqwrzaku5DUbFg8hq2/4LdCcU3z81O6R1Hj67fDK2qov9qspUfhSzKz+hxk\\nocrq8R/kNpwJx5ruSmlbpm8kMMsF1IlGIhH+uFhB8QKBgQD6wlQm8Jubh09nu0gy\\ntHpb32LKQda4I4sPYI1I9NdnCcUKrF6KMP8WlyhUFgmRczRB3VsE+ZcEfOZhUmW/\\n/FgNeoV83+1FHgOygJbkLLyBuDfW0llyJ5ja6OXDtH4k1XOxERa9Og+ZHI/FeFQo\\nTwqV13Va3pR/6WLbpPiMwTdrgwKBgQDwupW3gIarrZZ9t3Ysa/O0F2C6UThZBnVg\\nHKZUZDAJ6tfe89xlwyQqbeRkdFKERhwQwbFjJAswNvvnkeucCLM9v8BbJODeqRnQ\\nxwgLflXvhBqifR2Jed3sbUrq+uQ5BDB2B0hUE0BiftOLB67pL/fQeO8/h+rgwt/a\\nVwicTyqPsQKBgB2hWNBBHiICmx9mweE78jlo7AN6RCT+DjCC+C7mv40tWlsogwNR\\nRtMkiV9mOzs0obgmr9qmo3GkUJSvZ9aHut/c2mknDKJeKZGuICZWIvAxFGgN8wPK\\nKgWz/3JgoYc4sbL6kfVKJw2wkkyDK26X6GhMTVGve1yh90x88eGv8xyBAoGBAOHX\\napZZcf6mQEV5VNif/ma6d/jUMfTzZjLhLfqGc7saI6P7TI374XYc2uSTbMbDr5jY\\n3r6QFh8JtpKuB0i/sMkBmEjp9D1wj9OapiWCRMUMPqCqmIddWaJxdpO1BV+oWn6g\\nnm6iEQlWysfoUWRbqDZg/rOvo99xc+m3NVDPxLJBAoGAZYv4P02eytjXzbv8+jxF\\n3HQ+eMVBiWEzc3qItQzpBBzpx5FVPzpnHYnszDdBheFVwDb4K1jCmz6STJG/xW/e\\nQmvW1Ei2uDLxN0NTS7DQoUPx05zDQK90/7RnemDit69eUvy9W61c5j8ykYMPakGu\\nuAB5/uldJMF15bCwjB2IIbk=\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-fbsvc@eventease-784af.iam.gserviceaccount.com","client_id":"102859956763878631077","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40eventease-784af.iam.gserviceaccount.com","universe_domain":"googleapis.com"}

```

## Credentials

-   Admin logins:
    userId:  wesley@gmail.com, matie@gmail.com
    vendor: manav@gmail.com, shreyaj@gmail.com

