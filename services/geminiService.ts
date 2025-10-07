import { GoogleGenAI } from "@google/genai";
import type { Course, SearchResult, GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchCoursera = async (topic: string): Promise<SearchResult> => {
  const prompt = `You are an autonomous AI browser agent. Your goal is to find the course structure for a specialization on Coursera about '${topic}'. First, find the main specialization page. Then, identify all the individual courses (series) that make up this specialization. For each individual course, list all of its chapters or modules. Return a list of the course series, their full URLs, and their respective chapters. The response MUST be a valid JSON array of objects. Each object in the array represents a course and must have a 'title' (string), a 'url' (string), and a 'chapters' key (an array of objects, where each object has a 'title' key). For example: [{"title": "Course 1: Getting Started", "url": "https://www.coursera.org/learn/course-1", "chapters": [{"title": "Week 1: Introduction"}, {"title": "Week 2: Core Concepts"}]}] . Do not include any text, introductory sentences, or markdown formatting outside of the JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    let responseText = response.text;
    
    // Clean the response to ensure it's valid JSON
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON array found in the response.");
    }
    responseText = jsonMatch[0];

    const courses: Course[] = JSON.parse(responseText);

    // Validate the structure of the returned data
    if (!Array.isArray(courses) || courses.some(c => !c.title || !c.url || !Array.isArray(c.chapters))) {
         throw new Error("The AI returned data in an unexpected format. Please try again.");
    }

    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources: GroundingSource[] = rawSources.map((s: any) => ({
        uri: s.web.uri,
        title: s.web.title,
    })).filter((s: GroundingSource) => s.uri && s.title);

    // Deduplicate sources by URI
    const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());


    return { courses, sources: uniqueSources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("JSON")) {
            throw new Error("Failed to parse the response from the AI. The format was unexpected.");
        }
        if (error.message.includes("unexpected format")) {
            throw error;
        }
    }
    throw new Error("An unexpected error occurred while searching for courses.");
  }
};