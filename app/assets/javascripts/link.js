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
  // Ajax for new highlighter
  $(document).on('click', '#submit-highlighter', () => {
    let newHLName = $('.new-highlighter-input[name="name"]').val();
    let newHLColor = $('.new-highlighter-input[name="color"]').val();
    let newHLBgColor = $('.new-highlighter-input[name="backgroundColor"]').val();
    let newHLProjectId = $('.page-list.primary').parent().attr('project-id');

    $.ajax({
      url: "/highlighters/new",
      method: "POST",
      data: {
        format: "json",
        name: newHLName,
        color: newHLColor,
        backgroundColor: newHLBgColor,
        project_id: parseInt(newHLProjectId)
      },
      success: function(data) {
        debugger;
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#new-highlighter-modal').modal('hide');
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
        project_id: parseInt(newPageProjId)
      },
      success: function(data) {
        let newPage = $('<div>')
          .addClass('ui button content page-list')
          .attr('page-id', data.id)
          .html(data.title)
          .appendTo($(`div.content.project-list[project-id="${data.project_id}"]`));
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
    // some ajax for new project
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
        let newProject = $('<div>')
          .addClass('ui button content project-list')
          .attr('page-id', data.id)
          .html(data.title)
          .appendTo($(`div.content.project-list[project-id="${data.project_id}"]`));
        console.log('new project created');
      },
      error: function(e) {
        console.log(e);
      }
    });
    $('#new-project-modal').modal('hide');
    $('#page-content').empty();
  });

  //==============================================================================
  // End of modal related handlers
  //==============================================================================

  // Right menu toggler, between 'Search' and 'Highlighter'
  $(document).on('click', '.right-menu.toggler.off', (event) => {
    // Toogle menu title
    $('.right-menu.toggler.on').removeClass('on').addClass('off');
    $(event.target).removeClass('off').addClass('on');

    // Display selected menu
    let selector = $(event.target).html();
    if(selector === 'Search') {

    } else {

    }
  });

});
