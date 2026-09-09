import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

const defaultSettings = {
  darkMode: false,

  assignmentNotifications: true,
  eventNotifications: true,
  attendanceAlerts: true,
  placementAlerts: true,
  announcements: true,

  profileVisible: true,
  rememberDevice: true,

  focusShield: false,
  smartSuggestions: true,

  reduceAnimations: false,
  highContrast: false,

  fontSize: "Medium",
  language: "English",
  studyTime: "Morning",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("campusHubSettings");

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : { ...defaultSettings };
    } catch {
      return { ...defaultSettings };
    }
  });

  /* SAVE SETTINGS */
  useEffect(() => {
    localStorage.setItem(
      "campusHubSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  /* APPLY SETTINGS GLOBALLY */
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    /* DARK MODE */
    root.classList.toggle(
      "dark-mode",
      settings.darkMode
    );

    body.classList.toggle(
      "dark-mode",
      settings.darkMode
    );

    /* HIGH CONTRAST */
    root.classList.toggle(
      "high-contrast",
      settings.highContrast
    );

    /* REDUCE ANIMATIONS */
    root.classList.toggle(
      "reduce-animations",
      settings.reduceAnimations
    );

    /* FONT SIZE */
    root.setAttribute(
      "data-font-size",
      settings.fontSize.toLowerCase()
    );

    /* LANGUAGE */
    root.setAttribute(
      "data-language",
      settings.language.toLowerCase()
    );

    document.documentElement.lang =
      settings.language === "Hindi" ? "hi" : "en";
  }, [settings]);

  /* UPDATE ONE SETTING */
  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* RESET */
  const resetSettings = () => {
    setSettings({ ...defaultSettings });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}