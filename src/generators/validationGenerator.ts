import fs from "fs";
import path from "path";

export const generateValidations = (specPath: string) => {
  const raw = fs.readFileSync(specPath, "utf-8");
  const spec = JSON.parse(raw);

  const schemas = spec.components?.schemas || {};
  const validationDir = path.resolve("output/validations");

  if (!fs.existsSync(validationDir)) {
    fs.mkdirSync(validationDir, { recursive: true });
  }

  Object.keys(schemas).forEach((name) => {
    const schema = schemas[name];

    if (schema.type !== "object") return;

    let content = `import { z } from "zod";\n\n`;

    content += `export const ${name}Schema = z.object({\n`;

    const properties = schema.properties || {};
    const required = schema.required || [];

    Object.keys(properties).forEach((prop) => {
      const type = mapZodType(properties[prop].type);
      const isRequired = required.includes(prop);

      content += `  ${prop}: ${type}${isRequired ? "" : ".optional()"},\n`;
    });

    content += `});\n`;

    fs.writeFileSync(
      path.join(validationDir, `${name}.ts`),
      content
    );
  });

  console.log("✅ Validations generated");
};

const mapZodType = (type: string) => {
  switch (type) {
    case "string":
      return "z.string()";
    case "number":
    case "integer":
      return "z.number()";
    case "boolean":
      return "z.boolean()";
    default:
      return "z.any()";
  }
};