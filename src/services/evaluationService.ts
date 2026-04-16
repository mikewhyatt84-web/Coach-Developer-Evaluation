import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult, RUBRIC_SKILLS } from "../types";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return "";
  }
  return key;
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey: apiKey });

export async function evaluateObservations(notes: { [key: string]: string }): Promise<EvaluationResult> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please check your Vercel Environment Variables.");
  }

  const prompt = `
    You are an AI assistant for a Coach Developer. Your task is to transform raw field observations into a structured evaluation based on a specific rubric.

    Observation Notes:
    ENVIRONMENT: ${notes.environment}
    ENGAGE-EXPLAIN: ${notes.engageExplain}
    EXIT-ENTER: ${notes.exitEnter}
    EDUCATE-ENSURE: ${notes.educateEnsure}

    Rubric Skills and Criteria:
    ${RUBRIC_SKILLS.map(s => `- ${s.skill}: ${s.criteria}${s.examples ? ` (Examples: ${s.examples.join('; ')})` : ''}`).join('\n')}

    Rating Scales: "Meets the Standard", "Approaching", "Needs Improvement", "No Evidence Observed"

    Tasks:
    1. Analyze the notes and map observations to the 15 Skills based on the criteria.
    2. Provide a rating for each skill.
    3. If there is evidence, specify it from the notes.
    4. Identify skills with "No Evidence Observed" for the "Missing Competencies" section.
    5. Write a 3-sentence "Coach's Summary" (encouraging, pedagogical, supportive).
    6. Write a "Feedforward Summary" (direct suggestions for future growth).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  rating: { type: Type.STRING },
                  evidence: { type: Type.STRING }
                },
                required: ["skill", "rating", "evidence"]
              }
            },
            missingCompetencies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            coachSummary: { type: Type.STRING },
            feedforwardSummary: { type: Type.STRING }
          },
          required: ["items", "missingCompetencies", "coachSummary", "feedforwardSummary"]
        }
      }
    });

    const text = response.text || "";
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as EvaluationResult;
  } catch (error: any) {
    console.error("Error evaluating observations:", error);
    // Provide a more descriptive error if it's an API issue
    if (error.message?.includes("API key")) {
      throw new Error("Invalid Gemini API Key. Please verify your environment variables.");
    }
    throw error;
  }
}
