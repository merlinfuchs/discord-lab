/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          0: "#09090B",
          1: "#101013",
          2: "#17171B",
          3: "#1E1E23",
          4: "#25252B",
          5: "#2B2B33",
          6: "#2F2F39",
          7: "#33333F",
          8: "#373745",
        },
      },
      height: {
        22: "5.5rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        224: "56rem",
        240: "60rem",
        256: "64rem",
        304: "76rem",
      },
      width: {
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        224: "56rem",
        240: "60rem",
        256: "64rem",
        304: "76rem",
      },
      padding: {
        22: "5.5rem",
      },
      scale: {
        101: "1.01",
        102: "1.02",
        103: "1.03",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
