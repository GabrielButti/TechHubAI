import apiClient from './api';
import type { 
  Curriculo, 
  AvaliacaoCandidatura, 
  PerguntasEntrevista,
  Vaga 
} from '../types';

// Serviço de Geração de Currículo
export const cursoService = {
  async gerarCurriculo(dadosCandidato: any): Promise<Curriculo> {
    try {
      const response = await apiClient.post('/curriculo/gerar', {
        dados: dadosCandidato,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao gerar currículo:', error);
      throw error;
    }
  },

  async renderizarPDF(curriculo: Curriculo): Promise<Blob> {
    try {
      const response = await apiClient.post('/curriculo/pdf', 
        { curriculo },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao renderizar PDF:', error);
      throw error;
    }
  },
};

// Serviço de Avaliação de Candidaturas
export const avaliacaoService = {
  async avaliarCandidatura(
    curriculo: Curriculo,
    vaga: Vaga
  ): Promise<AvaliacaoCandidatura> {
    try {
      const response = await apiClient.post('/avaliacao/candidatura', {
        curriculo,
        vaga,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao avaliar candidatura:', error);
      throw error;
    }
  },
};

// Serviço de Geração de Perguntas de Entrevista
export const entrevistaService = {
  async gerarPerguntas(
    curriculo: Curriculo,
    vaga: Vaga
  ): Promise<PerguntasEntrevista> {
    try {
      const response = await apiClient.post('/entrevista/gerar-perguntas', {
        curriculo,
        vaga,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao gerar perguntas:', error);
      throw error;
    }
  },
};

// Serviço de Vagas
export const vagasService = {
  async listarVagas(): Promise<Vaga[]> {
    try {
      const response = await apiClient.get('/vagas');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar vagas:', error);
      throw error;
    }
  },

  async obterVaga(id: number): Promise<Vaga> {
    try {
      const response = await apiClient.get(`/vagas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter vaga:', error);
      throw error;
    }
  },
};
