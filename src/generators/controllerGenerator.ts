import fs from "fs";
import path from "path";
import { Endpoint } from "../parsers/openapiParser";
import { generateControllerLogic } from "../utils/ai";

export const generateControllers = async (
  endpoints: Endpoint[],
  specPath: string
) => {
  const raw = fs.readFileSync(specPath, "utf-8");
  const spec = JSON.parse(raw);

  const controllersDir = path.resolve("output/controllers");

  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true });
  }

  for (const ep of endpoints) {
    const functionName = `${ep.method.toLowerCase()}${ep.path
      .replace(/[\/{}]/g, "_")
      .replace(/__+/g, "_")}`;

    let modelImport = "";
    let modelName = "";
    let validationImport = "";
    let validationUsage = "";

    const pathItem = spec.paths?.[ep.path];
    const methodItem = pathItem?.[ep.method.toLowerCase()];

    const ref =
      methodItem?.requestBody?.content?.["application/json"]?.schema?.["$ref"];

    // ✅ Detect model + validation
    if (ref) {
      modelName = ref.split("/").pop();

      modelImport = `import { ${modelName} } from "../models/${modelName}";`;
      validationImport = `import { ${modelName}Schema } from "../validations/${modelName}";`;

      validationUsage = `
  const parseResult = ${modelName}Schema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json(parseResult.error);
  }

  const body: ${modelName} = parseResult.data;
`;
    }

    // 🤖 AI generation (with fallback already handled)
    const aiLogic = await generateControllerLogic(
      ep.summary || "",
      modelName
    );

    // ✅ FINAL GENERATED FILE CONTENT
    const content = `
import { Request, Response } from "express";
${modelImport}
${validationImport}

export const ${functionName} = (req: Request, res: Response) => {
${validationUsage}
${aiLogic}
};
`;

    fs.writeFileSync(
      path.join(controllersDir, `${functionName}.ts`),
      content
    );
  }

  console.log("🤖 AI Controllers generated (with validation)");
};