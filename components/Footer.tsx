import Link from "next/link";

const footerLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Shipping",
    href: "/shipping",
  },
  {
    label: "Returns",
    href: "/returns",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

const shopLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Cart",
    href: "/cart",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative noise-bg overflow-hidden bg-[#ecebeb] px-5 pb-6 pt-20 text-[#161310] md:px-8 md:pb-8 md:pt-28">
      <div className="pointer-events-none absolute inset-x-5 top-5 flex justify-between border-t border-[#161310]/15 pt-3 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#161310]/45 md:inset-x-8">
        <span>Calero Studio</span>
        <span>Calm by design</span>
      </div>

      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Link href="/" aria-label="Go to home page" className="block w-fit">
            <span className="block text-[clamp(4.5rem,15vw,18rem)] font-black uppercase leading-[0.80] tracking-[-0.035em]">
              Calero
            </span>

            <span className="block text-[clamp(3.8rem,12vw,14rem)] font-black uppercase leading-[0.90] tracking-[-0.035em]">
              Studio
            </span>
          </Link>

          <p className="mt-8 max-w-[560px] text-[clamp(1.5rem,2.4vw,3rem)] font-semibold uppercase leading-[0.9] tracking-[-0.065em] text-[#161310]/65">
            Minimal lighting curated for calm interiors, warm corners and
            everyday atmosphere.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <div className="grid gap-10 md:grid-cols-2">
            <FooterColumn title="Shop" links={shopLinks} startNumber={1} />
            <FooterColumn
              title="Information"
              links={footerLinks}
              startNumber={4}
            />
          </div>

          <div className="mt-14 border-t border-[#161310]/15 pt-6">
            <p className="mb-5 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#161310]/40">
              Studio
            </p>

            <div className="grid gap-5 text-sm font-medium leading-[1.25] tracking-[-0.035em] text-[#161310]/55 md:grid-cols-2">
              <div className="space-y-3">
                <p>Curated for calm interiors.</p>
                <p>Secure checkout.</p>
                <p>Store: Calero Studio</p>
                <p>Location: Oslo, Norway</p>
              </div>

              <div className="space-y-3">
                <p>
                  <a
                    href="mailto:support@calero.studio"
                    className="underline decoration-[#161310]/20 underline-offset-4 transition-colors duration-200 hover:text-[#161310]"
                  >
                    support@calero.studio
                  </a>
                </p>

                <p>
                  <a
                    href="tel:+4748263011"
                    className="underline decoration-[#161310]/20 underline-offset-4 transition-colors duration-200 hover:text-[#161310]"
                  >
                    +47 48 26 30 11
                  </a>
                </p>

                <p>Orders fulfilled through trusted shipping partners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-4 border-t border-[#161310]/15 pt-5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#161310]/45 md:mt-24 md:grid-cols-12 md:items-center">
        <span className="md:col-span-3">© {year} Calero Studio</span>

        <span className="md:col-span-3 md:col-start-5">Calm by design.</span>

        <Link
          href="https://www.jonasnygaard.com"
          target="_blank"
          rel="noreferrer"
          className="w-fit underline decoration-[#161310]/20 underline-offset-4 transition-colors duration-200 hover:text-[#161310] md:col-span-3 md:col-start-8"
        >
          Built by Newfarm Studio
        </Link>

        <Link
          href="#top"
          className="group flex w-fit items-center gap-3 md:col-span-2 md:col-start-11 md:justify-self-end"
        >
          <span className="h-px w-10 bg-[#161310]/40 transition-all duration-300 group-hover:w-16 group-hover:bg-[#161310]" />
          <span>Back top</span>
        </Link>
      </div>
    </footer>
  );
};

function FooterColumn({
  title,
  links,
  startNumber,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
  startNumber: number;
}) {
  return (
    <div>
      <p className="mb-5 text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#161310]/40">
        {title}
      </p>

      <nav className="border-t border-[#161310]/15">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between border-b border-[#161310]/15 py-3 text-sm font-black uppercase tracking-[-0.035em] text-[#161310]/70 transition-colors duration-200 hover:text-[#161310]"
          >
            <span>{link.label}</span>

            <span className="text-[0.6rem] tracking-[0.16em] text-[#161310]/35">
              {String(startNumber + index).padStart(2, "0")}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Footer;
