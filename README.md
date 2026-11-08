# VibeCart

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socketdotio&logoColor=white)

🌐 **Live Demo:** [vibe-cart-client.vercel.app](https://vibe-cart-client.vercel.app/)

## Storefront Preview

<div align="center">
  <img src="./docs/vibecart-storefront-preview.png" alt="VibeCart Storefront Preview" width="100%" />
</div>

**A MERN online storefront for product discovery, shopping, order placement, and store administration.**

VibeCart combines a React single-page application with an Express API and MongoDB data store. Customers can browse products, manage a browser-persisted cart, check out, and view their orders. Store administrators can manage products, users, and orders, with selected order events broadcast over authenticated Socket.IO connections.

> **Repository note:** This workspace contains separate `client` and `server` Git repositories, represented as submodules in the parent directory. Their remote repositories are [VibeCart-Client](https://github.com/tauseefRamzan-dev/VibeCart-Client) and [VibeCart-Sever](https://github.com/tauseefRamzan-dev/VibeCart-Sever).

## Contents

- [Architecture](#architecture)
- [Features and current scope](#features-and-current-scope)
- [Security](#security)
- [Technology stack](#technology-stack)
- [Repository structure](#repository-structure)
- [Environment configuration](#environment-configuration)
- [Local development](#local-development)
- [HTTP API](#http-api)
- [Realtime events](#realtime-events)
- [Testing and code quality](#testing-and-code-quality)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author and acknowledgments](#author-and-acknowledgments)

## Architecture

VibeCart is a **client-server application** organized as two deployable applications:

- **Client:** React 19 SPA, built and served by Vite. React Router handles page navigation; React Context provides authentication and cart state.
- **Server:** Node.js and Express 5 REST API. Route modules call Mongoose models and integrations for persistence, media, email, and AI responses.
- **Database:** MongoDB, accessed through Mongoose. The server connects before it begins listening.
- **Realtime:** Socket.IO shares the HTTP server and authenticates socket connections with the same JWT used by the API.

The backend has a lightweight MVC-style separation: route handlers contain request/business logic, Mongoose models define persisted records, and `config`, `middlewares`, and `utils` hold supporting concerns. It is not a set of independently deployed microservices.

## Features

### Customer storefront

- Public storefront and product browsing, product details, category lookup, and product images delivered through Cloudinary.
- Registration, login, logout, and account-profile retrieval.
- Client-side shopping cart saved in browser `localStorage`.
- Checkout creates an order associated with the authenticated user's ID.
- Customer order history is scoped to the user's JWT identity.
- Email-based password recovery with short-lived reset tokens.
- AI shopping/support chat backed by Groq; the endpoint can use an optional valid bearer token to look up order history.

### Store operations

- Admin and super-admin product creation, update, and deletion, including Cloudinary image upload/replacement.
- Admin views for customers, users, orders, and dashboard counts.
- Super-admin-only user role changes and user deletion.
- Admin order status and payment-state updates; order status is constrained to `pending`, `processing`, `shipped`, `delivered`, or `cancelled`.
- Email notifications for order creation, order status changes, and payment-state changes.
- Authenticated Socket.IO rooms for the current user and for administrators, with order creation, deletion, status, and payment events.

### Validation and order handling

- Registration checks that a name has at least three characters, validates email format, requires a password of at least six characters, and rejects an already-registered email.
- Login and registration share an IP-based limit of five requests per 15-minute window.
- Expired or invalid API tokens are rejected; unauthenticated requests to protected routes receive `401`.
- Empty product, user, customer, admin, or order query results generally return `404` rather than an empty array.
- The browser cart tolerates malformed saved JSON by starting with an empty cart. It prevents adding an item already at its reported stock limit and warns for products with no available stock.
- Order creation rejects a duplicate matching pending order placed within the preceding minute. Product quantities are decremented after the order is saved.
- Admin order status updates reject values outside the supported status set. A super-admin cannot delete their own account.

## Security

- Passwords are hashed with `bcrypt` using a cost factor of 10 before persistence.
- API authentication uses signed JWT bearer tokens. Login tokens expire after one day; password-reset tokens expire after ten minutes.
- Protected API handlers use `verifyUser`; route-level role checks restrict administrative actions to `admin`/`superAdmin` and user role management/deletion to `superAdmin`.
- Password fields are excluded from profile and user-list queries.
- Helmet is installed as Express middleware for HTTP security headers.
- `express-rate-limit` limits registration and login attempts.
- CORS middleware is enabled for HTTP requests, and Socket.IO accepts a configured client origin.
- Sensitive credentials are supplied through environment variables. Keep server secrets out of source control and out of client-side `VITE_` variables.

## Technology stack

| Area | Technologies and role |
|---|---|
| Client | React 19, React DOM, Vite 8, React Router 7 |
| UI and styling | Ant Design, Bootstrap 5, Sass |
| Client data and UX | Axios for HTTP, Socket.IO Client for realtime |
| Server | Node.js, Express 5, CommonJS modules |
| Persistence | MongoDB and Mongoose |
| Identity and security | `jsonwebtoken`, `bcrypt`, `helmet`, `cors`, `express-rate-limit` |
| Product media | Cloudinary and Multer memory storage |
| AI | Vercel AI SDK connected to the Groq-compatible API |
| Development quality | Nodemon; ESLint is configured for the client |

## Repository structure

```text
VibeCart/
├── README.md                     # This project guide
├── client/                       # React/Vite SPA (separate Git repository)
│   ├── eslint.config.js           # Client ESLint configuration
│   ├── index.html                 # SPA HTML entry point
│   ├── package.json               # Client scripts and dependencies
│   ├── vercel.json                # SPA route rewrite for Vercel
│   ├── vite.config.js             # Vite/React configuration and @ alias
│   └── src/
│       ├── App.jsx                # App shell, realtime socket, chat/network UI
│       ├── main.jsx               # React, router, and context providers
│       ├── components/            # Shared UI, product cards, status, chat
│       ├── context/               # Authentication and local cart state
│       ├── data/                  # Static country data
│       ├── global/                # Shared client utilities
│       ├── pages/
│       │   ├── Auth/              # Login, registration, account recovery
│       │   └── Frontend/          # Storefront, checkout, dashboards
│       ├── sass/                  # Sass partials
│       └── socket.js              # Socket.IO client connection
├── server/                        # Express/Mongoose API (separate Git repository)
│   ├── .env.sample                # Server env template
│   ├── index.js                   # Middleware, Socket.IO, route mounts, startup
│   ├── package.json               # Server scripts and dependencies
│   ├── config/                    # MongoDB and Cloudinary configuration
│   ├── middlewares/               # JWT verification
│   ├── models/                    # User, product, and order schemas
│   ├── routes/                    # Auth, users, products, orders, stats, AI
│   └── utils/                     # IDs, email templates, shared helpers
```

The source tree above omits generated `node_modules` and build output. The client and server each have their own lockfile and package scripts. The client and server are maintained as separate Git repositories.

## Environment configuration

Create local environment files; the values below are placeholders, not real credentials. The server calls `dotenv.config()` from its working directory, so run server commands from `server/`.

### Server: `server/.env`

Start from `server/.env.sample` and fill in the values:

| Variable | Required for | Description / example |
|---|---|---|
| `PORT` | Server | HTTP port; defaults to `8000`. Example: `8000` |
| `MONGODB_USERNAME` | Database | MongoDB Atlas database username |
| `MONGODB_PASSWORD` | Database | MongoDB Atlas database password |
| `MONGODB_NAME` | Database | Database name used by Mongoose |
| `JWT_SECRET_KEY` | Authentication | Long, random signing key for login, socket, and reset JWTs |
| `CLOUDINARY_CLOUD_NAME` | Product image uploads | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Product image uploads | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Product image uploads | Cloudinary API secret |
| `GROQ_API_KEY` | AI chat | API key for the Groq-compatible model endpoint |
| `FRONTEND_URL` | Password reset email link | Public client origin, e.g. `https://shop.example.com` |
| `CLIENT_URL` | Socket.IO CORS | Client origin, e.g. `https://shop.example.com` |

Configure email delivery credentials securely for the email service used by your deployment. The MongoDB connection string is assembled from the three `MONGODB_*` values and targets the configured Atlas cluster. URL-encode special characters in the username or password.

Example shape:

```dotenv
PORT=8000
MONGODB_USERNAME=<atlas-username>
MONGODB_PASSWORD=<atlas-password>
MONGODB_NAME=<database-name>
JWT_SECRET_KEY=<long-random-secret>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
GROQ_API_KEY=<groq-api-key>
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173
```

### Client: `client/.env.local`

The client uses a Vite environment variable for API requests. The key spelling is case-sensitive and intentionally matches the current source:

| Variable | Required for | Description / example |
|---|---|---|
| `VITE_apiURL` | Client API calls | API origin, e.g. `http://localhost:8000` (no trailing slash required) |
| `VITE_SOCKET_URL` | Optional Socket.IO override | Socket server origin; defaults to `VITE_apiURL`, then `http://localhost:8000` |

Example:

```dotenv
VITE_apiURL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

Only variables prefixed with `VITE_` are made available in client code. Never put private credentials in client environment variables.

## Local development

### Prerequisites

- Git.
- Node.js **20.19+ or 22.12+** and npm; use a Node release supported by the installed Vite 8 toolchain.
- A MongoDB Atlas database matching the server's configured cluster, with database credentials and network access set up.
- Cloudinary and Groq credentials for image uploads and AI chat. Configure email delivery credentials for notification and password-reset messages.

### Clone and install

```bash
git clone https://github.com/tauseefRamzan-dev/VibeCart-Client.git client
git clone https://github.com/tauseefRamzan-dev/VibeCart-Sever.git server
```

Install each application independently:

```bash
cd server
npm install
```

In another terminal:

```bash
cd client
npm install
```

### Configure and start

1. Copy `server/.env.sample` to `server/.env` and set the database, JWT, and integration values described above.
2. Create `client/.env.local` with at least `VITE_apiURL=http://localhost:8000`.
3. Start the API from the `server/` directory:

   ```bash
   npm run dev
   ```

   The server connects to MongoDB before binding to `PORT` (default `8000`). Check `http://localhost:8000/` for the basic server response.

4. Start the Vite client from the `client/` directory:

   ```bash
   npm run dev
   ```

   Vite prints the local URL, normally `http://localhost:5173`.

Register an account through the app to create a customer user. Administrative workflows require a user whose database role is `admin` or `superAdmin`; the registration endpoint assigns new users the `customer` role.

## HTTP API

The API is mounted at the server origin (there is no `/api` prefix). Protected endpoints expect `Authorization: Bearer <JWT>`. Roles shown are enforced by backend handlers, not only the UI.

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `GET` | `/` | Basic server status/time response | No |
| `POST` | `/auth/register` | Register a customer | No; rate-limited |
| `POST` | `/auth/login` | Authenticate and return a one-day JWT | No; rate-limited |
| `GET` | `/auth/user` | Return the authenticated user's profile | Yes |
| `POST` | `/auth/forget-password` | Request a reset email | No |
| `POST` | `/auth/reset-password` | Set a new password with reset token | No; reset token required in body |
| `GET` | `/products/all` | List products, newest first | No |
| `GET` | `/products/single?id={productId}` | Fetch one product | No |
| `GET` | `/products/category?category={category}` | List products in a category | No |
| `POST` | `/products/add` | Create product and upload `image` (multipart form data) | Yes; `admin` or `superAdmin` |
| `PATCH` | `/products/update?id={productId}` | Update product; optional `image` upload | Yes; `admin` or `superAdmin` |
| `DELETE` | `/products/delete?id={productId}` | Delete product and its Cloudinary image | Yes; `admin` or `superAdmin` |
| `POST` | `/orders/create` | Place an order for the authenticated user | Yes |
| `GET` | `/orders/my-orders` | List the authenticated user's orders | Yes |
| `GET` | `/orders/all` | List all orders | Yes; `admin` or `superAdmin` |
| `DELETE` | `/orders/delete?id={orderId}` | Delete an order | Yes; `admin` or `superAdmin` |
| `PATCH` | `/orders/order/{orderId}/status-update` | Update order status and notify connected clients | Yes; `admin` or `superAdmin` |
| `PATCH` | `/orders/order/{orderId}/payment-update` | Update order paid state and notify connected clients | Yes; `admin` or `superAdmin` |
| `GET` | `/users/all` | List users (passwords excluded) | Yes; `admin` or `superAdmin` |
| `GET` | `/users/single-user?uid={uid}` | Fetch a user (password excluded) | Yes; `admin` or `superAdmin` |
| `GET` | `/users/customers` | List customers | Yes; `admin` or `superAdmin` |
| `GET` | `/users/admins` | List users with `admin` role | Yes; `admin` or `superAdmin` |
| `PATCH` | `/users/user/role?id={uid}` | Change a user's role | Yes; `superAdmin` |
| `DELETE` | `/users/user/delete?id={uid}` | Delete a user | Yes; `superAdmin` |
| `GET` | `/stats/dashboard-stats` | Return aggregate user/product/order counts | Yes; `admin` or `superAdmin` |
| `POST` | `/ai/chat` | Generate a product/support response from `messages` | No; optional bearer token adds order context |

## Realtime events

The Socket.IO server shares the API origin. Connect with the login JWT in the Socket.IO `auth` payload. Authenticated sockets join `user:<uid>`; `admin` and `superAdmin` sockets also join `admins`.

Events emitted by the server include:

| Event | Audience | When |
|---|---|---|
| `order:created` | `admins` room | An order is placed |
| `order:deleted` | Admin room and owning user's room | An order is deleted |
| `order:status-updated` | Admin room and owning user's room | An administrator changes order status |
| `order:payment-updated` | Admin room and owning user's room | An administrator changes payment state |

## Testing and code quality

Run the client lint check:

```bash
cd client
npm run lint
```

Build the production client bundle with:

```bash
cd client
npm run build
```

## Deployment

The client includes a Vercel SPA rewrite (`client/vercel.json`). The API is a separate Node service and can be deployed to Render, Railway, AWS, Azure, or another Node-compatible host. MongoDB Atlas, Cloudinary, and Groq are external services used by the application.

### Production checklist

1. Build the client:

   ```bash
   cd client
   npm ci
   npm run build
   ```

   Deploy the generated `client/dist/` directory as a static SPA. Set `VITE_apiURL` (and, if needed, `VITE_SOCKET_URL`) to the production API origin at build time.

2. Deploy the server from `server/` with Node.js and its production dependencies:

   ```bash
   npm ci --omit=dev
   node index.js
   ```

   Set `PORT`, MongoDB credentials/name, `JWT_SECRET_KEY`, `CLIENT_URL`, `FRONTEND_URL`, and integration credentials in the hosting provider's secret/environment settings.

3. Configure MongoDB Atlas network access for the server host and restrict database credentials.
4. Configure HTTPS and an explicit production CORS allowlist. The current Express CORS policy is permissive and should be tightened for production.
5. Use separate secrets per environment; rotate any key that has been exposed. Keep server secrets out of the client build.
6. Configure email delivery credentials and a verified sender address for production notifications and password resets.
7. Verify `/`, login, product retrieval, image upload, checkout, and realtime events against the deployed services.

## Contributing

Contributions are welcome. Before opening a pull request:

1. Open an issue or describe the problem and intended change.
2. Keep changes scoped to the client or server behavior and follow the existing module patterns.
3. Install dependencies in the relevant package and run the available lint/build checks.
4. Include reproducible steps and screenshots for user-facing changes. Add tests when introducing test infrastructure or behavior with suitable coverage.
5. Never include credentials, `.env` files, generated `node_modules`, or build output.

## License

The server package declares the **ISC** license. Refer to the client and server repositories for their respective license terms.

## Author and acknowledgments

- **Author:** Muhammad Tauseef Ramzan.
- **GitHub:** [@tauseefRamzan-dev](https://github.com/tauseefRamzan-dev)
- **Acknowledgments:** React, Vite, Express, MongoDB, Socket.IO, Cloudinary, and Groq communities and documentation.
