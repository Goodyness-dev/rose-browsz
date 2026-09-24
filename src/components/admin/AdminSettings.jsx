import React, { useState, useEffect } from 'react';
import { settingsApi, authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  // Test Connection States
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState(null);
  const [showBotToken, setShowBotToken] = useState(false);

  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsApi.getSettings();
      setSettings(data);
      if (data.shop_email) {
        setTestEmailAddress(data.shop_email);
      }
    } catch (err) {
      setSaveError('Failed to load practice settings: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const result = await settingsApi.saveSettings(settings);
      setSettings(result.settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.data?.error || err.message || 'Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestTelegram = async () => {
    if (!settings.telegram_bot_token || !settings.telegram_chat_id) {
      setTelegramTestResult({ success: false, error: 'Please enter both Telegram Bot Token and Chat ID first.' });
      return;
    }

    setIsTestingTelegram(true);
    setTelegramTestResult(null);

    try {
      const result = await settingsApi.testTelegram(settings.telegram_bot_token, settings.telegram_chat_id);
      setTelegramTestResult(result);
    } catch (err) {
      setTelegramTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      setEmailTestResult({ success: false, error: 'Please enter an email address to send the test estimate to.' });
      return;
    }

    setIsTestingEmail(true);
    setEmailTestResult(null);

    try {
      const result = await settingsApi.testEmail({
        toEmail: testEmailAddress,
        serviceId: settings.emailjs_service_id,
        templateId: settings.emailjs_template_id_quote,
        publicKey: settings.emailjs_public_key
      });
      setEmailTestResult(result);
    } catch (err) {
      setEmailTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    setIsChangingPass(true);
    setPassError('');
    setPassSuccess('');

    try {
      const result = await authApi.changePassword(oldPassword, newPassword);
      setPassSuccess(result.message || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 5000);
    } catch (err) {
      setPassError(err.data?.error || err.message || 'Failed to change password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3 font-mono">
        <span className="animate-spin text-shop-red text-2xl">↻</span>
        <span className="text-xs">Loading practice configurations...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner Alert on Save */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-3 shadow-xs">
          <span className="font-mono font-bold text-emerald-600">✓</span>
          <span className="font-bold">Settings and office automation credentials updated successfully!</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center space-x-3 shadow-xs font-mono">
          <span className="font-bold text-shop-red">[!]</span>
          <span>{saveError}</span>
        </div>
      )}

      {/* SECTION 1: Telegram Order Alerts */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-10 card-thick space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">// 01 TELEGRAM</span>
              <h2 className="text-lg sm:text-xl font-black font-heading text-slate-900">
                Staff Instant Inquiries & Alerts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Receive live notifications on staff devices the instant a client submits a consultation request.
            </p>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl hover:border-slate-300 transition">
            <input
              type="checkbox"
              checked={Boolean(settings.telegram_enabled)}
              onChange={(e) => setSettings({ ...settings, telegram_enabled: e.target.checked })}
              className="w-4 h-4 text-shop-red rounded bg-white border-slate-300 focus:ring-shop-red"
            />
            <span className="text-xs font-bold text-slate-900 font-mono">Enable Telegram Alerts</span>
          </label>
        </div>

        {/* Setup Walkthrough */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2 font-mono">
          <div className="font-bold text-slate-900 flex items-center space-x-1.5 text-xs">
            <span className="text-shop-red">// GUIDE</span>
            <span>How to configure instant alerts for {BUSINESS_INFO.name}:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed pl-1 text-[11px]">
            <li>Open Telegram, search for <strong className="text-slate-900">@BotFather</strong>, send <code className="text-shop-red bg-red-50 px-1 py-0.5 rounded">/newbot</code> and copy your HTTP API Token.</li>
            <li>Search for <strong className="text-slate-900">@userinfobot</strong> on Telegram and tap Start to see your numeric <strong className="text-slate-900">Id</strong> (Chat ID).</li>
            <li>Paste Token and Chat ID below, click <strong className="text-slate-900">Test Connection</strong>, and verify you get the test ping!</li>
          </ol>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              Telegram Bot Token
            </label>
            <div className="relative">
              <input
                type={showBotToken ? 'text' : 'password'}
                value={settings.telegram_bot_token || ''}
                onChange={(e) => setSettings({ ...settings, telegram_bot_token: e.target.value })}
                placeholder="e.g. 7123456789:AAH..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl pl-4 pr-16 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
              />
              <button
                type="button"
                onClick={() => setShowBotToken(!showBotToken)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-mono font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showBotToken ? '[HIDE]' : '[SHOW]'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              Telegram Chat ID (Staff User ID)
            </label>
            <input
              type="text"
              value={settings.telegram_chat_id || ''}
              onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
              placeholder="e.g. 123456789"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
            />
          </div>
        </div>

        {/* Telegram Test Button & Feedback */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleTestTelegram}
            disabled={isTestingTelegram}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center space-x-2 transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isTestingTelegram ? (
              <><span>↻</span><span>Sending Test Ping...</span></>
            ) : (
              <><span>→</span><span>Test Telegram Connection</span></>
            )}
          </button>

          {telegramTestResult && (
            <div className={`text-xs px-3.5 py-2 rounded-xl flex items-center space-x-2 font-mono ${
              telegramTestResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <span>{telegramTestResult.success ? '✓' : '[!]'}</span>
              <span>{telegramTestResult.message || telegramTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Email Automation Settings */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-10 card-thick space-y-6">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">// 02 EMAIL DISPATCH</span>
            <h2 className="text-lg sm:text-xl font-black font-heading text-slate-900">
              Email Automation (Client Estimates & Alerts)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automates dispatching official studio estimates and appointments directly to client email addresses.
          </p>
        </div>

        {/* EmailJS Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              EmailJS Service ID
            </label>
            <input
              type="text"
              value={settings.emailjs_service_id || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_service_id: e.target.value })}
              placeholder="e.g. service_xxxxxx"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              EmailJS Public Key
            </label>
            <input
              type="text"
              value={settings.emailjs_public_key || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_public_key: e.target.value })}
              placeholder="e.g. user_xxxxxxxxx"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              Client Estimate Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_quote || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_quote: e.target.value })}
              placeholder="e.g. template_client_estimate"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Used when clicking "Send Estimate to Client".</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">
              New Intake Alert Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_notify || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_notify: e.target.value })}
              placeholder="e.g. template_staff_alert"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none font-mono transition"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Alerts studio email when client submits an intake form.</span>
          </div>
        </div>

        {/* Test Email Delivery */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
            Test Estimate Email Delivery
          </label>
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <input
              type="email"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="your-email@example.com"
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none transition font-mono"
            />
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={isTestingEmail}
              className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-mono font-bold text-xs flex items-center space-x-2 transition shrink-0 cursor-pointer"
            >
              {isTestingEmail ? (
                <><span>↻</span><span>Sending...</span></>
              ) : (
                <><span>→</span><span>Send Test Estimate Email</span></>
              )}
            </button>
          </div>

          {emailTestResult && (
            <div className={`text-xs p-3 rounded-xl flex items-center space-x-2 font-mono ${
              emailTestResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <span>{emailTestResult.success ? '✓' : '[!]'}</span>
              <span>{emailTestResult.message || emailTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Practice Profile & Defaults */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-10 card-thick space-y-6">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">// 03 OFFICE DEFAULTS</span>
            <h2 className="text-lg sm:text-xl font-black font-heading text-slate-900">
              Practice Profile & Consultation Defaults
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Clinical contact information displayed on official email communications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Office Phone</label>
            <input
              type="text"
              value={settings.shop_phone || ''}
              onChange={(e) => setSettings({ ...settings, shop_phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Office Alert Email</label>
            <input
              type="email"
              value={settings.shop_email || ''}
              onChange={(e) => setSettings({ ...settings, shop_email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Clinic Address</label>
            <input
              type="text"
              value={settings.shop_address || ''}
              onChange={(e) => setSettings({ ...settings, shop_address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Clinical Workmanship Guarantee</label>
            <input
              type="text"
              value={settings.default_warranty || ''}
              onChange={(e) => setSettings({ ...settings, default_warranty: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Default Clinical Note Template</label>
            <textarea
              rows={3}
              value={settings.default_quote_notes || ''}
              onChange={(e) => setSettings({ ...settings, default_quote_notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl p-4 text-xs text-slate-900 outline-none transition leading-relaxed"
            />
          </div>
        </div>

        {/* Global Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="py-3.5 px-8 bg-shop-red hover:bg-shop-redHover disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl transition shadow-md shadow-shop-red/20 flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            {isSaving ? (
              <><span>↻</span><span>Saving Changes...</span></>
            ) : (
              <><span>Save All Practice Settings →</span></>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 4: Change Admin Password */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-7 sm:p-10 card-thick space-y-6">
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-shop-red bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase">// 04 SECURITY</span>
            <h2 className="text-lg sm:text-xl font-black font-heading text-slate-900">
              Change Staff Admin Password
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update your private credentials anytime to safeguard client records and studio schedules.
          </p>
        </div>

        {passSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center space-x-2 font-mono">
            <span className="font-bold">✓</span>
            <span>{passSuccess}</span>
          </div>
        )}

        {passError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center space-x-2 font-mono">
            <span className="font-bold text-shop-red">[!]</span>
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current admin password"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className="w-full bg-slate-50 border border-slate-200 focus:border-shop-red focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 outline-none transition font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-mono font-bold text-xs rounded-xl transition flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            {isChangingPass ? (
              <><span>↻</span><span>Updating Password...</span></>
            ) : (
              <><span>Update Staff Password →</span></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

