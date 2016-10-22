constants = require("../constants");

function escapeHtml(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

$(function(){
    $('#search').on('keyup', function(e){
        if ($("#category")) {
            var parameters = { search: $(this).val(), username: $("#username").val(), category: $("#category").val(), short: $("#shortenedLanguage").val()};
        } else {
            var parameters = { search: $(this).val(), username: $("#username").val(), short: $("#shortenedLanguage").val()};
        }
        $.post( constants.URL + '/app/words/search', parameters, function(data) {
            $(".allWords").html("");
            if (data.length == 0) {
                $(".allWords").html(`<div style='color:#d12929; font-weight: 600;' class='wordBlock'> No words match this query: ${escapeHtml(parameters.search)} </div>`);
            }
            data.forEach(elem => {
                var $wordBlock = $("<div>", {class: "wordBlock"});
                var $lang = $("<span>", {class: "lang"});
                $lang.html(elem.word);

                var $padding1 = $("<span>", {class: "padding"});

                var $translations = $("<span>", {class: "english"});
                $translations.text(elem.translations);


                $wordBlock.append($lang);
                $wordBlock.append($padding1);
                $wordBlock.append($translations);
                if (!$("#category")) {
                    var $padding2 = $("<span>", {class: "padding"});
                    var $category = $("<span>", {class: "category"});
                    $category.text(elem.catName);


                    $wordBlock.append($padding2);
                    $wordBlock.append($category)
                }

                $(".allWords").append($wordBlock);
            });
            comma();
        });
    });
});
