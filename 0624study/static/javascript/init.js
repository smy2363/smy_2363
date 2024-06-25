// init.js

// 초기 세팅 
let boardInit; // 게임판 초기화 함수
let stateInit; // 게임 현황 초기화 함수
let imgLocation; // 이미지 배치 함수
let start; // 게임 시작 함수

//전역변수
let score = 0; //점수
let time = 0; //시간
let clickCount = 0; // 클릭횟수
const imgName = ["두리안.jpg", "람부탄.jpg", "망고.jpg", "바나나.jpg", "배.png",
    "수박.jpg", "용과.jpg", "자두.jpg", "파파야.jpg"
]
let imgPlace = []; // 이미지 배치 값 (1,2,3,4,5,...);
let selectImg = []; // 선택 이미지 인덱스
let imgCount = 6; // 사용할 이미지 갯수




$(function () {
    boardInit();
    $("#start").click(start);
});

// 게임판 초기화 함수
boardInit = function () {
    $(".item").each(function (i, v) {
        $(this).find("img").addClass("hide");
        $(this).append(`<div class="itemHide"></div>`);
    });
}

//게임 시작 함수
start = function () {
    stateInit();
    imgLocation();
    $(".item").on("click", imgClick);
    timeStart(); // 게임 진행 시간 시작!!
}

//게임현황 초기화함수
stateInit = function () {
    //$("#state").show();
    $("#gameStart").addClass("hide");
    $("#state").removeClass("hide");

    $("#score").text(`점수 : ${score}점`);
    $("#step").text(`${time}초`);
    $("#click").text(`클릭횟수 : ${clickCount}/30`);
}

//이미지 배치 함수
imgLocation = function () {

    var temp = [];
    while (temp.length != imgCount) {  // 12칸이므로 사용할 이미지 6장 구하기(랜덤하게)
        var tempNum = Math.floor(Math.random() * imgName.length);
        if (temp.indexOf(tempNum) == -1)
            temp.push(tempNum);
    }
    console.log(temp);

    imgPlace = temp.concat(temp); // 6개의 랜덤값을 두개 합쳐서 저장
    console.log(imgPlace);
    imgPlace = shuffle(); // imgPlace에 저장된 값을 섞어주기 위한 함수실행
    console.log(imgPlace);

    $(".item").each(function (i) {
        $(this).find("img").attr("src", "./static/image/" + imgName[imgPlace[i]]);
        $(this).find("img").removeClass("hide");
    });

    setTimeout(function () {
        $(".item>img").addClass("hide");
    }, 1000);

}
function shuffle() {
    for (var i = imgPlace.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = imgPlace[i];
        imgPlace[i] = imgPlace[j];
        imgPlace[j] = t;
    }
    return imgPlace;
}