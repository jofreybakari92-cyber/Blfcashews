import heroImg from "@/assets/hero-cashews.jpg";
import honeyImg from "@/assets/cashews-honey.png";
import rawImg from "@/assets/cashews-raw.png";
import roastedImg from "@/assets/cashews-roasted.png";
import saltedImg from "@/assets/cashews-salted.png";
import videoBg from "@/assets/DVGPs3qDGgk(MP4).mp4";
import { waLink } from "../WhatsAppButton";
import { ArrowRight, MessageCircle, Leaf } from "lucide-react";
import { useI18n } from "../../lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* ── Left column ──────────────────────────────────────── */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary">
            <Leaf className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            <span className="inline-block animate-shimmer bg-linear-to-r from-foreground via-gold to-foreground bg-clip-text text-transparent">
              {t("hero.title1")}
            </span>
            <span
              className="block text-gradient-gold animate-shimmer"
              style={{ animationDelay: "0.5s" }}
            >
              {t("hero.title2")}
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("hero.desc")}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
            >
              {t("hero.orderNow")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink("Hello BLF Cashews! I'd like to know more.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-semibold text-foreground transition-all hover:border-whatsapp hover:text-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              {t("hero.chatWhatsApp")}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { n: t("hero.stat1"), l: t("hero.stat1Label"), d: "0s", icon: "🌿" },
              { n: t("hero.stat2"), l: t("hero.stat2Label"), d: "0.2s", icon: "⭐" },
              { n: t("hero.stat3"), l: t("hero.stat3Label"), d: "0.4s", icon: "😊" },
            ].map((s) => (
              <div
                key={s.l}
                className="group relative rounded-2xl border border-border/50 bg-card/40 p-5 text-center transition-all hover:border-gold/40 hover:shadow-glow animate-stat-bounce"
                style={{ animationDelay: s.d }}
              >
                <div className="absolute inset-0 rounded-2xl animate-pulse-ring pointer-events-none" />
                <div className="text-2xl mb-1 transition-transform group-hover:scale-125">
                  {s.icon}
                </div>
                <div className="font-display text-2xl font-bold text-primary md:text-3xl animate-count-glow">
                  {s.n}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Powered by marquee */}
          <div className="relative z-10 w-full max-w-7xl border-t border-white/5 pt-12 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex items-center gap-4 border-r border-white/20 pr-8 z-20 mb-0 md:mb-0">
                <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 whitespace-nowrap leading-tight">
                  Powered by
                  <br />
                  best teams
                </span>
              </div>
              <div className="relative flex overflow-hidden group flex-1">
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                  {[
                    t("hero.partner1"),
                    t("hero.partner2"),
                    t("hero.partner3"),
                    t("hero.partner4"),
                    t("hero.partner5"),
                    t("hero.partner6"),
                  ]
                    .concat([
                      t("hero.partner1"),
                      t("hero.partner2"),
                      t("hero.partner3"),
                      t("hero.partner4"),
                      t("hero.partner5"),
                      t("hero.partner6"),
                    ])
                    .map((name, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold text-white/40 grayscale hover:text-white hover:opacity-100 transition-opacity"
                      >
                        {name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────── */}
        <div className="relative animate-fade-up">
          <div className="absolute inset-0 -m-4 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-primary/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-4xl border border-border shadow-glow">
            <img
              src={heroImg}
              alt="Premium Tanzanian cashews spilling from a linen sack"
              width={1600}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Tanzania origin badge */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-soft md:block animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-2xl">
                🇹🇿
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Origin</div>
                <div className="font-display font-bold">Tanzania</div>
              </div>
            </div>
          </div>

          {/* Product sample strip — bottom-right of hero image */}
          <div
            className="absolute -bottom-6 -right-6 hidden flex-col gap-3 md:flex animate-float"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { img: roastedImg, label: "Roasted", sub: "Lightly sea-salted" },
              { img: saltedImg, label: "Salted", sub: "Crunchy classic" },
              { img: honeyImg, label: "Honey", sub: "Sweet & buttery" },
              { img: rawImg, label: "Raw", sub: "100 % natural" },
            ].map((p, i) => (
              <div
                key={p.label}
                className="group flex items-center gap-3 rounded-[1.5rem] border border-border/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-2px] hover:border-gold/40 hover:shadow-glow"
                style={{
                  width: "min(230px, 100%)",
                  animationDelay: `${i * 0.12}s`,
                  marginBottom: i < 3 ? "-34px" : "0",
                  zIndex: 4 - i,
                }}
              >
                <div className="relative h-14.5 w-14.5 shrink-0 overflow-hidden rounded-[0.875rem]">
                  <img
                    src={p.img}
                    alt={`BLF ${p.label} cashews`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col pr-5">
                  <div className="font-display text-sm font-bold leading-tight text-foreground">
                    {p.label}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-gold/80">
                    {p.sub}
                  </div>
                </div>
                <span className="ml-auto mr-4 hidden text-[10px] font-black tracking-widest text-gold/50 md:inline">
                  {4 - i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
