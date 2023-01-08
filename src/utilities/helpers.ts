export const getOSTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? "dark"
    : "light";
}

export const get12HourTime = (date: Date): string => {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

