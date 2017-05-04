$(document).ready(() => {
  // Highlight page content
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

  // Right menu related functions
  let loadHighlighters = () => {
    $("<div>")
      .html("New Highlighter")
      .addClass("ui button")
      .attr("id", "new-highlighter")
      .appendTo("#highlighter-listing");
    // display each highlighters
    _.each(window.currProject.highlighters, (highlighter) => {
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
  }

  let loadSearchMenuInputs = () => {
    let $searchHLByRegEx = $('<div>')
      .attr('id', 'search-highlighter-regex')
      // input
      .append(
        $('<div>')
          .attr('id', 'search-highlighter-regex-input')
          .addClass('ui small input container center aligned')
          .append(
            $('<input>')
            .addClass('search regex highlighter input')
            .attr('type', 'text')
            .attr('name', 'regex')
            .attr('placeholder', 'Seach input...')
          )
      )
      // submit
      .append(
        $('<div>')
          .addClass('ui button primary')
          .attr('id', 'submit-regex-search')
          .html('Search')
      );

    let $searchHLDropdown = $('<select>')
      .attr('name', 'highlighter')
      .attr('id', 'search-highlighter-dropdown')
      .attr('multiple', '')
      .addClass('ui selection dropdown')
      .append(
        $('<option>')
          .attr('value', '')
          .addClass('item highlighter search')
          .html('All highlighters')
      );
    let $searchPageDropdown = $('<select>')
      .attr('name', 'page')
      .attr('id', 'search-page-dropdown')
      .attr('multiple', '')
      .addClass('ui selection dropdown').append(
        $('<option>')
          .attr('value', '')
          .addClass('item page search')
          .html('All pages')
      );
    let $searchHLByMultiDropdown = $('<div>')
      .attr('id', 'search-multi-dropdown')
      .append($searchHLDropdown)
      .append($searchPageDropdown);

    // multi-select dropdown highlighter
    _.each(window.currProject.highlighters, (highlighter) => {
      $('<option>')
        .attr('value', highlighter.id)
        .addClass('item highlighter search')
        .html(highlighter.name)
        .appendTo($searchHLDropdown)
    });

    // multi-select dropdown page
    _.each(window.currProject.pages, (page) => {
      $('<option>')
        .attr('value', page.id)
        .addClass('item page search')
        .html(page.title)
        .appendTo($searchPageDropdown)
    });

    // submit
    $searchHLByMultiDropdown
      .append(
        $('<div>')
          .addClass('ui button primary')
          .attr('id', 'submit-multi-dropdown-search')
          .html('Search')
      );

    $("#highlighter-listing")
      .append(
        $('<div>')
          .attr('id', 'seach-params-wrap')
          .append($searchHLByRegEx)
          .append($searchHLByMultiDropdown)
      )
      .append(
        $('<div>')
          .attr('id', 'seach-results-wrap')
      )

    $('.ui.dropdown').dropdown();

  }

  let searchAllNotes = () => {
    let haveNote = false;
    $('#seach-results-wrap').empty();
    let $searchResultsWrap = $('#seach-results-wrap')
      .append(
        $('<div>')
          .attr('id', 'search-result-title')
          .html('All notes:')
      )
    _.each(window.currProject.highlighters, (highlighter) => {
      _.each(highlighter.highlights, (highlight) => {
        if(highlight.notes.length != 0) {
          let $searchHighlightItem = $('<div>')
            .addClass('search-results item highlight')
            .html(highlight.content)
            .css({
              color: highlighter.color,
              backgroundColor: highlighter.backgroundColor
            });
          $('#seach-results-wrap').append($searchHighlightItem);
          _.each(highlight.notes, (note) => {
            $searchHighlightItem
              .append(
                $('<div>')
                .addClass('search-results item note')
                .html(note.content)
              )
          });
          haveNote = true
        }
      });
    });
    if(!haveNote) { $('#search-result-title').html('No notes...'); }
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
        window.currProject = data;
        _.find(window.currProject.pages, (page) => {
          if(page.id === parseInt(selectedPageId)) {
            window.currPage = page
          }
        });
        // load selected page content
        $("#page-title").empty().html(window.currPage.title);
        $("#page-content").empty();
        $("<span>").html(window.currPage.content).appendTo("#page-content");

        // load highlighters
        $("#highlighter-listing").empty();
        // new highlighter button
        loadHighlighters();

        // load highlights
        pageContentHighlight(window.currPage.highlights, window.currProject.highlighters);

        // reset right menu to highlighter
        $('.right-menu.toggler.search').removeClass('on').addClass('off');
        $('.right-menu.toggler.highlighter').removeClass('off').addClass('on');
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

  // Notes display modal
  $(document).on('click', 'span.highlight', (event) => {
    let highlightId = $(event.target).attr('highlight-id');
    let highlightName = $(event.target).html();

    $('#note-modal').attr('highlight-id', highlightId);
    $('.highlight-name.note').html(`"${highlightName.substring(0,50)}..."`);

    let highlight = _.find(window.currPage.highlights, (highlight) => {
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

  // Right menu toggler, between 'Search' and 'Highlighter'
  $(document).on('click', '.right-menu.toggler.off', (event) => {
    // Toogle menu title
    $('.right-menu.toggler.on').removeClass('on').addClass('off');
    $(event.target).removeClass('off').addClass('on');

    // Display selected menu
    // Reset
    $("#highlighter-listing").empty();
    // Choose menu
    let selector = $(event.target).html();
    if(window.currProject != undefined) {
      if(selector === 'Note') {
        loadSearchMenuInputs();
        searchAllNotes();
      } else {
        loadHighlighters();
      }
    }
  });
});
