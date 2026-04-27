import fs from "fs";
import path from "path";

export const generateApp = () => {
  const content = `
import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

app.use("/", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`;

  const outputDir = path.resolve("output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(path.join(outputDir, "app.ts"), content);

  console.log("✅ App generated at output/app.ts");
};