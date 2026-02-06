import { PerguntasEntrevista } from '../types';
import {
  HelpCircle,
  Zap,
  Users,
  Lightbulb,
  BookOpen,
  Layers,
} from 'lucide-react';

interface ResultadosEntrevistaProps {
  perguntas: PerguntasEntrevista;
}

export const ResultadosEntrevista: React.FC<ResultadosEntrevistaProps> = ({
  perguntas,
}) => {
  const nivelStyle = {
    junior: 'bg-green-500/20 text-green-300 border-green-500/50',
    pleno: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    senior: 'bg-red-500/20 text-red-300 border-red-500/50',
  };

  const dificuldadeStyle = {
    basico: 'text-green-400',
    intermediario: 'text-yellow-400',
    avancado: 'text-red-400',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <HelpCircle className="w-7 h-7 text-cyan-400" />
        Perguntas de Entrevista
      </h2>

      {/* Nível da Vaga */}
      <div className="card">
        <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4" />
          Nível da Vaga
        </p>
        <span
          className={`inline-block px-4 py-2 rounded-lg font-bold capitalize border ${
            nivelStyle[perguntas.nivel_da_vaga]
          }`}
        >
          {perguntas.nivel_da_vaga}
        </span>
      </div>

      {/* Assuntos Mais Cobrados */}
      {perguntas.assuntos_mais_cobrados.length > 0 && (
        <div className="card">
          <h3 className="flex items-center gap-2 font-bold text-blue-400 mb-4">
            <Zap className="w-5 h-5" />
            Assuntos Mais Cobrados
          </h3>
          <div className="flex flex-wrap gap-2">
            {perguntas.assuntos_mais_cobrados.map((assunto, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/50"
              >
                {assunto}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Perguntas Técnicas */}
      {perguntas.perguntas_tecnicas.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-bold text-cyan-400">
            <BookOpen className="w-5 h-5" />
            Perguntas Técnicas ({perguntas.perguntas_tecnicas.length})
          </h3>
          {perguntas.perguntas_tecnicas.map((pergunta, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="font-semibold text-white">
                  {index + 1}. {pergunta.pergunta}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    dificuldadeStyle[pergunta.nivel]
                  }`}
                >
                  {pergunta.nivel}
                </span>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  Relação: {pergunta.relacao_com_curriculo}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Perguntas Comportamentais */}
      {perguntas.perguntas_comportamentais.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-bold text-purple-400">
            <Users className="w-5 h-5" />
            Perguntas Comportamentais ({perguntas.perguntas_comportamentais.length})
          </h3>
          {perguntas.perguntas_comportamentais.map((pergunta, index) => (
            <div key={index} className="card">
              <p className="text-white">
                {index + 1}. {pergunta}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Perguntas Situacionais */}
      {perguntas.perguntas_situacionais.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-bold text-amber-400">
            <Lightbulb className="w-5 h-5" />
            Perguntas Situacionais ({perguntas.perguntas_situacionais.length})
          </h3>
          {perguntas.perguntas_situacionais.map((pergunta, index) => (
            <div key={index} className="card">
              <p className="text-white">
                {index + 1}. {pergunta}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Dicas de Preparação */}
      {perguntas.dicas_de_preparacao.length > 0 && (
        <div className="card border-l-4 border-green-500">
          <h3 className="flex items-center gap-2 font-bold text-green-400 mb-4">
            <Lightbulb className="w-5 h-5" />
            Dicas de Preparação
          </h3>
          <ul className="space-y-2">
            {perguntas.dicas_de_preparacao.map((dica, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-400 font-bold">✓</span>
                <span className="text-gray-200">{dica}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
