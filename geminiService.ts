
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function queryDocumentContent(pdfBase64: string, query: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: pdfBase64
            }
          },
          { text: query }
        ]
      },
      config: {
        systemInstruction: "You are the Neuro-Link Communicator. You have access to a PDF document provided by the user's AI Twin. Answer all questions based strictly on the document's content, maintaining a high-intelligence, supportive persona."
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini query error:", error);
    return "Error communicating with the neuro-link.";
  }
}

export async function detectUserFocus(imageBtn64: string): Promise<'FOCUSED' | 'DISTRACTED'> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBtn64
            }
          },
          { text: "Analyze this person. Are they focused on their work at the screen, or are they distracted (looking away, on a phone, eyes closed, or absent)? Respond with exactly one word: 'FOCUSED' or 'DISTRACTED'." }
        ]
      }
    });
    const result = response.text?.trim().toUpperCase();
    return result === 'FOCUSED' ? 'FOCUSED' : 'DISTRACTED';
  } catch (error) {
    console.error("Focus detection error:", error);
    return 'FOCUSED'; // Default to focused on error to avoid false positives
  }
}

export async function connectLiveAudio(callbacks: any) {
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
      },
      systemInstruction: 'You are an AI Thinking Twin. You provide high-level cognitive advice, brainstorm complex problems, and engage in deeply intellectual dialogue.'
    },
  });
}

// Helpers for encoding/decoding raw PCM audio as per instructions
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function encodeUint8(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): { data: string, mimeType: string } {
  const int16 = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encodeUint8(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
