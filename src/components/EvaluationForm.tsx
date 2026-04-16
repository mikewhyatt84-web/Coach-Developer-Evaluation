import React from 'react';
import { PHASES } from '../types';
import { motion } from 'motion/react';
import { ClipboardList, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (notes: { [key: string]: string }) => void;
  isLoading: boolean;
}

export function EvaluationForm({ onSubmit, isLoading }: Props) {
  const [notes, setNotes] = React.useState<{ [key: string]: string }>({
    environment: '',
    engageExplain: '',
    exitEnter: '',
    educateEnsure: '',
  });

  const handleChange = (id: string, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(notes);
  };

  const isFormEmpty = Object.values(notes).every(v => (v as string).trim() === '');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="swiss-panel p-8 md:p-12 overflow-hidden relative"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-swiss-red text-white border-2 border-swiss-ink">
          <ClipboardList className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-swiss-ink tracking-tighter uppercase">Observation Input</h2>
          <p className="text-swiss-ink/40 font-bold italic uppercase text-xs tracking-widest">Capture field data for analysis.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHASES.map((phase) => (
            <div key={phase.id} className="space-y-3">
              <label 
                htmlFor={phase.id}
                className="text-[10px] font-black text-swiss-ink uppercase tracking-[0.2em] flex items-center gap-2 whitespace-pre-line"
              >
                {phase.label}
              </label>
              <textarea
                id={phase.id}
                rows={5}
                value={notes[phase.id as keyof typeof notes]}
                onChange={(e) => handleChange(phase.id, e.target.value)}
                placeholder={phase.placeholder}
                className="w-full bg-swiss-paper border-[3px] border-swiss-ink focus:border-swiss-red focus:ring-0 transition-all p-6 text-charcoal placeholder:text-swiss-ink/10 text-sm font-medium leading-relaxed resize-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
              />
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading || isFormEmpty}
            className="w-full flex items-center justify-center gap-3 bg-swiss-red text-white border-[3px] border-swiss-ink hover:bg-swiss-red/90 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed py-6 px-10 font-black text-2xl transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase tracking-tight active:shadow-none active:translate-x-1 active:translate-y-1 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Analyze Rubric
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
