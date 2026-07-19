import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ScrollSection from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Returns | Calero Studio",
  description:
    "Return information for Calero Studio, including return eligibility, exchanges, return shipping and refunds.",
};

const returnSections = [
  {
    number: "01",
    title: "Return window",
    content: (
      <p>
        We accept return requests within 30 days from the date you receive your
        order.
      </p>
    ),
  },
  {
    number: "02",
    title: "Eligible products",
    content: (
      <>
        <p>
          We accept returns for both defective and non-defective products.
          Returned items must be new, unused, in their original condition and,
          where possible, returned with the original packaging.
        </p>

        <p>
          Items may not be accepted for return if they have been used, damaged
          by misuse, altered or returned in poor condition.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Return method",
    content: (
      <>
        <p>
          Returns are accepted by mail. To start a return, contact us with your
          order number, email address and reason for the return.
        </p>

        <p>
          Once your return request has been reviewed and approved, we will
          provide return instructions.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Return cost",
    content: (
      <>
        <p>Return shipping is free for approved returns.</p>

        <p>We do not charge any restocking fees for returned items.</p>
      </>
    ),
  },
  {
    number: "05",
    title: "Exchanges",
    content: (
      <p>
        We accept exchanges. If you would like to exchange an item, please
        contact us with your order details so we can help arrange the exchange.
      </p>
    ),
  },
  {
    number: "06",
    title: "Damaged items",
    content: (
      <p>
        If your item arrives damaged, defective or incorrect, please contact us
        as soon as possible with your order information and photos of the issue
        so we can review it and help resolve the problem.
      </p>
    ),
  },
  {
    number: "07",
    title: "Refunds",
    content: (
      <>
        <p>
          Once your return has been received and approved, your refund will be
          processed to your original payment method within 7 business days.
        </p>

        <p>Processing times may vary depending on your payment provider.</p>
      </>
    ),
  },
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
      <ScrollSection>
        <section className="px-4 pb-28 pt-36 md:px-9 md:pb-40">
          <header>
            <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
              Calero Studio / Returns
            </p>

            <h1 className="mt-16 text-[19vw] font-black uppercase leading-[0.76] tracking-[-0.038em] sm:text-[17vw] md:mt-24 md:text-[13vw] lg:text-[11.5vw]">
              Returns
              <span className="block">Policy</span>
            </h1>

            <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                  Returns and refunds
                </p>

                <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                  Not quite right?
                </h2>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p className="max-w-2xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                  We want you to feel confident when ordering from Calero
                  Studio. Here you can find information about return
                  eligibility, exchanges, return shipping and refunds.
                </p>

                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 md:mt-14">
                  <ReturnHighlight label="Return window" value="30 days" />

                  <ReturnHighlight label="Return shipping" value="Free" />

                  <ReturnHighlight
                    label="Refund time"
                    value="7 business days"
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="mt-28 space-y-24 md:mt-44 md:space-y-36">
            {returnSections.map((section) => (
              <PolicySection
                key={section.number}
                number={section.number}
                title={section.title}
              >
                {section.content}
              </PolicySection>
            ))}
          </div>

          <section className="mt-32 grid gap-8 md:mt-48 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                Start a return
              </p>

              <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                Need to send something back?
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                Contact us with your order number, email address and reason for
                the return. We will review your request and send you the return
                instructions.
              </p>

              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-4 text-[9vw] font-black uppercase leading-[0.85] tracking-[-0.035em] transition-opacity hover:opacity-55 sm:text-[7vw] md:mt-14 md:text-[4vw] lg:text-[3.5vw]"
              >
                Start return
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="h-6 w-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 md:h-8 md:w-8"
                >
                  <path
                    d="M6 26L26 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />

                  <path
                    d="M13 6H26V19"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </section>
      </ScrollSection>
    </main>
  );
}

function ReturnHighlight({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-40">
        {label}
      </p>

      <p className="mt-2 text-base font-medium">{value}</p>
    </div>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 md:grid-cols-12">
      <div className="flex items-start justify-between md:col-span-4 md:block">
        <h2 className="max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
          {title}
        </h2>

        <span className="text-[10px] font-bold tracking-[0.04em] opacity-35 md:mt-6 md:block">
          {number}
        </span>
      </div>

      <div className="max-w-2xl space-y-5 text-base leading-[1.7] text-[#161310]/65 md:col-span-7 md:col-start-6 md:text-lg">
        {children}
      </div>
    </section>
  );
}
