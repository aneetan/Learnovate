import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import PageTransition from "../components/common/PageTransition";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeFooter from "../components/home/HomeFooter";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import FeedbackForm from "../components/home/FeedbackForm";


const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Frontend Developer",
      company: "TechCorp",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      quote:
        "Learnovate helped me find an amazing mentor who guided me through learning React. I landed my dream job within 3 months!",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Senior UX Designer",
      company: "DesignHub",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      quote:
        "Being a mentor on Learnovate has been incredibly rewarding. I've helped several apprentices grow their skills.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Data Scientist",
      company: "DataViz",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
      quote:
        "The structured mentorship program at Learnovate helped me transition from academia to industry.",
    },
  ];

  // Mentor categories data
  const categories = [
    {
      id: 1,
      name: "Software Development",
      icon: "💻",
      image:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&auto=format&fit=crop&w=1812&q=80",
      mentorCount: 245,
      description: "Expert guidance in web, mobile, and software engineering",
      skills: ["JavaScript", "Cloud Computing", "React", "Node.js", "Java", "Python"],
    },
    {
      id: 2,
      name: "Design & UX",
      icon: "🎨",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
      mentorCount: 178,
      description: "Learn UI/UX design, graphic design, and product design",
      skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Product Design", "Design Systems"],
    },
    {
      id: 3,
      name: "Data Science & AI",
      icon: "📊",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      mentorCount: 132,
      description: "Master data science, machine learning, and AI technologies",
      skills: ["Python", "Machine Learning", "Data Analysis", "Deep Learning", "NLP", "Computer Vision"],
    },
    {
      id: 4,
      name: "Product Management",
      icon: "🚀",
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      mentorCount: 98,
      description: "Learn product strategy, roadmapping, and execution",
      skills: ["Product Strategy", "User Research", "Agile", "Roadmapping", "Go-to-Market", "Analytics"],
    },
    {
      id: 5,
      name: "Marketing & Growth",
      icon: "📈",
      image:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      mentorCount: 87,
      description: "Develop marketing strategies and growth tactics",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics", "Growth Hacking"],
    },
    {
      id: 6,
      name: "Leadership & Management",
      icon: "👥",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      mentorCount: 112,
      description: "Develop leadership skills and management techniques",
      skills: ["Team Management", "Leadership", "Communication", "Strategy", "Conflict Resolution", "Coaching"],
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How does Learnovate work?",
      answer:
        "Learnovate connects mentors and apprentices based on skills, goals, and availability.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Learnovate is currently free for all users during our beta period.",
    },
    {
      question: "How are mentors vetted?",
      answer:
        "All mentors go through a verification process that includes skill assessment.",
    },
    {
      question: "Can I be both a mentor and an apprentice?",
      answer:
        "Yes! Many of our users are both mentors and apprentices.",
    },
    {
      question: "What if I'm not satisfied with my mentor?",
      answer:
        "If you're not satisfied, you can end the relationship and find a new mentor.",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection observer hooks
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const toggleFaq = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="home pt-16 lg:pt-20">
        <HomeNavbar />
        <HeroSection />
        <StatsSection ref={statsRef} inView={statsInView} />
        <CategoriesSection
          ref={categoriesRef}
          inView={categoriesInView}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <FeaturesSection ref={featuresRef} inView={featuresInView} />
        <HowItWorksSection ref={howItWorksRef} inView={howItWorksInView} />
        <TestimonialsSection
          testimonials={testimonials}
          activeTestimonial={activeTestimonial}
          setActiveTestimonial={setActiveTestimonial}
        />
        <FAQSection faqs={faqs} expanded={expanded} toggleFaq={toggleFaq} />
        <CTASection />
        <FeedbackForm />
        <HomeFooter />
      </div>
    </PageTransition>
  );
};

export default Home;