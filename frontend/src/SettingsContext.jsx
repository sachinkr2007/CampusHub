import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const translations = {
  English: {
    // Nav / Layout
    portal: "Student Portal",
    teacherPortal: "Teacher Portal",
    dashboard: "Dashboard",
    attendance: "Attendance",
    timetable: "Timetable",
    assignments: "Assignments",
    placements: "Placements",
    events: "Events",
    results: "Results",
    settings: "Settings",
    logout: "Logout",
    notifications: "Notifications",

    // Settings page
    manage: "Manage your CampusHub experience",
    reset: "Reset Settings",
    resetSuccess: "Settings reset to defaults successfully!",
    settingsSaved: "Setting updated successfully!",

    // Profile
    profile: "Profile",
    studentProfileDesc: "Your personal student information",
    teacherProfileDesc: "Your personal teacher information",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    fullName: "Full Name",
    emailAddress: "Email Address",
    courseBranch: "Course / Branch",
    yearOfStudy: "Year of Study",
    skills: "Skills (comma separated)",
    profileUpdated: "Profile updated successfully!",

    // General
    general: "General",
    generalDesc: "Customize your basic preferences",
    language: "Language",
    languageDesc: "Choose your preferred language",
    theme: "Theme",
    themeDesc: "Choose how CampusHub looks",
    fontSize: "Font Size",
    fontDesc: "Adjust text size across the portal",

    // Notifications
    notificationDesc: "Control what CampusHub can notify you about",
    assignmentReminders: "Assignment Reminders",
    assignmentDesc: "Get reminders before assignments are due",
    eventReminders: "Event Reminders",
    eventDesc: "Receive reminders for upcoming campus events",
    attendanceAlerts: "Attendance Alerts",
    attendanceDesc: "Get notified when attendance needs attention",
    placementAlerts: "Placement Alerts",
    placementDesc: "Receive new internship and placement updates",
    announcements: "Important Announcements",
    announcementsDesc: "Stay updated with important college notices",

    // Privacy
    privacy: "Privacy & Security",
    privacyDesc: "Keep your account secure",
    profileVisibility: "Profile Visibility",
    profileVisibilityDesc: "Allow other students to see your basic profile",
    rememberDevice: "Remember This Device",
    rememberDesc: "Stay signed in on this device",
    changePassword: "Change Password",
    changePasswordDesc: "Update your account password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    passwordChanged: "Password changed successfully!",
    passwordsMismatch: "New passwords do not match!",
    fillAllFields: "Please fill in all fields.",

    // Intelligence
    intelligence: "CampusHub Intelligence",
    intelligenceDesc: "Smart features designed for students",
    focusShield: "Focus Shield",
    focusDesc: "Temporarily pause non-essential notifications when you are studying.",
    smartSuggestions: "Smart Campus Suggestions",
    smartDesc: "Get useful suggestions based on your campus activities.",
    studyTime: "Preferred Study Time",
    studyTimeDesc: "Help CampusHub personalize your experience.",

    // Accessibility
    accessibility: "Accessibility",
    accessibilityDesc: "Make CampusHub easier and more comfortable to use",
    reduceAnimations: "Reduce Animations",
    reduceDesc: "Reduce interface animations and transitions",
    highContrast: "High Contrast",
    contrastDesc: "Increase contrast for better readability",

    // Quick Actions
    quickActions: "Quick Actions",
    quickDesc: "Quickly access important features",
    savedNotice: "CampusHub Settings • Your preferences are saved automatically.",

    // Focus Alert Banner
    focusActive: "🎯 Focus Shield is Active — Non-essential notifications are paused.",
  },

  Hindi: {
    // Nav / Layout
    portal: "स्टूडेंट पोर्टल",
    teacherPortal: "टीचर पोर्टल",
    dashboard: "डैशबोर्ड",
    attendance: "अटेंडेंस",
    timetable: "टाइमटेबल",
    assignments: "असाइनमेंट्स",
    placements: "प्लेसमेंट्स",
    events: "इवेंट्स",
    results: "रिजल्ट्स",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    notifications: "नोटिफिकेशन",

    // Settings page
    manage: "अपने CampusHub अनुभव को मैनेज करें",
    reset: "सेटिंग्स रीसेट करें",
    resetSuccess: "सेटिंग्स सफलतापूर्वक रीसेट हो गईं!",
    settingsSaved: "सेटिंग सफलतापूर्वक अपडेट हो गई!",

    // Profile
    profile: "प्रोफाइल",
    studentProfileDesc: "आपकी व्यक्तिगत छात्र जानकारी",
    teacherProfileDesc: "आपकी व्यक्तिगत शिक्षक जानकारी",
    editProfile: "प्रोफाइल एडिट करें",
    saveChanges: "बदलाव सेव करें",
    cancel: "रद्द करें",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    courseBranch: "कोर्स / ब्रांच",
    yearOfStudy: "अध्ययन वर्ष",
    skills: "स्किल्स (कॉमा से अलग करें)",
    profileUpdated: "प्रोफाइल सफलतापूर्वक अपडेट हो गई!",

    // General
    general: "सामान्य",
    generalDesc: "अपनी बेसिक प्राथमिकताएँ बदलें",
    language: "भाषा",
    languageDesc: "अपनी पसंदीदा भाषा चुनें",
    theme: "थीम",
    themeDesc: "CampusHub का लुक चुनें",
    fontSize: "फॉन्ट साइज",
    fontDesc: "पूरे पोर्टल में टेक्स्ट का आकार बदलें",

    // Notifications
    notificationDesc: "CampusHub आपको किन चीजों के बारे में बताएगा",
    assignmentReminders: "असाइनमेंट रिमाइंडर",
    assignmentDesc: "असाइनमेंट की अंतिम तारीख से पहले रिमाइंडर पाएँ",
    eventReminders: "इवेंट रिमाइंडर",
    eventDesc: "आने वाले कैंपस इवेंट्स के रिमाइंडर पाएँ",
    attendanceAlerts: "अटेंडेंस अलर्ट",
    attendanceDesc: "अटेंडेंस पर ध्यान देने की जरूरत होने पर नोटिफिकेशन पाएँ",
    placementAlerts: "प्लेसमेंट अलर्ट",
    placementDesc: "नई इंटर्नशिप और प्लेसमेंट अपडेट पाएँ",
    announcements: "महत्वपूर्ण घोषणाएँ",
    announcementsDesc: "कॉलेज की महत्वपूर्ण सूचनाओं से अपडेट रहें",

    // Privacy
    privacy: "प्राइवेसी और सिक्योरिटी",
    privacyDesc: "अपने अकाउंट को सुरक्षित रखें",
    profileVisibility: "प्रोफाइल विजिबिलिटी",
    profileVisibilityDesc: "दूसरे छात्रों को आपकी बेसिक प्रोफाइल देखने दें",
    rememberDevice: "इस डिवाइस को याद रखें",
    rememberDesc: "इस डिवाइस पर साइन इन रखें",
    changePassword: "पासवर्ड बदलें",
    changePasswordDesc: "अपने अकाउंट का पासवर्ड अपडेट करें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "नए पासवर्ड की पुष्टि करें",
    passwordChanged: "पासवर्ड सफलतापूर्वक बदल गया!",
    passwordsMismatch: "नए पासवर्ड मेल नहीं खाते!",
    fillAllFields: "कृपया सभी फ़ील्ड भरें।",

    // Intelligence
    intelligence: "CampusHub Intelligence",
    intelligenceDesc: "छात्रों के लिए बनाए गए स्मार्ट फीचर्स",
    focusShield: "फोकस शील्ड",
    focusDesc: "पढ़ाई के दौरान जरूरी न होने वाले नोटिफिकेशन को रोकें।",
    smartSuggestions: "स्मार्ट कैंपस सुझाव",
    smartDesc: "आपकी गतिविधियों के आधार पर उपयोगी सुझाव पाएँ।",
    studyTime: "पसंदीदा पढ़ाई का समय",
    studyTimeDesc: "CampusHub को अपना अनुभव पर्सनलाइज करने में मदद करें।",

    // Accessibility
    accessibility: "एक्सेसिबिलिटी",
    accessibilityDesc: "CampusHub को ज्यादा आसान और आरामदायक बनाएँ",
    reduceAnimations: "एनिमेशन कम करें",
    reduceDesc: "इंटरफेस के एनिमेशन और ट्रांजिशन कम करें",
    highContrast: "हाई कॉन्ट्रास्ट",
    contrastDesc: "बेहतर रीडेबिलिटी के लिए कॉन्ट्रास्ट बढ़ाएँ",

    // Quick Actions
    quickActions: "क्विक एक्शन्स",
    quickDesc: "जरूरी फीचर्स को जल्दी एक्सेस करें",
    savedNotice: "CampusHub Settings • आपकी प्राथमिकताएँ अपने आप सेव होती हैं।",

    // Focus Alert Banner
    focusActive: "🎯 फोकस शील्ड सक्रिय है — गैर-ज़रूरी नोटिफिकेशन रोक दिए गए हैं।",
  }
};

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

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  }, []);

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
    root.classList.toggle("dark-mode", Boolean(settings.darkMode));
    body.classList.toggle("dark-mode", Boolean(settings.darkMode));
    root.setAttribute("data-theme", settings.darkMode ? "dark" : "light");

    /* HIGH CONTRAST */
    root.classList.toggle("high-contrast", Boolean(settings.highContrast));
    body.classList.toggle("high-contrast", Boolean(settings.highContrast));

    /* REDUCE ANIMATIONS */
    root.classList.toggle("reduce-animations", Boolean(settings.reduceAnimations));
    body.classList.toggle("reduce-animations", Boolean(settings.reduceAnimations));

    /* FONT SIZE */
    const fontSizes = {
      Small: "14px",
      Medium: "16px",
      Large: "18.5px"
    };

    const fontScale = {
      Small: "0.88",
      Medium: "1.0",
      Large: "1.15"
    };

    root.setAttribute(
      "data-font-size",
      (settings.fontSize || "Medium").toLowerCase()
    );

    root.style.setProperty(
      "--campus-font-size",
      fontSizes[settings.fontSize] || "16px"
    );

    root.style.setProperty(
      "--campus-font-scale",
      fontScale[settings.fontSize] || "1.0"
    );

    /* LANGUAGE */
    const lang = settings.language === "Hindi" ? "hi" : "en";
    root.setAttribute("data-language", lang);
    root.lang = lang;
  }, [settings]);

  /* UPDATE ONE SETTING */
  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };
      return updated;
    });

    const t = translations[settings.language] || translations.English;
    showToast(t.settingsSaved || "Setting updated successfully!");
  };

  /* RESET */
  const resetSettings = () => {
    setSettings({ ...defaultSettings });
    const t = translations[defaultSettings.language] || translations.English;
    showToast(t.resetSuccess || "Settings reset to defaults successfully!");
  };

  const t = translations[settings.language] || translations.English;

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        t,
        showToast,
      }}
    >
      {children}
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className={`settings-toast ${toast.type}`}>
          <span>{toast.type === "error" ? "⚠️" : "✓"}</span>
          <p>{toast.message}</p>
        </div>
      )}
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

export default SettingsContext;