"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string; // Raw HTML content passed from the parent
  onLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  onLinkClick,
}) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!content) return;

    // Parse the HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const elements = Array.from(
      doc.querySelectorAll("h2")
      
    ).map((element, index) => {
      console.log(element);
      // Generate a clean ID from the heading text
      const text = element.textContent || '';
      const cleanText = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-')    // Replace spaces with hyphens
        .replace(/-+/g, '-')     // Remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      
      // Set the ID on the element
      const id = cleanText || `heading-${index}`;
      element.id = id;
      
      return {
        id,
        text,
        level: parseInt(element.tagName.charAt(1)),
      };
    });

    // Update the content with proper IDs
    const newContent = doc.body.innerHTML;
    
    // Update the parent component with the modified content
    const parent = document.querySelector('.prose');
    if (parent) {
      parent.innerHTML = newContent;
    }

    setHeadings(elements);

    // Set up intersection observer for active heading tracking
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-100px 0px -66%",
      threshold: 0.5
    });

    elements.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <Card className="bg-white/90 shadow-lg rounded-xl border border-gray-200">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Table of Contents
          </h2>
          <div className="h-px bg-gray-200" />
        </div>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`
                group flex items-center gap-2 px-2 py-1.5 rounded-md transition
                text-sm
                ${heading.level === 1 ? "font-semibold" : ""}
                ${heading.level > 1 ? `pl-${(heading.level - 1) * 4}` : ""}
                ${
                  activeId === heading.id
                    ? "bg-white text-blue-900 font-bold shadow-inner"
                    : "text-gray-500 hover:bg-gray-100"
                }
              `}
              style={{
                borderLeft: activeId === heading.id ? "3px solid " : "3px solid transparent",
                marginLeft: heading.level > 1 ? `${(heading.level - 1) * 8}px` : 0,
              }}
              onClick={(e) => {
                e.preventDefault();
                if (onLinkClick) {
                  onLinkClick(e, heading.id);
                } else {
                  const target = document.getElementById(heading.id);
                  if (target) {
                    // Calculate the offset for the navbar
                    const navbar = document.querySelector('nav');
                    const navbarHeight = navbar?.offsetHeight || 0;
                    const offset = navbarHeight + 20;

                    // Get the target's position relative to the document
                    const targetTop = target.getBoundingClientRect().top + window.scrollY;

                    // Scroll to the target with the offset
                    window.scrollTo({
                      top: targetTop - offset,
                      behavior: "smooth"
                    });
                  }
                }
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};