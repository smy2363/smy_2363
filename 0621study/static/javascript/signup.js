//signup.js

// $(function () {
//회원가입 버튼 클릭 이벤트 등록
// $("#signup").on('click', requiredCheck);


//체크박스들을 선택하였을경우 어떻게 값이 나요나?
// $("signup").on('click', function () {
// jquery에서 checkbox중 체크 한 것만 가져오려면
// $("input[name=interest]:checked")
//:checked를 붙여야 체크한 것만 가져온다.

// alert($("input[name=interest]:checked").length);

// 체크 한 value값 전부 확인하려면
let itr = $("input[name=interest]:checked");
let value = [];
for (var i = 0; i < itr.lenght; i++) {
    value.push($(itr[i]).val());
}
alert("체크 한 관심분야 : " + value);





// let interest = $("input[name=interest]:checked").val();
// alert(interest);


//$("#signupForm").submit();
//     });
// });

function requiredCheck() { //필수 입력을 모두 입력했는가?
    var id = $("#userId"); // 아이디 id.val()
    var pw = $("#userPw"); // 비밀번호
    var re = $("#pwRe"); // 비밀번호 확인
    var email = $("email"); //이메일
    var tel = $("#tel"); // 연락처
    var addr = $("addr"); // 주소

    if (id.val() == '') {
        alert("아이디를 입력하세요");
        id.focus(); //아이디 input태그에 포커스 넣기
    } else if (pw.val() === '') {
        alert("비밀번호를 입력하세요");
        pw.focus(); re.val('');
    } else if (re.val() === '') {
        alert("비밀번호를 다시 입력해주세요");
        re.focus();
    } else if (pw.val() != re.val()) {
        alert("비밀번호가 잘못되었습니다.");
        pw.val(''); re.val('');
        pw.focus();
    } else if (email.val() == '') {
        alert("이메일을 입력하세요");
        email.focus();
    } else if (tel.val() == '') {
        alert("연락처를 입력하세요");
        tel.focus();
    } else if (addr.val() == '') {
        alert("주소를 입력하세요");
    } else {// 위의 if조건식이 모두 거짓이라면 동작
        // 모두 거짓이면 필수입력 전부 입력된 것이다.
        $("#signupForm").submit();
    }
}
