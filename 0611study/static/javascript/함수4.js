//함수4.js

//브라우저에 모두 표시되면 발생하는 이벤트 onload
window.onload = function () {
    document.getElementById("calc").addEventListener('click', function () {
        var kor = Number(document.getElementById("kor").value);
        var mat = Number(document.getElementById("mat").value);
        var eng = Number(document.getElementById("eng").value);
        var his = Number(document.getElementById("his").value);
        총점계산(kor, mat, eng, his);

    });

}


function 총점계산(a, b, c, d) { //총점 계산 만 하는 함수


    var total = a + b + c + d;
    평균계산(total);
}


function 평균계산(total1) { //평균 계산만 하는 함수

    출력(total1, total1 / 4);
}
function 출력(total, avg) { //총점과 평균을 화면에 출력하는 함수

    document.getElementById("total").innerText = total;
    document.getElementById("avg").innerText = avg;

}