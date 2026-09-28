export default function ShopLoading() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#eeeeec]
        text-[#1a1817]
      "
    >
      <div className="flex flex-col items-center gap-5">
        <div className="shop-loader">
          <span />
        </div>

        <p className="font-bueno text-xs uppercase tracking-[0.16em]">
          Loading shop
        </p>
      </div>

      <style>{`
        .shop-loader {
          position: relative;
          width: 110px;
          height: 1px;
          overflow: hidden;
          background: rgba(26, 24, 23, 0.15);
        }

        .shop-loader span {
          position: absolute;
          top: 0;
          left: 0;

          width: 38%;
          height: 100%;

          background: #1a1817;

          animation: shopLoader 1.35s
            cubic-bezier(0.65, 0, 0.35, 1)
            infinite;
        }

        @keyframes shopLoader {
          0% {
            transform: translateX(-120%);
          }

          50% {
            transform: translateX(90%);
          }

          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </main>
  );
}
