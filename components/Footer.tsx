import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-6 pb-10">
      <div className="mx-auto max-w-6xl border-t border-black/15 pt-6 text-xs text-black/60 flex items-center justify-between gap-6">
        <span>© {new Date().getFullYear()} Calero Studio</span>

        <span className="hidden sm:inline">Calm by design.</span>

        <Link
          href="https://www.jonasnygaard.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black/80 underline underline-offset-4 decoration-black/20 hover:decoration-black/40"
        >
          Built by Newfarm Studio
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
