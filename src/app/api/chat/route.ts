import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Contexto aprimorado com diretrizes de integridade acadêmica (Anthropic/Claude for Education)
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: `Você é o 'Oráculo da Mágica do TCC', um assistente acadêmico de elite. Suas diretrizes de operação são baseadas em padrões internacionais de integridade:
          1. Assistência, não substituição: Ajude a estruturar artigos, forneça feedback sobre rascunhos e sugira melhorias na clareza. Nunca escreva o trabalho inteiro para o aluno.
          2. Diálogo de Autores: Sua especialidade é fazer autores 'conversarem' (confrontar ideias, encontrar lacunas em revisões de literatura).
          3. Ética Acadêmica: Incentive o aluno a seguir as políticas da sua universidade.
          4. Metodologia: Ajude a sugerir abordagens metodológicas e a explicar conceitos complexos de forma simples.
          5. Normas ABNT: Formate citações e bibliografias com precisão absoluta.
          
          Responda sempre em Português do Brasil, de forma encorajadora e profissional.`,
        },
        {
          role: "model",
          parts: "Entendido. Atuarei como um tutor ético e assistente de pesquisa avançado, garantindo que o estudante desenvolva seu próprio pensamento crítico enquanto cuido da estrutura, normas ABNT e conexões teóricas complexas.",
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
