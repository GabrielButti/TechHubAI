import { AvaliacaoCandidatura } from '../types';
import {
  TrendingUp,
  AlertTriangle,
  Target,
  BookOpen,
  Lightbulb,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface ResultadosAvaliacaoProps {
  avaliacao: AvaliacaoCandidatura;
}

export const ResultadosAvaliacao: React.FC<ResultadosAvaliacaoProps> = ({
  avaliacao,
}) => {
  const aderenciaColor = {
    alta: 'text-green-400 bg-green-500/10',
    media: 'text-yellow-400 bg-yellow-500/10',
    baixa: 'text-red-400 bg-red-500/10',
  };

  const veredictoIcon = {
    recomendada: { icon: CheckCircle, color: 'text-green-400' },
    possivel: { icon: AlertCircle, color: 'text-yellow-400' },
    nao_recomendada: { icon: AlertTriangle, color: 'text-red-400' },
  };

  const VeredictIcon =
    veredictoIcon[avaliacao.veredito as keyof typeof veredictoIcon].icon;
  const veredictColor =
    veredictoIcon[avaliacao.veredito as keyof typeof veredictoIcon].color;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Target className="w-7 h-7 text-cyan-400" />
        Resultado da Avaliação
      </h2>

      {/* Score e Veredito */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Aderência Geral */}
        <div className="card">
          <p className="text-sm text-gray-400 mb-2">Aderência Geral</p>
          <p
            className={`text-3xl font-bold capitalize ${
              aderenciaColor[
                avaliacao.aderencia_geral as keyof typeof aderenciaColor
              ]
            }`}
          >
            {avaliacao.aderencia_geral}
          </p>
        </div>

        {/* Score */}
        <div className="card">
          <p className="text-sm text-gray-400 mb-2">Score de Aderência</p>
          <p className="text-3xl font-bold text-cyan-400">
            {avaliacao.score_aderencia}
          </p>
        </div>

        {/* Veredito */}
        <div className="card flex flex-col items-center justify-center">
          <VeredictIcon className={`w-8 h-8 mb-2 ${veredictColor}`} />
          <p className={`font-bold capitalize text-center ${veredictColor}`}>
            {avaliacao.veredito.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Pontos Fortes */}
      {avaliacao.pontos_fortes.length > 0 && (
        <div className="card">
          <h3 className="flex items-center gap-2 font-bold text-green-400 mb-4">
            <CheckCircle className="w-5 h-5" />
            Pontos Fortes
          </h3>
          <ul className="space-y-2">
            {avaliacao.pontos_fortes.map((ponto, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-gray-200">{ponto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pontos de Atenção */}
      {avaliacao.pontos_de_atencao.length > 0 && (
        <div className="card">
          <h3 className="flex items-center gap-2 font-bold text-yellow-400 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Pontos de Atenção
          </h3>
          <ul className="space-y-2">
            {avaliacao.pontos_de_atencao.map((ponto, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-yellow-400 font-bold">⚠</span>
                <span className="text-gray-200">{ponto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lacunas Técnicas */}
      {avaliacao.lacunas_tecnicas.length > 0 && (
        <div className="card">
          <h3 className="flex items-center gap-2 font-bold text-red-400 mb-4">
            <TrendingUp className="w-5 h-5" transform="rotate(180)" />
            Lacunas Técnicas
          </h3>
          <ul className="space-y-2">
            {avaliacao.lacunas_tecnicas.map((lacuna, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span className="text-gray-200">{lacuna}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recomendações de Estudo */}
      {avaliacao.recomendacoes_de_estudo.length > 0 && (
        <div className="card">
          <h3 className="flex items-center gap-2 font-bold text-blue-400 mb-4">
            <Lightbulb className="w-5 h-5" />
            Recomendações de Estudo
          </h3>
          <ul className="space-y-2">
            {avaliacao.recomendacoes_de_estudo.map((rec, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span className="text-gray-200">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Observações Finais */}
      {avaliacao.observacoes_finais && (
        <div className="card border-l-4 border-cyan-500">
          <h3 className="flex items-center gap-2 font-bold text-cyan-400 mb-3">
            <BookOpen className="w-5 h-5" />
            Observações Finais
          </h3>
          <p className="text-gray-200 leading-relaxed">
            {avaliacao.observacoes_finais}
          </p>
        </div>
      )}
    </div>
  );
};
