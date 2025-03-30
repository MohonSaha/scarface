import Achievements from "@/components/pagesUi/Home/Achievements/Achievements";
// import BrilliantStudentSection from "@/components/pagesUi/Home/BrilliantStudentSection/BrilliantStudentSection";
import ClassroomCarousel from "@/components/pagesUi/Home/ClassroomSection/ClassroomSection";
import ContactForm from "@/components/pagesUi/Home/ContactForm/ContactForm";
import FAQPage from "@/components/pagesUi/Home/FAQSection/FAQSection";
import HeroSlider from "@/components/pagesUi/Home/HeroSlider/HeroSlider";
import EnhancedGallery from "@/components/pagesUi/Home/ImageGallery/ImageGallery";
import LandingPage from "@/components/pagesUi/Home/LandingPage/page";
import NoticeBoard from "@/components/pagesUi/Home/NoticeBoard/NoticeBoard";
import ModernSchoolCalendar from "@/components/pagesUi/Home/SchoolCalendar/SchoolCalendar";
import SchoolIntroductionSection from "@/components/pagesUi/Home/SchoolIntroductionSection/SchoolIntroductionSection";
import TeacherSection from "@/components/pagesUi/Home/TeachersSections/TeachersSections";
import Testimonials from "@/components/pagesUi/Home/Testimonials/Testimonials";

const HomePage = () => {
  const galleryImages = [
    {
      id: "1",
      src: "https://i.ibb.co.com/spVsm6jw/chairmain.jpg",
      alt: "Large group photo with students and teachers",
      caption: "বক্তব্য রাখছেন প্রতিষ্ঠাতা",
      category: "Events",
    },
    {
      id: "2",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Person in blue suit giving a speech",
      caption: "দেশ গড়ার হবে দিশাদারী",
      category: "Speeches",
    },
    {
      id: "3",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Colorful event with decorations",
      caption: "দেশ গড়ার হবে দিশাদারী",
      category: "Events",
    },
    {
      id: "4",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Decorated event stage with people",
      caption: "শ্রদ্ধায় স্মরণ করা হয়েছে শহীদদের",
      category: "Events",
    },
    {
      id: "5",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Group of people at an event",
      caption: "অর্জন শিক্ষা এবং উন্নয়নের অভিজ্ঞতা",
      category: "Gatherings",
    },
    {
      id: "6",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Person on a decorated rickshaw",
      caption: "সৃজনশীল শিক্ষা দান",
      category: "Activities",
    },
    {
      id: "7",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Group of people on bicycles",
      caption: "গণতন্ত্র দিবস পালন করা",
      category: "Activities",
    },
    {
      id: "8",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Colorful indoor event",
      caption: "শিক্ষাঙ্গনে শিক্ষার আলো",
      category: "Events",
    },
    {
      id: "9",
      src: "https://i.ibb.co.com/S7DSC5r5/girls.jpg",
      alt: "Small group of people",
      caption: "শিক্ষা দানে সহযোগী দিনপঞ্জি",
      category: "Gatherings",
    },
    {
      id: "10",
      src: "https://i.ibb.co.com/gbrcZzX4/481270318-3962171960720851-4740464838177645568-n.jpg",
      alt: "Person in blue suit giving a speech",
      caption: "বক্তব্য রাখছেন বিদ্যালয় প্রধান",
      category: "Events",
    },
  ];

  const classrooms = [
    {
      id: 6,
      title: "ষষ্ঠ শ্রেণী",
      count: 22,
      description:
        "ষষ্ঠ শ্রেণি শিক্ষার জন্য আদর্শ ক্লাসরুম ও শিক্ষক, রচনামূলক শিক্ষাপদ্ধতি উন্নয়ন এবং গাইডবুক।",
      imageUrl: "https://i.ibb.co.com/bFtwpFN/death.jpg",
      buttonText: "বিস্তারিত দেখুন",
    },
    {
      id: 7,
      title: "সপ্তম শ্রেণী",
      count: 25,
      description:
        "সপ্তম শ্রেণিতে উন্নত পাঠ্যক্রম, হাতে-কলমে শেখার সুযোগ এবং পরীক্ষার প্রস্তুতির জন্য বিশেষ গাইডলাইন।",
      imageUrl: "https://i.ibb.co.com/YBQYw6bR/real-2.jpg",
      buttonText: "বিস্তারিত দেখুন",
    },
    {
      id: 8,
      title: "অষ্টম শ্রেণী",
      count: 28,
      description:
        "অষ্টম শ্রেণিতে প্রাক-জেএসসি প্রস্তুতি, বিজ্ঞান ও গণিতের বিশেষ কর্মশালা এবং উন্নত শিক্ষামূলক কার্যক্রম।",
      imageUrl: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
      buttonText: "বিস্তারিত দেখুন",
    },
    {
      id: 9,
      title: "নবম শ্রেণী",
      count: 30,
      description:
        "নবম শ্রেণিতে এসএসসি ভিত্তিক শিক্ষার প্রস্তুতি, নির্বাচিত বিষয়ে গভীরতর বিশ্লেষণ এবং ল্যাব কার্যক্রম।",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: "বিস্তারিত দেখুন",
    },
    {
      id: 10,
      title: "দশম শ্রেণী",
      count: 35,
      description:
        "দশম শ্রেণিতে এসএসসি পরীক্ষার জন্য বিশেষ প্রস্তুতি ক্লাস, মডেল টেস্ট এবং বিষয়ভিত্তিক গাইডলাইন।",
      imageUrl: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
      buttonText: "বিস্তারিত দেখুন",
    },
  ];

  return (
    <div className="">
      <LandingPage/>
     
    </div>
  );
};

export default HomePage;
