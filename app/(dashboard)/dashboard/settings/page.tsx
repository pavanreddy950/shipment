'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building, Shield, Key, Users, Bell, Trash2 } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockUser, mockTeamMembers, mockAPIKeys } from '@/lib/data/mock-data';
import { formatDate, getInitials } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Settings" 
        subtitle="Manage your account and preferences"
      />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && <ProfileTab onSave={handleSave} isSaving={isSaving} />}
            {activeTab === 'company' && <CompanyTab onSave={handleSave} isSaving={isSaving} />}
            {activeTab === 'team' && <TeamTab />}
            {activeTab === 'api' && <APITab />}
            {activeTab === 'security' && <SecurityTab onSave={handleSave} isSaving={isSaving} />}
            {activeTab === 'notifications' && <NotificationsTab onSave={handleSave} isSaving={isSaving} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-text-primary mb-6">Profile Settings</h3>
      
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary">
              {getInitials(mockUser.name)}
            </span>
          </div>
          <div>
            <Button size="sm" variant="secondary">Change Avatar</Button>
            <p className="text-sm text-text-tertiary mt-2">JPG, GIF or PNG. Max size 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" defaultValue={mockUser.name} />
          <Input label="Email Address" type="email" defaultValue={mockUser.email} />
        </div>

        <Input label="Company" defaultValue={mockUser.company} />

        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <p className="text-sm text-text-secondary">
            Member since {formatDate(mockUser.joinedDate, 'long')}
          </p>
          <Button onClick={onSave} loading={isSaving}>
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CompanyTab({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-text-primary mb-6">Company Information</h3>
      
      <div className="space-y-6">
        <Input label="Company Name" defaultValue={mockUser.company} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Industry" defaultValue="Trade & Logistics" />
          <Input label="Company Size" defaultValue="10-50 employees" />
        </div>

        <Input label="Website" placeholder="https://yourcompany.com" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Country" defaultValue="United States" />
          <Input label="City" defaultValue="San Francisco" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Company Description
          </label>
          <textarea
            className="input min-h-[100px]"
            placeholder="Tell us about your company..."
            defaultValue="Global trade intelligence and analytics platform"
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-800">
          <Button onClick={onSave} loading={isSaving}>
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}

function TeamTab() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">Team Members</h3>
        <Button>Invite Member</Button>
      </div>

      <div className="space-y-3">
        {mockTeamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-surface-light rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary">
                  {getInitials(member.name)}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary">{member.name}</p>
                <p className="text-sm text-text-secondary">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                {member.status}
              </Badge>
              <span className="text-sm text-text-secondary">{member.role}</span>
              <Button size="sm" variant="ghost">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function APITab() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">API Keys</h3>
          <p className="text-sm text-text-secondary">
            Manage your API keys for programmatic access
          </p>
        </div>
        <Button>Generate New Key</Button>
      </div>

      <div className="space-y-4">
        {mockAPIKeys.map((apiKey) => (
          <div
            key={apiKey.id}
            className="p-4 bg-surface-light rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-text-primary mb-1">{apiKey.name}</p>
                <code className="text-sm font-mono text-text-secondary bg-surface px-2 py-1 rounded">
                  {apiKey.key}
                </code>
              </div>
              <Button size="sm" variant="ghost">
                <Trash2 className="w-4 h-4 text-danger" />
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <span>Created {formatDate(apiKey.createdDate)}</span>
              <span>•</span>
              <span>Last used {formatDate(apiKey.lastUsed)}</span>
              <span>•</span>
              <span>{apiKey.requests.toLocaleString()} requests</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <p className="text-sm text-warning">
          <strong>Important:</strong> Keep your API keys secure and never share them publicly.
        </p>
      </div>
    </Card>
  );
}

function SecurityTab({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-text-primary mb-6">Security Settings</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">Change Password</h4>
          <div className="space-y-4">
            <Input type="password" label="Current Password" />
            <Input type="password" label="New Password" />
            <Input type="password" label="Confirm New Password" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Two-Factor Authentication</h4>
          <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">
                Authenticator App
              </p>
              <p className="text-sm text-text-secondary">
                Use an authentication app to generate one-time codes
              </p>
            </div>
            <Button variant="secondary">Enable</Button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Active Sessions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-surface-light rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary mb-1">
                  Windows • Chrome
                </p>
                <p className="text-sm text-text-secondary">
                  San Francisco, CA • Current session
                </p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-800">
          <Button onClick={onSave} loading={isSaving}>
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
}

function NotificationsTab({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-text-primary mb-6">Notification Preferences</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-4">Email Notifications</h4>
          <div className="space-y-3">
            {[
              { label: 'Product updates', description: 'News about product features' },
              { label: 'New shipment alerts', description: 'Get notified of new shipments' },
              { label: 'Weekly reports', description: 'Weekly analytics summary' },
              { label: 'Credits low warning', description: 'Alert when credits are running low' },
            ].map((item) => (
              <label key={item.label} className="flex items-start gap-3 p-3 hover:bg-surface-light rounded-lg transition-colors cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-gray-700 bg-surface text-primary focus:ring-primary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Push Notifications</h4>
          <div className="space-y-3">
            {[
              { label: 'Browser notifications', description: 'Receive notifications in your browser' },
              { label: 'Mobile push', description: 'Notifications on your mobile device' },
            ].map((item) => (
              <label key={item.label} className="flex items-start gap-3 p-3 hover:bg-surface-light rounded-lg transition-colors cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-700 bg-surface text-primary focus:ring-primary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-800">
          <Button onClick={onSave} loading={isSaving}>
            Save Preferences
          </Button>
        </div>
      </div>
    </Card>
  );
}
