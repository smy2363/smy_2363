//cat card.js


window.onload = function () {
    const BOARD_SIZE = 24; // 24장의 카드
    const IMAGE_COUNT = 12; //  이미지 12개
    const IMAGE_PATH = 'static/image/'; // 이미지 경로
    let firstCard = null; // 첫 번째 선택 카드
    let secondCard = null; // 두 번째 선택 카드
    let noClick = false; // 클릭 방지

    // 카드 만들기
    function catCard() {
        let catCards = [];
        while (catCards.length < IMAGE_COUNT) {
            let cardNumber = getRandom(0, IMAGE_COUNT);
            if (!catCards.includes(cardNumber)) {
                catCards.push(cardNumber);
            }
        }
        return [...catCards, ...catCards];
    }

    // 랜덤 숫자
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // 카드 섞기
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getRandom(0, i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 보드에 카드 만들기
    function renderBoard(deck) {
        const board = document.getElementById('board');
        board.innerHTML = '';
        deck.forEach(cardNumber => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.number = cardNumber;

            const img = document.createElement('img');
            img.src = `${IMAGE_PATH}${cardNumber}.png`; // 이미지 경로
            img.alt = `Card ${cardNumber}`;
            img.style.visibility = 'hidden'; // 처음에 이미지를 숨김

            card.appendChild(img);
            board.appendChild(card);

            card.addEventListener('click', onCardClick);
        });
    }

    // 카드 클릭 이벤트
    function onCardClick(event) {
        if (noClick) return;
        const clickedCard = event.currentTarget;
        if (clickedCard.classList.contains('matched')) return;

        const img = clickedCard.querySelector('img');
        img.style.visibility = 'visible';

        if (!firstCard) {
            firstCard = clickedCard;
        } else if (firstCard && !secondCard) {
            secondCard = clickedCard;
            if (firstCard.dataset.number === secondCard.dataset.number) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                resetSelection();
            } else {
                noClick = true;
                setTimeout(() => {
                    firstCard.querySelector('img').style.visibility = 'hidden';
                    secondCard.querySelector('img').style.visibility = 'hidden';
                    resetSelection();
                    noClick = false;
                }, 500); // 0.5초 후에 카드 숨기기
            }
        }
    }

    // 선택 초기화
    function resetSelection() {
        firstCard = null;
        secondCard = null;
    }

    // 카드 한 장씩 천천히 보이게 하기
    function backCards() {
        const cards = document.querySelectorAll('.card img');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.visibility = 'visible';
            }, index * 200); // 0.2초 간격으로 한 장씩 보이게 함
        });
        setTimeout(hideCards, cards.length * 300 + 500);
    }

    // 카드 숨기기
    function hideCards() {
        const cards = document.querySelectorAll('.card img');
        cards.forEach(card => {
            card.style.visibility = 'hidden';
        });
    }

    // 게임 시작
    document.getElementById('start').onclick = function () {
        const cardDeck = catCard();
        shuffleArray(cardDeck);
        renderBoard(cardDeck);
        backCards();
    };
};
