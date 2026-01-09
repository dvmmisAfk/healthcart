import { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

interface DoctorConsultationProps {
  onClose: () => void;
}

export default function DoctorConsultation({ onClose }: DoctorConsultationProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    previousHistory: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitMessage({
        type: 'success',
        text: 'Consultation request submitted successfully. A doctor will contact you shortly.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        symptoms: '',
        previousHistory: '',
      });
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Failed to submit consultation request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="p-8">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Doctor Consultation
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Fill in your details and our medical professional will reach out to you.
          </p>

          {/* Status Message */}
          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                             focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* History */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous Medical History (optional)
              </label>
              <textarea
                name="previousHistory"
                value={formData.previousHistory}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-xl font-semibold text-white
                ${
                  isSubmitting
                    ? 'bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
                } transition-all`}
            >
              {isSubmitting ? 'Submitting…' : 'Request Consultation'}
            </button>
          </form>

          {/* Footer Note */}
          <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
            By submitting this form, you agree to our terms and privacy policy.
            A licensed medical professional will contact you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
