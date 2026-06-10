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

const Footer = () => {
  return (
    <footer className="bg-[#ecebeb] px-6 pb-10 pt-20 text-[#161310] md:px-12">
      <div className="border-t border-[#161310]/15 pt-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-5xl text-[#28311f] font-black leading-none tracking-[-0.08em] md:text-7xl"
            >
              Calero Studio
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-[1.8] text-[#161310]/55">
              Minimal lighting curated for calm interiors, warm corners and
              everyday atmosphere.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#161310]/40">
              Pages
            </p>

            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/" className="hover:text-[#161310]/55">
                Home
              </Link>

              <Link href="/shop" className="hover:text-[#161310]/55">
                Shop
              </Link>

              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#161310]/55"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#161310]/40">
              Studio
            </p>

            <div className="space-y-3 text-sm text-[#161310]/55">
              <p>Curated for calm interiors.</p>
              <p>Secure checkout.</p>

              <p>
                Email:{" "}
                <a
                  href="mailto:support@calero.studio"
                  className="underline decoration-[#161310]/20 underline-offset-4 hover:text-[#161310]"
                >
                  support@calero.studio
                </a>
              </p>

              <p>
                Phone:{" "}
                <a
                  href="tel:+4748263011"
                  className="underline decoration-[#161310]/20 underline-offset-4 hover:text-[#161310]"
                >
                  +47 48 26 30 11
                </a>
              </p>

              <p>Store: Calero Studio</p>
              <p>Location: Oslo, Norway</p>
              <p>Orders fulfilled through trusted shipping partners.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#161310]/15 pt-6 text-xs text-[#161310]/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Calero Studio</span>

          <span>Calm by design.</span>

          <Link
            href="https://www.jonasnygaard.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[#161310]/20 underline-offset-4 hover:text-[#161310]"
          >
            Built by Newfarm Studio
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
