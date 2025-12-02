// Clock display for current time
(function() {
  'use strict';

  var timeElement = document.getElementById('current-time');

  function updateTime() {
    if (!timeElement) return;

    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    
    // Format with leading zeros
    var hoursStr = hours.toString().padStart(2, '0');
    var minutesStr = minutes.toString().padStart(2, '0');
    var secondsStr = seconds.toString().padStart(2, '0');
    
    timeElement.textContent = hoursStr + ':' + minutesStr + ':' + secondsStr;
  }

  // Update immediately and then every second
  function initClock() {
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
  } else {
    initClock();
  }
})();

