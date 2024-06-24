window.onload = function () {
    const BOARD_SIZE = 12; // 12장의 카드
    const IMAGE_COUNT = 12; // 이미지 12개
    const IMAGE_PATH = './static/image/'; // 이미지 경로
    const TOTAL_STAGE = 3;  // 총 스테이지 수
    let firstCard = null; // 첫 번째 선택 카드
    let secondCard = null; // 두 번째 선택 카드
    let noClick = false; // 클릭 방지
    let score = 0; // 점수
    let matches = 0; // 맞춘 카드 수
    let stage = 1; // 현재 스테이지
    let boardSize = BOARD_SIZE; // 현재 스테이지의 카드 수

    // 점수 업데이트
    function updateScore() {
        document.getElementById('score').textContent = `SCORE : ${score}`;
    }

    // 스테이지 업데이트
    function updateStage() {
        document.getElementById('stage').textContent = `STAGE : ${stage}`;
    }

    // 카드 만들기
    function catCard() {
        let catCards = [];
        let nowImageCount = Math.min(IMAGE_COUNT + (stage - 1), 24);
        while (catCards.length < nowImageCount) {
            let cardNumber = getRandom(0, nowImageCount);
            if (!catCards.includes(cardNumber)) {
                catCards.push(cardNumber);
            }
        }
        let catDeck = [];
        for (let i = 0; i < boardSize / 2; i++) {
            catDeck.push(catCards[i % catCards.length]);
        }
        return [...catDeck, ...catDeck];
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
                score += 10;  // 점수 증가
                matches += 1;  // 맞춘 카드 수 증가
                updateScore(); // 점수 업데이트
                resetSelection();

                // 모든 카드를 맞췄을 때
                if (matches === boardSize / 2) {
                    if (stage < TOTAL_STAGE) {
                        alert('축하합니다. 다음 스테이지로 넘어갑니다!');
                        stage += 1; // 다음 스테이지로 이동
                        boardSize += 6; // 각 스테이지마다 카드 수를 6장씩 증가
                        setTimeout(nextStage, 3000); // 3초 후에 다음 스테이지로 이동
                    } else {
                        alert('모든 스테이지 클리어!!');
                        resetGame();
                    }
                }
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

    // 다음 스테이지로 이동
    function nextStage() {
        startGame();
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
    function startGame() {
        const catDeck = catCard();
        shuffleArray(catDeck);
        renderBoard(catDeck);
        backCards();
        matches = 0; // 맞춘 카드 수 초기화
        updateScore(); // 점수 업데이트
        updateStage(); // 스테이지 업데이트
    }

    // 게임 초기화
    function resetGame() {
        score = 0;
        stage = 1;
        boardSize = BOARD_SIZE;
        startGame();
    }

    document.getElementById('start').onclick = startGame;
};