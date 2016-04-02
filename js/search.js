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
        var parameters = { search: $(this).val(), username: sess.username, short: sess.currentlanguage.shortened};
        $.get( '/app/words/search',parameters, function(data) {
            $(".allWords").html("");
            if (data.length == 0) {
                $(".allWords").html(`<div style='color:#d12929; font-weight: 600;' class='wordBlock'> No words match this query: ${escapeHtml(parameters.search)} </div>`);
            }
            data.forEach(elem => {
                var $wordBlock = $("<div>", {class: "wordBlock"});
                var $lang = $("<span>", {class: "lang"});
                $lang.html(elem.word);

                var $padding1 = $("<span>", {class: "padding"});
                var $padding2 = $("<span>", {class: "padding"});

                var $translations = $("<span>", {class: "english"});
                $translations.text(elem.translations);

                var $category = $("<span>", {class: "category"});
                $category.text(elem.catName);

                $wordBlock.append($lang);
                $wordBlock.append($padding1);
                $wordBlock.append($translations);
                $wordBlock.append($padding2);
                $wordBlock.append($category)

                $(".allWords").append($wordBlock);
            });
            //$('.allWords').html(JSON.stringify(data));
            // e.preventDefault();
        });
    });
});
