$(document).ready(() => {
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

});
