'use client'

import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Use Formspree for reliable form handling
      const response = await fetch('https://formspree.io/f/meolnkql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          _replyto: formData.email,
          _subject: `🔥 NEW LEAD: ${formData.projectType.toUpperCase()} - ${formData.name}`
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">Let's Create Something Amazing</h2>
      <p className="text-gray-300 text-center mb-8">Ready to bring your vision to life? Share your details and we'll call you to discuss your project.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Phone Number - Emphasized */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gold mb-2">
            Phone Number * <span className="text-xs text-gray-400">(We prefer to discuss projects over the phone)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border-2 border-gold rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
          >
            <option value="">Select a project type</option>
            <option value="commercial">Commercial Video</option>
            <option value="music-video">Music Video</option>
            <option value="event">Event Coverage</option>
            <option value="corporate">Corporate Content</option>
            <option value="social-media">Social Media Content</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your vision, timeline, and any specific requirements..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Get Started - We'll Call You!"
            )}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg text-center">
            <p className="text-green-300 font-medium">Thank you! We'll call you within 24 hours to discuss your project.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
            <p className="text-red-300 font-medium">There was an error sending your message. Please try again or call us directly.</p>
          </div>
        )}
      </form>
    </div>
  )
}