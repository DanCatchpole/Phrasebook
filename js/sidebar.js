$(document).ready(function() {
    $(".shrink").click(function() {
        if($('.sidebar').hasClass("small")) {
            $('.sidebar').animate({"width": 20*16 + ""}, 300, "swing");
            $.get( '/phrasebook/app/sidebar', { sidebar: "big" }, function(data) {

            });
            $(".sidebar span:not(.counter)").animate({"opacity": "1"}, 200);
            $('.sidebar').removeClass("small", "swing");
        } else {
            $(".sidebar span:not(.counter)").animate({"opacity": "0"}, 10, function () {

            });
            $('.sidebar').animate({"width": "130px"}, 200, "swing", function() {
                $(".sidebar").addClass("small", "swing");
            });
            $(".dropdown-elements > li").each(function () {
                if (!$(this).hasClass("hidden")) {
                    $(this).slideUp();
                }
            });
            $.get( '/phrasebook/app/sidebar', { sidebar: "small" }, function(data) {

            });
        }
        // $(".hideBar").toggleClass('rot-180');
    });

    $(".userSection .flag").click(function(event) {
        alert("TEST");
        event.stopPropagation();
    })

});
