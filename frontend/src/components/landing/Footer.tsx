import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#111827] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-violet-400 mb-4">
              SkillSwap
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Learn from your peers. Teach what you know.
              Build connections and grow together.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">Home</Link>
              <Link to="/">Features</Link>
              <Link to="/">How It Works</Link>
              <Link to="/">Explore Skills</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">About Us</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Connect
            </h3>

            <div className="flex gap-5 text-2xl">
              <span className="cursor-pointer hover:scale-110 transition">
                💼
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                🌐
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                📧
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
          © 2026 SkillSwap. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;