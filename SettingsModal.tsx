import React from 'react';
import { AppSettings, GeminiSettings } from './types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, setSettings }) => {
  if (!isOpen) return null;

  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProvider = e.target.value;
    if (newProvider === 'gemini') {
      // When switching to Gemini, reset to a clean GeminiSettings object
      setSettings({
        provider: 'gemini',
        temperature: settings.temperature,
      });
    } else if (newProvider === 'openai') {
      // When switching to OpenAI, add default empty fields if they don't exist
      setSettings({
        provider: 'openai',
        temperature: settings.temperature,
        apiKey: '',
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-4o',
      });
    }
  };

  const handleOpenAIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings.provider === 'openai') {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  const handleGeminiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings.provider === 'gemini') {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    }
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-2xl text-slate-200" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">LLM Settings</h2>
        
        {/* Provider Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-2">LLM Provider</label>
          <div className="flex gap-4">
            <label className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${settings.provider === 'gemini' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-900/50 border-slate-600 hover:border-slate-500'}`}>
              <input type="radio" name="provider" value="gemini" checked={settings.provider === 'gemini'} onChange={handleProviderChange} className="sr-only" />
              <div className="flex flex-col">
                <span className="font-semibold">Gemini</span>
                <span className="text-xs text-slate-400">Use the built-in Google Gemini model.</span>
              </div>
            </label>
            <label className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${settings.provider === 'openai' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-900/50 border-slate-600 hover:border-slate-500'}`}>
              <input type="radio" name="provider" value="openai" checked={settings.provider === 'openai'} onChange={handleProviderChange} className="sr-only" />
               <div className="flex flex-col">
                <span className="font-semibold">OpenAI-Compatible</span>
                <span className="text-xs text-slate-400">Use custom or local LLMs via an OpenAI-compatible API.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Gemini Specific Settings */}
        {settings.provider === 'gemini' && (
          <div className="space-y-4 mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-300">Gemini Configuration</h3>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-400 mb-1">Your API Key</label>
              <input 
                type="password" 
                id="apiKey" 
                name="apiKey" 
                value={(settings as GeminiSettings).apiKey || ''}
                onChange={handleGeminiChange} 
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your Gemini API key"
              />
              <p className="text-xs text-slate-500 mt-2">
                Don't have a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Create one now in Google AI Studio.</a>
              </p>
            </div>
          </div>
        )}

        {/* OpenAI Specific Settings */}
        {settings.provider === 'openai' && (
          <div className="space-y-4 mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-300">OpenAI Configuration</h3>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-400 mb-1">API Key</label>
              <input type="password" id="apiKey" name="apiKey" value={settings.apiKey} onChange={handleOpenAIChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label htmlFor="baseUrl" className="block text-sm font-medium text-slate-400 mb-1">Base URL</label>
              <input type="text" id="baseUrl" name="baseUrl" value={settings.baseUrl} onChange={handleOpenAIChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-slate-400 mb-1">Model Name</label>
              <input type="text" id="model" name="model" value={settings.model} onChange={handleOpenAIChange} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        )}

        {/* Temperature Setting */}
        <div className="mb-6">
          <label htmlFor="temperature" className="block text-sm font-medium text-slate-400 mb-2">Temperature</label>
          <div className="flex items-center gap-4">
            <input type="range" id="temperature" min="0" max="1" step="0.1" value={settings.temperature} onChange={handleTemperatureChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
            <span className="font-mono text-lg">{settings.temperature.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;