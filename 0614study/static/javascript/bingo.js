//전역변수 
let endCount = 0; // 완성빙고 몇개?
let play분 = 0; // 빙고 진행 시간 -분
let play초 = 0;// 빙고 게임 진행 시간 - 초
let time = 0; // setInterval 의 핸들값 
let bingo = []; // 25개 숫자를 저장할 빈 배열 선언

$(function () {  // 브라우저에 모두 표시되면 실행 되는 함수 -window.onload
    //빙고시작 버튼 클릭 이벤트
    $("#start").click(start);

    // var tdClick = document.getElementsByClassName("num");
    // //for( var i=0; i<tdClick.length; i++){
    // for( var i in tdClick ){
    //     tdClick[i].addEventListener('click', function(){ alert(" 클릭 "); } );
    // }



});

function bingoCheck() {
    // jquery에서 css 넣는 방법 -  .css('속성' ,'값' ); 
    $(this).css('background', 'black');
    $(this).css('color', 'white');

    // 클릭한 td에 표시된 숫자를 배열에서 0으로 변경
    // 배열에 0 이 저장된곳은 클릭한 숫자 이다.
    var idx = $(".num").index(this); // 클릭한 td가 몇번째 인덱스인가
    bingo[idx] = 0; // 해당td위치와 같은 bingo배열에 0으로 변경
    //  4번째 td 클릭하면 idx는 3이고  bingo[3] =0 으로 변경하겠다는 내용
    /*
        빙고 몇줄?? 
        가로 세로 대각선 빙고인지 확인하는 내용과
        빙고가 5개 완성되면  게임 끝나게 하기 
    */
}

function start() {
    $(".num").click(bingoCheck);  // 숫자가 표시된 td를 클릭하면...
    // 빙고 게임을 위한 숫자 배치
    // 빙고시작 버튼 감추기
    // 빙고 진행 상황 보이기
    $(this).hide(); // this는 현재 함수를 실행한 객체- div#start
    $("#screen").show();
    $("#ok").text(endCount);

    $("#playTime").text('00:00');
    time = setInterval(function () {
        play초++;
        if (play초 == 60) {
            play분++;
            play초 = 0;
        }
        var 초Text = play초 <= 9 ? '0' + play초 : play초;
        var 분Text = play분 <= 9 ? '0' + play분 : play분;

        var timeText = `${분Text}:${초Text}`;

        $("#playTime").text(timeText);

    }, 1000);  //  1000 은 1초이다.

    init(); // 25개 숫자 배열에 저장하기
    draw(); // 화면에 출력하기
}


function init() { // 25개 숫자 배열에 저장
    while (bingo.length != 25) {
        var tmp = Math.floor(Math.random() * 50) + 1;
        if (bingo.indexOf(tmp) == -1)
            bingo.push(tmp);
    }
}
function draw() { // 배열의값 테이블(td)에 출력
    var td = $(".num");
    console.log(td);
    for (var i = 0; i < td.length; i++) {
        td.eq(i).text(bingo[i]);  // td[i]
    }
}