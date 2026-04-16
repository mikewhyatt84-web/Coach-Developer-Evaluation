import React from 'react';
import { EvaluationForm } from './components/EvaluationForm';
import { EvaluationResultView } from './components/EvaluationResult';
import { EvaluationResult } from './types';
import { evaluateObservations } from './services/evaluationService';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [evaluation, setEvaluation] = React.useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (notes: { [key: string]: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await evaluateObservations(notes);
      setEvaluation(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err?.message || 'Failed to analyze observations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEvaluation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="pt-20 pb-16 px-6 bg-swiss-red border-b-[3px] border-swiss-ink mb-16 shadow-[0px_10px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-black tracking-[0.2em] uppercase"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            Canada Soccer
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter font-display uppercase">
              Coach <span className="underline decoration-white underline-offset-8">Developer</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-bold uppercase italic tracking-wider">
              High-Precision Field Evaluation Analysis
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!evaluation ? (
            <div key="form">
              <EvaluationForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
              />
            </div>
          ) : (
            <div key="result">
              <EvaluationResultView 
                result={evaluation} 
                onReset={handleReset} 
              />
            </div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-8 bg-swiss-red text-white border-[3px] border-swiss-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center font-black uppercase tracking-tight"
          >
            ERROR: {error}
          </motion.div>
        )}
      </main>

      <footer className="mt-24 border-t-[3px] border-swiss-ink pt-12 text-center text-swiss-ink/40 font-black text-xs tracking-[0.3em] uppercase px-6 print:hidden">
        <p>© 2026 Canada Soccer • High-Fidelity Evaluation Engine</p>
      </footer>
    </div>
  );
}
