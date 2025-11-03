import { useState, useEffect } from 'react';
import { AppSettings, GeminiSettings } from './types';

const SETTINGS_KEY = 'llmAppSettings';

const defaultSettings: GeminiSettings = {
  provider: 'gemini',
  temperature: 0.7,
};

export const useSettings = (): [AppSettings, React.Dispatch<React.SetStateAction<AppSettings>>] => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const item = window.localStorage.getItem(SETTINGS_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        // Basic validation to ensure provider exists
        if (parsed.provider) {
          return parsed;
        }
      }
      return defaultSettings;
    } catch (error) {
      console.error('Error reading settings from localStorage', error);
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage', error);
    }
  }, [settings]);

  return [settings, setSettings];
};
