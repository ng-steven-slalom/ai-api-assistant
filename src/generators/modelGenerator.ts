import fs from "fs";
import path from "path";

export const generateModels = (specPath: string) => {
  const raw = fs.readFileSync(specPath, "utf-8");
  const spec = JSON.parse(raw);

  const schemas = spec.components?.schemas || {};

  const modelsDir = path.resolve("output/models");

  if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
  }

  Object.keys(schemas).forEach((name) => {
    const schema = schemas[name];

    if (schema.type !== "object") return;

    let content = `export interface ${name} {\n`;

    const properties = schema.properties || {};
    const required = schema.required || [];

    Object.keys(properties).forEach((prop) => {
      const type = mapType(properties[prop].type);
      const optional = required.includes(prop) ? "" : "?";

      content += `  ${prop}${optional}: ${type};\n`;
    });

    content += `}\n`;

    fs.writeFileSync(path.join(modelsDir, `${name}.ts`), content);
  });

  console.log("✅ Models generated");
};

const mapType = (type: string): string => {
  switch (type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "any";
  }
};