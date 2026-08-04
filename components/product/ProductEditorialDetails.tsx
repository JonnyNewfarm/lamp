export default function ProductEditorialDetails() {
  return (
    <section
      className="
        mt-24
        border-t
        border-[#1a1817]/15
        pt-10
      "
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.34em]
              text-[#1a1817]/45
            "
          >
            Details
          </p>
        </div>

        <div className="md:col-span-8">
          <h2
            className="
              max-w-4xl
              font-merchant
              text-5xl
              font-light
              leading-[0.95]
              tracking-[-0.02em]
              md:text-7xl
            "
          >
            A quiet object for everyday atmosphere.
          </h2>

          <p
            className="
              mt-8
              max-w-2xl
              font-merchant
              text-xl
              font-light
              leading-[1.8]
              text-[#1a1817]
            "
          >
            Selected by Calero Studio for soft interiors, calm lighting and
            everyday use. Each available variant may differ in finish, color,
            plug type and supplier details.
          </p>
        </div>
      </div>
    </section>
  );
}
