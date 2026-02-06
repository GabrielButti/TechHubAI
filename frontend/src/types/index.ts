// Tipos de Currículo
export interface Experiencia {
  cargo: string;
  empresa: string;
  descricao: string;
}

export interface Formacao {
  curso: string;
  instituicao: string;
  status: string;
}

export interface Curriculo {
  nome: string;
  titulo_profissional: string;
  resumo_profissional: string;
  habilidades_tecnicas: string[];
  experiencias: Experiencia[];
  formacao: Formacao[];
}

// Tipos de Vaga
export interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
}

// Tipos de Avaliação
export interface AvaliacaoCandidatura {
  aderencia_geral: 'alta' | 'media' | 'baixa';
  veredito: 'recomendada' | 'possivel' | 'nao_recomendada';
  pontos_fortes: string[];
  pontos_de_atencao: string[];
  lacunas_tecnicas: string[];
  recomendacoes_de_estudo: string[];
  observacoes_finais: string;
  score_aderencia: string;
}

// Tipos de Entrevista
export interface PerguntaTecnica {
  pergunta: string;
  nivel: 'basico' | 'intermediario' | 'avancado';
  relacao_com_curriculo: 'forte' | 'media' | 'fraca';
}

export interface PerguntasEntrevista {
  nivel_da_vaga: 'junior' | 'pleno' | 'senior';
  assuntos_mais_cobrados: string[];
  perguntas_tecnicas: PerguntaTecnica[];
  perguntas_comportamentais: string[];
  perguntas_situacionais: string[];
  dicas_de_preparacao: string[];
}

// Tipos de Estado Global
export interface AppState {
  curriculo: Curriculo | null;
  vaga: Vaga | null;
  avaliacao: AvaliacaoCandidatura | null;
  perguntas: PerguntasEntrevista | null;
  loading: boolean;
  error: string | null;
}
