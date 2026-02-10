import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-[#3f3f3f] text-white px-4 py-4">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Logo (Slightly Bigger) */}
          <img
            src="/chennai-cit-logo.svg"
            alt="logo"
            className="w-32 md:w-36"
          />

          {/* Address + Email */}
          <div className="text-left">
            <p className="text-xs text-gray-300">
              Sarathy Nagar, Kundrathur, Chennai - 600069
            </p>

            <p className="text-xs text-gray-300">info@citchennai.net</p>
          </div>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex gap-4 text-gray-300">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook
              size={18}
              className="cursor-pointer hover:text-orange-500"
            />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter
              size={18}
              className="cursor-pointer hover:text-orange-500"
            />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram
              size={18}
              className="cursor-pointer hover:text-orange-500"
            />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <Youtube
              size={18}
              className="cursor-pointer hover:text-orange-500"
            />
          </a>

          {/* Replace number with real WhatsApp number */}
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
            <MessageCircle
              size={18}
              className="cursor-pointer hover:text-orange-500"
            />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-400 mt-2">
        © 2026 Chennai Institute of Technology
      </div>
    </footer>
  );
}

export default Footer;
