import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvaluationResult, RUBRIC_SKILLS } from "../types";

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return "";
  }
  return key;
};

const apiKey = getApiKey();
const genAI = new GoogleGenerativeAI(apiKey);

export async function evaluateObservations(notes: { [key: string]: string }): Promise<EvaluationResult> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. If you are deploying to Vercel, please add it to your Environment Variables in the project dashboard and redeploy.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are an AI assistant for a Coach Mentor. Your task is to transform raw field observations into a structured evaluation based on a specific rubric.

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

    Response Format (JSON):
    {
      "items": [
        { "skill": "Skill Name", "rating": "Rating", "evidence": "Actual quotes or paraphrased evidence" }
      ],
      "missingCompetencies": ["Skill Name"],
      "coachSummary": "3-sentence summary",
      "feedforwardSummary": "One or two paragraphs of constructive feedback"
    }

    Important: Use the exact language of the rubric for skills and ratings.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response (handling potential markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response format from AI");
    
    return JSON.parse(jsonMatch[0]) as EvaluationResult;
  } catch (error) {
    console.error("Error evaluating observations:", error);
    throw error;
  }
}
