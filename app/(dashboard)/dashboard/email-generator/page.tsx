'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Copy, RefreshCw, Send } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
];

const emailTemplates = [
  {
    subject: 'Partnership Opportunity for {product}',
    body: `Dear {name},

I hope this email finds you well. I am reaching out from {yourCompany}, and I came across your impressive work at {targetCompany}.

We specialize in {product} and have been tracking your company's {shipmentType} activities in the {industry} sector. Based on our research, I believe there's a strong opportunity for us to collaborate.

Our products offer:
• Competitive pricing with volume discounts
• Reliable supply chain and on-time delivery
• Quality certifications and compliance with international standards
• Flexible payment terms

I would love to schedule a brief call to discuss how we can support your business growth in the {region} market.

Would you be available for a 15-minute call next week?

Best regards,
{yourName}
{yourTitle}
{yourCompany}`,
  },
  {
    subject: 'Exclusive Supply Offer: {product}',
    body: `Hello {name},

I noticed that {targetCompany} has been actively {shipmentType}ing {product} over the past months. I wanted to reach out with an exclusive opportunity that could benefit your operations.

We are a leading supplier of premium {product} with:
✓ 15+ years of industry experience
✓ Direct manufacturer relationships
✓ Competitive rates (10-20% below market average)
✓ Fast shipping to {country}

Given your current volume of approximately {shipmentVolume} shipments per year, we could help optimize your costs significantly.

I've prepared a custom quote based on your typical requirements. Can we schedule a quick call to discuss?

Looking forward to connecting,
{yourName}
{yourTitle} | {yourCompany}`,
  },
  {
    subject: 'Let\'s Connect: {product} Supply Chain Solutions',
    body: `Hi {name},

Quick question - is {targetCompany} currently satisfied with your {product} suppliers?

I ask because we've helped several companies in {country} reduce their procurement costs by 15-25% while improving delivery times.

Here's what makes us different:
→ End-to-end supply chain visibility
→ Guaranteed quality with third-party inspection
→ Flexible MOQ starting from small quantities
→ Dedicated account manager

No pressure at all - just wanted to introduce ourselves in case you're open to exploring better options for your {industry} business.

Would you be interested in a brief intro call?

Cheers,
{yourName}
{yourCompany}`,
  },
];

export default function EmailGeneratorPage() {
  const [formData, setFormData] = useState({
    targetCompany: '',
    contactName: '',
    product: '',
    tone: 'professional',
    yourName: 'John Mitchell',
    yourCompany: 'Global Trade Solutions',
    yourTitle: 'Business Development Manager',
  });

  const [generatedEmails, setGeneratedEmails] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedEmails([]);
    setTypingIndex(0);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate multiple variants
    const variants = emailTemplates.map(template => {
      let email = template.body
        .replace(/{name}/g, formData.contactName || '[Contact Name]')
        .replace(/{targetCompany}/g, formData.targetCompany || '[Company Name]')
        .replace(/{product}/g, formData.product || '[Product]')
        .replace(/{yourName}/g, formData.yourName)
        .replace(/{yourCompany}/g, formData.yourCompany)
        .replace(/{yourTitle}/g, formData.yourTitle)
        .replace(/{shipmentType}/g, 'import')
        .replace(/{industry}/g, 'manufacturing')
        .replace(/{country}/g, 'United States')
        .replace(/{region}/g, 'North American')
        .replace(/{shipmentVolume}/g, '50');

      return `Subject: ${template.subject
        .replace(/{product}/g, formData.product || '[Product]')}\n\n${email}`;
    });

    setGeneratedEmails(variants);
    setIsGenerating(false);

    // Animate typing effect for first email
    animateTyping(variants[0]);
  };

  const animateTyping = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypingIndex(index);
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 20);
  };

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    // Could add toast notification here
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="AI Email Generator" 
        subtitle="Generate personalized outreach emails powered by AI"
      />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-text-primary">
                  Email Details
                </h3>
              </div>

              <div className="space-y-4">
                <Input
                  label="Target Company"
                  placeholder="e.g., TechCorp International"
                  value={formData.targetCompany}
                  onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
                />

                <Input
                  label="Contact Name"
                  placeholder="e.g., Sarah Johnson"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />

                <Input
                  label="Product/Service"
                  placeholder="e.g., Electronic Components"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Tone
                  </label>
                  <select
                    className="input"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                  >
                    {toneOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm font-medium text-text-secondary mb-3">
                    Your Information
                  </p>
                  
                  <Input
                    label="Your Name"
                    value={formData.yourName}
                    onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                    className="mb-3"
                  />

                  <Input
                    label="Your Company"
                    value={formData.yourCompany}
                    onChange={(e) => setFormData({ ...formData, yourCompany: e.target.value })}
                    className="mb-3"
                  />

                  <Input
                    label="Your Title"
                    value={formData.yourTitle}
                    onChange={(e) => setFormData({ ...formData, yourTitle: e.target.value })}
                  />
                </div>

                <Button 
                  className="w-full"
                  onClick={handleGenerate}
                  loading={isGenerating}
                  disabled={!formData.targetCompany || !formData.product}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Emails
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Generated Emails */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Generated Emails
                  </h3>
                </div>
                {generatedEmails.length > 0 && (
                  <span className="text-sm text-text-secondary">
                    {generatedEmails.length} variants
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {generatedEmails.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <Mail className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                    <p className="text-text-secondary mb-2">No emails generated yet</p>
                    <p className="text-sm text-text-tertiary">
                      Fill in the form and click "Generate Emails" to get started
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {generatedEmails.map((email, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-surface-light rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-primary">
                            Variant {index + 1}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopy(email)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                        <pre className="whitespace-pre-wrap text-sm text-text-secondary font-mono leading-relaxed">
                          {index === 0 && isGenerating 
                            ? email.substring(0, typingIndex)
                            : email
                          }
                          {index === 0 && isGenerating && typingIndex < email.length && (
                            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
                          )}
                        </pre>
                      </motion.div>
                    ))}

                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleGenerate}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
