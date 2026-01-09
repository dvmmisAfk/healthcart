import { useState } from 'react';
import { X } from 'lucide-react';

interface AISymptomCheckerProps {
  onClose: () => void;
}

interface Symptom {
  name: string;
  severity: number;
}

export default function AISymptomChecker({ onClose }: AISymptomCheckerProps) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { name: 'Headache', severity: 0 },
    { name: 'Fever', severity: 0 },
    { name: 'Cough', severity: 0 },
    { name: 'Fatigue', severity: 0 },
    { name: 'Nausea', severity: 0 },
  ]);

  const [result, setResult] = useState<string | null>(null);

  const handleSeverityChange = (index: number, value: number) => {
    const updated = [...symptoms];
    updated[index].severity = value;
    setSymptoms(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResult(null);

    setTimeout(() => {
      const severitySum = symptoms.reduce((acc, s) => acc + s.severity, 0);
      const average = severitySum / symptoms.length;

      let diagnosis = '';
      if (average <= 1.5) {
        diagnosis = 'Mild condition, possibly allergies or a common cold.';
      } else if (average <= 3) {
        diagnosis = 'Moderate condition, could be flu or viral infection.';
      } else {
        diagnosis =
          'Severe symptoms detected. Please consult a doctor immediately.';
      }

      const recommendations = [
        'Rest and stay hydrated.',
        'Use over-the-counter medicines if required.',
        'Monitor symptoms for 24–48 hours.',
      ];

      setResult(
        `${diagnosis} Recommended actions: ${recommendations.join(' ')}`
      );
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI Symptom Checker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {symptoms.map((symptom, index) => (
              <div
                key={symptom.name}
                className="flex items-center justify-between"
              >
                <label className="text-sm font-medium text-gray-700">
                  {symptom.name}
                </label>

                <select
                  value={symptom.severity}
                  onChange={e =>
                    handleSeverityChange(index, parseInt(e.target.value))
                  }
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>None</option>
                  <option value={1}>Mild</option>
                  <option value={2}>Moderate</option>
                  <option value={3}>Severe</option>
                  <option value={4}>Very Severe</option>
                </select>
              </div>
            ))}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Analyze Symptoms
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Analysis Result
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                {result}
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-gray-500 text-center">
            Note: This tool is for informational purposes only and is not a
            substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
