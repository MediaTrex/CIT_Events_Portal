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
    <footer className="w-full bg-[#3f3f3f] text-white px-6 py-10 mt-5">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          {/* Logo (Bigger) */}
          <img
            src="/chennai-cit-logo.svg"
            alt="logo"
            className="w-44 md:w-52"
          />

          {/* Address + Email */}
          <div className="text-left space-y-2">
            <p className="text-sm md:text-base text-gray-300">
              Sarathy Nagar, Kundrathur, Chennai - 600069
            </p>

            <p className="text-sm md:text-base text-gray-300">
              info@citchennai.net
            </p>
          </div>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6 text-gray-300">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook
              size={26}
              className="cursor-pointer hover:text-orange-500 transition"
            />
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter
              size={26}
              className="cursor-pointer hover:text-orange-500 transition"
            />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram
              size={26}
              className="cursor-pointer hover:text-orange-500 transition"
            />
          </a>

          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <Youtube
              size={26}
              className="cursor-pointer hover:text-orange-500 transition"
            />
          </a>

          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
            <MessageCircle
              size={26}
              className="cursor-pointer hover:text-orange-500 transition"
            />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-600 my-6"></div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-400">
        © 2026 Chennai Institute of Technology. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
