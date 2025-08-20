# E-commerce Product Listing Application

This is a full-stack e-commerce product listing application with a React frontend and a Node.js/Express/MongoDB backend.

## Project Structure

- `backend/`: Contains the Node.js Express server, MongoDB models, and API routes.
- `my-app/`: Contains the React frontend application.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

### 1. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

#### Configuration

Create a `.env` file in the `backend/` directory with your MongoDB connection URI and desired port:

```
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000
```

**Note:** Replace `YOUR_MONGODB_CONNECTION_STRING` with your actual MongoDB connection string.

#### Seeding the Database (Optional)

To populate your database with initial product data, run the `seed.js` script:

```bash
node seed.js
```

This will clear existing product data and insert sample products.

#### Running the Backend

Start the backend server:

```bash
nodemon index.js # If you have nodemon installed
# OR
node index.js
```

The backend server will run on the port specified in your `.env` file (default: `5000`).

### 2. Frontend Setup

Navigate to the `my-app` directory and install dependencies:

```bash
cd my-app
npm install
```

#### Running the Frontend

Start the React development server:

```bash
npm run dev
```

The frontend application will typically open in your browser at `http://localhost:5173` (or a similar port).
