import React from "react";
import Image from "next/image";

type Img = {
  src?: string;
  alt: string;
  objectPosition?: string; // e.g. "50% 65%"
  objectPositionClassName?: string; // e.g. "object-[50%_4%] sm:object-[50%_10%]"
};

function Media({
  image,
  ratio,
  className = "",
  rounded = "rounded-2xl",
}: {
  image?: Img;
  ratio: string;
  className?: string;
  rounded?: string;
}) {
  const shell = `relative overflow-hidden ${rounded} border border-black/10 bg-[var(--color-linen)] shadow-sm ${ratio} ${className}`;

  if (image?.src) {
    return (
      <div className={shell}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${image.objectPositionClassName ?? ""}`}
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
        />
        {/* ✨ Linen overlay (same style everywhere) */}
        <div className="absolute inset-0 bg-[var(--color-linen)]/18" />
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-[88%] rounded-lg border border-black/10 bg-[var(--color-cream)]/70 px-4 py-3 text-center">
          <p className="text-xs tracking-[0.14em] uppercase text-black/55">
            Image placeholder
          </p>
          <p className="mt-1 text-[13px] text-black/60"></p>
        </div>
      </div>
    </div>
  );
}

/* --- IntroHero (kept tall/immersive) --- */
function IntroHero({
  image,
  eyebrow,
  title,
  body,
}: {
  image: Img;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src={image.src!}
        alt={image.alt}
        fill
        priority
        className="object-cover scale-[1.12] sm:scale-100 lg:scale-[1.06]"
        style={
          image.objectPosition
            ? { objectPosition: image.objectPosition }
            : undefined
        }
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/18 to-black/10" />

      <div className="relative mx-auto mt-34 flex min-h-[100svh] max-w-6xl items-end px-5 pb-12 md:px-8 md:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--color-linen)]/85">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-primary text-4xl leading-tight text-[var(--color-linen)] md:text-5xl">
            {title}
          </h1>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--color-linen)]/85 md:text-base">
            {body}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-[var(--color-linen)]/30" />
    </section>
  );
}

/* --- Compact generic section wrapper with optional noTopBorder --- */
function SectionShell({
  id,
  eyebrow,
  title,
  children,
  noTopBorder = false,
  leftColClass = "",
  rightColClass = "",
  reverse = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  noTopBorder?: boolean;
  leftColClass?: string;
  rightColClass?: string;
  reverse?: boolean;
}) {
  return (
    <section id={id} className={`${noTopBorder ? "" : ""} py-12 md:py-16`}>
      <div
        className={[
          "mx-auto grid max-w-6xl items-start gap-8 px-5 md:px-8 lg:gap-12",
          "lg:grid-cols-[1fr_1fr]",
        ].join(" ")}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          {eyebrow ? (
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-primary text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
            {title}
          </h2>
          <div
            className={`mt-5 space-y-4 text-[15px] leading-relaxed text-black/75 md:text-base ${leftColClass}`}
          >
            {children}
          </div>
        </div>

        <div
          className={reverse ? "lg:order-1" : "" + ` ${rightColClass}`}
        ></div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-linen)]/80 text-[var(--foreground)]">
      {/* Intro (unchanged) */}
      <IntroHero
        image={{
          src: "/IMG_bar.JPG",
          alt: "Bar scene",
          objectPosition: "50% 0%",
        }}
        eyebrow="About Wandering Shaker"
        title="Thoughtfully designed bar experiences"
        body={
          <>
            <p>
              Wandering Shaker is a mobile bar service offering thoughtfully
              designed bar experiences for weddings and intimate gatherings,
              where atmosphere matters as much as the drinks.
            </p>
            <p>
              Our service is shaped around the people, the setting, and
              the pace of the evening, so the bar feels seamless and natural in
              the room.
            </p>
            <p className="text-[var(--color-linen)]/80">
              We bring the quiet care of great cocktail bars to private
              celebrations of all kinds.
            </p>
          </>
        }
      />

      {/* Our philosophy — editorial pause */}
      <section id="our-philosophy" className="py-24 md:py-40">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.18em] uppercase text-black/55">
              Our philosophy
            </p>

            <h2 className="mt-6 font-primary text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
              Felt, not performed
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-black/72 md:text-base">
              <p>
                We believe the best bar experiences are felt, not performed.
                Thoughtful drinks, considered service, and an awareness of the
                room allow the evening to unfold naturally.
              </p>
              <p>
                Flavors stay clean, movement stays measured, and the bar remains
                present without pulling focus — so guests feel taken care of
                without being managed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the bartender */}
      <section id="meet-the-bartender" className="py-20 md:py-28">
        <div className="flex justify-center">
          <p className="text-xs tracking-[0.18em] uppercase text-black/60 mb-8">
            Meet the bartender
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 md:px-8 lg:gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Image (LEFT — same size as Philosophy section) */}
          <div className="flex items-start mt-6">
            <div className="w-full max-w-[420px]">
              <Media
                image={{
                  src: "/IMG_3393.JPG",
                  alt: "Bartender portrait-style moment",
                  objectPositionClassName: "object-[50%_2%] sm:object-[50%_8%]",
                }}
                ratio="aspect-[4/5]"
              />
            </div>
          </div>

          {/* Text (RIGHT) */}
          <div>
            <h2 className="mt-6 font-primary text-3xl leading-tight text-[var(--foreground)] md:text-4xl">
              Balance, restraint, and classic technique
            </h2>

            <div className="mt-8 max-w-prose space-y-5 text-[15px] leading-relaxed text-black/75 md:text-base">
              <p>
                Wandering Shaker is led by a bartender with over a decade of
                experience in craft cocktail bars and private events.
              </p>

              <p>
                Rooted in classic technique, his style favors balance,
                restraint, and thoughtful presentation — drinks that feel
                considered rather than overworked.
              </p>

              <p>
                Behind the bar, his presence sets the tone: steady hands,
                deliberate movement, and careful attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the scenes — tidy 3-up with consistent aspect to avoid visual chaos */}
      <section id="behind-the-scenes" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              Behind the scenes
            </p>
            <h3 className="mt-6 font-primary text-2xl md:text-3xl text-[var(--foreground)]">
              Preparation that stays invisible
            </h3>
            <p className="mt-7 max-w-2xl mx-auto text-[15px] leading-relaxed text-black/75">
              Preparation happens long before guests arrive. Cocktails are
              thoughtfully developed and tested, with logistics planned around
              the rhythm of the gathering.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 pt-10">
            <Media
              image={{
                src: "/IMG_3231 2.JPG",
                alt: "Testing cocktails before an event",
                objectPosition: "50% 55%",
              }}
              ratio="aspect-[4/4]"
            />
            <Media
              image={{
                src: "/IMG_new.JPG",
                alt: "Setup: bar elements in the space",
                objectPosition: "50% 30%",
              }}
              ratio="aspect-[4/4]"
            />
            <Media
              image={{
                src: "/IMG_4174.JPG",
                alt: "Sourcing produce and ingredients",
                objectPosition: "20% 65%",
              }}
              ratio="aspect-[4/4]"
            />
          </div>
        </div>
      </section>

      {/* What to expect — no images */}
      <section id="what-to-expect" className="pt-28 pb-20 md:pt-30 md:pb-22">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs tracking-[0.18em] uppercase text-black/60">
              What to expect
            </p>

            <h2 className="mt-7 font-primary text-3xl leading-tight md:text-4xl">
              Nothing unnecessary. Nothing overlooked.
            </h2>

            <p className="mt-8 text-[15px] leading-relaxed text-black/75 md:text-base">
              Bar service is shaped to the needs of each gathering — whether
              that includes a signature cocktail, beer and wine, or a simpler
              open bar.
            </p>

            <ul className="mt-10 space-y-4 text-[15px] leading-relaxed text-black/75 md:text-base">
              {[
                "One curated craft cocktail included with every event",
                "Additional craft cocktails or mocktails can be included",
                "Alcohol and ingredients handled separately, with guidance throughout",
                "Classic technique and thoughtful presentation",
                "A bar setup that complements the space",
                "Calm, polished, well-timed service",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.15rem] text-black/45">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[15px] leading-relaxed text-black/70 md:text-base">
              Wherever you’re gathering, Wandering Shaker brings care, craft,
              and ease to the bar — so you can stay present in the moment.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
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
        </div>
      </section>

      {/* Closing — open, airy, with one image */}
      <footer className="py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {/* One closing image */}
          <div className="relative mx-auto mt-12 max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-sm aspect-[21/9] bg-[var(--color-linen)]">
              <Image
                src="/IMG_3764.JPG"
                alt="A quiet bar moment"
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover scale-[1.3]"
                style={{ objectPosition: "50% 80%" }}
              />
              {/* Soft editorial wash */}
              <div className="absolute inset-0 bg-[var(--color-linen)]/18" />
            </div>
            <div className="mx-auto max-w-3xl text-center py-20 md:py-28 ">
              <h2 className="font-primary text-3xl leading-tight md:text-4xl">
                Care, craft, and ease — so you can focus on the moment.
              </h2>

              <p className="mt-8 text-[15px] leading-relaxed text-black/72 md:text-base">
                Wherever you’re gathering, Wandering Shaker brings a calm,
                considered bar experience — from first pour to final breakdown.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
