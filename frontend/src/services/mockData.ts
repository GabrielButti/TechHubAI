import type { Curriculo, Vaga } from '../types';

// Dados de exemplo de candidatos
export const candidatosExemplo: Curriculo[] = [
  {
    nome: "Lucas Andrade",
    titulo_profissional: "Analista de Dados Júnior",
    resumo_profissional: "Profissional em início de carreira com foco em análise de dados, criação de dashboards e automação de processos utilizando Python e SQL.",
    habilidades_tecnicas: ["Python", "SQL", "Power BI", "Pandas", "Excel"],
    experiencias: [
      {
        cargo: "Estagiário de Dados",
        empresa: "DataCorp",
        descricao: "Auxílio na criação de relatórios automatizados e tratamento de bases de dados."
      }
    ],
    formacao: [
      {
        curso: "Sistemas de Informação",
        instituicao: "Universidade Federal do Ceará",
        status: "Cursando"
      }
    ]
  },
  {
    nome: "Mariana Souza",
    titulo_profissional: "Desenvolvedora Front-end",
    resumo_profissional: "Desenvolvedora especializada em interfaces modernas e responsivas com foco em experiência do usuário.",
    habilidades_tecnicas: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    experiencias: [
      {
        cargo: "Front-end Developer",
        empresa: "WebLab",
        descricao: "Desenvolvimento de aplicações SPA e manutenção de componentes reutilizáveis."
      }
    ],
    formacao: [
      {
        curso: "Análise e Desenvolvimento de Sistemas",
        instituicao: "FIAP",
        status: "Concluído"
      }
    ]
  },
  {
    nome: "Rafael Mendes",
    titulo_profissional: "Engenheiro de Software Back-end",
    resumo_profissional: "Experiência em construção de APIs escaláveis e microsserviços com foco em performance e segurança.",
    habilidades_tecnicas: ["Java", "Spring Boot", "Docker", "PostgreSQL", "Kafka"],
    experiencias: [
      {
        cargo: "Software Engineer",
        empresa: "TechSolutions",
        descricao: "Desenvolvimento de microsserviços e integração com sistemas distribuídos."
      }
    ],
    formacao: [
      {
        curso: "Engenharia da Computação",
        instituicao: "PUC Minas",
        status: "Concluído"
      }
    ]
  }
];

// Vagas de exemplo
export const vagasExemplo: Vaga[] = [
  {
    id: 1,
    titulo: "Desenvolvedor Backend Júnior",
    descricao: "Estamos buscando um Desenvolvedor Backend Júnior com experiência em: - Python; - Django ou frameworks web similares; - Criação e consumo de APIs REST; - Banco de dados relacionais (PostgreSQL ou MySQL); - Controle de versão com Git; Atuação em time ágil, com foco em desenvolvimento backend e boas práticas de código."
  },
  {
    id: 2,
    titulo: "Analista de Dados Pleno",
    descricao: "Estamos buscando um Analista de Dados Pleno com experiência em: - SQL avançado; - Python para análise de dados; - Power BI ou ferramentas de visualização; - Análise exploratória e construção de dashboards; - Diferencial: automação de relatórios e conhecimento em ETL; Atuação em time ágil, com foco em análise de dados e apoio à tomada de decisão."
  },
  {
    id: 3,
    titulo: "UX/UI Designer",
    descricao: "Estamos buscando um UX/UI Designer com experiência em: - Figma ou Adobe XD; - Criação de wireframes e protótipos interativos; - Pesquisa com usuários e testes de usabilidade; - Design de interfaces para aplicações web e mobile; - Diferencial: experiência trabalhando em conjunto com times de desenvolvimento; Atuação em time multidisciplinar, com foco em experiência do usuário."
  },
  {
    id: 4,
    titulo: "Estagiário(a) em Tecnologia da Informação",
    descricao: "Estamos buscando um(a) Estagiário(a) em Tecnologia da Informação com conhecimentos em: - Lógica de programação; - HTML, CSS e noções de Java ou outra linguagem; - Suporte técnico e atendimento a usuários; - Vontade de aprender e evoluir tecnicamente; Atuação em time de TI, com foco em suporte, manutenção de sistemas e aprendizado prático."
  },
  {
    id: 5,
    titulo: "Analista de Dados Júnior",
    descricao: "Estamos buscando um Analista de Dados Júnior com experiência em: - SQL avançado; - Python para análise de dados; - Power BI; - Conhecimento em ETL; - Diferencial: AWS e automações; Atuação em time ágil, com foco em BI e tomada de decisão."
  }
];
