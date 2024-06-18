//rps.js

const com = ["scissors.png", "rock.png", "paper.png"]
let record = []; //전적 저장
let comHd = 0; //컴퓨터 이미지 보이기 위한   setInterval값
let comSelect = 0; //컴퓨터 가위바위보 값

$(function () { // window.onload - 브라우저 화면표시 완료

    // 전적 배열 초기화 세팅

    let storageData = JSON.parse(localStorage.getItem("record"));
    if (storageData) { //localStorage 에 저장되 ㄴ값이 있냐?
        record = [new Array(), new Array(), new Array()];
        //      유저     ,   컴,   결과
    } else {
        console.log("storage저장 데이터 없음");
    }

    $("#comImg").attr('src', './static/image/' + com[0]);

    $("#game").click(startAndStop);
    $("#record").click(gameRecord);
});

function gameRecord() {
    $("#modal").show(); //모달창 보이기

    $("#data").empty();  //데이터 제거

    for (var i = 0; i < record[0].length; i++) {
        $("#data").append(`
            <tr>
                <td class="user"><img src="./static/image/${record[0][i]}"></td>
                <td class="com"><img src="./static/image/${record[1][i]}"></td>
                <td class="outcome">${record[2][i]}</td>
                </tr>
            `);
    }



    $("#modalBackground").click(function () {
        $("#modal").hide();  // 모달창 감추기
    });
}

function startAndStop() {
    // $(this) === $("#game")
    if ($(this).text() === '종료') { //가위바위보 진행중
        $(this).text("시작");
        clearInterval(comHd); //컴퓨터 이미지변경되는 setInterval 종료
        $(".userImg").off('click'); //종료시 유저 가위바위보 클릭 이벤트 해제


    }
    else {
        $(this).text("종료");
        comStart(); //컴퓨터 이미지 변경(setinterval)
        $(".userImg").click(userSelect);//유저 가위바위보 클릭 이벤트
    }

    //증감연산자가 뒤에붙는경우  (comSelect==3) comSelect=0; 으로 바뀌어야함

}

function userSelect() {
    var idx = $(".userImg").index($(this)); //내가 클릭한 가위바위보 찾기
    // userImg 클래스들을 배열로 가져오고 그중에서 몇번째 인덱스를 클릭했냐?
    $(this).css('border', '1px solid black');// 내가 클릭한 가위바위보 이미지 표시
    clearInterval(comHd);// 컴퓨터의 가위바위보 이미지변경 하는거 멈추기(clearInterval)
    outcome(idx, comSelect); //결과 띄우기(승, 패, 무)

    setTimeout(function () {

        comStart();//다시 컴퓨터 가위바위보 이미지변경되게(setInterval)

        $(".userImg").eq(idx).css('border', '');//내가 클릭한 가위바위보 이미지 표시 해제
        //$(this).removeAttr('style'); <해당태그의 스타일을 빼는것>

        $(".result").remove();

    }, 3000); // 지정된시간이후에 한번 실행
}


function outcome(u, c) {//u는 유저가 가위바위보, c는 컴 가위바위보
    //0 - 가위, 1 - 바위, 2 -보
    var result = "승";
    var minus = u - c; //-2, 1  유저승 0 비김 -1, 2 유저패\

    switch (minus) {
        case 0: result = "무"; break;
        case -1:
        case 2: result = "패"; break;
    }

    // 유저와 컴퓨터 가위바위보 비교하여 승 패 무 출력 되게 하세요

    record[0].push(com[u]);  // 유저 가위바위보 저장
    record[1].push(com[c]);
    record[2].push(result);
    console.log(record);

    localSave(); //컴퓨터에 저장 하기( 브라우저에 저장)


    $("body").append(`<div class="result"> ${result}</div>`);

}

function comStart() {
    comHd = setInterval(function () {
        if (comSelect == 2) comSelect = -1;
        $("#comImg").attr('src', './static/image/' + com[++comSelect]);

    }, 80); //지정된 시간에 한번씩 실행, 시간단위는 밀리세컨드 1000이 1초

}

function localSave() {

    // JSON.stringify() JSON 이라는 문자열로 변환 시켜준다.
    // 숫자 -> 문자열    10+""

    let recordJSON = JSON.stringify(record);
    localStorage.setItem("record", recordJSON);

    // localStorage.setItem("like", "banana");  //localStorage - 문자열 데이터만 저장가능


}