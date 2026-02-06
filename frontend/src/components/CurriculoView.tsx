import { Curriculo } from '../types';
import { User, Briefcase, BookOpen, Code } from 'lucide-react';

interface CurriculoViewProps {
  curriculo: Curriculo;
}

export const CurriculoView: React.FC<CurriculoViewProps> = ({ curriculo }) => {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="card border-l-4 border-cyan-500">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{curriculo.nome}</h1>
            <p className="text-xl text-cyan-400 font-semibold">
              {curriculo.titulo_profissional}
            </p>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed">
          {curriculo.resumo_profissional}
        </p>
      </div>

      {/* Habilidades Técnicas */}
      {curriculo.habilidades_tecnicas.length > 0 && (
        <div className="card">
          <h2 className="flex items-center gap-2 font-bold text-lg text-blue-400 mb-4">
            <Code className="w-5 h-5" />
            Habilidades Técnicas
          </h2>
          <div className="flex flex-wrap gap-2">
            {curriculo.habilidades_tecnicas.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg font-medium border border-blue-500/50 hover:bg-blue-500/30 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experiências */}
      {curriculo.experiencias.length > 0 && (
        <div className="card">
          <h2 className="flex items-center gap-2 font-bold text-lg text-purple-400 mb-4">
            <Briefcase className="w-5 h-5" />
            Experiências Profissionais
          </h2>
          <div className="space-y-4">
            {curriculo.experiencias.map((exp, index) => (
              <div key={index} className="pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                <h3 className="font-bold text-white text-lg">{exp.cargo}</h3>
                <p className="text-purple-400 font-semibold mb-1">{exp.empresa}</p>
                <p className="text-gray-300 text-sm">{exp.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formação */}
      {curriculo.formacao.length > 0 && (
        <div className="card">
          <h2 className="flex items-center gap-2 font-bold text-lg text-green-400 mb-4">
            <BookOpen className="w-5 h-5" />
            Formação Acadêmica
          </h2>
          <div className="space-y-4">
            {curriculo.formacao.map((form, index) => (
              <div key={index} className="pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                <h3 className="font-bold text-white text-lg">{form.curso}</h3>
                <p className="text-green-400 font-semibold mb-1">{form.instituicao}</p>
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm font-medium">
                  {form.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
