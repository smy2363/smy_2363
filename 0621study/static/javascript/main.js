$(function () {

    // 로그인 화면에서 로그인모달 닫기
    $("#back").click(function () {
        $("#modal").hide();
    });

    // 로그인 화면에서 로그인 버튼 클릭시
    $("#loginBt").click(function () {
        var id = $("#id");
        var pw = $("#pw");

        // 아이디와 비밀번호를 입력하지 않으면 로그인 진행 안 함.
        if (id.val() == '' || pw.val() == '') {
            alert("아이디 또는 비밀번호를 입력하세요.");
            return; // 해당 함수 종료
        }

        // 아이디와 비밀번호를 입력했다면 로그인 진행
        let user = JSON.parse(localStorage.getItem("user"));

        // 아이디 일치?
        if (id.val() === user.id) {
            // 아이디가 일치한다면 비밀번호는 일치?
            if (pw.val() === user.pw) {
                // 아이디와 비밀번호가 일치한다면 로그인처리
                $(".member").html(`<b>${user.id}</b>
                <a href="javascript:window.location.reload()">
                로그아웃 </a>
                `);
                $("#modal").hide();
                return;
            }
        }
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    });
});

function login() {
    $("#modal").show();
}