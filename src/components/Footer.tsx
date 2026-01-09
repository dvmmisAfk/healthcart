import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Linkedin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 tracking-wide text-blue-200">
              HealthCart
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Your trusted digital healthcare companion. From medicines to
              intelligent health services, HealthCart is built to simplify
              wellness for every household.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ['About Us', '/about'],
                ['Products', '/products'],
                ['AI Services', '/ai'],
                ['Contact', '/contact'],
              ].map(([label, link]) => (
                <li key={label}>
                  <a
                    href={link}
                    className="text-gray-300 hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                ['Shipping Info', '/shipping'],
                ['Returns', '/returns'],
                ['FAQ', '/faq'],
                ['Support', '/support'],
              ].map(([label, link]) => (
                <li key={label}>
                  <a
                    href={link}
                    className="text-gray-300 hover:text-white transition hover:translate-x-1 inline-block"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">
              Contact Us
            </h4>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:akshatthakur823@gmail.com"
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                akshatthakur823@gmail.com
              </a>

              <a
                href="tel:+919569226193"
                className="flex items-center text-gray-300 hover:text-white transition"
              >
                <Phone className="h-4 w-4 mr-2" />
                +91 9569226193
              </a>

              <div className="flex items-center gap-4 mt-4">
                <a href="https://facebook.com" target="_blank" className="hover:text-white transition">
                  <Facebook />
                </a>
                <a href="https://instagram.com/mr_akshat_somvanshi_" target="_blank" className="hover:text-white transition">
                  <Instagram />
                </a>
                <a href="https://twitter.com" target="_blank" className="hover:text-white transition">
                  <Twitter />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TEAM ================= */}
        <div className="mt-20">
          <h4 className="text-2xl font-semibold text-center text-blue-300 mb-12">
            Meet Our Team
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {[
              {
                name: 'Akshat Singh',
                role: 'Founder',
                desc:
                  'Visionary entrepreneur driving HealthCart’s mission to make quality healthcare accessible, affordable, and digital-first.',
              },
              {
                name: 'Amey Rathore',
                role: 'Managing Director',
                desc:
                  'Leads strategic growth and healthcare partnerships with a strong focus on innovation and customer trust.',
              },
              {
                name: 'Adarsh Kumar',
                role: 'Co-Founder',
                desc:
                  'Builds scalable operations and ensures HealthCart delivers consistent, quality-driven wellness solutions.',
              },
              {
                name: 'Divyam',
                role: 'Technology & Product Strategy Lead',
                desc:
                  'Architects the platform’s technical foundation, user experience, and scalable product vision powering HealthCart’s digital ecosystem.',
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center
                           hover:-translate-y-2 transition-transform duration-300"
              >
                <h5 className="font-bold text-lg text-blue-200">
                  {member.name}
                </h5>
                <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">
                  {member.role}
                </p>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                  {member.desc}
                </p>

                <div className="flex justify-center space-x-4 mt-5">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    className="hover:text-white transition"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    className="hover:text-white transition"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-400 text-sm">
          © 2024 HealthCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
