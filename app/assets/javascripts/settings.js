$(document).ready(() => {
  // Add collaborators
  $(document).on('click', '.add-collab.submit', () => {
    let addCollabProjId = $('.item.collab-project.active').attr('data-value');
    let addCollabEmail = $('.add-collab.email').val();
    debugger;

    $.ajax({
      url: "/projects",
      method: "patch",
      data: {
        format: "json",
        project_id: parseInt(addCollabProjId),
        email: addCollabEmail
      },
      success: function(data) {
      },
      error: function(e) {
        console.log(e);
      }
    });

    $('#new-highlighter-modal').modal('hide');
  });

  // Delete page


  // Delete highlighters


  // Delete project
  $(document).on('click', '.delete-project.submit', () => {
    let delProjId = $('.item.delete-project.select.active').attr('data-value');

    $.ajax({
      url: `/projects/${delProjId}`,
      method: "delete",
      // data: {
      //   format: "json",
      //   project_id: parseInt(delProjId),
      // },
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

    $('#new-highlighter-modal').modal('hide');
  });

  // Change password


  // Change name

});
