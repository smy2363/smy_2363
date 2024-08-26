
$(function () {

    //화면 크기 800보다 작은경우 아이콘 클릭시
    $(".m-menu-icon").on("click", function () {
        $(".m-menu-slide").slideToggle();
    });
    $(".m-menu-title").on("click", function () {
        $(".m-menu-sub").slideUp();
        $(this).next(".m-menu-sub").slideDown();
    });
});