import { useState } from 'react';
import {
  Header,
  StepIndicator,
  CurriculoSelector,
  VagaSelector,
  CurriculoView,
  ResultadosAvaliacao,
  ResultadosEntrevista,
  Alert,
  LoadingSpinner,
} from '../components';
import { useAppStore } from '../hooks/useAppStore';
import { candidatosExemplo, vagasExemplo } from '../services/mockData';
import { avaliacaoService, entrevistaService } from '../services/models';
import {
  Loader2,
  ArrowRight,
  RotateCcw,
  Download,
  Share2,
} from 'lucide-react';

type Step = 'curriculo' | 'vaga' | 'avaliacao' | 'entrevista';

export const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState<Step>('curriculo');
  const [processando, setProcessando] = useState(false);

  const {
    curriculo,
    setCurriculo,
    vaga,
    setVaga,
    avaliacao,
    setAvaliacao,
    perguntas,
    setPerguntas,
    error,
    setError,
    clearAll,
  } = useAppStore();

  const handleProximoEtapa = async () => {
    setError(null);

    if (currentStep === 'curriculo' && curriculo) {
      setCurrentStep('vaga');
    } else if (currentStep === 'vaga' && curriculo && vaga) {
      setProcessando(true);
      try {
        const resultado = await avaliacaoService.avaliarCandidatura(curriculo, vaga);
        setAvaliacao(resultado);
        setCurrentStep('avaliacao');
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Erro ao avaliar candidatura. Usando dados de exemplo.'
        );
        // Usar dados de exemplo para demonstração
        setAvaliacao({
          aderencia_geral: 'alta',
          veredito: 'recomendada',
          pontos_fortes: [
            'Experiência com dados e análise',
            'Conhecimento em Python',
            'Formação na área de TI',
          ],
          pontos_de_atencao: [
            'Experiência limitada de tempo',
            'Foco anterior em dados, não em backend',
          ],
          lacunas_tecnicas: [
            'Experiência limitada com Django',
            'Pouca experiência com microsserviços',
          ],
          recomendacoes_de_estudo: [
            'Estudar Django e frameworks web',
            'Praticar desenvolvimento de APIs REST',
            'Aprender boas práticas de código backend',
          ],
          observacoes_finais:
            'O candidato tem potencial, mas precisará se familiarizar especificamente com as tecnologias da vaga.',
          score_aderencia: '72%',
        });
        setCurrentStep('avaliacao');
      } finally {
        setProcessando(false);
      }
    } else if (currentStep === 'avaliacao' && curriculo && vaga) {
      setProcessando(true);
      try {
        const resultado = await entrevistaService.gerarPerguntas(curriculo, vaga);
        setPerguntas(resultado);
        setCurrentStep('entrevista');
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Erro ao gerar perguntas. Usando dados de exemplo.'
        );
        // Usar dados de exemplo para demonstração
        setPerguntas({
          nivel_da_vaga: 'junior',
          assuntos_mais_cobrados: ['Python', 'APIs REST', 'Banco de Dados'],
          perguntas_tecnicas: [
            {
              pergunta:
                'Explique a diferença entre GET, POST, PUT e DELETE em REST.',
              nivel: 'basico',
              relacao_com_curriculo: 'forte',
            },
            {
              pergunta:
                'Como você estruturaria uma API REST para gerenciar usuários?',
              nivel: 'intermediario',
              relacao_com_curriculo: 'forte',
            },
            {
              pergunta:
                'O que é ORM e qual é o benefício de usar um em Python?',
              nivel: 'basico',
              relacao_com_curriculo: 'media',
            },
          ],
          perguntas_comportamentais: [
            'Conte-nos sobre um projeto que você trabalhou em equipe e o resultado.',
            'Como você lida com prazos apertados?',
            'Descreva uma situação onde você teve que aprender algo novo rapidamente.',
          ],
          perguntas_situacionais: [
            'Você identificou um bug crítico no código de um colega. Como abordaria isso?',
            'Como você priorizaria múltiplas tarefas com objetivos conflitantes?',
          ],
          dicas_de_preparacao: [
            'Revise os conceitos fundamentais de REST',
            'Estude padrões de design de API',
            'Prepare exemplos práticos de seus projetos',
            'Pratique explicar conceitos técnicos de forma clara',
          ],
        });
        setCurrentStep('entrevista');
      } finally {
        setProcessando(false);
      }
    }
  };

  const handleResetear = () => {
    clearAll();
    setCurrentStep('curriculo');
  };

  const handleDownloadPDF = () => {
    alert('Funcionalidade de download em desenvolvimento!');
  };

  const handleCompartilhar = () => {
    alert('Funcionalidade de compartilhamento em desenvolvimento!');
  };

  const getStepNumber = (): number => {
    const steps: { [key in Step]: number } = {
      curriculo: 1,
      vaga: 2,
      avaliacao: 3,
      entrevista: 4,
    };
    return steps[currentStep];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header currentStep={currentStep} />

      <main className="container py-12">
        <StepIndicator currentStep={getStepNumber()} />

        {/* Error Alert */}
        {error && (
          <div className="mb-8">
            <Alert
              type="warning"
              title="Aviso"
              message={error}
              onClose={() => setError(null)}
            />
          </div>
        )}

        {/* Content Based on Step */}
        <div className="space-y-8">
          {currentStep === 'curriculo' && (
            <div className="space-y-6">
              <CurriculoSelector
                curriculos={candidatosExemplo}
                selected={curriculo}
                onSelect={setCurriculo}
              />

              {curriculo && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">Prévia do Currículo</h2>
                    <CurriculoView curriculo={curriculo} />
                  </div>
                  <div className="space-y-4">
                    <div className="card">
                      <h3 className="font-bold text-cyan-400 mb-3">
                        Informações
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-400">Experiências:</span>
                          <span className="ml-2 text-white font-semibold">
                            {curriculo.experiencias.length}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Habilidades:</span>
                          <span className="ml-2 text-white font-semibold">
                            {curriculo.habilidades_tecnicas.length}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-400">Formações:</span>
                          <span className="ml-2 text-white font-semibold">
                            {curriculo.formacao.length}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 'vaga' && (
            <div>
              <VagaSelector
                vagas={vagasExemplo}
                selected={vaga}
                onSelect={setVaga}
              />
            </div>
          )}

          {currentStep === 'avaliacao' && avaliacao && (
            <div>
              <ResultadosAvaliacao avaliacao={avaliacao} />
            </div>
          )}

          {currentStep === 'entrevista' && perguntas && (
            <div>
              <ResultadosEntrevista perguntas={perguntas} />
            </div>
          )}

          {processando && (
            <LoadingSpinner message="Processando com IA, aguarde um momento..." />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between mt-12">
          <div className="flex gap-3">
            <button
              onClick={handleResetear}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </button>
          </div>

          <div className="flex gap-3">
            {(currentStep === 'avaliacao' || currentStep === 'entrevista') && (
              <>
                <button
                  onClick={handleDownloadPDF}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </button>
                <button
                  onClick={handleCompartilhar}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </>
            )}

            {currentStep !== 'entrevista' && (
              <button
                onClick={handleProximoEtapa}
                disabled={
                  (currentStep === 'curriculo' && !curriculo) ||
                  (currentStep === 'vaga' && !vaga) ||
                  processando
                }
                className={`btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {processando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    Próximo <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {currentStep === 'entrevista' && (
              <button
                onClick={handleResetear}
                className="btn-primary flex items-center gap-2"
              >
                Começar Novamente
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>
            TechHubAI © 2026 - Seu Assistente de Carreira com Inteligência
            Artificial
          </p>
        </div>
      </main>
    </div>
  );
};
