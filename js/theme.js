// Theme management for light/dark mode based on sunrise/sunset
(function() {
  'use strict';

  // Coordinates for zipcode 66044 (Lawrence, Kansas)
  const LATITUDE = 38.9717;
  const LONGITUDE = -95.2353;

  // Set theme mode
  function setTheme(mode) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(mode);
  }

  // Check if it's currently day or night based on sunrise/sunset
  function updateThemeFromSunriseSunset() {
    if (typeof SunCalc === 'undefined') {
      console.warn('SunCalc library not loaded, defaulting to light mode');
      setTheme('light-mode');
      return;
    }

    var now = new Date();
    var times = SunCalc.getTimes(now, LATITUDE, LONGITUDE);
    var sunrise = times.sunrise;
    var sunset = times.sunset;

    // Check if current time is between sunrise and sunset (daytime = light mode)
    // or between sunset and sunrise (nighttime = dark mode)
    if (now >= sunrise && now < sunset) {
      setTheme('light-mode');
    } else {
      setTheme('dark-mode');
    }
  }

  // Initialize theme on page load
  function initTheme() {
    updateThemeFromSunriseSunset();
    
    // Update theme every minute to handle sunrise/sunset transitions
    setInterval(updateThemeFromSunriseSunset, 60000);
  }

  // Expose functions globally for manual control if needed
  window.theme = {
    setLight: function() { setTheme('light-mode'); },
    setDark: function() { setTheme('dark-mode'); },
    setTheme: setTheme,
    updateFromSunriseSunset: updateThemeFromSunriseSunset
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();

