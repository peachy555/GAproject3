$(document).ready(() => {
  let pageContentHighlight = (highlights, highlighters) => {
    _.each(highlights, (highlight) => {
      highlighter = _.where(highlighters, {id: highlight.highlighter_id});
      let $highlight = $('<span>')
        .addClass('highlight')
        .attr('highlight-id', highlight.id)
        .attr('highlighter-id', highlight.highlighter_id)
        .html(highlight.content)
        .css({
          'color': highlighter[0].color,
          'backgroundColor': highlighter[0].backgroundColor
        });

      let contentsNoHighlight = $("#page-content > span:not([class])")
      let spanContainHighlight = _.find(contentsNoHighlight, (span) => {
        return $(span).html().indexOf(highlight.content) != -1 ? true : false;
      });

      let splitHighlight = $(spanContainHighlight).html().split(highlight.content);
      let $before = $("<span>").html(splitHighlight[0]);
      let $after = $("<span>").html(splitHighlight[1]);
      $(spanContainHighlight).replaceWith($before.prop('outerHTML') + $highlight.prop('outerHTML') + $after.prop('outerHTML'));
    });
  }


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
        $("#page-content").empty();
        $("<span>").html(data.page.content).appendTo("#page-content");

        // load highlighters
        $("#highlighter-listing").empty();
        // new highlighter button
        $("<div>")
          .html("New Highlighter")
          .addClass("ui button")
          .attr("id", "new-highlighter")
          .appendTo("#highlighter-listing");
        // display each highlighters
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

        // load highlights
        pageContentHighlight(data.highlights, data.highlighters);
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
    if(!$target.attr("class").match(/active/)){
      $(".highlighter-list.active").removeClass("active");

      $target.addClass("active");
      $target.parent()
        .css({
          "borderColor": "black",
          "borderRadius": "6px",
          "backgroundColor": "black"
        });
    } else {
      $(".highlighter-list.active").removeClass("active");
    }
  });

  // page content highlighting, work only of highlighter is selected
    $(document).on("mouseup", "#page-content", () => {
      // If any highlighter is selected
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
          let splitHighlight = context.split(selection.toString());

          // Create highlight in Rails db
          $.ajax({
            url: "/highlights/new",
            method: "POST",
            data: {
              format: "json",
              content: selection.toString(),
              page_id: parseInt($(".page-list.primary").attr("page-id")),
              highlighter_id: highlighter.id,
            },
            success: function(data) {
              let highlightId = data;
              console.log('Successfull post req');

              // physical highlight
              let $highlight = $("<span>")
                .addClass("highlight")
                .attr("highlighter-id", highlighter.id)
                .attr("highlight-id", highlightId)
                .html(selection.toString())
                .css(highlighter.cssProp);
              let $before = $("<span>").html(splitHighlight[0]);
              let $after = $("<span>").html(splitHighlight[1]);

              $startDOM.replaceWith($before.prop('outerHTML') + $highlight.prop('outerHTML') + $after.prop('outerHTML'));
            },
            error: function(e) {
              console.log(e);
            }
          });

        } else {
          console.log("You are highlighting already highlighted content");
        }
      } else {
        console.log("Select a highlighter");
      }
    });

});
