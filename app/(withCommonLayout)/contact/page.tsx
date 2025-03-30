"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const ContactUs = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, subject, message });
    // Here you would typically send the data to your backend
    setSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  // School contact information
  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5 text-green-600" />,
      title: "ফোন",
      details: [
        "প্রধান অফিস: ০১৭XXXXXXXX",
        "শিক্ষক কক্ষ: ০১৮XXXXXXXX",
        "অভিভাবক সহায়তা: ০১৯XXXXXXXX",
      ],
    },
    {
      icon: <Mail className="h-5 w-5 text-green-600" />,
      title: "ইমেইল",
      details: [
        "প্রধান: principal@school.edu.bd",
        "অ্যাডমিশন: admission@school.edu.bd",
        "অভিযোগ: complaints@school.edu.bd",
      ],
    },
    {
      icon: <MapPin className="h-5 w-5 text-green-600" />,
      title: "ঠিকানা",
      details: [
        "শত্রুজিৎপুর আব্দুল গণি মাধ্যমিক বালিকা বিদ্যালয়,",
        "শত্রুজিৎপুর ইউনিয়ন-পরিষদ,",
        "মাগুরা সদর, মাগুরা, খুলনা।",
      ],
    },
    {
      icon: <Clock className="h-5 w-5 text-green-600" />,
      title: "অফিস সময়",
      details: [
        "রবিবার - বৃহস্পতিবার: সকাল ৮টা - বিকাল ৪টা",
        "শুক্রবার: বন্ধ",
        "শনিবার: সকাল ৯টা - দুপুর ১টা",
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      name: "ফেসবুক",
      url: "https://facebook.com",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      name: "ইন্সটাগ্রাম",
      url: "https://instagram.com",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      name: "ইউটিউব",
      url: "https://youtube.com",
    },
  ];

  return (
    <div className="md:px-10 px-4 mt-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-green-600">যোগাযোগ করুন</h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700">
          আমাদের স্কুল সম্পর্কে আরও জানতে বা যেকোনো প্রশ্নের জন্য আমাদের সাথে
          যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে সর্বদা প্রস্তুত।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  mx-auto">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl text-green-700">
                যোগাযোগ তথ্য
              </CardTitle>
              <CardDescription>আমাদের সাথে সরাসরি যোগাযোগ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-1 bg-green-50 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">{item.title}</h3>
                    <div className="mt-1 space-y-1 text-sm text-gray-600">
                      {item.details.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t mt-6">
                <h3 className="font-medium text-green-800 mb-3">
                  সোশ্যাল মিডিয়া
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-100 hover:bg-green-200 transition-colors p-2 rounded-full"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Tabs (Form + Map) */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="message">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>মেসেজ পাঠান</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>স্কুলের অবস্থান</span>
              </TabsTrigger>
            </TabsList>

            {/* Message Form */}
            <TabsContent value="message" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>আমাদের লিখুন</CardTitle>
                  <CardDescription>
                    আপনার প্রশ্ন বা মতামত আমাদের জানান। আমরা যত দ্রুত সম্ভব
                    উত্তর দেব।
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                      <p className="font-medium">
                        আপনার বার্তা সফলভাবে পাঠানো হয়েছে!
                      </p>
                      <p className="text-sm mt-1">
                        আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-700 block">
                            আপনার নাম
                          </label>
                          <Input
                            placeholder="পূর্ণ নাম লিখুন"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-700 block">
                            ইমেইল
                          </label>
                          <Input
                            type="email"
                            placeholder="আপনার ইমেইল ঠিকানা"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-gray-700 block">
                            ফোন নম্বর
                          </label>
                          <Input
                            placeholder="আপনার ফোন নম্বর"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-gray-700 block">
                            বিষয়
                          </label>
                          <Input
                            placeholder="মেসেজের বিষয়"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-700 block">
                          আপনার বার্তা
                        </label>
                        <Textarea
                          placeholder="আপনার প্রশ্ন বা মতামত লিখুন..."
                          className="min-h-32"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                    </form>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {!submitted && (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      বার্তা পাঠান
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Map Section */}
            <TabsContent value="location" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>আমাদের অবস্থান</CardTitle>
                  <CardDescription>
                    স্কুলে আসার জন্য মানচিত্র দেখুন
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                    {/* OpenStreetMap iframe with updated coordinates (23.419547, 89.486752) */}
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=89.466752,23.399547,89.506752,23.439547&layer=mapnik&marker=23.419547,89.486752"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      title="স্কুলের অবস্থান"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">
                      যাতায়াত নির্দেশনা
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        শত্রুজিৎপুর ইউনিয়ন পরিষদ থেকে ২ মিনিটের হাঁটার দূরত্বে
                      </li>
                      <li>
                        শত্রুজিৎপুর কাঁচা বাজারের সামনে বাস থেকে নামতে হবে। (বাস
                        নম্বরঃ মাগুরা থেকে নড়াইল গামী বাস)
                      </li>

                      <li>
                        নিকটস্থ ল্যান্ডমার্ক: শত্রুজিৎপুর ইউনিয়ন পরিষদ,
                        শত্রুজিৎপুর প্রাথমিক বিদ্যালয়, শত্রুজিৎপুর কাঁচা বাজার।
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.openstreetmap.org/?mlat=23.419547&mlon=89.486752#map=15/23.419547/89.486752"
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                  >
                    <MapPin className="h-4 w-4" />
                    পূর্ণ মানচিত্রে দেখুন
                  </a>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mt-16 mb-16">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          সাধারণ জিজ্ঞাসা
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ভর্তি প্রক্রিয়া কী?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ভর্তির জন্য অনলাইনে আবেদন করুন অথবা সরাসরি ভর্তি অফিসে যোগাযোগ
                করুন। বিস্তারিত তথ্যের জন্য আমাদের ওয়েবসাইটের ভর্তি পাতা দেখুন।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">স্কুলের সময়সূচি কী?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                স্কুল সকাল ৮টা থেকে বিকাল ৩:৩০ পর্যন্ত চলে। প্রাথমিক বিভাগ: সকাল
                ৮টা - দুপুর ১টা, মাধ্যমিক বিভাগ: সকাল ৮টা - বিকাল ৩:৩০।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">স্কুল বাস সেবা আছে কি?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                না, আমাদের নিজস্ব পরিবহন সেবা নেই। রুট সম্পর্কে জানতে অফিসে
                যোগাযোগ করুন।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                বেতন কীভাবে পরিশোধ করা যায়?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                বেতন অনলাইনে, মোবাইল ব্যাংকিং বা সরাসরি স্কুল অফিসে পরিশোধ করা
                যায়। প্রতি মাসের ১০ তারিখের মধ্যে বেতন পরিশোধ করা আবশ্যক।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
