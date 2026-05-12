import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Preparamos o contexto para o Gemini focado em TCC e ABNT
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Você é o 'Oráculo da Mágica do TCC', um assistente especializado em metodologia científica e normas ABNT. Seu objetivo é ajudar estudantes a definir temas, estruturar sumários e sugerir citações onde autores convergem ou divergem. Responda sempre em Português do Brasil com um tom encorajador e acadêmico.",
        },
        {
          role: "model",
          parts: "Compreendido. Estou pronto para guiar os estudantes rumo a um TCC impecável e bem estruturado conforme as normas ABNT.",
        },
      ],
    });

    const lastMessage = messages[messages.length - 1].text;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Erro ao processar sua solicitação" }, { status: 500 });
  }
}
