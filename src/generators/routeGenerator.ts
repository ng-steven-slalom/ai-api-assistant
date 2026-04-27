import fs from "fs";
import path from "path";
import { Endpoint } from "../parsers/openapiParser";

export const generateRoutes = (endpoints: Endpoint[]) => {
  let imports = `import express from "express";\nconst router = express.Router();\n`;
  let routes = "";

  endpoints.forEach((ep) => {
    const routePath = ep.path.replace(/{/g, ":").replace(/}/g, "");

    const functionName = `${ep.method.toLowerCase()}${ep.path
      .replace(/[\/{}]/g, "_")
      .replace(/__+/g, "_")}`;

    imports += `import { ${functionName} } from "./controllers/${functionName}";\n`;

    routes += `
router.${ep.method.toLowerCase()}("${routePath}", ${functionName});
`;
  });

  const content = `
${imports}

${routes}

export default router;
`;

  const outputDir = path.resolve("output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(path.join(outputDir, "routes.ts"), content);

  console.log("✅ Routes updated with controllers");
};