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
font-morganite              text-7xl
              font-semibold
              leading-[0.8]
              md:text-9xl
            "
          >
            A quiet object for everyday atmosphere.
          </h2>

          <div
            className="
    mt-6
    max-w-2xl
    text-xl
    leading-[1]
    text-[#1a1817]
  "
          >
            <span className=" flex flex-col gap-y-2 md:text-xl">
              <p>
                Selected by Calero Studio for soft interiors, calm lighting and
                everyday use.
              </p>
              <p>
                Each available variant may differ in finish, color, plug type
                and supplier details.
              </p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
