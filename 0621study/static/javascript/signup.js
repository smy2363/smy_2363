$(function () {

    $("#portrait").on("change", function (e) {      // 키보드 입력 관련해서도 change를 쓸 수 있다.
        // console.log($(this).val());
        console.log(e.target.files);              // 파일의 정보를 알 수 있다.
        var file = e.target.files[0];               // input 태그로 선택한 파일의 정보. 파일명, 파일유형, 수정일자, 크기

        var reader = new FileReader();              // 파일열기 객체 생성
        reader.onload = function (e) {              // 파일 열기가 완료되면
        }

        reader.readAsDataURL(file);



        // console.log( e.target.result );
    });

    // 회원가입 버튼 클릭이벤트 등록
    $("#signup").on('click', requiredCheck);

    //    $("#signup").on('click', function(){
    //     // jquery에서 checkbox중 체크 한 것만 가져오려면
    //     // $("input[name=interest]:checked")
    //     // :checked 를 붙여야 체크한 것만 가져온다.

    //     // alert(("input[name=interest]:checked").length);     // 배열로 들고온다.

    //     // 체크한 value 값 전부 확인하려면
    //     let itr = $("input[name=interest]:checked");
    //     let value=[];
    //     for(var i=0; i<itr.length; i++){
    //         value.push($(itr[i]).val());
    //     }
    //     alert("체크한 관심분야 : " + value);

    //     // let interest = $("input[name=interest]:checked").val();
    //     // alert(interest);
    //     //$("#signupForm").submit();
    //    });
});

function requiredCheck() {       // 필수 입력을 모두 입력했는가?
    var id = $("#userId");      // id.val()
    var pw = $("#userPw");
    var re = $("#pwRe");
    var email = $("#email");
    var tel = $("#tel");
    var addr = $("#addr");

    if (id.val() == '') {
        alert("아이디를 입력하세요.");
        id.focus();             // 아이디 input태그에 포커스 넣기
    } else if (pw.val() == '') {
        alert("비밀번호를 입력하세요.");
        pw.focus(); re.val('');
    } else if (re.val() == '') {
        alert("비밀번호를 다시 입력하세요.");
        re.focus();
    } else if (pw.val() != re.val()) {
        alert("비밀번호가 잘못되었습니다.");
        pw.val(''); re.val('');
        pw.focus();
    } else if (email.val() == '') {
        alert("이메일을 입력하세요.");
        email.focus();
    } else if (tel.val() == '') {
        alert("연락처를 입력하세요.");
        tel.focus();
    } else if (addr.val() == '') {
        alert("주소를 입력하세요.");
        addr.focus();
    } else {                      // 위의 if 조건식이 모두 거짓이라면? 즉, 모두 거짓이면 필수입력이 전부 입력된것이다.

        // localatorage에 저장

        // 아이디 - id,  비밀번호 - pw, 이메일 - email, 연락처 - tel, 주소 - addr
        var user = {
            id: id.val(), pw: pw.val(), email: email.val(), tel: tel.val(), addr: addr.val()

        }
        localStorage.setItem("user", JSON.stringify(user));


        $("#signupForm").submit();
    }

}