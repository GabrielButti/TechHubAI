import { FileText, CheckCircle, HelpCircle, Briefcase } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Currículo', icon: FileText },
  { number: 2, label: 'Vaga', icon: Briefcase },
  { number: 3, label: 'Avaliação', icon: CheckCircle },
  { number: 4, label: 'Entrevista', icon: HelpCircle },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-12">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 scale-110 shadow-lg shadow-cyan-500/50'
                    : isCompleted
                    ? 'bg-green-500/20 text-green-400 border-2 border-green-500'
                    : 'bg-white/10 text-gray-400 border-2 border-white/20'
                }`}
              >
                {isCompleted ? (
                  <Icon className="w-6 h-6" />
                ) : (
                  <span>{step.number}</span>
                )}
              </button>
              <label className="text-xs font-medium mt-2 text-center max-w-[60px]">
                {step.label}
              </label>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-green-500 to-green-400'
                    : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
