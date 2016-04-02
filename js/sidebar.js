$(document).ready(function() {
    $(".shrink").click(function() {
        if($('.sidebar').hasClass("small")) {
            $('.sidebar').animate({"width": 20*16 + ""}, 200, "swing");
            $.get( '/app/sidebar', { sidebar: "big" }, function(data) {

            });
            $('.sidebar').removeClass("small", "swing");
        } else {
            $('.sidebar').animate({"width": "130px"}, 200, "swing", function() {
                $(".sidebar").addClass("small", "swing");
            });
            $(".dropdown-elements > li").each(function () {
                if (!$(this).hasClass("hidden")) {
                    $(this).slideUp();
                }
            });
            $.get( '/app/sidebar', { sidebar: "small" }, function(data) {

            });
        }
        // $(".hideBar").toggleClass('rot-180');
    });
});
