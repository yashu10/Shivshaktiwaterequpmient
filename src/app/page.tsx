"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";
import productsData from "../data/products.json";
import blogsData from "../data/blogs.json";

export default function Home() {
  const { openLeadPopup, openVideoModal } = useUI();

  // 1. Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "/assets/images/hero_machine_1.png",
      title: "Precision Engineering for the Beverage Industry",
      desc: "State-of-the-art washing, filling, and capping solutions tailored for high-volume production.",
    },
    {
      img: "/assets/images/hero_machine_2.png",
      title: "Advanced Rinsing Systems",
      desc: "Ensuring maximum hygiene and efficiency for global standards.",
    },
    {
      img: "/assets/images/hero_machine_3.png",
      title: "High-Speed Filling Technology",
      desc: "Robust, stainless steel construction designed for minimal downtime.",
    },
    {
      img: "/assets/images/hero_machine_4.png",
      title: "Automated Capping Units",
      desc: "Securing your product with precision torque and reliable sealing.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // 2. Video Gallery Carousel Logic
  const videoTrackRef = useRef<HTMLDivElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const videos = [
    {
      id: "6Pg6A-bWHjg",
      title: "Fully Auto Water Filling Line",
      thumb: "https://i.ytimg.com/vi/6Pg6A-bWHjg/hqdefault.jpg",
    },
    {
      id: "wbqcbmG2D3g",
      title: "PET Stretch Blow Moulding",
      thumb: "https://i.ytimg.com/vi/wbqcbmG2D3g/hqdefault.jpg",
    },
    {
      id: "FQfJBwNIgXU",
      title: "Shrink Wrap Collation System",
      thumb: "https://i.ytimg.com/vi/FQfJBwNIgXU/hqdefault.jpg",
    },
    {
      id: "iilA4-Z5TuU",
      title: "Oil Filling Machine (Servo System)",
      thumb: "https://i.ytimg.com/vi/iilA4-Z5TuU/hqdefault.jpg",
    },
    {
      id: "k586NB93dbg",
      title: "Automatic Juice Filling Machine",
      thumb: "https://i.ytimg.com/vi/k586NB93dbg/hqdefault.jpg",
    },
    {
      id: "6mTa6I_Bid0",
      title: "Soda Filling Machine",
      thumb: "https://i.ytimg.com/vi/6mTa6I_Bid0/hqdefault.jpg",
    },
    {
      id: "wLdaR-DqCRk",
      title: "Automatic 15 Ltr. Oil Tin Filling Machine",
      thumb: "https://i.ytimg.com/vi/wLdaR-DqCRk/hqdefault.jpg",
    },
    {
      id: "EzVnuGPVFbI",
      title: "Beer Bottle Filling & Sealing",
      thumb: "https://i.ytimg.com/vi/EzVnuGPVFbI/hqdefault.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoIndex((prev) => {
        const visibleCards = typeof window !== "undefined" && window.innerWidth > 991 ? 3 : (window.innerWidth > 576 ? 2 : 1);
        const maxIndex = Math.max(0, videos.length - visibleCards);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [videos.length]);

  useEffect(() => {
    if (videoTrackRef.current) {
      const cards = videoTrackRef.current.querySelectorAll(".video-card");
      if (cards.length > 0) {
        const cardWidth = (cards[0] as HTMLElement).offsetWidth;
        const gap = 30; // matches css layout
        const moveAmt = cardWidth + gap;
        videoTrackRef.current.style.transform = `translateX(-${videoIndex * moveAmt}px)`;
      }
    }
  }, [videoIndex]);

  // 3. FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "What types of filling machines do you manufacture?",
      a: "We manufacture a comprehensive range of filling machines including Water Filling Machines, Juice Filling Machines, Soda Filling Machines, Beer Filling Machines, and Oil Filling Machines. All our machines are designed with food-grade stainless steel (SS304/SS316) and comply with international hygiene and safety standards.",
      icon: "fa-industry",
    },
    {
      q: "Do you provide turnkey project solutions?",
      a: "Yes! We specialize in complete turnkey projects for packaged drinking water plants and beverage production lines. This includes everything from R.O. plant installation, blow moulding, filling & capping machines, labelling, batch coding, shrink wrapping, to final packaging — all under one roof.",
      icon: "fa-gears",
    },
    {
      q: "Do you export machinery internationally?",
      a: "Absolutely. We have successfully exported our machinery to over 25+ countries across Africa, the Middle East, Southeast Asia, and South America. Our machines are designed to meet international quality standards with CE marking and ISO certification.",
      icon: "fa-globe",
    },
    {
      q: "What certifications does your company hold?",
      a: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. is an ISO 9001:2015 certified company. Our products meet BIS (Bureau of Indian Standards) compliance, and we maintain rigorous quality checks through our in-house Chemical and Micro-Biology laboratories.",
      icon: "fa-certificate",
    },
    {
      q: "What kind of after-sales support do you offer?",
      a: "We provide 24/7 technical support, on-site installation assistance, operator training, and a comprehensive warranty on all our machines. Our dedicated service team ensures minimal downtime with prompt spare parts delivery and remote troubleshooting support.",
      icon: "fa-headset",
    },
    {
      q: "What is the production capacity of your machines?",
      a: "Our filling machines are available in a wide range of capacities — from 1,000 bottles per hour (BPH) for small-scale operations to 12,000+ BPH for large-scale industrial production. We customize the capacity based on your specific requirements and budget.",
      icon: "fa-bolt",
    },
    {
      q: "What is the typical delivery and installation timeline?",
      a: "Standard delivery timelines range from 30 to 60 days depending on machine complexity and customization requirements. Installation and commissioning typically take 5-10 days on-site, including full operator training and trial runs.",
      icon: "fa-truck-fast",
    },
    {
      q: "How can I get a quotation for my project?",
      a: "Simply click the 'Request A Quote' button or call us directly at +91 9712666160. Share your production requirements, bottle sizes, and desired capacity — our engineering team will provide a detailed proposal with competitive pricing within 24 hours.",
      icon: "fa-hand-holding-dollar",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Get first 13 products for home page catalog preview
  const homeProducts = productsData.slice(0, 13);
  // Get first 3 blogs for preview
  const homeBlogs = blogsData.slice(0, 3);

  return (
    <main>
      {/* Hero Slider Section */}
      <section className="hero" id="home">
        <div className="slider-container" id="heroSlider">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`slide ${idx === currentSlide ? "active" : ""}`}
              style={{ backgroundImage: `url('${slide.img}')` }}
            >
              <div className="slide-overlay"></div>
              <div className="container slide-content">
                <h1 className="fade-up">{slide.title}</h1>
                <p className="fade-up delay-1">{slide.desc}</p>
                <div className="slide-actions fade-up delay-2">
                  <a href="#products" className="btn btn-primary">
                    Explore Machinery
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button className="slider-btn prev" onClick={handlePrevSlide} aria-label="Previous Slide">
            &#10094;
          </button>
          <button className="slider-btn next" onClick={handleNextSlide} aria-label="Next Slide">
            &#10095;
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about section-padding" id="about">
        <div className="container about-container">
          <div className="about-image animate-on-scroll visible">
            <img src="/assets/images/team_thumb.png" alt="Engineering Team" />
            <div className="floating-badge">
              <span className="year">25+</span>
              <span className="text">
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>
          <div className="about-text animate-on-scroll visible">
            <h2 className="section-title">Trusted Since 1998</h2>
            <h3 className="section-subtitle">Pioneering Industrial B2B Machinery</h3>
            <p>
              SHIV SHAKTI WATER EQUIPMENT PVT. LTD. is a premier manufacturer and exporter based in Ahmedabad, specializing
              in comprehensive turnkey projects for the packaged drinking water and beverage industries.
            </p>
            <p>
              We blend robust engineering with innovation, ensuring every machine delivered meets international
              quality standards. From standalone equipment to fully automated lines, our mission is to empower your production.
            </p>
            <ul className="feature-list">
              <li>
                <span className="icon">&#10003;</span> ISO Certified Quality
              </li>
              <li>
                <span className="icon">&#10003;</span> Global Export Network
              </li>
              <li>
                <span className="icon">&#10003;</span> 24/7 Technical Support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us section-padding" id="why-us">
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title">Why SHIV SHAKTI WATER EQUIPMENT PVT. LTD.</h2>
            <p style={{ maxWidth: "800px", margin: "0 auto" }}>
              Trusted manufacturers in Gujarat, India, providing high-quality solutions for all your water treatment needs.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-medal"></i>
              </div>
              <h3>Our Quality</h3>
              <p>
                Presenting our superior Mineral Water Plant with automatic and manual operation for ease and reliability.
                Evaluated by our expert Quality Management team, guaranteeing flawless performance.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-users-gear"></i>
              </div>
              <h3>Our Team</h3>
              <p>
                Backed by a team of skilled professionals, we conduct business operations effectively. Their dedication
                ensures the delivery of precisely engineered machines, fostering a strong market reputation.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3>24x7 Support</h3>
              <p>
                Utilizing advanced technology, we manufacture market-competitive products. Our items adhere to industry
                standards and undergo rigorous quality testing before final dispatch.
              </p>
            </div>
            <div className="why-card">
              <div className="why-icon">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3>Vision - Mission</h3>
              <p>
                &quot;Excellence in service is our pledge to every customer, epitomizing our commitment. Experience
                unparalleled support tailored to your needs, ensuring satisfaction with every product.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog Section */}
      <section className="products section-padding bg-light" id="products">
        <div className="container">
          <div className="section-header center animate-on-scroll visible">
            <h2 className="section-title">Our Machinery Catalog</h2>
            <p>Advanced equipment designed to scale your operations.</p>
          </div>

          <div className="product-grid">
            {homeProducts.map((p, idx) => {
              const slug = p.filename.replace(".html", "");
              // Handle image paths that might be plain filename or contain directory prefix
              const imgPath = p.image.startsWith("prod_") || p.image.startsWith("hero_")
                ? `/assets/images/${p.image}`
                : `/assets/images/${p.image}`;
              return (
                <div key={idx} className="product-card animate-on-scroll visible">
                  <div className="product-image">
                    <img
                      src={imgPath}
                      alt={p.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/images/prod_water_filling.png";
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{p.title}</h3>
                    <p>{p.tagline || "Fully automatic packing & bottling solutions."}</p>
                    <Link href={`/products/${slug}`} className="read-more">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/products" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              View All Machinery
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="industries section-padding" id="industries">
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title">Industries We Served!</h2>
            <p style={{ maxWidth: "800px", margin: "0 auto" }}>
              Our machines are highly demanded across industries for filling, capping, and packaging. We offer reliable
              and efficient solutions tailored to meet the diverse needs of these industries.
            </p>
          </div>

          <div className="industries-grid">
            <div className="industry-card">
              <i className="fa-solid fa-flask"></i>
              <h3>Pharmaceutical</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-vial-virus"></i>
              <h3>Chemical</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-utensils"></i>
              <h3>Food Processing</h3>
            </div>
            <div className="industry-card">
              <i className="fa-solid fa-bottle-water"></i>
              <h3>Mineral Water</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="video-gallery section-padding bg-light" id="video">
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title">Machinery in Action</h2>
            <p>Watch our industrial equipment run at maximum efficiency.</p>
          </div>
          <div className="video-carousel-container" id="videoCarousel" style={{ overflow: "hidden" }}>
            <div
              className="video-carousel-track"
              id="videoTrack"
              ref={videoTrackRef}
              style={{ display: "flex", transition: "transform 0.5s ease" }}
            >
              {videos.map((vid, idx) => (
                <div key={idx} className="video-card" style={{ flexShrink: 0 }}>
                  <div
                    className="video-wrapper"
                    onClick={() => openVideoModal(`https://www.youtube.com/embed/${vid.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={vid.thumb} alt={vid.title} className="video-thumb" />
                    <div className="play-btn"></div>
                  </div>
                  <h3 style={{ fontSize: "1rem", lineHeight: "1.4" }}>{vid.title}</h3>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/video" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              View All Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section section-padding bg-light" id="blog">
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title">Latest News & Blogs</h2>
            <p>Stay updated with the latest trends, tips, and innovations in the bottling industry.</p>
          </div>
          <div className="blog-grid">
            {homeBlogs.map((blog, idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-img-wrapper">
                  <img src={blog.image} alt={blog.title} />
                  <div className="blog-date">{blog.date}</div>
                </div>
                <div className="blog-content">
                  <span className="blog-category">{blog.category}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <Link href={`/blog/${blog.slug}`} className="blog-read-more">
                    Read Full Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/blog" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Logo Section */}
      <section className="clients section-padding" id="clients">
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title">Our Esteemed Clients</h2>
            <p>We are trusted by industry leaders across the globe.</p>
          </div>
          <div className="clients-slider-wrapper">
            <div className="clients-track">
              {/* Duplicate list to enable infinite scroll styling */}
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((num, idx) => (
                <div key={idx} className="client-logo">
                  <h3>Client {num}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section
        className="global-reach section-padding"
        id="global-reach"
        style={{ backgroundImage: "url('/assets/images/bg_factory.png')" }}
      >
        <div className="glass-overlay new-glass-overlay"></div>
        <div className="container relative z-index-1">
          <div className="global-reach-wrapper">
            <div className="reach-text-content animate-on-scroll visible">
              <span className="text-accent">Worldwide Presence</span>
              <h2 className="section-title text-white" style={{ textAlign: "left", marginBottom: "20px" }}>
                Exporting Excellence Globally
              </h2>
              <p className="text-white" style={{ fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "40px", opacity: 0.9 }}>
                Our robust network spans multiple continents. We deliver and install top-tier machinery across the globe with
                comprehensive after-sales support, ensuring your production never stops.
              </p>

              <div className="new-stats-grid">
                <div className="new-stat-card">
                  <div className="icon-box">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">25+</h3>
                    <p>Countries Exported</p>
                  </div>
                </div>
                <div className="new-stat-card">
                  <div className="icon-box">
                    <i className="fa-solid fa-industry"></i>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">500+</h3>
                    <p>Projects Delivered</p>
                  </div>
                </div>
                <div className="new-stat-card">
                  <div className="icon-box">
                    <i className="fa-solid fa-handshake-angle"></i>
                  </div>
                  <div className="stat-info">
                    <h3 className="counter">100%</h3>
                    <p>Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reach-map-content animate-on-scroll delay-1 visible">
              <div className="map-floating-wrapper">
                <img src="/assets/images/bg_world_map.png" alt="Global Network Map" className="world-map-animated" />
                <div className="pulse-dot" style={{ top: "35%", left: "22%" }}></div>
                <div className="pulse-dot" style={{ top: "45%", left: "48%" }}></div>
                <div className="pulse-dot" style={{ top: "55%", left: "75%" }}></div>
                <div className="pulse-dot" style={{ top: "38%", left: "82%" }}></div>
                <div className="pulse-dot" style={{ top: "75%", left: "62%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section-padding" id="faq">
        <div className="container">
          <div className="section-header center animate-on-scroll visible">
            <span className="faq-badge">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">Everything you need to know about our machinery, processes, and services.</p>
          </div>

          <div className="faq-wrapper animate-on-scroll visible">
            {/* Left Column */}
            <div className="faq-col">
              {faqs.slice(0, 4).map((faq, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`} id={`faq-${idx + 1}`}>
                  <button
                    className="faq-question"
                    aria-expanded={activeFaq === idx}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="faq-icon">
                      <i className={`fa-solid ${faq.icon}`}></i>
                    </span>
                    <span>{faq.q}</span>
                    <span className="faq-toggle">
                      <span className="faq-plus"></span>
                    </span>
                  </button>
                  <div
                    className="faq-answer"
                    id={`faq-answer-${idx + 1}`}
                    style={{
                      maxHeight: activeFaq === idx ? "200px" : "0px",
                      opacity: activeFaq === idx ? 1 : 0,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="faq-col">
              {faqs.slice(4, 8).map((faq, idx) => {
                const actualIdx = idx + 4;
                return (
                  <div key={actualIdx} className={`faq-item ${activeFaq === actualIdx ? "active" : ""}`} id={`faq-${actualIdx + 1}`}>
                    <button
                      className="faq-question"
                      aria-expanded={activeFaq === actualIdx}
                      onClick={() => toggleFaq(actualIdx)}
                    >
                      <span className="faq-icon">
                        <i className={`fa-solid ${faq.icon}`}></i>
                      </span>
                      <span>{faq.q}</span>
                      <span className="faq-toggle">
                        <span className="faq-plus"></span>
                      </span>
                    </button>
                    <div
                      className="faq-answer"
                      id={`faq-answer-${actualIdx + 1}`}
                      style={{
                        maxHeight: activeFaq === actualIdx ? "200px" : "0px",
                        opacity: activeFaq === actualIdx ? 1 : 0,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="faq-cta animate-on-scroll visible">
            <p>Still have questions? We're here to help!</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
