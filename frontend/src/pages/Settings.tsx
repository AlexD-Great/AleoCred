import { useState } from 'react'
import { User, Bell, Shield, Key, Globe, Moon, Sun, Save, ExternalLink } from 'lucide-react'

export default function Settings() {
  const [notifications, setNotifications] = useState({
    credentialIssued: true,
    verificationRequest: true,
    eventUpdates: false,
    newsletter: false,
  })
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Settings</h1>
        <p className="text-dark-400 mt-2">Manage your account preferences and security settings</p>
      </div>

      {/* Profile Section */}
      <div className="card-static">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary-900/30 rounded-lg">
            <User className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark-100">Profile</h2>
            <p className="text-sm text-dark-400">Your public profile information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Display Name</label>
            <input type="text" className="input" placeholder="Anonymous User" />
          </div>
          <div>
            <label className="label">Email (Optional)</label>
            <input type="email" className="input" placeholder="your@email.com" />
            <p className="text-xs text-dark-500 mt-1">Used only for important notifications</p>
          </div>
          <div>
            <label className="label">Wallet Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input font-mono text-sm"
                value="aleo1qnr4dkkvkgfqph0e6xfqeh2vvk7w3xk8q2e8v6"
                disabled
              />
              <button className="btn-secondary">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card-static">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-accent-blue/20 rounded-lg">
            <Bell className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark-100">Notifications</h2>
            <p className="text-sm text-dark-400">Configure how you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: 'credentialIssued', label: 'Credential Issued', description: 'When you receive a new credential' },
            { key: 'verificationRequest', label: 'Verification Requests', description: 'When someone requests to verify your credentials' },
            { key: 'eventUpdates', label: 'Event Updates', description: 'Updates about events you\'ve attended' },
            { key: 'newsletter', label: 'Newsletter', description: 'AleoCred news and feature updates' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
              <div>
                <p className="text-dark-200 font-medium">{item.label}</p>
                <p className="text-dark-500 text-sm">{item.description}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-dark-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications[item.key as keyof typeof notifications] ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="card-static">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-accent-purple/20 rounded-lg">
            <Shield className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark-100">Security</h2>
            <p className="text-sm text-dark-400">Manage your security preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-dark-200 font-medium">Auto-lock Wallet</p>
                <p className="text-dark-500 text-sm">Automatically lock after inactivity</p>
              </div>
            </div>
            <select className="input w-auto text-sm py-2">
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-dark-400" />
              <div>
                <p className="text-dark-200 font-medium">Transaction Confirmation</p>
                <p className="text-dark-500 text-sm">Require confirmation for all transactions</p>
              </div>
            </div>
            <button className="relative w-12 h-6 rounded-full bg-primary-600 transition-colors">
              <div className="absolute top-1 w-4 h-4 bg-white rounded-full translate-x-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="card-static">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-accent-orange/20 rounded-lg">
            <Globe className="w-6 h-6 text-accent-orange" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark-100">Appearance</h2>
            <p className="text-sm text-dark-400">Customize the look and feel</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Theme</label>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                  theme === 'light'
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>Light</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
