$(document).ready(() => {
  // Select page / Display page content, highlighters in project
  $(document).on("click", ".page-list", (event) => {
    $(".page-list.primary").removeClass("primary");
    let $target = $(event.target);
    $target.addClass("primary");
    let selectedPageId = $target.attr("page-id");

    $.ajax({
      url: "/get_content",
      method: "GET",
      data: {
        format: "json",
        page_id: selectedPageId
      },
      success: function(data) {
        // load selected page content
        $("#page-title").empty().html(data.page.title);
        $("#page-content").empty().html(data.page.content);
        // load highlighters
        $("#highlighter-listing").empty();
        _.each(data.highlighters, (highlighter) => {
          let $highlighterWrap = $('<div>')
            .addClass('highlighter-list-wrap')
            .appendTo("#highlighter-listing");
          let $highlighter = $('<div>')
            .addClass('ui button highlighter-list')
            .html(highlighter.name)
            .attr('highlighter-id', highlighter.id)
            .css({
              "color": highlighter.color,
              "backgroundColor": highlighter.backgroundColor,
            }).appendTo($highlighterWrap);
        });
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Selecting highlighter with toogle
  $(document).on("click", ".highlighter-list", (event) => {
    let $target = $(event.target);
    console.log();
    $(".highlighter-list.active").parent().css({
      "borderColor": "",
      "backgroundColor": ""
    });
    $(".highlighter-list.active").removeClass("active");
    if(!$target.attr("class").match(/active/)){
      $target.addClass("active");
      $target.parent()
        .css({
          "borderColor": "black",
          "borderRadius": "6px",
          "backgroundColor": "black"
        });
    }
  });

  // page content highlighting, work only of highlighter is selected
    $(document).on("mouseup", "#page-content", () => {
      if($(".highlighter-list.active").html()) {
        let highlighter = {
          id: $(".highlighter-list.active").attr("highlighter-id"),
          cssProp: {
            color: $(".highlighter-list.active").css("color"),
            backgroundColor: $(".highlighter-list.active").css("backgroundColor")
          }
        }
        let selection = window.getSelection();
        let $startDOM = $(selection.anchorNode.parentNode);
        let $endDOM = $(selection.focusNode.parentNode);
        console.log(selection.toString());

        // check if the start and end of highlighted part is insided already highlighted text or not?
        if( ($startDOM.attr('class')!='highlight') && ($endDOM.attr('class')!='highlight') ) {
          let context = $startDOM.html();
          let splitResult = context.split(selection.toString());

          let $highlight = $("<span>")
            .addClass("highlight")
            .attr("highlighter", highlighter.id)
            .html(selection.toString());
          $highlight.css(highlighter.cssProp);
          $startDOM.html(splitResult[0] + $highlight.prop('outerHTML') + splitResult[1]);
        } else {
          console.log("You are highlighting already highlighted content");
        }

      } else {
        console.log("Select a highlighter");
      }
    });

});
