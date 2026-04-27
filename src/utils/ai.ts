import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateControllerLogic = async (
  summary: string,
  modelName?: string
): Promise<string> => {
  try {
    const prompt = `
You are a backend engineer.

Generate a TypeScript Express controller function body.

Requirements:
- Use req, res
- Include basic validation if possible
- Keep it simple and clean
- No explanations, only code

Endpoint description: ${summary}
Model: ${modelName || "none"}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You generate backend code." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.warn("⚠️ AI failed, using fallback");

    return `
if (!req.body) {
  return res.status(400).send("Invalid request");
}

res.send("${summary || "OK"}");
`;
  }
};