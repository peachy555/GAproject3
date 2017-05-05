$(document).ready(() => {
  // display dropdown search
  let displayHLSearch = (searchResults) => {
    $('#seach-results-wrap').empty();
    let $searchResultsWrap = $('#seach-results-wrap')
      .append(
        $('<div>')
          .attr('id', 'search-result-title')
          .html('Search results:')
      )
    _.each(searchResults, (searchResult) => {
      _.each(searchResult.highlights, (highlight) => {
        let $highlightName = $('<div>')
          .addClass('search-results item highlight')
          .css({
            color: searchResult.highlighter.color,
            backgroundColor: searchResult.highlighter.backgroundColor
          })
          .html(highlight.highlight.content)
          .appendTo($searchResultsWrap);
        _.each(highlight.notes, (note) => {
          $('<div>')
            .addClass('search-results item note')
            .html(note.content)
            .appendTo($highlightName);
        });
      });
    });
  }

  // search with dropdowns
  $(document).on('click', '#submit-multi-dropdown-search', () => {
    let highlighterIds = $('#search-highlighter-dropdown').val();
    let pageIds = $('#search-page-dropdown').val();

    let highlighters = [];
    let pages = [];

    // Selected seach highlighters
    if(highlighterIds == null) {
      // all highlighters
      highlighters = window.currProject.highlighters
    } else {
      // selected highlighters
      _.each(window.currProject.highlighters, (highlighter) => {
        if( _.include(highlighterIds, highlighter.id.toString()) ) {
          highlighters.push(highlighter);
        }
      });
    }

    // Selected seach pages
    if(pageIds == null) {
      // all pages
      pages = window.currProject.pages
    } else {
      // selected pages
      _.each(window.currProject.pages, (page) => {
        if( _.include(pageIds, page.id.toString()) ) {
          pages.push(page);
        }
      });
    }
    let searchResults = [];
    _.each(highlighters, (highlighter) => {
      let resultHighlighter = {
        highlighter: highlighter,
        highlights: []
      };
      _.each(pageIds, (pageId) => {
        _.each(_.where(highlighter.highlights, {page_id: parseInt(pageId)}), (highlight) => {
          if(highlight.notes.length != 0) {
            resultHighlighter.highlights.push({
              highlight: highlight,
              notes: highlight.notes
            });
          }
        });
      });
      searchResults.push(resultHighlighter);
    });
    displayHLSearch(searchResults);
  }); // end of search with dropdowns

  let matchRegEx = (inputString, matchParam) => {
    var regex = new RegExp( matchParam, 'g' );
    return inputString.match(regex) ? true : false;
  }
  // search with regEx
  $(document).on('click', '#submit-regex-search', () => {
    let searchInput = $('.search.regex.highlighter.input').val();
    let searchResults = [];
    _.each(window.currProject.highlighters, (highlighter) => {
      let resultHighlighter = {
        highlighter: highlighter,
        highlights: []
      }
      _.each(highlighter.highlights, (highlight) => {
        if(matchRegEx(highlight.content, searchInput)) {
          resultHighlighter.highlights.push({
            highlight: highlight,
            notes: highlight.notes
          });
        }
      });
      searchResults.push(resultHighlighter);
    });
    displayHLSearch(searchResults);
  });
})
