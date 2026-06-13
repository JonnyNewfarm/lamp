import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Privacy
        </p>

        <h1 className="mt-5 text-6xl font-black leading-[0.9] tracking-[-0.045em] md:text-8xl">
          Privacy Policy
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          This policy explains how Calero Studio may collect, use and protect
          information when you visit our website, place an order or contact us.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Information we collect">
            <p>
              We may collect information you provide when using our website,
              placing an order or contacting us. This may include your name,
              email address, phone number, billing address, shipping address,
              order details and customer support messages.
            </p>
            <p>
              We may also collect basic technical information, such as your IP
              address, browser type, device information, pages visited and how
              you interact with the website.
            </p>
          </PolicySection>

          <PolicySection title="How we use information">
            <p>
              We use information to process orders, confirm payments, arrange
              shipping, provide tracking information, respond to customer
              support requests, handle returns and refunds, prevent fraud and
              improve the shopping experience.
            </p>
            <p>
              We may also use information to maintain website security, analyze
              website performance and communicate important updates about your
              order.
            </p>
          </PolicySection>

          <PolicySection title="Payments">
            <p>
              Payments are processed through secure third-party payment
              providers. Calero Studio does not store full credit card or debit
              card details on this website.
            </p>
            <p>
              Payment providers may collect and process payment information in
              accordance with their own privacy and security policies.
            </p>
          </PolicySection>

          <PolicySection title="Shipping and fulfillment">
            <p>
              We may share necessary order and shipping information with trusted
              fulfillment, delivery and service partners so they can help
              process, pack and deliver your order.
            </p>
            <p>
              Only the information needed to complete the service is shared.
            </p>
          </PolicySection>

          <PolicySection title="Analytics and marketing">
            <p>
              We may use analytics or advertising tools to understand website
              performance, improve marketing and measure how visitors interact
              with the website. These tools may use cookies or similar
              technologies.
            </p>
            <p>
              You can control or disable cookies through your browser settings.
              Some parts of the website may not function properly if cookies are
              disabled.
            </p>
          </PolicySection>

          <PolicySection title="Cookies">
            <p>
              Cookies are small files stored on your device. We may use cookies
              to remember preferences, support checkout functionality, improve
              website performance and understand how the website is used.
            </p>
          </PolicySection>

          <PolicySection title="Data retention">
            <p>
              We keep personal information only for as long as necessary to
              provide our services, process orders, comply with legal
              obligations, resolve disputes and maintain business records.
            </p>
          </PolicySection>

          <PolicySection title="Your rights">
            <p>
              Depending on your location, you may have the right to request
              access to the personal information we hold about you, ask us to
              correct it, request deletion or object to certain types of
              processing.
            </p>
            <p>
              To make a privacy-related request, please contact us using the
              contact information below.
            </p>
          </PolicySection>

          <PolicySection title="Security">
            <p>
              We take reasonable steps to protect customer information from
              unauthorized access, loss, misuse or disclosure. However, no
              method of online transmission or storage is completely secure.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              For privacy questions, please contact us through the{" "}
              <Link href="/contact" className="underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-light tracking-[-0.04em]">{title}</h2>
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
