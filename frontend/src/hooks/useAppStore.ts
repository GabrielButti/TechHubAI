import { create } from 'zustand';
import type { Curriculo, Vaga, AvaliacaoCandidatura, PerguntasEntrevista } from '../types';

interface AppStore {
  // State
  curriculo: Curriculo | null;
  vaga: Vaga | null;
  avaliacao: AvaliacaoCandidatura | null;
  perguntas: PerguntasEntrevista | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setCurriculo: (curriculo: Curriculo | null) => void;
  setVaga: (vaga: Vaga | null) => void;
  setAvaliacao: (avaliacao: AvaliacaoCandidatura | null) => void;
  setPerguntas: (perguntas: PerguntasEntrevista | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;
  resetCurrentStep: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  curriculo: null,
  vaga: null,
  avaliacao: null,
  perguntas: null,
  loading: false,
  error: null,
  
  // Actions
  setCurriculo: (curriculo) => set({ curriculo }),
  setVaga: (vaga) => set({ vaga }),
  setAvaliacao: (avaliacao) => set({ avaliacao }),
  setPerguntas: (perguntas) => set({ perguntas }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearAll: () => set({
    curriculo: null,
    vaga: null,
    avaliacao: null,
    perguntas: null,
    error: null,
  }),
  
  resetCurrentStep: () => set({
    avaliacao: null,
    perguntas: null,
    error: null,
  }),
}));
