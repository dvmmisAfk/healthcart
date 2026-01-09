import { Bot, UserPlus } from 'lucide-react';

interface HeroProps {
  onSymptomCheck: () => void;
  onDoctorConsult: () => void;
}

export default function Hero({ onSymptomCheck, onDoctorConsult }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
      
      {/* subtle background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-white/10 backdrop-blur">
              AI-powered healthcare assistance
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Your Health,
              <br />
              <span className="text-blue-200">Our Priority</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl">
              Get intelligent symptom analysis, personalized health insights,
              and connect with trusted medical professionals — all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Primary CTA */}
              <button
                onClick={onSymptomCheck}
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-blue-50 hover:scale-[1.02] transition"
              >
                <Bot className="h-5 w-5" />
                Try SwastikaCure AI
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onDoctorConsult}
                className="inline-flex items-center gap-2 border-2 border-white/80 px-7 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                <UserPlus className="h-5 w-5" />
                Consult a Doctor
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-blue-100">
              <span>✓ AI-assisted insights</span>
              <span>✓ Secure & confidential</span>
              <span>✓ Doctor-backed care</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block relative">
            <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900"
              alt="Healthcare professionals"
              className="relative rounded-2xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
