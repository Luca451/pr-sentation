let enteredCode = "";
const correctCode = "1111";

const lockScreen = document.getElementById('lock-screen');
const passcodeScreen = document.getElementById('passcode-screen');
const homeScreen = document.getElementById('home-screen');
const dots = document.querySelectorAll('.dot');

// 1. Vom Lockscreen zum Passcode-Screen
document.getElementById('unlock-trigger').addEventListener('click', () => {
  lockScreen.classList.add('hidden');
  passcodeScreen.classList.remove('hidden');
});

// 2. Tasten-Klick-Logik
document.querySelectorAll('.key[data-value]').forEach(key => {
  key.addEventListener('click', () => {
    if (enteredCode.length < 4) {
      enteredCode += key.getAttribute('data-value');
      updateDots();

      if (enteredCode.length === 4) {
        setTimeout(checkCode, 200);
      }
    }
  });
});

// 3. Löschen-Taste
document.getElementById('delete-btn').addEventListener('click', () => {
  if (enteredCode.length > 0) {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();
  }
});

// 4. Punkte aktualisieren
function updateDots() {
  dots.forEach((dot, index) => {
    if (index < enteredCode.length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// 5. Code überprüfen
function checkCode() {
  if (enteredCode === correctCode) {
    passcodeScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
    resetPasscode();
  } else {
    alert("Falscher Code! Versuche: " + correctCode);
    resetPasscode();
  }
}

function resetPasscode() {
  enteredCode = "";
  updateDots();
}

// 6. Home-Button sperrt das Handy wieder
document.getElementById('iphone-home-button').addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  passcodeScreen.classList.add('hidden');
  lockScreen.classList.remove('hidden');
  resetPasscode();
});

const handoutScreen = document.getElementById('handout-screen');
const quizScreen = document.getElementById('quiz-screen');

// App 1: Website Klick (Öffnet/Steuert die Referat-Seite)
document.getElementById('app-website').addEventListener('click', () => {
  // Später verbinden wir das mit der Haupt-Website / Schlaf-Frage
  alert("Weiterleitung zur Haupt-Website...");
});

// App 2: Handout QR-Code anzeigen
document.getElementById('app-handout').addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  handoutScreen.classList.remove('hidden');
});

// App 3: Quiz QR-Code anzeigen
document.getElementById('app-quiz').addEventListener('click', () => {
  homeScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
});

// Home-Button Zurück-Logik aktualisieren
document.getElementById('iphone-home-button').addEventListener('click', () => {
  // Alle App-Screens ausblenden
  handoutScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  passcodeScreen.classList.add('hidden');
  homeScreen.classList.add('hidden');
  
  // Zurück zum Lockscreen
  lockScreen.classList.remove('hidden');
  resetPasscode();
});

// App 1: Website Klick (Leitet zur Präsentations-Seite weiter)
document.getElementById('app-website').addEventListener('click', () => {
  window.location.href = 'praesentation.html';
});

function updateBerlinClock() {
  const now = new Date();

  // Uhrzeit in der Zeitzone Europe/Berlin (24h-Format mit Sekunden/Minuten)
  const timeOptions = {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };

  // Datum auf Deutsch (z.B. "Donnerstag, 1. Oktober")
  const dateOptions = {
    timeZone: 'Europe/Berlin',
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  const timeString = new Intl.DateTimeFormat('de-DE', timeOptions).format(now);
  const dateString = new Intl.DateTimeFormat('de-DE', dateOptions).format(now);

  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  if (timeElement) timeElement.textContent = timeString;
  if (dateElement) dateElement.textContent = dateString;
}

// Sofort einmal ausführen und danach jede Sekunde aktualisieren
updateBerlinClock();
setInterval(updateBerlinClock, 1000);

// QR-Code Generierung für das Handout
const handoutQrImg = document.getElementById('qr-handout-img');

// Wenn du die Website lokal testest oder online veröffentlichst:
const handoutUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'handout.html';

// Setzt das QR-Code Bild automatisch über die API
if (handoutQrImg) {
  handoutQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(handoutUrl)}`;
}