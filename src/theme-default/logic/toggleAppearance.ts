const APPEARANCE_KEY = 'appearance';

const setClassList = (isDark = false) => {
  const classList = document.documentElement.classList;
  if (isDark) {
    classList.add('dark');
  } else {
    classList.remove('dark');
  }
};

export const updateAppearance = () => {
  if (typeof localStorage !== 'undefined') {
    const userPreference = localStorage.getItem(APPEARANCE_KEY);
    setClassList(userPreference === 'dark');
  }
};

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateAppearance();
  window.addEventListener('storage', updateAppearance);
}

export const getToggle = () => {
  updateAppearance();

  return function toggle() {
    const classList = document.documentElement.classList;
    if (classList.contains('dark')) {
      setClassList(false);
      localStorage.setItem(APPEARANCE_KEY, 'light');
    } else {
      setClassList(true);
      localStorage.setItem(APPEARANCE_KEY, 'dark');
    }
  };
};
