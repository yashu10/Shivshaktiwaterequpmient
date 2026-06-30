import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import blogsData from "../../../data/blogs.json";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${blog.title} | Blog | SHIV SHAKTI WATER EQUIPMENT PVT. LTD.`,
    description: blog.summary,
    alternates: {
      canonical: `https://www.shivshaktiengineering.com/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.summary,
      images: [
        {
          url: `https://www.shivshaktiengineering.com${blog.image}`,
          alt: blog.title,
        },
      ],
    },
  };
}

export default async function BlogPage(props: {
  params: Promise<Params>;
}) {
  const resolvedParams = await props.params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  // Get other blogs for quick read suggestions (max 3)
  const suggestions = blogsData
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <main>
      {/* Post Header / Hero */}
      <header className="blog-hero" style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-hero-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="container blog-hero-content" style={{ position: "relative", zIndex: 2 }}>
          <span className="blog-category">{blog.category}</span>
          <h1 style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{blog.title}</h1>
          <div className="blog-meta" style={{ display: "flex", gap: "20px", marginTop: "15px", color: "rgba(255,255,255,0.9)" }}>
            <span>
              <i className="fa-regular fa-calendar" style={{ marginRight: "6px" }}></i> {blog.date}
            </span>
            <span>
              <i className="fa-regular fa-clock" style={{ marginRight: "6px" }}></i> {blog.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="container" style={{ padding: "60px 20px" }}>
        <div className="blog-body" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* Main Article Body */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

          {/* Author Box */}
          <div className="author-box" style={{ marginTop: "50px" }}>
            <img src="/assets/images/team_thumb.png" alt="Engineering Team" />
            <div>
              <h4>Shiv Shakti Engineering Team</h4>
              <p>Pioneering high-tier automated packaging lines from Ahmedabad directly to global markets.</p>
            </div>
          </div>

          <div style={{ marginTop: "40px", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "30px", textAlign: "center" }}>
            <Link href="/blog" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              &larr; Back to Blogs
            </Link>
          </div>
        </div>
      </article>

      {/* Suggested Reading */}
      <section className="section-padding bg-light" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div className="container animate-on-scroll visible">
          <div className="section-header center">
            <h2 className="section-title" style={{ fontSize: "2rem" }}>Suggested Reading</h2>
            <p>Keep reading other stories and maintenance guides from our team.</p>
          </div>
          <div className="blog-grid">
            {suggestions.map((s, idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-img-wrapper">
                  <img src={s.image} alt={s.title} />
                  <div className="blog-date">{s.date}</div>
                </div>
                <div className="blog-content">
                  <span className="blog-category">{s.category}</span>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <Link href={`/blog/${s.slug}`} className="blog-read-more">
                    Read Full Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
