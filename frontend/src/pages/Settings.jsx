import { Link } from "react-router-dom";
import { useState } from "react";
import { useSettings } from "../SettingsContext";

function Settings() {
  const {
    settings,
    updateSetting,
    resetSettings,
    t,
    showToast,
  } = useSettings();

  // ===============================
  // USER STATE
  // ===============================

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("student");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const role =
    localStorage.getItem("role") ||
    user?.role ||
    "student";

  const isTeacher = role === "teacher";

  const userName =
    user?.name ||
    user?.fullName ||
    (isTeacher ? "Teacher" : "Student");

  const userEmail =
    user?.email || "student@campushub.edu";

  const userCourse =
    user?.course ||
    user?.branch ||
    user?.department ||
    (isTeacher ? "Faculty Member" : "Computer Science & Engineering");

  const userYear =
    user?.year || (isTeacher ? null : 3);

  // ===============================
  // MODALS STATE
  // ===============================

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: userName,
    email: userEmail,
    course: userCourse,
    year: userYear || 1,
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : (user?.skills || "React, JavaScript, Node.js"),
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  // ===============================
  // YEAR FORMAT
  // ===============================

  const getYearText = (year) => {
    if (!year) return "";
    if (settings.language === "Hindi") {
      if (year === 1) return "पहला वर्ष (1st Year)";
      if (year === 2) return "दूसरा वर्ष (2nd Year)";
      if (year === 3) return "तीसरा वर्ष (3rd Year)";
      return "चौथा वर्ष (4th Year)";
    }
    if (year === 1) return "1st Year";
    if (year === 2) return "2nd Year";
    if (year === 3) return "3rd Year";
    return "4th Year";
  };

  // ===============================
  // HANDLE EDIT PROFILE
  // ===============================

  const handleOpenEditModal = () => {
    setProfileForm({
      name: user?.name || user?.fullName || (isTeacher ? "Teacher" : "Student"),
      email: user?.email || "student@campushub.edu",
      course: user?.course || user?.branch || user?.department || (isTeacher ? "Faculty" : "Computer Science & Engineering"),
      year: user?.year || 3,
      skills: Array.isArray(user?.skills) ? user.skills.join(", ") : (user?.skills || "React, JavaScript, Node.js"),
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!profileForm.name.trim()) {
      showToast(t.fillAllFields || "Please enter your name", "error");
      return;
    }

    const updatedUser = {
      ...(user || {}),
      name: profileForm.name.trim(),
      fullName: profileForm.name.trim(),
      email: profileForm.email.trim(),
      course: profileForm.course.trim(),
      year: Number(profileForm.year) || 1,
      skills: profileForm.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      role: role,
    };

    localStorage.setItem("student", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEditModal(false);

    // Notify other components (Navbar, Topbar, etc.)
    window.dispatchEvent(new Event("storage"));

    showToast(t.profileUpdated || "Profile updated successfully!");
  };

  // ===============================
  // HANDLE CHANGE PASSWORD
  // ===============================

  const handleOpenPasswordModal = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setShowPasswordModal(true);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError(t.fillAllFields || "Please fill in all fields.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError(settings.language === "Hindi" ? "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" : "Password must be at least 6 characters long.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError(t.passwordsMismatch || "New passwords do not match!");
      return;
    }

    // Success
    setShowPasswordModal(false);
    showToast(t.passwordChanged || "Password changed successfully!");
  };

  // ===============================
  // QUICK ACTION ROUTES
  // ===============================

  const quickActions = isTeacher
    ? [
        {
          link: "/teacher-dashboard/attendance",
          icon: "📊",
          label: t.attendance,
        },
        {
          link: "/teacher-dashboard/timetable",
          icon: "🗓️",
          label: t.timetable,
        },
        {
          link: "/teacher-dashboard/assignments",
          icon: "📝",
          label: t.assignments,
        },
        {
          link: "/teacher-dashboard/results",
          icon: "📈",
          label: t.results,
        },
        {
          link: "/teacher-dashboard",
          icon: "🏠",
          label: t.dashboard,
        },
      ]
    : [
        {
          link: "/dashboard/attendance",
          icon: "📊",
          label: t.attendance,
        },
        {
          link: "/dashboard/timetable",
          icon: "🗓️",
          label: t.timetable,
        },
        {
          link: "/dashboard/assignments",
          icon: "📝",
          label: t.assignments,
        },
        {
          link: "/dashboard/placements",
          icon: "💼",
          label: t.placements,
        },
        {
          link: "/dashboard/events",
          icon: "📅",
          label: t.events,
        },
        {
          link: "/dashboard",
          icon: "🏠",
          label: t.dashboard,
        },
      ];

  return (
    <div className="settings-page">

      {/* FOCUS SHIELD ACTIVE BANNER */}
      {settings.focusShield && (
        <div className="focus-shield-banner">
          <span>🎯</span>
          <div>
            <strong>{t.focusShield} {settings.language === "Hindi" ? "सक्रिय है" : "Active"}</strong>
            <p>{t.focusActive}</p>
          </div>
        </div>
      )}

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
          title="Reset all settings to default"
        >
          🔄 {t.reset}
        </button>

      </div>


      {/* ===============================
          PROFILE SECTION
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
                📧 {userEmail}
              </p>

              <span className="profile-course">
                🎓 {userCourse}
              </span>

              {!isTeacher && userYear && (
                <span className="profile-year">
                  📅 {getYearText(userYear)}
                </span>
              )}

              {isTeacher && (
                <span className="profile-year">
                  👨‍🏫 {settings.language === "Hindi" ? "शिक्षक (Teacher)" : "Faculty / Teacher"}
                </span>
              )}

              {user?.skills && user.skills.length > 0 && (
                <div className="profile-skills-tags">
                  {(Array.isArray(user.skills) ? user.skills : [user.skills]).map((skill, index) => (
                    <span key={index} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>


          <button
            className="settings-outline-btn"
            type="button"
            onClick={handleOpenEditModal}
          >
            ✏️ {t.editProfile}
          </button>

        </div>

      </section>


      {/* ===============================
          GENERAL SETTINGS
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

          {/* LANGUAGE */}
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

          {/* THEME */}
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

          {/* FONT SIZE */}
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
            title={t.assignmentReminders}
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
            title={t.eventReminders}
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
            title={t.attendanceAlerts}
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
            title={t.placementAlerts}
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
          PRIVACY & SECURITY
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
            title={t.rememberDevice}
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
              onClick={handleOpenPasswordModal}
            >
              🔒 {t.changePassword}
            </button>

          </div>

        </div>

      </section>


      {/* ===============================
          CAMPUSHUB INTELLIGENCE
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
                🎯 {t.focusShield}
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
              label={t.focusShield}
            />

          </div>


          <div className="setting-row">

            <div>
              <h3>
                🧠 {t.smartSuggestions}
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
              label={t.smartSuggestions}
            />

          </div>


          {/* STUDY TIME */}
          <SettingSelect
            title={`📚 ${t.studyTime}`}
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

          {/* SMART TIP CARD IF ENABLED */}
          {settings.smartSuggestions && (
            <div className="smart-tip-box">
              <div className="smart-tip-header">
                <span>💡 {settings.language === "Hindi" ? "स्मार्ट टिप" : "CampusHub Smart Tip"}</span>
                <span className="smart-badge">{settings.studyTime} {settings.language === "Hindi" ? "शेड्यूल" : "Schedule"}</span>
              </div>
              <p>
                {settings.language === "Hindi"
                  ? `आपकी पसंद (${settings.studyTime}) के अनुसार: अगले 3 दिनों में आने वाले असाइनमेंट्स और टेस्ट के लिए टाइमटेबल में रीविजन स्लॉट्स ऑप्टिमाइज़ कर दिए गए हैं।`
                  : `Personalized for your ${settings.studyTime} preference: Review slots have been optimized in your timetable for upcoming deadlines.`}
              </p>
            </div>
          )}

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
            title={t.reduceAnimations}
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
            title={t.highContrast}
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
              {t.quickActions}
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
                className="quick-action-link"
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
          🛡️ {t.savedNotice}
        </p>
      </div>


      {/* ===============================
          EDIT PROFILE MODAL
      =============================== */}

      {showEditModal && (
        <div className="settings-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>✏️ {t.editProfile}</h3>
              <button
                type="button"
                className="modal-close-icon"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="settings-modal-form">
              <div className="settings-form-group">
                <label>{t.fullName}</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>{t.emailAddress}</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>{t.courseBranch}</label>
                <input
                  type="text"
                  value={profileForm.course}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, course: e.target.value })
                  }
                  placeholder="e.g. Computer Science & Engineering"
                />
              </div>

              {!isTeacher && (
                <div className="settings-form-group">
                  <label>{t.yearOfStudy}</label>
                  <select
                    value={profileForm.year}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, year: Number(e.target.value) })
                    }
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>
              )}

              <div className="settings-form-group">
                <label>{t.skills}</label>
                <input
                  type="text"
                  value={profileForm.skills}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, skills: e.target.value })
                  }
                  placeholder="React, Python, Machine Learning"
                />
              </div>

              <div className="settings-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="modal-save-btn">
                  ✓ {t.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ===============================
          CHANGE PASSWORD MODAL
      =============================== */}

      {showPasswordModal && (
        <div className="settings-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-header">
              <h3>🔒 {t.changePassword}</h3>
              <button
                type="button"
                className="modal-close-icon"
                onClick={() => setShowPasswordModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="settings-modal-form">
              {passwordError && (
                <div className="modal-error-box">
                  ⚠️ {passwordError}
                </div>
              )}

              <div className="settings-form-group">
                <label>{t.currentPassword}</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>{t.newPassword}</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="•••••••• (Min 6 chars)"
                  required
                />
              </div>

              <div className="settings-form-group">
                <label>{t.confirmPassword}</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="settings-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  {t.cancel}
                </button>
                <button type="submit" className="modal-save-btn">
                  ✓ {t.changePassword}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}


/* ===============================
   SELECT COMPONENT
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
        aria-label={title}
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
   TOGGLE COMPONENT
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