import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { LLM, LLMOption, HistoryItem, AppSettings } from './types';
import { LLM_OPTIONS, PROMPT_TEMPLATES } from './constants';
import { optimizePrompt } from './services/geminiService';
import { useSettings } from './useSettings';
import SettingsModal from './SettingsModal';

// --- Custom Hooks ---
const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};


// --- SVG Icons ---
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-slate-500'}`}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clipRule="evenodd" />
    </svg>
);
const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 11.375c.621 0 1.125-.504 1.125-1.125v-9.25a1.125 1.125 0 00-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v9.25c0 .621.504 1.125 1.125 1.125h9.75z" /></svg>);
const ReuseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183z" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.644.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.127.332-.183.582-.495.644-.87l.213-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);


// --- Main App Component ---
const App: React.FC = () => {
    // State
    const [originalPrompt, setOriginalPrompt] = useState<string>('');
    const [targetLlm, setTargetLlm] = useState<LLM>(LLM.GEMINI);
    const [variables, setVariables] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('promptHistory', []);
    const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const progressIntervalRef = useRef<number | null>(null);
    const [settings, setSettings] = useSettings();
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    // --- Memos & Derived State ---
    const detectedVariables = useMemo(() => {
        const regex = /\{\{([a-zA-Z0-9_]+)\}\}/g;
        const matches = originalPrompt.match(regex) || [];
        return [...new Set(matches.map(v => v.replace(/[{}]/g, '')))];
    }, [originalPrompt]);

    const filteredHistory = useMemo(() => {
        const items = activeTab === 'favorites' ? history.filter(item => item.isFavorite) : history;
        if (!searchTerm) return items;
        return items.filter(item =>
            item.originalPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.optimizedPrompt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [activeTab, history, searchTerm]);

    // --- Effects ---
    useEffect(() => {
        const newVariables: Record<string, string> = {};
        detectedVariables.forEach(v => {
            newVariables[v] = variables[v] || '';
        });
        setVariables(newVariables);
    }, [detectedVariables]);

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            progressIntervalRef.current = window.setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
                        return 95;
                    }
                    return prev + 5;
                });
            }, 500);
        } else {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            setProgress(100);
            setTimeout(() => setProgress(0), 500); // Reset after completion animation
        }
        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [isLoading]);

    // --- Handlers ---
    const handleOptimize = useCallback(async () => {
        let finalPrompt = originalPrompt;
        for (const key in variables) {
            finalPrompt = finalPrompt.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), variables[key]);
        }

        if (!finalPrompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const newOptimizedPrompt = await optimizePrompt(finalPrompt, targetLlm, settings);
            
            // Update the main text area with the optimized prompt
            setOriginalPrompt(newOptimizedPrompt);
            // Clear variables as they have been applied
            setVariables({});

            // Add to history
            const newItem: HistoryItem = { id: Date.now(), originalPrompt: finalPrompt, optimizedPrompt: newOptimizedPrompt, targetLlm, isFavorite: false };
            setHistory(prev => [newItem, ...prev.slice(0, 99)]);

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [originalPrompt, targetLlm, variables, setHistory, settings]);

    const handleTemplateSelect = (prompt: string) => {
        setOriginalPrompt(prompt);
    };
    
    const handleReuseHistory = (item: HistoryItem) => {
        setOriginalPrompt(item.optimizedPrompt);
        setTargetLlm(item.targetLlm);
        setVariables({});
    };

    const toggleFavorite = (id: number) => {
        setHistory(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
    };

    const handleCopy = (text: string, showFeedback: boolean = false) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        if(showFeedback) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setIsSettingsModalOpen(false)}
                settings={settings}
                setSettings={setSettings}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-screen-2xl mx-auto">
                {/* --- Main Content --- */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <header className="text-center">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
                            LLM Prompt Optimizer
                        </h1>
                        <p className="text-slate-400">Craft and optimize prompts with AI-driven analysis.</p>
                    </header>

                    {/* Templates */}
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h3 className="text-lg font-semibold mb-3 text-slate-300">Start with a Template</h3>
                        <div className="flex flex-wrap gap-2">
                            {PROMPT_TEMPLATES.map((template) => (
                                <button key={template.name} onClick={() => handleTemplateSelect(template.prompt)}
                                    className="bg-slate-700 text-slate-300 px-3 py-1.5 text-sm rounded-md hover:bg-blue-600 hover:text-white transition-all">
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Input Section */}
                    <div>
                        <textarea placeholder="Enter your prompt here, or select a template to get started..." value={originalPrompt} onChange={e => setOriginalPrompt(e.target.value)}
                            className="w-full h-60 p-4 bg-slate-950/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" />
                    </div>

                    {/* Variables */}
                    {detectedVariables.length > 0 && (
                        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-semibold mb-3 text-slate-300">Prompt Variables</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {detectedVariables.map(v => (
                                    <input key={v} type="text" placeholder={`Value for {{${v}}}`} value={variables[v] || ''} onChange={e => setVariables(prev => ({ ...prev, [v]: e.target.value }))}
                                        className="bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none" />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Controls */}
                     <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                            <button
                                onClick={() => setIsSettingsModalOpen(true)}
                                className="p-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                                aria-label="Open Settings"
                            >
                                <SettingsIcon />
                            </button>
                            <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-start">
                               {LLM_OPTIONS.map(opt => (
                                    <button key={opt.id} onClick={() => setTargetLlm(opt.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-semibold border ${targetLlm === opt.id ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}`}>
                                        {opt.logo} {opt.name}
                                    </button>
                               ))}
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <button onClick={() => handleCopy(originalPrompt, true)} disabled={!originalPrompt || isLoading}
                                    className="w-auto bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isCopied ? <CheckIcon/> : <CopyIcon />}
                                </button>
                                <button onClick={handleOptimize} disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:from-blue-500 hover:to-teal-400 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2">
                                   {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Optimizing...
                                        </>
                                    ) : 'Optimize'}
                                </button>
                            </div>
                        </div>
                        {isLoading && (
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
                            </div>
                        )}
                    </div>

                    {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}

                </div>

                {/* --- History Sidebar --- */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col max-h-[90vh]">
                    <div className="flex border-b border-slate-700 mb-4">
                        <button onClick={() => setActiveTab('history')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'history' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>History</button>
                        <button onClick={() => setActiveTab('favorites')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'favorites' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400'}`}>Favorites</button>
                    </div>
                    <input type="text" placeholder="Search history..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 mb-4 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"/>
                    
                    <div className="overflow-y-auto space-y-3 flex-1">
                        {filteredHistory.length > 0 ? filteredHistory.map(item => (
                            <div key={item.id} className="bg-slate-900/70 p-3 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                                <p className="text-sm text-slate-300 truncate mb-2" title={item.originalPrompt}>{item.originalPrompt}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">{LLM_OPTIONS.find(o => o.id === item.targetLlm)?.name || 'Unknown'}</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => toggleFavorite(item.id)} className="hover:scale-110 transition-transform"><StarIcon filled={item.isFavorite} /></button>
                                        <button onClick={() => handleCopy(item.optimizedPrompt)} className="text-slate-500 hover:text-blue-400 transition-colors"><CopyIcon /></button>
                                        <button onClick={() => handleReuseHistory(item)} className="text-slate-500 hover:text-blue-400 transition-colors"><ReuseIcon /></button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-slate-500 text-sm py-8">
                                No items found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
