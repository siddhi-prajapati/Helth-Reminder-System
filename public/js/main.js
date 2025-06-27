const alarmSound = new Audio('/sound/alarm.mp3');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log("✅ Service Worker Registered"))
    .catch(err => console.error("❌ SW Error", err));
}

function checkReminders() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  document.querySelectorAll(".list-group-item").forEach(item => {
    const text = item.innerText;
    if (text.includes(currentTime)) {
      alarmSound.play();
      Swal.fire({
        icon: "info",
        title: "Reminder!",
        text: text.split('\n')[0], // Show title only
        timer: 5000
      });
    }
  });
}

setInterval(checkReminders, 60000); // Check every minute
