

import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-gray-900 text-white">




      {/* Secondary Footer - Important Links */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0">
              <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    গোপনীয়তা নীতি
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    সেবার শর্তাবলী
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    সাইটম্যাপ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    কর্মসংস্থান
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-gray-500">
              © {currentYear} মোহন সাহা সর্বস্বত্ব সংরক্ষিত। ডিজাইন এবং
              ডেভেলপমেন্ট{" "}
              <a
                href="https://prod950.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                মোহন সাহা
              </a>
            </p>
          </div>
        </div>
      </div>

    
    </footer>
  );
};

export default Footer;
