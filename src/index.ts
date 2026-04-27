import { parseOpenAPI } from "./parsers/openapiParser";
import { generateRoutes } from "./generators/routeGenerator";
import { generateApp } from "./generators/appGenerator";
import { generateControllers } from "./generators/controllerGenerator";
import { generateModels } from "./generators/modelGenerator";
import { generateValidations } from "./generators/validationGenerator";

const run = async () => {
  const endpoints = parseOpenAPI("specs/sample-api.json");

  generateModels("specs/sample-api.json");
  generateValidations("specs/sample-api.json");

  await generateControllers(endpoints, "specs/sample-api.json");
  
  generateRoutes(endpoints);  
  generateApp();
};

run();