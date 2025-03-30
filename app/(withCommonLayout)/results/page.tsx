"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the student data structure
interface TopStudent {
  name: string;
  roll: string;
  gpa: string;
  imageUrl: string;
}

// Define the class data structure
interface ClassData {
  id: string;
  name: string;
  resultImages: string[];
  examName: string;
  topStudents: TopStudent[];
}

// Mock data for class results
const classData: ClassData[] = [
  {
    id: "6",
    name: "৬ষ্ঠ শ্রেণী",
    resultImages: [
      "https://i.ibb.co.com/n8BjFKt/Voilin.jpg",
      "https://i.ibb.co.com/zs4kBV5/Screenshot-7.png",
      "https://i.ibb.co.com/nDdhQpg/vocal.jpg",
    ],
    examName: "অর্ধবার্ষিক পরীক্ষা",
    topStudents: [
      {
        name: "আবদুল্লাহ আল মাহমুদ",
        roll: "০১",
        gpa: "৫.০০",
        imageUrl: "https://i.ibb.co.com/tHXn3R3/team2.jpg",
      },
      {
        name: "নুসরাত জাহান",
        roll: "১২",
        gpa: "৪.৯৫",
        imageUrl: "https://i.ibb.co.com/tHXn3R3/team2.jpg",
      },
      {
        name: "মোহাম্মদ রাফি",
        roll: "০৭",
        gpa: "৪.৯০",
        imageUrl: "https://i.ibb.co.com/tHXn3R3/team2.jpg",
      },
    ],
  },
  {
    id: "7",
    name: "৭ম শ্রেণী",
    resultImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    examName: "অর্ধবার্ষিক পরীক্ষা",
    topStudents: [
      {
        name: "ফারিহা আক্তার",
        roll: "০৪",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "তানভীর আহমেদ",
        roll: "১৫",
        gpa: "৪.৯৫",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "সুমাইয়া খান",
        roll: "০৮",
        gpa: "৪.৯২",
        imageUrl: "/api/placeholder/100/100",
      },
    ],
  },
  {
    id: "8",
    name: "৮ম শ্রেণী",
    resultImages: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    examName: "অর্ধবার্ষিক পরীক্ষা",
    topStudents: [
      {
        name: "আসিফ ইকবাল",
        roll: "০২",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "নাজনীন নাহার",
        roll: "১০",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "সাজিদ হাসান",
        roll: "১৪",
        gpa: "৪.৯৮",
        imageUrl: "/api/placeholder/100/100",
      },
    ],
  },
  {
    id: "9",
    name: "৯ম শ্রেণী",
    resultImages: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    examName: "অর্ধবার্ষিক পরীক্ষা",
    topStudents: [
      {
        name: "তাসনিম জাহান",
        roll: "০৫",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "রাফিদ হাসান",
        roll: "১১",
        gpa: "৪.৯৭",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "লুবনা আক্তার",
        roll: "০৯",
        gpa: "৪.৯৫",
        imageUrl: "/api/placeholder/100/100",
      },
    ],
  },
  {
    id: "10",
    name: "১০ম শ্রেণী",
    resultImages: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    examName: "অর্ধবার্ষিক পরীক্ষা",
    topStudents: [
      {
        name: "নাফিজ আহমেদ",
        roll: "০৭",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "সাবরিনা সুলতানা",
        roll: "১৩",
        gpa: "৫.০০",
        imageUrl: "/api/placeholder/100/100",
      },
      {
        name: "আরিফ হোসেন",
        roll: "০৩",
        gpa: "৪.৯৮",
        imageUrl: "/api/placeholder/100/100",
      },
    ],
  },
];

export default function Results() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"select" | "view">("select");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedClassData = classData.find((cls) => cls.id === selectedClass);

  const handleClassSelect = (value: string) => {
    setSelectedClass(value);
    setCurrentImageIndex(0); // Reset image index when class changes
  };

  const handleViewResult = () => {
    if (selectedClass) {
      setCurrentView("view");
    }
  };

  const handleBackToSelection = () => {
    setCurrentView("select");
  };

  const handlePreviousImage = () => {
    if (selectedClassData) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedClassData.resultImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedClassData) {
      setCurrentImageIndex((prev) =>
        prev === selectedClassData.resultImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-6 px-4 md:px-10">
      <div className="container mx-auto ">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              ফলাফল তালিকা
            </h1>
            <p className="text-center mb-8">
              আপনার শ্রেণী নির্বাচন করুন এবং ফলাফল দেখুন
            </p>

            <Tabs value={currentView} className="w-full">
              <TabsContent value="select" className="mt-0">
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <label className="text-lg font-medium">
                      আপনার শ্রেণী নির্বাচন করুন:
                    </label>
                    <Select onValueChange={handleClassSelect}>
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {classData.map((cls) => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleViewResult}
                      disabled={!selectedClass}
                      className="px-8"
                    >
                      ফলাফল দেখুন
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="view" className="mt-0">
                {selectedClassData && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedClassData.name} ফলাফল
                      </h2>
                      <p className="text-lg text-gray-600 mb-4">
                        {selectedClassData.examName}
                      </p>
                    </div>

                    {/* Top Students Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-center mb-6">
                        সেরা শিক্ষার্থী
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedClassData.topStudents.map((student, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div className="p-4 flex flex-col items-center">
                              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                                <Image
                                  src={student.imageUrl}
                                  alt={student.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <Badge
                                className="mb-2"
                                variant={index === 0 ? "default" : "outline"}
                              >
                                {index === 0
                                  ? "প্রথম"
                                  : index === 1
                                  ? "দ্বিতীয়"
                                  : "তৃতীয়"}
                              </Badge>
                              <h4 className="font-bold text-lg text-center">
                                {student.name}
                              </h4>
                              <p className="text-gray-600">
                                রোল: {student.roll}
                              </p>
                              <p className="font-semibold">
                                জিপিএ: {student.gpa}
                              </p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Result Sheet Carousel */}
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6">
                        সম্পূর্ণ ফলাফল শীট
                      </h3>
                      <div className="relative flex justify-center">
                        <div className="relative rounded overflow-hidden shadow-md w-full max-w-3xl">
                          <Image
                            src={
                              selectedClassData.resultImages[currentImageIndex]
                            }
                            alt={`${selectedClassData.name} ফলাফল`}
                            width={800}
                            height={600}
                            className="object-contain mx-auto"
                          />

                          {/* Image counter */}
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                              {currentImageIndex + 1} /{" "}
                              {selectedClassData.resultImages.length}
                            </span>
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        {selectedClassData.resultImages.length > 1 && (
                          <>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                              onClick={handlePreviousImage}
                              aria-label="পূর্বের পৃষ্ঠা"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                              onClick={handleNextImage}
                              aria-label="পরবর্তী পৃষ্ঠা"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button
                        onClick={handleBackToSelection}
                        variant="outline"
                        className="px-8"
                      >
                        ফিরে যান
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
