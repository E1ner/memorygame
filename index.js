// Selecciona todos los elementos con la clase 'memory-card' y los guarda en una NodeList llamada 'cards'.
const cards = document.querySelectorAll('.memory-card');

// Variables para el control del juego
let hasFlippedCard = false; // Indica si ya se ha volteado una carta.
let lockBoard = false; // Indica si el tablero está bloqueado para evitar interacciones antes de que se completen las animaciones.
let firstCard, secondCard; // Variables para almacenar las dos cartas volteadas.

// Función para voltear una carta cuando se hace clic en ella.
function flipCard() {
  if (lockBoard) return; // Si el tablero está bloqueado, no hace nada.
  if (this === firstCard) return; // Si se hace clic nuevamente en la misma carta, no hace nada.

  this.classList.add('flip'); // Añade la clase 'flip' para voltear la carta.

  if (!hasFlippedCard) {
    // Primer clic
    hasFlippedCard = true;
    firstCard = this; // Almacena la referencia a la primera carta volteada.

    return;
  }

  // Segundo clic
  secondCard = this;

  checkForMatch(); // Comprueba si las dos cartas son iguales.
}

// Función para comprobar si las dos cartas son iguales.
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards(); // Deshabilita las cartas si son iguales, o las voltea de nuevo si no lo son.
}

// Función para deshabilitar las cartas si son iguales.
function disableCards() {
  firstCard.removeEventListener('click', flipCard); // Elimina el evento clic para evitar más interacciones con la carta.
  secondCard.removeEventListener('click', flipCard);

  resetBoard(); // Reinicia las variables del juego.
}

// Función para voltear de nuevo las cartas si no son iguales.
function unflipCards() {
  lockBoard = true; // Bloquea el tablero durante la animación.

  setTimeout(() => {
    firstCard.classList.remove('flip'); // Quita la clase 'flip' para voltear la carta de nuevo.
    secondCard.classList.remove('flip');

    resetBoard(); // Reinicia las variables del juego después de la animación.
  }, 1500); // Tiempo en milisegundos para la duración de la animación.
}

// Función para reiniciar las variables del juego.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Función de autoinvocación (IIFE) para barajar las cartas al cargar la página.
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos; // Cambia el orden de las cartas en el diseño.
  });
})();

// Añade un evento clic a cada carta para llamar a la función flipCard cuando se hace clic en ella.
cards.forEach(card => card.addEventListener('click', flipCard));
