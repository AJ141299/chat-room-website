export const getOSTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? "dark"
    : "light";
}

