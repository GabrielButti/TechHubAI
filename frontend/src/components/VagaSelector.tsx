import { Vaga } from '../types';
import { Briefcase, CheckCircle } from 'lucide-react';

interface VagaSelectorProps {
  vagas: Vaga[];
  selected: Vaga | null;
  onSelect: (vaga: Vaga) => void;
}

export const VagaSelector: React.FC<VagaSelectorProps> = ({
  vagas,
  selected,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-purple-400" />
        Selecione uma Vaga
      </h2>

      <div className="space-y-3">
        {vagas.map((vaga) => (
          <button
            key={vaga.id}
            onClick={() => onSelect(vaga)}
            className={`card text-left transition-all duration-300 ${
              selected?.id === vaga.id
                ? 'ring-2 ring-purple-500 bg-purple-500/10'
                : 'hover:bg-white/20 hover:ring-1 hover:ring-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  {vaga.titulo}
                  {selected?.id === vaga.id && (
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  )}
                </h3>
                <p className="text-gray-300 text-sm mt-2 line-clamp-3">
                  {vaga.descricao}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
