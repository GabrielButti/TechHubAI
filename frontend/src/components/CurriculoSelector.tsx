import { Curriculo } from '../types';
import { User, Briefcase, BookOpen } from 'lucide-react';

interface CurriculoSelectorProps {
  curriculos: Curriculo[];
  selected: Curriculo | null;
  onSelect: (curriculo: Curriculo) => void;
}

export const CurriculoSelector: React.FC<CurriculoSelectorProps> = ({
  curriculos,
  selected,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <User className="w-6 h-6 text-cyan-400" />
        Selecione o Candidato
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {curriculos.map((curriculo, index) => (
          <button
            key={index}
            onClick={() => onSelect(curriculo)}
            className={`card text-left transition-all duration-300 hover:scale-105 ${
              selected?.nome === curriculo.nome
                ? 'ring-2 ring-cyan-500 bg-cyan-500/10'
                : 'hover:bg-white/20 hover:ring-1 hover:ring-white/20'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-white">{curriculo.nome}</h3>
              {selected?.nome === curriculo.nome && (
                <span className="badge">Selecionado</span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-cyan-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {curriculo.titulo_profissional}
              </p>

              <p className="text-gray-300 line-clamp-2">
                {curriculo.resumo_profissional}
              </p>

              <div className="flex flex-wrap gap-1 pt-2">
                {curriculo.habilidades_tecnicas.slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {curriculo.habilidades_tecnicas.length > 3 && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    +{curriculo.habilidades_tecnicas.length - 3}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 flex items-center gap-2 pt-2">
                <BookOpen className="w-4 h-4" />
                {curriculo.formacao[0]?.curso || 'Sem formação registrada'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
