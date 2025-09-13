"use client";
import React, { useState, useEffect } from "react";

interface Settings {
  siteName: string;
  supportEmail: string;
  primaryColor: string;
  companyAddress: string;
  phoneNumber: string;
  businessHours: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "Cloud IT Solution",
    supportEmail: "cloudsolutions1@gmail.com",
    primaryColor: "#0553aa",
    companyAddress: "",
    phoneNumber: "",
    businessHours: "Mon-Fri: 9AM-6PM",
    socialMedia: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'deleting' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // In a real app, you would fetch from an API
      // For now, we'll use localStorage
      const savedSettings = localStorage.getItem('adminSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setSettings(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('saving');

    try {
      // In a real app, you would save to an API
      // For now, we'll use localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllData = async () => {
    setDeleteStatus('deleting');
    
    try {
      // In a real app, you would call a delete API
      // For now, we'll clear localStorage
      localStorage.removeItem('adminSettings');
      localStorage.removeItem('productDemos');
      localStorage.removeItem('shopQuotes');
      localStorage.removeItem('trainingEnquiries');
      localStorage.removeItem('contacts');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDeleteStatus('success');
      setShowDeleteConfirm(false);
      
      // Reset settings to default
      setSettings({
        siteName: "Cloud IT Solution",
        supportEmail: "cloudsolutions1@gmail.com",
        primaryColor: "#0553aa",
        companyAddress: "",
        phoneNumber: "",
        businessHours: "Mon-Fri: 9AM-6PM",
        socialMedia: {
          facebook: "",
          twitter: "",
          linkedin: "",
          instagram: ""
        }
      });
      
      setTimeout(() => setDeleteStatus('idle'), 3000);
    } catch (error) {
      console.error('Error deleting data:', error);
      setDeleteStatus('error');
      setTimeout(() => setDeleteStatus('idle'), 3000);
    }
  };

  const getSaveButtonText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'success': return 'Saved!';
      case 'error': return 'Error - Try Again';
      default: return 'Save Changes';
    }
  };

  const getSaveButtonColor = () => {
    switch (saveStatus) {
      case 'success': return 'bg-green-600 hover:bg-green-700';
      case 'error': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-cyan-600 hover:bg-cyan-700';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <form onSubmit={handleSaveSettings} className="rounded-xl border bg-white p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input 
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <input 
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
              <input 
                type="text"
                name="businessHours"
                value={settings.businessHours}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
            <input 
              type="text"
              name="companyAddress"
              value={settings.companyAddress}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
                className="w-16 h-10 p-1 rounded-lg border border-gray-300 cursor-pointer" 
              />
              <span className="text-sm text-gray-600">{settings.primaryColor}</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <button 
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${getSaveButtonColor()} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {getSaveButtonText()}
            </button>
          </div>
        </form>

        {/* Social Media Settings */}
        <div className="rounded-xl border bg-white p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Social Media</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input 
                type="url"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter URL</label>
              <input 
                type="url"
                name="socialMedia.twitter"
                value={settings.socialMedia.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourhandle"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              <input 
                type="url"
                name="socialMedia.linkedin"
                value={settings.socialMedia.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/yourcompany"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input 
                type="url"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourhandle"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-700 mb-4">Irreversible actions, handle with care.</p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete All Data
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete all data? This action cannot be undone and will permanently remove all:
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Product demo requests</li>
              <li>• Shop quote requests</li>
              <li>• Training enquiries</li>
              <li>• Contact form submissions</li>
              <li>• All settings</li>
            </ul>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllData}
                disabled={deleteStatus === 'deleting'}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteStatus === 'deleting' ? 'Deleting...' : 'Yes, Delete All Data'}
              </button>
            </div>
            
            {deleteStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm">
                All data has been deleted successfully.
              </div>
            )}
            
            {deleteStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                Error deleting data. Please try again.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


