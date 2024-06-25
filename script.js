document.addEventListener('DOMContentLoaded', createGameGrid);
let flippedCards = [];
let pairsFound = 0;
let lockBoard = false;

function createGameGrid() {
    const gameGrid = document.getElementById('game-grid');
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cards = symbols.concat(symbols);

    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = cards[i];
        card.textContent = '***';

        card.addEventListener('click', function() {
            if (!lockBoard && !card.classList.contains('flipped') && flippedCards.length < 2) {
                flipCard(card);
            }
        });

        gameGrid.appendChild(card);
    }
}

function flipCard(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.textContent = card.dataset.symbol;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            const symbol1 = card1.dataset.symbol;
            const symbol2 = card2.dataset.symbol;

            lockBoard = true;

            if (symbol1 === symbol2) {
                pairsFound++;
                flippedCards = [];
                lockBoard = false;

            } else {
                setTimeout(() => {
                    card1.textContent = '***';
                    card2.textContent = '***';
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    lockBoard = false;
                }, 1000);
            }

            moves++;
        }
    }
}
function resetGame() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    flippedCards = [];
    moves = 0;
    pairsFound = 0;
    lockBoard = false;
    createGameGrid();
}
