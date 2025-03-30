// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Mail, Timer, Construction } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UnderConstructionPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to an API
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-7xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Construction className="h-16 w-16 mx-auto text-green-600" />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            ওয়েবপেজ নির্মাণাধীন
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            আমরা আমাদের নতুন ওয়েবপেজ তৈরি করছি। শীঘ্রই ফিরে আসছি!
          </p>
        </div>

        {/* Countdown Timer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">উদ্বোধনের সময়</CardTitle>
            <CardDescription className="text-center">
              আমাদের নতুন ওয়েবপেজ উদ্বোধনের জন্য অপেক্ষা করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold">{countdown.days}</div>
                <div className="text-sm text-gray-500">দিন</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold">{countdown.hours}</div>
                <div className="text-sm text-gray-500">ঘন্টা</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold">{countdown.minutes}</div>
                <div className="text-sm text-gray-500">মিনিট</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold">{countdown.seconds}</div>
                <div className="text-sm text-gray-500">সেকেন্ড</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Signup */}
        <Card>
          <CardHeader>
            <CardTitle>আপডেট পেতে সাবস্ক্রাইব করুন</CardTitle>
            <CardDescription>
              আমাদের ওয়েবপেজ চালু হলে সর্বপ্রথম জানতে আপনার ইমেইল দিন
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subscribed ? (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>ধন্যবাদ!</AlertTitle>
                <AlertDescription>
                  আপনি সফলভাবে আমাদের আপডেট লিস্টে যোগ হয়েছেন।
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="আপনার ইমেইল ঠিকানা"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit">
                  <Mail className="mr-2 h-4 w-4" />
                  সাবস্ক্রাইব
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Features Coming Soon */}
        <Card>
          <CardHeader>
            <CardTitle>আসন্ন বৈশিষ্ট্য</CardTitle>
            <CardDescription>আমাদের নতুন ওয়েবসাইটে যা আসছে</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                  1
                </span>
                <span>নতুন আধুনিক ইউজার ইন্টারফেস</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                  2
                </span>
                <span>আরও দ্রুত ও নিরাপদ অভিজ্ঞতা</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                  3
                </span>
                <span>মোবাইল ও ট্যাবলেট ডিভাইসে সম্পূর্ণ সমর্থন</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                  4
                </span>
                <span>নতুন ও উন্নত সার্চ ফাংশন</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>যোগাযোগ করুন</CardTitle>
            <CardDescription>
              কোন প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-gray-600" />
              <span>mohonsaha108gmail.com</span>
            </div>
            <div className="flex items-center">
              <Timer className="h-5 w-5 mr-2 text-gray-600" />
              <span>সোম - শুক্র: সকাল ১০টা - বিকাল ৫টা</span>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-500 text-center">
            © ২০২৫ মোহন সাহা। সর্বস্বত্ব সংরক্ষিত।
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
