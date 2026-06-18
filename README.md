# Los Santos Estates 🏢

A high-performance, production-ready full-stack real estate platform engineered using the MERN architecture. This platform features dynamic property listing exploration, complex relational query filtering, secure third-party authentication integration, and optimized asset hosting delivery pipelines.

## 🚀 Live Demo & Repositories

*   **Live Application URL:** [https://mern-stack-estate-b5hs.onrender.com](https://mern-stack-estate-b5hs.onrender.com)
*   **Production Deployment Host:** Render PaaS

---

## 🛠 Core Architecture & Tech Stack

### Frontend Ecosystem
*   **React (Vite):** Next-generation frontend tooling offering micro-second Hot Module Replacement (HMR).
*   **React Router Dom v6:** Managing declarative routing and synchronized client-side view states.
*   **State Management:** Local and contextual React hooks optimizing multi-component form handling.
*   **Styling:** Modern, elegant user interface utilizing atomic design principles for highly responsive viewport layouts.

### Backend Infrastructure
*   **Node.js & Express.js (v5.x Specification):** High-throughput REST API runtime engineered to leverage the latest wildcard routing features and native async handling.
*   **MongoDB Atlas:** Distributed, multi-cloud NoSQL document database utilizing complex document schema aggregation for asset querying.
*   **Mongoose ODM:** Explicit data model structure definition, schema validation, and database abstraction layers.

### Middleware & Service Integrations
*   **Firebase Authentication:** Secure OAuth token handling, login flows, and federated identity verification.
*   **Cloudinary SDK:** Dynamic multi-media binary asset uploading, cloud-based CDN storage, and responsive media delivery pipelines.
*   **JSON Web Tokens (JWT) & Cookie-Parser:** Secure stateless session handling via HTTP-only server-side cookies preventing XSS vectors.

---

## 💎 Key Operational Features

*   **Advanced Parameterized Filter Engines:** Implements server-side dynamic query construction supporting regex search strings, price ceilings/floors, property categories, amenity states (parking, furnishing), and instant sorting metrics.
*   **Dynamic Identity Management:** Bulletproof authentication layer offloading computational auth verification tasks securely to Firebase while preserving a local session wrapper.
*   **Real-time Asset Ingestion:** Direct, authenticated multi-image streams mapped onto Cloudinary CDN servers with instantaneous URL extraction and injection into persistent Mongo documents.
*   **System-Relative Asset Optimization:** Fully resolved production environment pipelines engineered to abstract server/frontend routing conflicts out of the deployment layer.

---

## ⚙️ Core Technical Engineering & Deep-Dive Fixes

During the continuous deployment cycle on cloud infrastructures, two major systemic operational bottlenecks were debugged and refactored within this repository to guarantee high availability and precise state routing:

### 1. Express v5 Wildcard Parameterization Overhaul
Traditional Express v4 multi-segment catch-all paths (`*`) were upgraded to align with stricter path-to-regexp parsing engines enforced by modern framework versions. Client-side browser routing loops and unintended `404 Not Found` response payloads on deep-linked page refreshes were completely mitigated by mapping specific asset scopes directly over root fallback endpoints.

### 2. Runtime Context Resolution (`process.cwd()`)
To eliminate relative file path mapping issues between the parent server workspace and the generated static frontend distribution files (`/dist`), the backend serving context was re-architected to leverage strict, system-relative execution environments:
```javascript
// Robust static folder resolution across heterogeneous server nodes
app.use(express.static(path.join(process.cwd(), 'client', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
});
```
This migration away from platform-dependent `__dirname` models guarantees that whenever isolated subfolder directories scale out across distributed Docker contexts or virtual cloud processes, absolute paths resolve elegantly back to the entry runtime target.

---

## 💻 Local Installation & Bootstrapping

To bring this stack up inside an isolated development workspace, proceed through the instructions mapped out below:

### 1. Repository Configuration
```bash
# Clone down the source repository
git clone https://github.com/arnavanand20/mern-stack-estate.git
cd mern-stack-estate

# Install server dependencies
npm install

# Transition into frontend workspace and build modules
cd client
npm install
cd ..
```

### 2. Environment Configurations (`.env`)
Generate a `.env` configuration template inside the **root workspace directory** matching the parameters below:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_high_entropy_cryptographic_secret
```

Generate a secondary `.env` configuration file inside the **`/client` directory** mapping keys down to your cloud services:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloud_preset
```

### 3. Execution Pipeline
```bash
# Spin up concurrent development cycles for backend APIs and frontend build engines
npm run dev
```

---

## 🛡 License
Distributed as open-source code under the MIT License framework.
