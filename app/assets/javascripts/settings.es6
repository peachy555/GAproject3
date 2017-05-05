$(document).ready(() => {
  // Reset default text of dropdown after delete
  let resetDefaultText = () => {
    $('.text.highlighter')
      .addClass('default')
      .html('Select highlighter');
    $('.text.page')
      .addClass('default')
      .html('Select page');
    $('.text.project')
      .addClass('default')
      .html('Select project');
    $('.add-collab.email').val('');
  }

  // Add collaborators
  $(document).on('click', '.add-collab.submit', () => {
    let addCollabProjId = $('.item.collab-project.active').attr('data-value');
    let addCollabEmail = $('.add-collab.email').val();

    $.ajax({
      url: "/projects",
      method: "patch",
      data: {
        format: "json",
        project_id: parseInt(addCollabProjId),
        email: addCollabEmail
      },
      success: function(data) {
        resetDefaultText();
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#new-highlighter-modal').modal('hide');
  });

  // Delete page
  // Render pages of selected project
  $(document).on('click', '.item.delete-page.project', () => {
    $('.menu.page').empty();
    let selProjId = $('.item.delete-page.project.selected').attr('data-value');
    // Get pages from that
    $.ajax({
      url: `/pages_min/${selProjId}`,
      method: "get",
      success: function(data) {
        _.each(data, (pageMin) => {
          $('.menu.page')
            .append(
              $('<div>')
                .addClass('item delete-page page')
                .attr('data-value', pageMin[0])
                .html(pageMin[1])
            );
        });
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Delete page
  $(document).on('click', '.ui.button.delete-page.submit', () => {
    let delPageId = $('.item.delete-page.page.selected').attr('data-value');

    $.ajax({
      url: `/pages/${delPageId}`,
      method: "delete",
      success: function(data) {
        $('.menu.page').empty();
        resetDefaultText();
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Delete highlighter
  // Render highlighters of selected project
  $(document).on('click', '.item.delete-highlighter.project', () => {
    $('.menu.highlighter').empty();
    let selProjId = $('.item.delete-highlighter.project.selected').attr('data-value');
    // Get highlighters from project_id
    $.ajax({
      url: `/highlighters_min/${selProjId}`,
      method: "get",
      success: function(data) {
        _.each(data, (highlighterMin) => {
          $('.menu.highlighter')
            .append(
              $('<div>')
                .addClass('item delete-highlighter highlighter')
                .attr('data-value', highlighterMin[0])
                .html(highlighterMin[1])
            );
        });
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Delete highlighter
  $(document).on('click', '.ui.button.delete-highlighter.submit', () => {
    let delPageId = $('.item.delete-highlighter.highlighter.selected').attr('data-value');

    $.ajax({
      url: `/highlighters/${delPageId}`,
      method: "delete",
      success: function(data) {
        $('.menu.highlighter').empty();
        resetDefaultText();
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Delete project
  $(document).on('click', '.delete-project.submit', () => {
    let delProjId = $('.item.delete-project.select.active').attr('data-value');

    $.ajax({
      url: `/projects/${delProjId}`,
      method: "delete",
      success: function(data) {
        $(`.item.project[data-value='${data.id}']`).remove();
        $('.text.project')
          .addClass('default')
          .html('Select project');
      },
      error: function(e) {
        console.log(e);
      }
    });
  });

  // Change password


  // Change name

});
