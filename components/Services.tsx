// app/services/page.tsx

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-black/75 md:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.15rem] text-black/45">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-black/10 py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {eyebrow ? (
          <p className="text-xs tracking-[0.18em] uppercase text-black/60">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-3xl font-primary text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
          {title}
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-black/75 md:text-base">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="bg-[var(--color-linen)] text-[var(--foreground)] py-14">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
        <p className="text-xs tracking-[0.18em] uppercase text-black/60">
          What We offer
        </p>
        <h1 className="mt-3 max-w-4xl font-primary text-4xl leading-tight md:text-5xl">
          Craft bartending, wherever you gather.
        </h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-black/75 md:text-base">
          Wandering Shaker provides professional bartending for weddings,
          private events, and intimate gatherings — bringing a craft cocktail
          approach to every bar we set up.
        </p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-black/75 md:text-base">
          Our focus is on thoughtful service, balanced drinks, and an experience
          that feels natural to the space.
        </p>

        <div className="mt-10 h-px w-full bg-black/10" />
      </header>

      {/* The starting point */}
      <Section
        id="starting-point"
        eyebrow="The starting point"
        title="Services begin at $850"
      >
        <p>Our base service includes:</p>
        <BulletList
          items={[
            "Professional bartending and event coordination",
            "Setup and breakdown",
            "One featured craft cocktail selected to complement your event",
            "Bar service tailored to your gathering",
            "Guidance on alcohol and ingredients, handled separately",
          ]}
        />
        <p className="text-black/70">
          This approach allows the bar to feel intentional without
          overcomplicating the experience.
        </p>
      </Section>

      {/* Tailoring the bar */}
      <Section
        id="tailoring"
        eyebrow="Tailoring the bar"
        title="A bar designed around your event"
      >
        <p>Every event is different, and the bar should reflect that.</p>
        <p>
          Some hosts choose a focused cocktail offering. Others include beer and
          wine or expand the cocktail selection. We work with you to shape the
          bar in a way that fits the event and your guests.
        </p>

        <div className="mt-7 rounded-2xl border border-black/10 bg-[var(--color-linen)] p-6 shadow-sm">
          <p className="text-xs tracking-[0.18em] uppercase text-black/60">
            Optional enhancements
          </p>
          <BulletList
            items={[
              "Additional craft cocktails or mocktails",
              "Additional bartenders for larger guest counts",
              "Extended service time",
              "Champagne pours or specialty moments",
            ]}
          />
        </div>
      </Section>

      {/* The space */}
      <Section
        id="space"
        eyebrow="The space"
        title="Thoughtful setup, never competing with the venue"
      >
        <p>We approach each event with the venue in mind.</p>
        <p>
          When an existing bar is available, we’re happy to work within it. When
          one is needed, we help coordinate a bar solution that complements the
          setting, rather than competing with it.
        </p>
      </Section>

      {/* What to expect */}
      <Section
        id="expect"
        eyebrow="What to expect"
        title="Quiet hospitality, done with intention"
      >
        <BulletList
          items={[
            "Clear communication and planning",
            "A calm, professional presence behind the bar",
            "Clean flavors and classic technique",
            "Service that feels well-paced and easy",
          ]}
        />
      </Section>

      {/* Next steps */}
      <section className="border-t border-black/10 py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="rounded-2xl border border-black/10 bg-[var(--color-linen)] p-8 shadow-sm md:p-10">
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              Next steps
            </p>
            <h2 className="mt-3 max-w-3xl font-primary text-3xl leading-tight md:text-4xl">
              Let’s shape the bar around your gathering.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-black/75 md:text-base">
              If you’re planning an event and would like to explore what the bar
              could look like, we’d love to hear more.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/inquiries"
                className="
                  inline-flex items-center justify-center
                  rounded-md border border-black/15
                  bg-[var(--color-moss)]
                  px-6 py-3
                  text-sm tracking-[0.05em]
                  text-[var(--color-linen)]
                  transition
                  hover:bg-[color-mix(in_oklab,var(--color-moss),black_10%)]
                "
              >
                Inquire
              </a>

              <a
                href="/contact"
                className="
                  inline-flex items-center justify-center
                  rounded-md border border-black/15
                  bg-transparent
                  px-6 py-3
                  text-sm tracking-[0.05em]
                  text-black/70
                  transition
                  hover:bg-black/5
                "
              >
                Contact
              </a>
            </div>
          </div>

          <p className="mt-10 text-xs tracking-[0.12em] uppercase text-black/45">
            Pricing varies with guest count, hours, and staffing.
          </p>
        </div>
      </section>
    </main>
  );
}
