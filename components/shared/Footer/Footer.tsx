

import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "প্রধান পাতা", href: "/" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "ভর্তি", href: "/admission" },
    { name: "ফলাফল", href: "/results" },
    { name: "রুটিন", href: "/routine" },
    // { name: "নোটিশ", href: "/notices" },
    { name: "গ্যালারি", href: "/gallery" },
    { name: "যোগাযোগ", href: "/contact" },
    { name: "নিরাপত্তা ও সহায়তা", href: "/safety-support" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="https://i.ibb.co.com/LD27kXxw/473068280-3922681521336562-55110548601466905-n-fotor-bg-remover-20250312165419.png"
                alt="স্কুল লোগো"
                width={60}
                height={60}
                className="mr-3"
              />
              <h3 className="text-md font-bold">
                শত্রুজিৎপুর আব্দুল গণি মাধ্যমিক বালিকা বিদ্যালয়
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              ১৯৭৫ সাল থেকে তরুণ প্রজন্মকে শক্তিশালী করে তুলছি। আমরা প্রতিটি
              শিক্ষার্থীর শিক্ষাগত উৎকর্ষতা ও সামগ্রিক বিকাশের জন্য প্রচেষ্টা
              করি।
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              যোগাযোগ করুন
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  ১২৩ শিক্ষা সড়ক, একাডেমিক জেলা, শহর, ১২৩৪৫
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-400">(১২৩) ৪৫৬-৭৮৯০</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-400">
                  info@excellenceacademy.edu
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-400">
                  সোম-শুক্র: সকাল ৭:৩০ - দুপুর ৪:০০
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">
              নিউজলেটার
            </h3>
            <p className="text-gray-400 mb-4">
              স্কুলের অনুষ্ঠান, খবর এবং বিজ্ঞপ্তি সম্পর্কে আপডেট পেতে আমাদের
              নিউজলেটারে সাবস্ক্রাইব করুন।
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="আপনার ইমেইল ঠিকানা"
                className="bg-gray-800 border-gray-700 focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                সাবস্ক্রাইব করুন
              </Button>
            </div>
          </div>
        </div>
      </div>



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
