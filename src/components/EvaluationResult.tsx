import React, { useState } from 'react';
import { EvaluationResult, Rating, EvaluationItem, RUBRIC_SKILLS } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, HelpCircle, XCircle, Printer, Download, MessageSquare, Save, ChevronDown } from 'lucide-react';

interface Props {
  result: EvaluationResult;
  onReset: () => void;
}

const ratingConfig: Record<Rating, { icon: any, color: string, bgColor: string, borderColor: string }> = {
  'Meets the Standard': { icon: CheckCircle2, color: 'text-white', bgColor: 'bg-[#10b981]', borderColor: 'border-swiss-ink' },
  'Approaching': { icon: AlertCircle, color: 'text-swiss-ink', bgColor: 'bg-[#f59e0b]', borderColor: 'border-swiss-ink' },
  'Needs Improvement': { icon: XCircle, color: 'text-white', bgColor: 'bg-swiss-red', borderColor: 'border-swiss-ink' },
  'No Evidence Observed': { icon: HelpCircle, color: 'text-swiss-ink/40', bgColor: 'bg-gray-100', borderColor: 'border-swiss-ink/10' },
};

interface AutoHeightTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function AutoHeightTextarea({ value, onChange, placeholder, className }: AutoHeightTextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={1}
      className={`${className} overflow-hidden resize-none`}
    />
  );
}

export function EvaluationResultView({ result, onReset }: Props) {
  const [items, setItems] = useState<EvaluationItem[]>(() => {
    // Initialize with all rubric skills
    return RUBRIC_SKILLS.map(skill => {
      const existing = result.items.find(i => i.skill === skill.skill);
      return existing || {
        skill: skill.skill,
        rating: 'No Evidence Observed' as Rating,
        evidence: ''
      };
    });
  });

  const handleUpdateItem = (index: number, updates: Partial<EvaluationItem>) => {
    setItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const handlePrint = () => window.print();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 print:p-0"
    >
      {/* Summary Header */}
      <div className="swiss-panel p-8 md:p-12 print:shadow-none print:border-none print:bg-white print:text-black">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 print:hidden">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-swiss-ink tracking-tighter uppercase">Evaluation Summary</h2>
            <p className="text-swiss-ink/40 font-bold tracking-widest text-xs uppercase italic">Review and adjust final metrics</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-swiss-ink text-swiss-ink hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
            <button 
              onClick={onReset}
              className="px-6 py-3 bg-swiss-red text-white border-2 border-swiss-ink hover:bg-swiss-red/90 transition-all font-black text-xs uppercase tracking-widest"
            >
              New Observation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-swiss-ink/40">
              <span className="flex items-center gap-2 italic">
                <MessageSquare className="w-3 h-3 text-swiss-red" />
                Professional Summary
              </span>
            </div>
            <p className="text-lg text-charcoal leading-relaxed font-bold bg-swiss-red/5 p-8 border-2 border-swiss-ink italic">
              "{result.coachSummary}"
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-swiss-ink/40">
              <span className="flex items-center gap-2">
                <Download className="w-3 h-3 text-swiss-ink" />
                Feedforward Guidance
              </span>
            </div>
            <div className="text-charcoal leading-relaxed bg-gray-50 p-8 border-2 border-swiss-ink text-sm font-medium">
              {result.feedforwardSummary}
            </div>
          </div>
        </div>

        {/* Evaluation Table */}
        <div className="overflow-x-auto -mx-8 px-8">
          <table className="w-full text-left border-collapse bg-white border-[3px] border-swiss-ink">
            <thead>
              <tr className="border-b-[3px] border-swiss-ink bg-gray-50">
                <th className="py-6 px-6 font-black text-swiss-ink text-[10px] uppercase tracking-[0.2em] w-[15%]">Skill Component</th>
                <th className="py-6 px-6 font-black text-swiss-ink text-[10px] uppercase tracking-[0.2em] w-[20%]">Suggested Rating</th>
                <th className="py-6 px-6 font-black text-swiss-ink text-[10px] uppercase tracking-[0.2em] w-[65%]">Evidence from Notes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const config = ratingConfig[item.rating];
                const Icon = config.icon;
                
                return (
                  <tr key={idx} className="border-b-2 border-swiss-ink hover:bg-swiss-red/5 transition-colors group">
                    <td className="py-7 px-6 align-top">
                      <span className="font-black text-swiss-ink text-base tracking-tight group-hover:text-swiss-red transition-colors uppercase block">{item.skill}</span>
                    </td>
                    <td className="py-7 px-6 align-top">
                      <div className="relative group/select">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest ${config.bgColor} ${config.color} border-2 ${config.borderColor} w-full justify-between cursor-pointer print:border-none`}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-3 h-3" />
                            {item.rating}
                          </div>
                          <ChevronDown className="w-3 h-3 opacity-30 print:hidden" />
                        </div>
                        <select 
                          value={item.rating}
                          onChange={(e) => handleUpdateItem(idx, { rating: e.target.value as Rating })}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer print:hidden"
                        >
                          <option value="Meets the Standard">Meets the Standard</option>
                          <option value="Approaching">Approaching</option>
                          <option value="Needs Improvement">Needs Improvement</option>
                          <option value="No Evidence Observed">No Evidence Observed</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-7 px-6">
                      <AutoHeightTextarea
                        value={item.evidence}
                        onChange={(value) => handleUpdateItem(idx, { evidence: value })}
                        placeholder="Click to add evidence..."
                        className="w-full bg-transparent border-none focus:ring-0 rounded-lg p-2 text-charcoal text-sm font-medium leading-relaxed min-h-[40px] hover:bg-black/[0.03] transition-colors placeholder:italic placeholder:text-swiss-ink/10 print:bg-transparent print:p-0 print:text-black"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
