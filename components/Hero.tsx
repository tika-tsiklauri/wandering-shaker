// import HeroSlideshow from "./HeroSlideshow";
import HeroVideoMontage from "./HeroVideoMontage";

export default function Hero() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        h-[100vh]
        flex items-end
        bg-[#f8f5ef]
      "
    >
      {/* Full-bleed slideshow background */}
      {/* <HeroSlideshow /> */}
      {/* Mobile video */}
      <div className="block md:hidden">
        <HeroVideoMontage
          src="/hero/mobileFilm.MOV"
          poster="/hero/mobile-poster.jpg"
          bottomBandClass="bottom-0"
        />
      </div>

      {/* Desktop video */}
      <div className="hidden md:block">
        <HeroVideoMontage
          src="/hero/desktopFilm.MOV"
          poster="/hero/montage-poster.jpg"
          bottomBandClass="bottom-0"
        />
      </div>

      {/* Content overlay */}
      <div className="relative w-full">
        <div className="max-w-5xl mx-auto px-6 pb-12 pt-10">
          <div className="max-w-xxl">
            <h1 className="font-primary text-2xl md:text-4xl font-semibold leading-tight tracking-tight text-[#e9e2d0]">
              Quiet hospitality, crafted with intention
            </h1>

            <p className="font-secondary mt-3 text-base text-md text-[#e9e2d0]/90 w-full">
              Thoughtfully designed bar experiences, wherever you gather.
            </p>
            <br />
            <p className="pt-2 font-secondary mt-3 text-base text-sm text-[#e9e2d0]/90 w-full">
              For hosts who care how a room feels.
            </p>

            <div className="font-secondary mt-6 flex flex-wrap gap-3">
              <a
                href="/inquiries"
                className="
                  px-6 py-3 rounded-md
                  bg-[#f8f5ef] text-[#354f32]
                  text-sm font-medium
                  hover:bg-[#e9e2d0] transition
                "
              >
                Inquire
              </a>

              <a
                href="/services"
                className="
                  px-6 py-3 rounded-md
                  border border-[#f8f5ef]/80
                  text-[#f8f5ef]
                  text-sm font-medium
                  hover:bg-white/10 transition
                "
              >
                What We Offer
              </a>
            </div>
          </div>
        </div>

        {/* Optional: a subtle “scroll hint” spacer line */}
        <div className="max-w-5xl mx-auto px-6 pb-6">
          <div className="h-px w-24 bg-[#f8f5ef]/40" />
        </div>
      </div>
    </section>
  );
}
