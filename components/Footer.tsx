// components/Footer.tsx
export default function Footer() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-black/10 bg-[var(--color-linen)]">
      <div className="mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-8">
        <div className="grid gap-7 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              Wandering Shaker
            </p>

            <div className="mt-3 text-black/40 text-xs">
              <a href="/inquiries" className="underline underline-offset-4">
                Inquire
              </a>
            </div>

            <div className="mt-3 text-black/40 text-xs">
              <a href="/contact" className="underline underline-offset-4">
                Contact
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="md:justify-self-end">
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              Links
            </p>

            <div className="mt-4 space-y-1.5 text-sm text-black/70">
              <p>
                <span className="text-black/50">Email:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:opacity-80"
                  href="mailto:events@wandering-shaker.com"
                >
                  events@wandering-shaker.com
                </a>
              </p>
              <p>
                <span className="text-black/50">Instagram:</span>{" "}
                <a
                  className="underline underline-offset-4 hover:opacity-80"
                  href=" https://www.instagram.com/wandering_shaker/?igsh=MWZmNTQ0ZTZlY3JvZQ%3D%3D#"
                  target="_blank"
                  rel="noreferrer"
                >
                  @wandering_shaker
                </a>
              </p>
              <p>
                <span className="text-black/50">Service area:</span> NY + CT +
                NJ
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-black/10 pt-4 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <p>
            © <span suppressHydrationWarning>{year}</span> Wandering Shaker
          </p>
          <p>bar where you are.</p>
        </div>
      </div>
    </footer>
  );
}
