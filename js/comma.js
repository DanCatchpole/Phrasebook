$(document).ready(function() {
    $(".english").each(function () {
        $(this).html($(this).html().replace(",", ", "));
    });
});
