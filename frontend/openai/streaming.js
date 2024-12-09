
import OpenAI from "openai";
import fs from "fs/promises";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";

/* Pick one of the Azure OpenAI models from the GitHub Models service */
const modelName = "gpt-4o-mini";

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  
  const stream = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a finance expert assistant." },
      { role: "user", content: "Daj mi sve informacije o kriptovalutama." },
    ],
    model: modelName,
    stream: true,
  });

  let fullResponse = ""; // To store the entire response

  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content || "";
    fullResponse += content; // Append the streamed content
    process.stdout.write(content); // Print to console
  }

  // Write the full response to the file
  await fs.writeFile("answerchat.txt", fullResponse, "utf8");
  console.log("\nResponse written to answerchat.txt");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
