<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/77f6e5c3-8eb5-439a-9d24-7de82e218ca2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

////
# 1. Initialize project (already done)
npm init -y

# 2. Install Frontend Dependencies
npm install react react-dom react-router-dom
npm install typescript @types/react @types/react-dom
npm install vite @vitejs/plugin-react
npm install tailwindcss @tailwindcss/vite
npm install framer-motion
npm install lucide-react
npm install axios
npm install clsx
npm install tailwind-merge

# 3. Install Backend Dependencies
npm install express mongoose cors dotenv
npm install bcryptjs jsonwebtoken
npm install nodemailer
npm install @types/bcryptjs @types/jsonwebtoken @types/nodemailer
npm install @types/express @types/cors @types/node

# 4. Install PDF Export Dependencies
npm install jspdf jspdf-autotable

# 5. Install Development Dependencies
npm install -D tsx
npm install -D concurrently
npm install -D nodemon
npm install -D @types/react-router-dom
npm install -D autoprefixer postcss

# 6. Optional - For Excel/CSV export (already working without)
# No extra package needed - using native Blob API

<!-- 
MONGO_URI=mongodb+srv://astackadmin:Astack%40123@astacksolution.ojvtjuq.mongodb.net/astacksolutions?retryWrites=true&w=majority&appName=Astacksolution
JWT_SECRET=astack_secret_key
PORT=5000
NODE_ENV=development -->