// notice.js
// 키보드 누르면 눌렀다 신호만 전달
// 키보드를 떼야 키값전달
// 계속 키보드 키를 눌러도 키가 입력이 되는것은
// 눌렀다 신호가 여러 번  전달되면 입력 처리로 변경

$(function () {

    $("#detail").keyup(function () {
        //5자 이상 입력해야 버튼 활성화
        if ($("#detail").val().length >= 5) {
            $("#save").removeAttr('disabled');
        } else {
            $("#save").attr('disabled', 'disabled');
        }
    });

    // $("#save").on('click',function(){ })
    $("#save").click(function () {
        let text = $("#detail").val();
        addList(text); // input태그에 입력값 ul에 넣기

        // input 태그에 아무것도 입력하지 않았다면??
        // if( text === '' ){// input태그가 비어있다
        //     alert("내용을 입력하세요");
        //     $("#detail").focus();
        //     return; // 함수 강제 종료를 위해
        // }
    }); // $("#save").click  END

}); // $(function ) END


function addList(text) {
    $("#list").append('<li>' + text + '</li>');
}