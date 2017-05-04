// All 'new' item modals have 3 eventlisteners
// open modal, close modal and submit for AJAX

$(document).ready(() => {
  // link to create new highlighter
  $(document).on('click', '#new-highlighter', () => {
    $('#new-highlighter-modal').modal('show');
  });

  $(document).on('click', '#close-highlighter', () => {
    $('#new-highlighter-modal').modal('hide');
  });
  // Highlighter create preview
  $(document).on('keyup', '.highlighter.input.name', (event) => {
    $('.preview.input.highlighter').html(event.target.value);
  });

  $(document).on('change', '.highlighter.input.color', (event) => {
    $('.preview.input.highlighter').css({
      'color': event.target.value
    });
  });

  $(document).on('change', '.highlighter.input.backgroundColor', (event) => {
    $('.preview.input.highlighter').css({
      'backgroundColor': event.target.value
    });
  });
  // Ajax for new highlighter
  $(document).on('click', '#submit-highlighter', () => {
    let newHLName = $('.highlighter.input.name').val();
    let newHLColor = $('.highlighter.input.color').val();
    let newHLBgColor = $('.highlighter.input.backgroundColor').val();
    let newHLProjectId = $('.page-list.primary').parent().attr('project-id');
    $.ajax({
      url: "/highlighters/new",
      method: "POST",
      data: {
        format: "json",
        name: newHLName,
        color: newHLColor,
        backgroundColor: newHLBgColor,
        project_id: newHLProjectId
      },
      success: function(data) {
        $('#highlighter-listing')
          .append(
            $('<div>')
              .addClass('highlighter-list-wrap')
              .append(
                $('<div>')
                .addClass('ui button highlighter-list')
                .html(data.name)
                .attr('highlighter-id', data.id)
                .css({
                  "color": data.color,
                  "backgroundColor": data.backgroundColor,
                })
              )
          );
        // Update current project with new highlighter
        window.currProject.highlighters.push(data);
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#new-highlighter-modal').modal('hide');
  });

  // link to create new user
  $(document).on('click', '#new-user', () => {
    $('#new-user-modal').modal('show');
  });

  $(document).on('click', '#close-user', () => {
    $('#new-user-modal').modal('hide');
  });
  $(document).on('click', '#submit-user', () => {
    let newUserName = $('.new-user-input[name="name"]').val();
    let newUserEmail = $('.new-user-input[name="email"]').val();
    let newUserPassword = $('.new-user-input[name="password"]').val();

    $.ajax({
      url: "/users/new",
      method: "POST",
      data: {
        format: "json",
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword
      },
      success: function(data) {
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#new-user-modal').modal('hide');
  });

  // link to create new page
  $(document).on('click', '.new-page', (event) => {
    let projectId = $(event.target).attr('project-id');
    $('#new-page-modal').modal('show').attr('project-id', projectId);
  });

  $(document).on('click', '#close-page', () => {
    $('#new-page-modal').modal('hide');
  });

  $(document).on('click', '#submit-page', (e) => {

    e.preventDefault();

    let newPageTitle = $('#new-page-title').val();
    let newPageContent = $('#new-page-content').val();
    let newPageProjId = $('#new-page-modal').attr('project-id');

    $.ajax({
      url: "/pages/new",
      method: "POST",
      data: {
        format: "json",
        title: newPageTitle,
        content: newPageContent,
        project_id: newPageProjId
      },
      success: function(data) {
        // Add new page list-item into project menu (left)
        $(".page-list.primary").removeClass("primary");
        let newPage = $('<div>')
          .addClass('ui button content page-list primary')
          .attr('page-id', data.id)
          .html(data.title)
          .appendTo($(`div.content.project-list[project-id="${data.project_id}"]`));
        // Update current project with new page
        window.currProject.pages.push(data);
        window.currPage = data;
        // load selected page content
        $("#page-title").empty().html(window.currPage.title);
        $("#page-content").empty();
        $("<span>").html(window.currPage.content).appendTo("#page-content");
      },
      error: function(e) {
        console.log(e);
      }
    });
    $('#new-page-modal').modal('hide');
  });

  // link to create new project
  $(document).on('click', '#new-project', () => {
    $('#new-project-modal').modal('show');
  });

  $(document).on('click', '#close-project', () => {
    $('#new-project-modal').modal('hide');
  });

  $(document).on('click', '#submit-project', () => {
    let newProjName = $('.new-project-input').val()
    $.ajax({
      url: "/projects/new",
      method: "POST",
      data: {
        format: "json",
        name: newProjName
      },
      success: function(data) {
        $('.ui.relaxed.divided.list')
          .append(
            $('<div>')
            .addClass('item')
            .append(
              $('<div>')
                .addClass('content project-list')
                .attr('project-id', data.id)
                .append(
                  $('<div>')
                    .append(
                      $('<div>')
                        .addClass('new-page')
                        .attr('project-id', data.id)
                        .html('Add Page')
                    )
                    .append(
                      $('<div>')
                        .addClass('project-name')
                        .html(data.name)
                    )
                )
             )
          )
        // Reset page workspace
        $('#page-title').html('Select Page');
        $('#page-content').empty();
        // Reset right menu
        $('#highlighter-listing').empty();
        $('.highlighter.right-menu.toggler')
          .removeClass('off')
          .addClass('on');
        $('.search.right-menu.toggler')
          .removeClass('on')
          .addClass('off');
        // Remove 'selected page'
        $('.ui.button.content.page-list.primary').removeClass('primary');
      },
      error: function(e) {
        console.log(e);
      }
    });
    $('#new-project-modal').modal('hide');
  });

  // new note
  $(document).on('click', '#submit-note', (event) => {
    event.preventDefault();
    let newNoteContent = $('#new-note-content').val();
    let newNoteHLId = $('#note-modal').attr('highlight-id');
    $.ajax({
      url: "/notes/new",
      method: "POST",
      data: {
        format: "json",
        content: newNoteContent,
        highlight_id: newNoteHLId,
      },
      success: function(data) {
        $('#new-note-content').val('');
        let highlighter = _.find(window.currProject.highlighters, (highlighter) => {
        	return highlighter.id === data.highlight.highlighter_id
        });
        // Update currProject
        let highlightProj = _.find(highlighter.highlights, (highlight) => {
          	return highlight.id === data.highlight_id
          });
        highlightProj.notes.push(data);
        // Update currPage
        let highlightPage = _.find(window.currPage.highlights, (highlight) => {
          	return highlight.id === data.highlight_id
          });
        highlightPage.notes.push(data);
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#note-modal').modal('hide');
  });
});
