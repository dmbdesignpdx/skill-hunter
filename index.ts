import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import chalk from "chalk";


type Prompt = (text: string) => string;


const openai = createOpenAI({
  apiKey: Bun.env.OPENAI_API_KEY,
  compatibility: "strict",
});

const message = {
  converting: `${chalk.blue("[info]")}    Converting...`,
  success: `${chalk.green("[success]")} Generated List of Skills:`,
};

const prompt: Prompt = text =>
`<instructions>
  Find the hard skills in the following job posting.
  Return an unordered list with each skill on a new line.
  Make sure they short and concise.
</instructions>
<job_posting>
  ${text}
</job_posting>`;


async function main() {
  console.log(message.converting);

  const text = await Bun.file("./context/job.txt").text();
  const response = await generateText({
    model: openai("gpt-4.1-mini"),
    prompt: prompt(text),
  });

  console.log(message.success);
  console.log(response.text.trim());
}


main().catch(console.error);
