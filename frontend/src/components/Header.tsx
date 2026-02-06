import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentStep: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-gray-900/80">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">TechHubAI</h1>
            <p className="text-xs text-gray-400">Assistente de Carreira com IA</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-gray-400">Etapa atual:</span>
          <span className="badge">{currentStep}</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};
