import fs from "fs";
import path from "path";

export interface Endpoint {
  path: string;
  method: string;
  summary?: string;
}

export const parseOpenAPI = (filePath: string): Endpoint[] => {
  const fullPath = path.resolve(filePath);
  const rawData = fs.readFileSync(fullPath, "utf-8");
  const spec = JSON.parse(rawData);

  const endpoints: Endpoint[] = [];

  const paths = spec.paths || {};

  for (const route in paths) {
    const methods = paths[route];

    for (const method in methods) {
      endpoints.push({
        path: route,
        method: method.toUpperCase(),
        summary: methods[method].summary || ""
      });
    }
  }

  return endpoints;
};