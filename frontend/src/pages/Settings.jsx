import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSettings } from "../SettingsContext";

const translations = {
  English: {
    portal: "Student Portal",
    teacherPortal: "Teacher Portal",
    settings: "Settings",
    manage: "Manage your CampusHub experience",
    reset: "Reset Settings",

    profile: "Profile",
    studentProfileDesc: "Your personal student information",
    teacherProfileDesc: "Your personal teacher information",
    editProfile: "Edit Profile",

    general: "General",
    generalDesc: "Customize your basic preferences",

    language: "Language",
    languageDesc: "Choose your preferred language",

    theme: "Theme",
    themeDesc: "Choose how CampusHub looks",

    fontSize: "Font Size",
    fontDesc: "Adjust text size across the portal",

    notifications: "Notifications",
    notificationDesc:
      "Control what CampusHub can notify you about",

    assignment: "Assignment Reminders",
    assignmentDesc:
      "Get reminders before assignments are due",

    event: "Event Reminders",
    eventDesc:
      "Receive reminders for upcoming campus events",

    attendance: "Attendance Alerts",
    attendanceDesc:
      "Get notified when attendance needs attention",

    placement: "Placement Alerts",
    placementDesc:
      "Receive new internship and placement updates",

    announcements: "Important Announcements",
    announcementsDesc:
      "Stay updated with important college notices",

    privacy: "Privacy & Security",
    privacyDesc:
      "Keep your account secure",

    profileVisibility: "Profile Visibility",
    profileVisibilityDesc:
      "Allow other students to see your basic profile",

    remember: "Remember This Device",
    rememberDesc:
      "Stay signed in on this device",

    changePassword: "Change Password",
    changePasswordDesc:
      "Update your account password",

    intelligence: "CampusHub Intelligence",
    intelligenceDesc:
      "Smart features designed for students",

    focus: "🎯 Focus Shield",
    focusDesc:
      "Temporarily pause non-essential notifications when you are studying.",

    smart: "🧠 Smart Campus Suggestions",
    smartDesc:
      "Get useful suggestions based on your campus activities.",

    studyTime: "📚 Preferred Study Time",
    studyTimeDesc:
      "Help CampusHub personalize your experience.",

    accessibility: "Accessibility",
    accessibilityDesc:
      "Make CampusHub easier and more comfortable to use",

    reduce: "Reduce Animations",
    reduceDesc:
      "Reduce interface animations and transitions",

    contrast: "High Contrast",
    contrastDesc:
      "Increase contrast for better readability",

    quick: "Quick Actions",
    quickDesc:
      "Quickly access important features",

    saved:
      "CampusHub Settings • Your preferences are saved automatically."
  },

  Hindi: {
    portal: "Student Portal",
    teacherPortal: "Teacher Portal",
    settings: "सेटिंग्स",
    manage: "अपने CampusHub अनुभव को मैनेज करें",
    reset: "सेटिंग्स रीसेट करें",

    profile: "प्रोफाइल",
    studentProfileDesc: "आपकी व्यक्तिगत छात्र जानकारी",
    teacherProfileDesc: "आपकी व्यक्तिगत शिक्षक जानकारी",
    editProfile: "प्रोफाइल एडिट करें",

    general: "सामान्य",
    generalDesc: "अपनी बेसिक प्राथमिकताएँ बदलें",

    language: "भाषा",
    languageDesc: "अपनी पसंदीदा भाषा चुनें",

    theme: "थीम",
    themeDesc: "CampusHub का लुक चुनें",

    fontSize: "फॉन्ट साइज",
    fontDesc: "पूरे पोर्टल में टेक्स्ट का आकार बदलें",

    notifications: "नोटिफिकेशन",
    notificationDesc:
      "CampusHub आपको किन चीजों के बारे में बताएगा",

    assignment: "असाइनमेंट रिमाइंडर",
    assignmentDesc:
      "असाइनमेंट की अंतिम तारीख से पहले रिमाइंडर पाएँ",

    event: "इवेंट रिमाइंडर",
    eventDesc:
      "आने वाले कैंपस इवेंट्स के रिमाइंडर पाएँ",

    attendance: "अटेंडेंस अलर्ट",
    attendanceDesc:
      "अटेंडेंस पर ध्यान देने की जरूरत होने पर नोटिफिकेशन पाएँ",

    placement: "प्लेसमेंट अलर्ट",
    placementDesc:
      "नई इंटर्नशिप और प्लेसमेंट अपडेट पाएँ",

    announcements: "महत्वपूर्ण घोषणाएँ",
    announcementsDesc:
      "कॉलेज की महत्वपूर्ण सूचनाओं से अपडेट रहें",

    privacy: "प्राइवेसी और सिक्योरिटी",
    privacyDesc:
      "अपने अकाउंट को सुरक्षित रखें",

    profileVisibility: "प्रोफाइल विजिबिलिटी",
    profileVisibilityDesc:
      "दूसरे छात्रों को आपकी बेसिक प्रोफाइल देखने दें",

    remember: "इस डिवाइस को याद रखें",
    rememberDesc:
      "इस डिवाइस पर साइन इन रखें",

    changePassword: "पासवर्ड बदलें",
    changePasswordDesc:
      "अपने अकाउंट का पासवर्ड अपडेट करें",

    intelligence: "CampusHub Intelligence",
    intelligenceDesc:
      "छात्रों के लिए बनाए गए स्मार्ट फीचर्स",

    focus: "🎯 फोकस शील्ड",
    focusDesc:
      "पढ़ाई के दौरान जरूरी न होने वाले नोटिफिकेशन को अस्थायी रूप से रोकें।",

    smart: "🧠 स्मार्ट कैंपस सुझाव",
    smartDesc:
      "आपकी कैंपस गतिविधियों के आधार पर उपयोगी सुझाव पाएँ।",

    studyTime: "📚 पसंदीदा पढ़ाई का समय",
    studyTimeDesc:
      "CampusHub को आपका अनुभव बेहतर तरीके से पर्सनलाइज करने में मदद करें।",

    accessibility: "एक्सेसिबिलिटी",
    accessibilityDesc:
      "CampusHub को ज्यादा आसान और आरामदायक बनाएँ",

    reduce: "एनिमेशन कम करें",
    reduceDesc:
      "इंटरफेस के एनिमेशन और ट्रांजिशन कम करें",

    contrast: "हाई कॉन्ट्रास्ट",
    contrastDesc:
      "बेहतर रीडेबिलिटी के लिए कॉन्ट्रास्ट बढ़ाएँ",

    quick: "क्विक एक्शन्स",
    quickDesc:
      "जरूरी फीचर्स को जल्दी एक्सेस करें",

    saved:
      "CampusHub Settings • आपकी प्राथमिकताएँ अपने आप सेव होती हैं।"
  }
};

function Settings() {
  const {
    settings,
    updateSetting,
    resetSettings
  } = useSettings();

  // ===============================
  // GET LOGGED-IN USER
  // ===============================

  const storedUser =
    localStorage.getItem("student");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch {
    user = null;
  }

  const role =
    localStorage.getItem("role") ||
    user?.role ||
    "student";

  const isTeacher = role === "teacher";

  const userName =
    user?.name ||
    (isTeacher ? "Teacher" : "Student");

  const userEmail =
    user?.email || "-";

  const userCourse =
    user?.course || "-";

  const userYear =
    user?.year || null;

  const t =
    translations[settings.language] ||
    translations.English;

  // ===============================
  // FONT SIZE
  // ===============================

  useEffect(() => {
    const root =
      document.documentElement;

    const fontSizes = {
      Small: "14px",
      Medium: "16px",
      Large: "18px"
    };

    root.style.setProperty(
      "--campus-font-size",
      fontSizes[settings.fontSize] ||
        "16px"
    );

    root.setAttribute(
      "data-font-size",
      (
        settings.fontSize ||
        "Medium"
      ).toLowerCase()
    );
  }, [settings.fontSize]);

  // ===============================
  // LANGUAGE
  // ===============================

  useEffect(() => {
    document.documentElement.setAttribute(
      "lang",
      settings.language === "Hindi"
        ? "hi"
        : "en"
    );
  }, [settings.language]);

  // ===============================
  // YEAR FORMAT
  // ===============================

  const getYearText = (year) => {
    if (!year) return "";

    if (year === 1) return "1st Year";
    if (year === 2) return "2nd Year";
    if (year === 3) return "3rd Year";

    return "4th Year";
  };

  // ===============================
  // QUICK ACTION ROUTES
  // ===============================

  const quickActions = isTeacher
    ? [
        {
          link: "/teacher-dashboard/attendance",
          icon: "📊",
          label: "Attendance"
        },
        {
          link: "/teacher-dashboard/timetable",
          icon: "🗓️",
          label: "Timetable"
        },
        {
          link: "/teacher-dashboard/assignments",
          icon: "📝",
          label: "Assignments"
        },
        {
          link: "/teacher-dashboard/results",
          icon: "📈",
          label: "Results"
        },
        {
          link: "/teacher-dashboard",
          icon: "🏠",
          label: "Dashboard"
        }
      ]
    : [
        {
          link: "/dashboard/attendance",
          icon: "📊",
          label: t.attendance
        },
        {
          link: "/dashboard/timetable",
          icon: "🗓️",
          label: "Timetable"
        },
        {
          link: "/dashboard/assignments",
          icon: "📝",
          label: t.assignment
        },
        {
          link: "/dashboard/placements",
          icon: "💼",
          label: t.placement
        },
        {
          link: "/dashboard/events",
          icon: "📅",
          label: t.event
        },
        {
          link: "/dashboard",
          icon: "🏠",
          label: "Dashboard"
        }
      ];

  return (
    <div className="settings-page">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="settings-header">

        <div>

          <p>
            {isTeacher
              ? t.teacherPortal
              : t.portal}
          </p>

          <h1>
            {t.settings}
          </h1>

          <span>
            {t.manage}
          </span>

        </div>

        <button
          className="reset-settings-btn"
          onClick={resetSettings}
        >
          {t.reset}
        </button>

      </div>


      {/* ===============================
          PROFILE
      =============================== */}

      <section className="settings-section profile-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            👤
          </div>

          <div>

            <h2>
              {t.profile}
            </h2>

            <p>
              {isTeacher
                ? t.teacherProfileDesc
                : t.studentProfileDesc}
            </p>

          </div>

        </div>


        <div className="profile-settings-card">

          <div className="profile-main">

            <div className="settings-avatar">

              {userName
                .charAt(0)
                .toUpperCase()}

            </div>


            <div className="profile-details">

              <h3>
                {userName}
              </h3>

              <p className="profile-email">
                {userEmail}
              </p>

              <span className="profile-course">
                {userCourse}
              </span>

              {!isTeacher &&
                userYear && (
                  <span className="profile-year">
                    {getYearText(userYear)}
                  </span>
                )}

              {isTeacher && (
                <span className="profile-year">
                  Teacher
                </span>
              )}

            </div>

          </div>


          <button
            className="settings-outline-btn"
            type="button"
          >
            {t.editProfile}
          </button>

        </div>

      </section>


      {/* ===============================
          GENERAL
      =============================== */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ⚙️
          </div>

          <div>

            <h2>
              {t.general}
            </h2>

            <p>
              {t.generalDesc}
            </p>

          </div>

        </div>


        <div className="settings-options">

          <SettingSelect
            title={t.language}
            description={t.languageDesc}
            value={settings.language}
            onChange={(value) =>
              updateSetting(
                "language",
                value
              )
            }
            options={[
              "English",
              "Hindi"
            ]}
          />


          <SettingSelect
            title={t.theme}
            description={t.themeDesc}
            value={
              settings.darkMode
                ? "Dark"
                : "Light"
            }
            onChange={(value) =>
              updateSetting(
                "darkMode",
                value === "Dark"
              )
            }
            options={[
              "Light",
              "Dark"
            ]}
          />


          <SettingSelect
            title={t.fontSize}
            description={t.fontDesc}
            value={settings.fontSize}
            onChange={(value) =>
              updateSetting(
                "fontSize",
                value
              )
            }
            options={[
              "Small",
              "Medium",
              "Large"
            ]}
          />

        </div>

      </section>


      {/* ===============================
          NOTIFICATIONS
      =============================== */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            🔔
          </div>

          <div>

            <h2>
              {t.notifications}
            </h2>

            <p>
              {t.notificationDesc}
            </p>

          </div>

        </div>


        <div className="settings-options">

          <SettingToggle
            title={t.assignment}
            description={t.assignmentDesc}
            checked={
              settings.assignmentNotifications
            }
            onChange={(value) =>
              updateSetting(
                "assignmentNotifications",
                value
              )
            }
          />


          <SettingToggle
            title={t.event}
            description={t.eventDesc}
            checked={
              settings.eventNotifications
            }
            onChange={(value) =>
              updateSetting(
                "eventNotifications",
                value
              )
            }
          />


          <SettingToggle
            title={t.attendance}
            description={t.attendanceDesc}
            checked={
              settings.attendanceAlerts
            }
            onChange={(value) =>
              updateSetting(
                "attendanceAlerts",
                value
              )
            }
          />


          <SettingToggle
            title={t.placement}
            description={t.placementDesc}
            checked={
              settings.placementAlerts
            }
            onChange={(value) =>
              updateSetting(
                "placementAlerts",
                value
              )
            }
          />


          <SettingToggle
            title={t.announcements}
            description={t.announcementsDesc}
            checked={
              settings.announcements
            }
            onChange={(value) =>
              updateSetting(
                "announcements",
                value
              )
            }
          />

        </div>

      </section>


      {/* ===============================
          PRIVACY
      =============================== */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            🔐
          </div>

          <div>

            <h2>
              {t.privacy}
            </h2>

            <p>
              {t.privacyDesc}
            </p>

          </div>

        </div>


        <div className="settings-options">

          <SettingToggle
            title={t.profileVisibility}
            description={t.profileVisibilityDesc}
            checked={
              settings.profileVisible
            }
            onChange={(value) =>
              updateSetting(
                "profileVisible",
                value
              )
            }
          />


          <SettingToggle
            title={t.remember}
            description={t.rememberDesc}
            checked={
              settings.rememberDevice
            }
            onChange={(value) =>
              updateSetting(
                "rememberDevice",
                value
              )
            }
          />


          <div className="setting-row">

            <div>

              <h3>
                {t.changePassword}
              </h3>

              <p>
                {t.changePasswordDesc}
              </p>

            </div>


            <button
              type="button"
              className="settings-outline-btn"
            >
              {t.changePassword}
            </button>

          </div>

        </div>

      </section>


      {/* ===============================
          INTELLIGENCE
      =============================== */}

      <section className="settings-section intelligence-card">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ✨
          </div>

          <div>

            <h2>
              {t.intelligence}
            </h2>

            <p>
              {t.intelligenceDesc}
            </p>

          </div>

        </div>


        <div className="settings-options">

          <div className="setting-row">

            <div>

              <h3>
                {t.focus}
              </h3>

              <p>
                {t.focusDesc}
              </p>

            </div>

            <SettingToggleButton
              checked={
                settings.focusShield
              }
              onChange={(value) =>
                updateSetting(
                  "focusShield",
                  value
                )
              }
              label="Focus Shield"
            />

          </div>


          <div className="setting-row">

            <div>

              <h3>
                {t.smart}
              </h3>

              <p>
                {t.smartDesc}
              </p>

            </div>

            <SettingToggleButton
              checked={
                settings.smartSuggestions
              }
              onChange={(value) =>
                updateSetting(
                  "smartSuggestions",
                  value
                )
              }
              label="Smart Campus Suggestions"
            />

          </div>


          <SettingSelect
            title={t.studyTime}
            description={t.studyTimeDesc}
            value={settings.studyTime}
            onChange={(value) =>
              updateSetting(
                "studyTime",
                value
              )
            }
            options={[
              "Morning",
              "Afternoon",
              "Evening",
              "Night"
            ]}
          />

        </div>

      </section>


      {/* ===============================
          ACCESSIBILITY
      =============================== */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ♿
          </div>

          <div>

            <h2>
              {t.accessibility}
            </h2>

            <p>
              {t.accessibilityDesc}
            </p>

          </div>

        </div>


        <div className="settings-options">

          <SettingToggle
            title={t.reduce}
            description={t.reduceDesc}
            checked={
              settings.reduceAnimations
            }
            onChange={(value) =>
              updateSetting(
                "reduceAnimations",
                value
              )
            }
          />


          <SettingToggle
            title={t.contrast}
            description={t.contrastDesc}
            checked={
              settings.highContrast
            }
            onChange={(value) =>
              updateSetting(
                "highContrast",
                value
              )
            }
          />

        </div>

      </section>


      {/* ===============================
          QUICK ACTIONS
      =============================== */}

      <section className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ⚡
          </div>

          <div>

            <h2>
              {t.quick}
            </h2>

            <p>
              {t.quickDesc}
            </p>

          </div>

        </div>


        <div className="quick-settings-grid">

          {quickActions.map(
            (action) => (

              <Link
                key={action.link}
                to={action.link}
              >

                <span className="quick-action-icon">
                  {action.icon}
                </span>

                <span>
                  {action.label}
                </span>

              </Link>

            )
          )}

        </div>

      </section>


      {/* ===============================
          FOOTER
      =============================== */}

      <div className="settings-footer">

        <p>
          {t.saved}
        </p>

      </div>

    </div>
  );
}


/* ===============================
   SELECT
=============================== */

function SettingSelect({
  title,
  description,
  value,
  onChange,
  options
}) {
  return (
    <div className="setting-row">

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>


      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >

        {options.map(
          (option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          )
        )}

      </select>

    </div>
  );
}


/* ===============================
   TOGGLE
=============================== */

function SettingToggle({
  title,
  description,
  checked,
  onChange
}) {
  return (
    <div className="setting-row">

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>


      <SettingToggleButton
        checked={checked}
        onChange={onChange}
        label={title}
      />

    </div>
  );
}


/* ===============================
   TOGGLE BUTTON
=============================== */

function SettingToggleButton({
  checked,
  onChange,
  label
}) {
  return (
    <button
      type="button"
      className={`toggle ${
        checked ? "active" : ""
      }`}
      onClick={() =>
        onChange(!checked)
      }
      aria-label={label}
      aria-pressed={checked}
    >
      <span></span>
    </button>
  );
}


export default Settings;