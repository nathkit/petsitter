/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: {
        600: "#3a3b46",
        500: "#5b5d6f",
        400: "#7b7e8f",
        300: "#aeb1c3",
        200: "#dcdfed",
        100: "#f6f6f9",
      },
      orange: {
        600: "#e44a0c",
        500: "#ff7037",
        400: "#ff986f",
        300: "#ffb899",
        200: "#ffd5c2",
        100: "#fff1ec",
      },
      yellow: {
        200: "#ffca62",
        100: "#fff5ec",
      },
      blue: {
        500: "#76d0fc",
        100: "#ecfbff",
      },
      green: {
        500: "#1ccd83",
        100: "#e7fdf4",
      },
      pink: {
        500: "#fa8ac0",
        100: "#FFF0F1",
      },
      etc: {
        bg_gray: "#FAFAFB",
        black: "#000",
        white: "#fff",
        red: "#ea1010",
      },
    },
    extend: {
      fontSize: {
        headline1: [
          "3.5rem",
          {
            lineHeight: "4rem",
            fontWeight: "700",
          },
        ],
        headline2: [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            fontWeight: "700",
          },
        ],
        headline3: [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "700",
          },
        ],

        headline4: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "700",
          },
        ],
        body1: [
          "1.125rem",
          {
            lineHeight: "1.625rem",
            fontWeight: "500",
          },
        ],
        body2: [
          "1rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "500",
          },
        ],
        body3: [
          "0.875rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "500",
          },
        ],
        bodyButton: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "700",
          },
        ],
        display: [
          "5.5rem",
          {
            lineHeight: "6rem",
            fontWeight: "900 !important",
          },
        ],
      },
    },
  },
  // daisyui: ["dark", "cupcake"],

  plugins: [require("daisyui")],

  // daisyui: {
  //   themes: [],
  // },
};
