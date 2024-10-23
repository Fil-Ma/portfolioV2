enum ThemeValue {
  LIGHT = "light",
  DARK = "dark",
}

function isValidTheme(value?: string | null): value is ThemeValue {
  return Object.values(ThemeValue).includes(value as ThemeValue);
}

const displayIcon = () => {
  const moon = Array.from(
    document.getElementsByClassName("moon") as HTMLCollectionOf<HTMLElement>,
  );
  const sun = Array.from(
    document.getElementsByClassName("sun") as HTMLCollectionOf<HTMLElement>,
  );

  const isDark = document.documentElement.classList.contains(ThemeValue.DARK);

  if (isDark) {
    moon[0].style.visibility = "hidden";
    sun[0].style.visibility = "visible";
  } else {
    moon[0].style.visibility = "visible";
    sun[0].style.visibility = "hidden";
  }
};

const theme = (() => {
  if (typeof localStorage !== "undefined") {
    const localValue = localStorage.getItem("theme");
    if (isValidTheme(localValue)) return localValue;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeValue.DARK
    : ThemeValue.LIGHT;
})();

if (theme === ThemeValue.DARK) {
  document.documentElement.classList.add(ThemeValue.DARK);
} else {
  document.documentElement.classList.remove(ThemeValue.DARK);
}

displayIcon();
window.localStorage.setItem("theme", theme);

const handleToggleClick = () => {
  const element = document.documentElement;
  element.classList.toggle(ThemeValue.DARK);

  const isDark = element.classList.contains(ThemeValue.DARK);
  localStorage.setItem("theme", isDark ? ThemeValue.DARK : ThemeValue.LIGHT);
  displayIcon();
};

document
  ?.getElementById("themeToggle")
  ?.addEventListener("click", handleToggleClick);
