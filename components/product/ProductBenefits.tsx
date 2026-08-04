type InfoBlockProps = {
  title: string;
  text: string;
};

function InfoBlock({ title, text }: InfoBlockProps) {
  return (
    <div className="bg-[#eeeeec] p-5">
      <p className="font-semibold">{title}</p>

      <p className="mt-2 text-[#1a1817]">{text}</p>
    </div>
  );
}

export default function ProductBenefits() {
  return (
    <div
      className="
        mt-10
        grid
        grid-cols-2
        gap-px
        bg-[#1a1817]/15
        text-sm
      "
    >
      <InfoBlock title="Shipping" text="Free tracked shipping" />

      <InfoBlock title="Payment" text="Secure checkout" />

      <InfoBlock title="Returns" text="30-day returns" />

      <InfoBlock title="Support" text="Email support" />
    </div>
  );
}
