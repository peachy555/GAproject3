$(document).ready(() => {
  var pageContentHighlight = (highlights, highlighters) => {
    _.each(highlights, (highlight) => {
      highlighter = _.where(highlighters, {id: highlight.highlighter_id});
      var $highlight = $('<span>')
        .addClass('highlight')
        .attr('highlight-id', highlight.id)
        .attr('highlighter-id', highlight.highlighter_id)
        .html(highlight.content)
        .css({
          'color': highlighter[0].color,
          'backgroundColor': highlighter[0].backgroundColor
        });

      var contentsNoHighlight = $("#page-content > span:not([class])")
      var spanContainHighlight = _.find(contentsNoHighlight, (span) => {
        return $(span).html().indexOf(highlight.content) != -1 ? true : false;
      });

      var splitHighlight = $(spanContainHighlight).html().split(highlight.content);
      var $before = $("<span>").html(splitHighlight[0]);
      var $after = $("<span>").html(splitHighlight[1]);
      $(spanContainHighlight).replaceWith($before.prop('outerHTML') + $highlight.prop('outerHTML') + $after.prop('outerHTML'));
    });
  }

  // Select page / Display page content, highlighters in project
  $(document).on("click", ".page-list", (event) => {
    $(".page-list.primary").removeClass("primary");
    var $target = $(event.target);
    $target.addClass("primary");
    var selectedPageId = $target.attr("page-id");

    $.ajax({
      url: "/get_content",
      method: "GET",
      data: {
        format: "json",
        page_id: selectedPageId
      },
      success: function(data) {
        window.currPage = JSON.parse(data.page)
        // load selected page content
        $("#page-title").empty().html(window.currPage.title);
        $("#page-content").empty();
        $("<span>").html(window.currPage.content).appendTo("#page-content");

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
          var $highlighterWrap = $('<div>')
            .addClass('highlighter-list-wrap')
            .appendTo("#highlighter-listing");
          var $highlighter = $('<div>')
            .addClass('ui button highlighter-list')
            .html(highlighter.name)
            .attr('highlighter-id', highlighter.id)
            .css({
              "color": highlighter.color,
              "backgroundColor": highlighter.backgroundColor,
            }).appendTo($highlighterWrap);
        });

        // load highlights
        pageContentHighlight(window.currPage.highlights, data.highlighters);
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Selecting highlighter with toogle
  $(document).on("click", ".highlighter-list", (event) => {
    var $target = $(event.target);
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
      var highlighter = {
        id: $(".highlighter-list.active").attr("highlighter-id"),
        cssProp: {
          color: $(".highlighter-list.active").css("color"),
          backgroundColor: $(".highlighter-list.active").css("backgroundColor")
        }
      }
      var selection = window.getSelection();
      var $startDOM = $(selection.anchorNode.parentNode);
      var $endDOM = $(selection.focusNode.parentNode);
      console.log(selection.toString());

      // check if the start and end of highlighted part is insided already highlighted text or not?
      if( ($startDOM.attr('class')!='highlight') && ($endDOM.attr('class')!='highlight') ) {
        var context = $startDOM.html();
        var splitHighlight = context.split(selection.toString());

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
            var highlightId = data;
            console.log('Successfull post req');

            // physical highlight
            var $highlight = $("<span>")
              .addClass("highlight")
              .attr("highlighter-id", highlighter.id)
              .attr("highlight-id", highlightId)
              .html(selection.toString())
              .css(highlighter.cssProp);
            var $before = $("<span>").html(splitHighlight[0]);
            var $after = $("<span>").html(splitHighlight[1]);

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

  // Notes display modal
  $(document).on('click', 'span.highlight', (event) => {
    var highlightId = $(event.target).attr('highlight-id');
    var highlightName = $(event.target).html();

    $('#note-modal').attr('highlight-id', highlightId);
    $('.highlight-name.note').html(`"${highlightName.substring(0,50)}..."`);

    var highlight = _.find(window.currPage.highlights, (highlight) => {
    	return (highlight.id == highlightId);
    });

    $('#note-display').empty();
    if(highlight.notes.length != 0) {
      _.each(highlight.notes, (note) => {
        $('#note-display')
          .append(
            $('<div>')
              .addClass('note item')
              .html(note.content)
          );
      });
    } else {
      $('#note-display')
        .append(
          $('<div>')
            .addClass('note item')
            .html('Currently no notes...')
        );
    }

    $('#note-modal').modal('show');

  });
});
