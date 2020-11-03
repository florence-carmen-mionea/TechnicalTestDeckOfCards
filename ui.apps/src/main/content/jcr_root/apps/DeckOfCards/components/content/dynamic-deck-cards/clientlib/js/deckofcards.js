const generateDeck = () => {
    const suits = [
        {
            name: 'Club',
            shape: '♣',
            color: 'black',
        },
        {
            name: 'Spade',
            shape: '♠',
            color: 'black',
        },
        {
            name: 'Heart',
            shape: '♥',
            color: 'red',
        },
        {
            name: 'Diamon',
            shape: '♦',
            color: 'red',
        },
    ];
    const numbers = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');
    const deck_size = suits.length * numbers.length;
    let deck_of_cards = [];
    for (let i = 0; i < deck_size; i++) {
        let card = {
            numberIndex: i % numbers.length,
            numbers: numbers[i % numbers.length],
            suitIndex: Math.floor(i / numbers.length),
            suits: suits[Math.floor(i / numbers.length)],
        };
        deck_of_cards.push(card);
    }
    return deck_of_cards;
};
const renderDeck = (deck) => {
    const root = document.getElementById('deck_container');
    root.innerHTML = ''; // Clear root element for rerendering of deck
    const errorMessage = document.getElementById('error_message');
    errorMessage.innerHTML = ''; // Clear error message
    for (var i = 0; i < deck.length; i++) {
        const element = deck[i];
        const { suits, numbers } = element; // Array of objects ES6 Destructuring
        // Create card item, suits, number elements
        const cardElement = document.createElement('div');
        const suitsElement = document.createElement('p');
        const numberElement = document.createElement('p');
        // Adding specific classes for created elements
        cardElement.classList.add('card');
        suitsElement.classList.add('card__suits');
        numberElement.classList.add('card__numbers');
        suits.color === 'red' ? suitsElement.classList.add('card__suits--red') : suitsElement.classList.add('card__suits--black');
        // Write inside suits/number element specific value getted from the destrutured array.
        suitsElement.innerHTML = `${suits.shape}`;
        numberElement.innerHTML = `${numbers}`;
        // Append suits and number elements to card element.
        cardElement.appendChild(numberElement);
        cardElement.appendChild(suitsElement);
        // Append the card elements and his child to the root element.
        root.appendChild(cardElement);
    }
};
const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap elements cards[i] and cards[j]
        [cards[i], cards[j]] = [cards[j], cards[i]]; // let t = cards[i]; cards[i] = cards[j]; cards[j] = t
    }
};
const drawCards = (deck, givenNumber) => {
    shuffleCards(deck);
    return deck.splice(0, givenNumber);
};
const sortCards = (deck) => {
    return deck.sort(function (a, b) {
        if (a.suitIndex < b.suitIndex || (a.suitIndex == b.suitIndex && a.numberIndex < b.numberIndex)) {
            return -1;
        }
        return 1;
    });
};
/* Draw given number of cards with removing from original deck */
const givenNumberSortedCards = (givenNumber,hasSortActive) => {
    const errorMessage = document.getElementById('error_message');
    if (givenNumber < 52) {
        errorMessage.innerHTML = ''; // Clear error message
        const deck = generateDeck();
        const shuffledCards = drawCards(deck, givenNumber)
        renderDeck(shuffledCards);
        if (hasSortActive) {
            const sortedCards = sortCards(shuffledCards);
            renderDeck(sortedCards);
        }
    } else {
        errorMessage.innerHTML = 'Your number must be < 52';
        const root = document.getElementById('deck_container');
        root.innerHTML = '';
    }
}
/* Shuffle cards */
const shuffleDeckOfCards = () => {
    const errorMessage = document.getElementById('error_message');
    errorMessage.innerHTML = ''; // Clear error message
    const deck = generateDeck();
    shuffleCards(deck);
    renderDeck(deck);
}
