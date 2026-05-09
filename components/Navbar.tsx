"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "What We Offer" },
  { href: "/inquiries", label: "Event Inquiries" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-linen)]/65 backdrop-blur-sm">
      {/* Seamless fade blend into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-[var(--color-linen)]/30 to-transparent" />

      <nav className="relative mx-auto max-w-6xl px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logoText.png"
            alt="Brand wordmark"
            width={95}
            height={60}
            className="object-contain"
            priority
          />
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={22}
            height={22}
            className="object-contain -ml-1"
            priority
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8 text-[13.5px] tracking-[0.08em] text-[var(--color-moss)]/75">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group transition-colors duration-300"
            >
              <span className="transition-colors duration-300 group-hover:text-[var(--color-moss)]">
                {link.label}
              </span>

              {/* Soft underline */}
              <span className="absolute -bottom-[4px] left-0 h-[1px] w-0 bg-[var(--color-moss)]/70 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px]"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={`h-[2px] w-6 bg-[var(--color-moss)] transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-[var(--color-moss)] transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-[var(--color-moss)] transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-[var(--color-linen)]/95 backdrop-blur-sm">
          <div className="px-6 py-6 flex flex-col gap-5 text-[14px] tracking-[0.05em] text-[var(--color-moss)]/85">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--color-moss)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
