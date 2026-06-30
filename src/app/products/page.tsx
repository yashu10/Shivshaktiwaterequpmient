"use client";

import React, { useState } from "react";
import Link from "next/link";
import productsData from "../../data/products.json";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Get unique categories dynamically
  const categories = ["all", ...Array.from(new Set(productsData.map((p) => p.category)))];

  const filteredProducts = activeCategory === "all"
    ? productsData
    : productsData.filter((p) => p.category === activeCategory);

  const getCategoryAnchor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "bottle filling machines": return "cat-bottle-filling";
      case "labeling machines": return "cat-labeling";
      case "shrink wrapping machine": return "cat-shrink";
      case "r.o. plant": return "cat-ro-plant";
      case "blow moulding machine": return "cat-blow";
      case "batch coding machine": return "cat-batch-coding";
      case "lab equipment": return "cat-lab";
      default: return "cat-all";
    }
  };

  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li>Machinery</li>
          </ul>
          <h1>Our Industrial Machinery Catalog</h1>
          <p>Explore our heavy-duty, automatic packaging and water treatment equipment.</p>
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="section-padding bg-light">
        <div className="container">
          
          {/* Category Tabs */}
          <div
            className="filter-buttons-wrapper"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: "1px solid var(--primary)",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                  background: activeCategory === cat ? "var(--primary)" : "transparent",
                  color: activeCategory === cat ? "white" : "var(--primary)",
                }}
              >
                {cat === "all" ? "All Machinery" : cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="product-grid" style={{ marginTop: 0 }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, idx) => {
                const slug = p.filename.replace(".html", "");
                const imgPath = `/assets/images/${p.image}`;
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
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          color: "var(--accent)",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        {p.category}
                      </span>
                      <h3>{p.title}</h3>
                      <p>{p.tagline || "Heavy-duty custom industrial machine."}</p>
                      <Link href={`/products/${slug}`} className="read-more">
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
                <h3>No machinery found in this category.</h3>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
