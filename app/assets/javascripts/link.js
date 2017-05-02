$(document).ready(() => {

  // link to create new highlighter
  $(document).on('click', '#new-highlighter', () => {
    let projectId = $('.page-list.primary').parent().attr('project-id');
    console.log('project id:', projectId);
    $('.ui.modal').modal('show');
  });
});
