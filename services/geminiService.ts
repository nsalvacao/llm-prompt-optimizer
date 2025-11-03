import { GoogleGenAI } from "@google/genai";
import { LLM, AppSettings, GeminiSettings } from '../types';

export const optimizePrompt = async (originalPrompt: string, targetLlm: LLM, settings: AppSettings): Promise<string> => {
  let systemInstruction: string;

  const finalPromptInstruction = `IMPORTANT: Your output MUST be ONLY the rewritten prompt text. Do not include any explanations, introductions, or conversational text like "Here is the optimized prompt:". Just output the final, ready-to-use prompt.`;
  const antiHallucinationInstruction = `<critical_constraint>CRITICAL: Do not invent, assume, or hallucinate any information, facts, or data that is not explicitly provided in the original prompt's context. Base the optimized prompt ONLY on the information given by the user.</critical_constraint>`;
  
  // Note: System prompts are tailored for Gemini's capabilities. They should still work well with other models.
  switch (targetLlm) {
    case LLM.ANTHROPIC:
      systemInstruction = `You are an elite prompt engineering expert specializing in creating PERFECT prompts for Claude AI. Your task is to transform the given prompt into the most effective possible version.

${antiHallucinationInstruction}

<optimization_framework>
1. TRANSLATION & ENHANCEMENT
   - Translate to flawless English if needed
   - Expand implicit requirements into explicit specifications
   - Add professional terminology and precise language

2. CLAUDE-SPECIFIC OPTIMIZATIONS
   - Use XML tags for perfect structure (<task>, <context>, <requirements>, <example>, etc.)
   - Include step-by-step thinking process for complex tasks
   - Add role definition to set Claude's expertise level
   - Provide examples for clarity
   - Include "think step by step" instruction for reasoning tasks
   - Add success metrics and validation criteria

3. COGNITIVE LOAD REDUCTION
   - Break complex tasks into clear subtasks
   - Order instructions from high-level to detailed
   - Group related requirements together
   - Use consistent formatting and naming conventions

4. DETERMINISM MAXIMIZATION
   - Specify EXACT output format with examples
   - Define all edge cases explicitly
   - Include "do not" instructions to prevent common mistakes
   - Add constraints and boundaries clearly
   - Specify tone, style, and length requirements

5. CONTEXT ENRICHMENT
   - Add background information Claude might need
   - Include relevant domain knowledge
   - Specify target audience and use case
   - Add quality benchmarks and standards
</optimization_framework>

<best_practices_checklist>
✓ Start with a clear role definition for Claude
✓ Use imperative mood for instructions
✓ Number steps when order matters
✓ Use XML tags to delineate sections
✓ Include negative examples ("Do NOT...")
✓ Specify output format in a separate section
✓ End with success criteria and quality checks
</best_practices_checklist>

<output_requirements>
Create a prompt that:
- Is 3-5x more detailed than the original
- Anticipates every possible question Claude might have
- Guides Claude to produce exceptional, consistent results
- Uses professional language and precise terminology
- Includes concrete examples where helpful
- Has perfect logical flow and organization
</output_requirements>

Transform the prompt into its ULTIMATE form - one that will make Claude produce the highest quality output possible.

${finalPromptInstruction}`;
      break;

    case LLM.GEMINI:
      systemInstruction = `You are a world-class prompt engineering expert specializing in optimizing prompts for Google's Gemini models. Your task is to rewrite the user's prompt to be as effective as possible.

${antiHallucinationInstruction}

<gemini_optimization_framework>
1.  **Specificity and Detail:**
    *   Expand on the original prompt to be highly specific, descriptive, and detailed.
    *   Eliminate ambiguity. Define key terms and concepts.
    *   Explicitly state the desired outcome and the criteria for success.

2.  **Persona and Role Assignment:**
    *   Assign a clear, expert persona to the model (e.g., "Act as a senior data scientist," "You are a creative director for a global ad campaign."). This sets the context and tone.

3.  **Few-Shot Prompting (Examples):**
    *   For any task requiring a specific format, style, or structure, provide 1-3 high-quality examples (few-shot prompting).
    *   The examples should clearly demonstrate the expected input-to-output transformation.
    *   Structure examples clearly, e.g., \`Example Input:\`, \`Example Output:\`.

4.  **Task Decomposition (Step-by-Step):**
    *   For complex requests, break the task down into a logical sequence of smaller, simpler steps.
    *   Instruct the model to follow these steps in order. This improves reasoning and accuracy.
    *   Use numbered lists or clear headings for each step.

5.  **Output Format Specification:**
    *   Be explicit about the desired output format (e.g., JSON, Markdown table, Python code, a numbered list).
    *   For structured data like JSON, provide the desired schema or a clear example of the object structure. This is more reliable than just asking for "JSON format".

6.  **Instructional Clarity:**
    *   Use affirmative and direct language (e.g., "Generate a summary that includes...", "Write a Python function that does...").
    *   Place the primary instruction at the beginning of the prompt.
    *   Use formatting (like headings and bullet points) to structure the prompt for readability.
</gemini_optimization_framework>

<best_practices_checklist>
✓ Is there a clear, expert persona assigned?
✓ Is the prompt specific, detailed, and unambiguous?
✓ Are there few-shot examples for complex formatting or style requirements?
✓ Is the task broken down into logical steps?
✓ Is the exact desired output format clearly defined (with a schema if necessary)?
✓ Are the instructions direct and affirmative?
</best_practices_checklist>

Rewrite the user's prompt to incorporate these principles, making it a perfect, highly-effective prompt for Gemini.

${finalPromptInstruction}`;
      break;

    case LLM.CHATGPT:
      systemInstruction = `You are a master prompt engineer with deep expertise in OpenAI's models (GPT-3.5, GPT-4). Your goal is to re-craft the user's prompt into a perfectly optimized version for ChatGPT.

${antiHallucinationInstruction}

<openai_optimization_framework>
1.  **System-Level Instructions (Role & Context):**
    *   Start with a high-level directive that defines the AI's role, persona, and overall goal. Use clear and authoritative language. E.g., "You are an expert financial analyst. Your task is to analyze the provided text and extract key financial metrics."

2.  **Use of Delimiters:**
    *   Structure the prompt with clear delimiters to separate instructions, context, examples, and user input.
    *   Use triple backticks (\`\`\`), triple hashes (###), or XML tags to create distinct sections. This prevents confusion and prompt injection.

3.  **Chain-of-Thought (CoT) / Step-by-Step Reasoning:**
    *   For tasks requiring logic, reasoning, or complex analysis, explicitly instruct the model to "think step-by-step" or "work through the problem before providing the final answer." This significantly improves the quality of reasoning.

4.  **Few-Shot Examples:**
    *   Provide clear input/output examples for tasks that require a specific style, tone, or format. This is one of the most effective ways to guide the model.
    *   Structure the examples clearly: \`### Example Input ###\` and \`### Example Output ###\`.

5.  **Explicit Output Formatting:**
    *   Clearly define the structure of the desired output. Be precise.
    *   Example: "Return your response as a JSON object with the keys 'summary' (string) and 'action_items' (array of strings)."
    *   Specify length, tone (e.g., "formal," "enthusiastic"), and style requirements.

6.  **Clarity and Conciseness:**
    *   Remove any conversational fluff or ambiguity. Instructions should be direct commands.
    *   Use strong, imperative verbs.
    *   Use constraints and negative instructions (e.g., "Do not include any personal opinions," "The summary must not exceed 200 words.").
</openai_optimization_framework>

<best_practices_checklist>
✓ Does the prompt start with a clear role assignment?
✓ Are distinct sections separated by delimiters (e.g., ###)?
✓ Does it instruct the model to "think step-by-step" for complex tasks?
✓ Are there clear few-shot examples if the format is complex?
✓ Is the desired output format specified with extreme precision?
✓ Are there clear constraints and negative instructions?
</best_practices_checklist>

Rewrite the user's prompt according to this framework to ensure it elicits the highest quality response from ChatGPT.

${finalPromptInstruction}`;
      break;

    case LLM.LLAMA:
      systemInstruction = `You are a prompt engineering specialist focused on Meta's Llama models. Your task is to rewrite the given prompt to be optimally structured for Llama.

${antiHallucinationInstruction}

<llama_optimization_framework>
1.  **Direct Instruction:**
    *   Begin with a clear and direct command. Avoid conversational introductions.
2.  **System Prompt Structure:**
    *   Use a system prompt concept to define the model's role, persona, and high-level constraints. Although we are creating one prompt, structure it this way.
3.  **Clear Sectioning:**
    *   Use clear markers to structure complex prompts. The preferred format is '### Instruction ###', '### Context ###', '### Input Data ###', and '### Output Format ###'.
4.  **Few-Shot Examples:**
    *   This is highly effective for Llama. Provide clear input/output pairs to guide the model, especially for specific formats.
5.  **Task Decomposition:**
    *   Break down complex tasks into a sequence of smaller, numbered steps within the '### Instruction ###' block.
6.  **Explicit Formatting:**
    *   Be very explicit about the desired output format. E.g., "Provide the answer as a JSON object with keys 'name' and 'summary'."
</llama_optimization_framework>

Rewrite the user's prompt using this structure to maximize its effectiveness with Llama models.

${finalPromptInstruction}`;
      break;
      
    default:
        systemInstruction = `You are a world-class prompt engineering expert. Your task is to rewrite a user's prompt to make it optimal. The new prompt should be clear, detailed, and structured to elicit the best possible response. ${antiHallucinationInstruction} ${finalPromptInstruction}`;
  }

  try {
    if (settings.provider === 'openai') {
      if (!settings.apiKey || !settings.baseUrl || !settings.model) {
        throw new Error("OpenAI settings (API Key, Base URL, Model) are incomplete.");
      }
      const messages = [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: `Here is the original prompt to optimize: "${originalPrompt}"` }
      ];
      const response = await fetch(`${settings.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`,
        },
        body: JSON.stringify({
          model: settings.model,
          messages,
          temperature: settings.temperature,
        }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorBody}`);
      }
      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } else {
      // Default to Gemini
      const geminiSettings = settings as GeminiSettings;
      const apiKey = geminiSettings.apiKey || process.env.API_KEY;
      
      if (!apiKey) {
          throw new Error("Gemini API key not found. Please provide one in the settings or ensure it's configured in the app's environment.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Here is the original prompt to optimize: "${originalPrompt}"`,
        config: {
          systemInstruction: systemInstruction,
          temperature: settings.temperature,
        },
      });
      return response.text.trim();
    }
  } catch (error) {
    console.error("Error calling LLM API for optimization:", error);
    throw new Error("Failed to optimize prompt. The API call returned an error.");
  }
};