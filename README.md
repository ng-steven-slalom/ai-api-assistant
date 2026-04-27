# 🤖 AI-Powered API Assistant

## 📌 Overview

The AI-Powered API Assistant is a spec-driven backend generator that transforms OpenAPI specifications into a fully functional, type-safe Express.js API using TypeScript.

This project demonstrates modern AI Accelerated Engineering (AIAE) principles by combining structured context, code generation, and AI-assisted development.

---

## 🚀 Features

- ✅ OpenAPI → Backend code generation
- ✅ TypeScript models from schema
- ✅ Express routes & controllers generation
- ✅ Runtime validation using Zod
- ✅ AI-powered controller logic generation (with fallback)
- ✅ Fully runnable API server

---

## 🧠 Architecture

OpenAPI Spec
     ↓
Parser (Context Engineering)
     ↓
-------------------------------
| Models Generator             |
| Validation Generator (Zod)   |
| Controllers Generator (AI)   |
| Routes Generator             |
| App Generator                |
-------------------------------
     ↓
Generated TypeScript API
     ↓
Run locally / deploy to AWS

---

## ⚙️ Tech Stack

- Node.js + TypeScript
- Express.js
- Zod (validation)
- OpenAI API (AI logic generation)
- ts-node

---

## 🧩 How It Works

1. Provide an OpenAPI specification
2. Run:

npm run dev

3. The system generates:
   - Models (output/models)
   - Validations (output/validations)
   - Controllers (output/controllers)
   - Routes (output/routes.ts)
   - App (output/app.ts)

4. Start the API:

npx ts-node output/app.ts

---

## 🧪 Example

### Input (OpenAPI)

{
  "paths": {
    "/users": {
      "post": {
        "summary": "Create a user"
      }
    }
  }
}

### Output

- Fully working `/users` endpoint
- Type-safe request handling
- Runtime validation

---

## 🤖 AI Integration

The system uses AI to dynamically generate controller logic based on endpoint descriptions.

If AI is unavailable (e.g., quota issues), the system falls back to safe default logic.

---

## 🔒 Validation

Zod ensures all incoming requests are validated at runtime:

- Rejects invalid payloads
- Enforces schema correctness

---

## 💡 Key Concepts Demonstrated

- Spec-Driven Development
- Context Engineering
- AI-Augmented SDLC
- Agentic Development Patterns
- Resilient System Design (fallback mechanisms)

---

## 🚀 Future Enhancements

- AWS Lambda deployment
- CLI tool for generation
- Multi-agent workflow (generate → test → fix)
- OpenAPI → full CRUD scaffolding

---

## 🙌 Author

Steven Hamilton  
Software Engineer  
