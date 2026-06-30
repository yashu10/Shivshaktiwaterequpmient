"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUI } from "../context/UIContext";

export const Footer: React.FC = () => {
  const { openLeadPopup } = useUI();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container relative">
        <div className="footer-grid new-footer">
          {/* Column 1 */}
          <div className="footer-about">
            <img
              src="/assets/images/shiv_shakti_logo.png"
              alt="Shiv Shakti Enterprise"
              className="footer-logo"
              style={{ maxHeight: "60px", width: "auto" }}
            />
            <p>
              We produce positive results in the ever-growing industrial and manufacturing sectors.
              Our corporate mandate focuses on maintaining strong core values, ensuring consistent growth
              and excellence in all operations.
            </p>
            <Link href="/about" className="know-more">
              <i className="fa-solid fa-arrow-right" style={{ marginRight: "5px" }}></i> Know More
            </Link>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/#certificate">Certificate</Link></li>
              <li><Link href="/video">Video</Link></li>
              <li>
                <button
                  onClick={() => openLeadPopup("quote")}
                  style={{ background: "none", border: "none", color: "inherit", padding: 0, cursor: "pointer", font: "inherit", textAlign: "left" }}
                >
                  Inquiry
                </button>
              </li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-links">
            <h4>Our Products</h4>
            <ul>
              <li><Link href="/products/water-filling-machine">WATER Filling Machine</Link></li>
              <li><Link href="/products/juice-filling-machine">Juice Filling Machine</Link></li>
              <li><Link href="/products/beer-filling-machine">Beer Filling Machine</Link></li>
              <li><Link href="/products/sticker-labelling-machine">Automatic Sticker Labeling Machine</Link></li>
              <li><Link href="/products/inkjet-batch-coding">Inkjet Batch Coding</Link></li>
              <li><Link href="/products/chemical-lab">Chemical Lab</Link></li>
              <li><Link href="/products/micro-biology-lab">Micro-Biology Lab</Link></li>
              <li><Link href="/products/r-o-plant">R. O. Plant</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-contact">
            <h4>Quick Contact</h4>
            <p className="contact-desc">
              If you have any questions or need help, feel free to contact with our team.
            </p>
            <div className="contact-address-block">
              <strong>SHIV SHAKTI WATER EQUIPMENT PVT. LTD.</strong>
              <br />
              Plot No. B/5, Revabhai Industrial Estate,
              <br />
              Part-2, Opp. Ishwarkrupa Weighbridge,
              <br />
              CTM, Ahmedabad, Gujarat- 380026.
            </div>
            <p>
              <i className="fa-solid fa-phone" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              Mr. Pradip Patel +91 8490087773
            </p>
            <p>
              <i className="fa-solid fa-phone" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              Mrs. Sonal Patel +91 9712666160
            </p>
            <p>
              <i className="fa-solid fa-envelope" style={{ marginRight: "8px", color: "var(--accent)" }}></i>
              shivshakti2932@yahoo.com
            </p>
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="footer-action-strip">
          <div className="action-item">
            <i className="fa-solid fa-phone"></i>
            <div className="action-text">
              <span>Call Us:</span>
              <strong>+91 9712666160</strong>
            </div>
          </div>
          <div className="action-item">
            <i className="fa-solid fa-envelope"></i>
            <div className="action-text">
              <span>Email Us:</span>
              <strong>shivshakti2932@yahoo.com</strong>
            </div>
          </div>
          <div className="action-item">
            <i className="fa-regular fa-clock"></i>
            <div className="action-text">
              <span>Opening Hours:</span>
              <strong>Mon to Sun: 8am-8pm</strong>
            </div>
          </div>
          <div className="action-btn">
            <button
              onClick={() => openLeadPopup("quote")}
              className="btn btn-primary"
              style={{ background: "#0F2744", borderColor: "#0F2744", cursor: "pointer" }}
            >
              Request A Quote
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SHIV SHAKTI WATER EQUIPMENT PVT. LTD.. All rights reserved.</p>
        </div>
      </div>

      {/* Floating Elements */}
      <a
        href="https://wa.me/919712666160"
        target="_blank"
        rel="noopener noreferrer"
        className="float-whatsapp"
        aria-label="WhatsApp Us"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {showScrollTop && (
        <button
          id="scrollTopBtn"
          className="float-scroll-top"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </footer>
  );
};
