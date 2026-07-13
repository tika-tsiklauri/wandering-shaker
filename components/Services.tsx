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
          Thoughtfully designed bar experiences, shaped around your gathering.
        </h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-black/75 md:text-base">
          Every gathering has its own rhythm, and the bar should feel like a
          natural part of it.
        </p>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-black/75 md:text-base">
          Rather than offering a one-size-fits-all service, we shape each
          experience around the people, the setting, and the atmosphere you want
          to create — bringing thoughtful cocktails, considered hospitality, and
          refined presentation together in a way that feels effortless.
        </p>

        <div className="mt-10 h-px w-full bg-black/10" />
      </header>

      {/* The starting point */}
      <Section
        id="starting-point"
        eyebrow="The starting point"
        title="Every gathering begins differently."
      >
        <p>
          Some celebrations call for a signature cocktail. Others are best
          served through a simpler beverage offering or an open bar. Rather than
          fitting your event into a package, we shape the experience around the
          occasion.
        </p>
        <p className="mt-4">Every gathering includes:</p>
        <BulletList
          items={[
            "Professional bartending and thoughtful event planning",
            "A bar service style and experience tailored to your gathering",
            "Guidance on alcohol, ingredients, and bar logistics",
            "Refined setup, service, and breakdown",
          ]}
        />
        <p className="text-black/70 mt-4">
          Every event receives a custom proposal based on guest count, level of
          customization, service style, and the scope of the experience.
        </p>
      </Section>

      {/* Tailoring the bar */}
      <Section
        id="tailoring"
        eyebrow="Tailoring the bar"
        title="Designed around the occasion."
      >
        <p>The bar should never feel separate from the gathering.</p>
        <p>
          Whether the evening centers around custom cocktails, a curated
          beverage selection, champagne pours, or a simpler open bar, every
          element is shaped to complement the event rather than compete with it.
        </p>

        <div className="mt-7 rounded-2xl border border-black/10 bg-[var(--color-linen)] p-6 shadow-sm">
          <p className="text-xs tracking-[0.18em] uppercase text-black/60">
            Every proposal is tailored and may include:
          </p>
          <BulletList
            items={[
              "A portable bar or existing venue setup",
              "Beer, wine, simple mixed drinks, or signature cocktails",
              "One or multiple bartenders",
              "Custom menus and presentation details",
              "Champagne or specialty pours",
              "Service tailored to the pace and style of the event",
            ]}
          />
        </div>
      </Section>

      {/* The space */}
      <Section
        id="space"
        eyebrow="The space"
        title="A natural part of the room."
      >
        <p>Every gathering unfolds in a different setting.</p>
        <p>
          From intimate gatherings at home to larger celebrations, we
          thoughtfully adapt the bar experience to the space — creating a setup
          that feels intentional, refined, and naturally part of the occasion.
        </p>
      </Section>

      {/* What to expect */}
      <Section
        id="expect"
        eyebrow="What to expect"
        title="Hospitality that unfolds naturally"
      >
        <BulletList
          items={[
            "Clear communication from planning through service",
            "Thoughtful preparation and attention to every design detail beyond the cocktails themselves",
            "Classic technique and balanced cocktails",
            "Refined presentation that complements the setting",
            "Calm, attentive service that allows the gathering to unfold naturally",
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
              Let’s begin with the gathering.
            </h2>
            <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-black/75 md:text-base">
              Tell us about your event, and we'll begin shaping a bar experience
              that feels thoughtful, personal, and natural to the occasion.
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
                Request Proposal
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
        </div>
      </section>
    </main>
  );
}
