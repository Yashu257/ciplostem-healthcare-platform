// AI API Service for communicating with the backend
// This is a mock service that will work without a backend

export type UserType = 'patient' | 'doctor' | 'general';

interface ChatResponse {
  response: string;
  sources?: Array<{ source: string; relevance: number | null }>;
  sessionId?: string;
}

interface DocumentStats {
  totalDocuments: number;
  totalChunks: number;
  collectionName: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock responses for when backend is not available
const mockResponses: Record<UserType, string> = {
  patient: "Thank you for your question about stem cell therapy. While I'm currently running in demo mode without the full AI backend, I can share that CiploStem specializes in advanced stem cell treatments for knee osteoarthritis. Our treatments use cutting-edge regenerative medicine techniques to help patients reduce pain and improve mobility. For detailed medical information, please ensure the backend server is running or consult with our medical team directly.",
  doctor: "In demo mode, I can provide general information about our stem cell therapy protocols. CiploStem's treatment approach involves advanced mesenchymal stem cell therapy for knee osteoarthritis, with documented improvements in WOMAC scores and VAS pain scales. For access to detailed clinical trial data, manufacturing protocols, and comprehensive medical documentation, please connect to the full AI backend system.",
  general: "Welcome to CiploStem's AI Healthcare Assistant. I'm currently running in demo mode. CiploStem is an enterprise healthcare platform specializing in stem cell therapy for knee osteoarthritis. We offer advanced regenerative medicine treatments backed by clinical research. For full AI-powered responses with access to our complete medical knowledge base, please ensure the backend server is running.",
};

class AIApiService {
  private sessionId: string | null = null;

  async sendMessage(message: string, userType: UserType = 'general'): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userType,
          sessionId: this.sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.sessionId) {
        this.sessionId = data.sessionId;
      }

      return data;
    } catch (error) {
      console.warn('Backend not available, using mock response:', error);
      // Return mock response when backend is not available
      return {
        response: mockResponses[userType],
        sources: [
          { source: 'Demo Mode - Backend Not Connected', relevance: null }
        ],
      };
    }
  }

  async getChatHistory(sessionId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend not available:', error);
      return { messages: [] };
    }
  }

  async clearChatHistory(): Promise<void> {
    if (this.sessionId) {
      try {
        await fetch(`${API_BASE_URL}/chat/history/${this.sessionId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.warn('Backend not available:', error);
      }
    }
    this.sessionId = null;
  }

  async getSuggestedPrompts(context: string, userType: UserType): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context, userType }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.warn('Backend not available:', error);
      return [];
    }
  }

  async getDocumentStats(): Promise<DocumentStats | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend not available:', error);
      return null;
    }
  }

  async searchDocuments(query: string, limit: number = 5): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/documents/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, limit }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend not available:', error);
      return { results: [] };
    }
  }
}

export const aiApiService = new AIApiService();
