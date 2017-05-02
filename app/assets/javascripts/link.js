$(document).ready(() => {

  // link to create new highlighter
  $(document).on('click', '#new-highlighter', () => {
    // let projectId = $('.page-list.primary').parent().attr('project-id');
    // console.log('project id:', projectId);
    $('#new-highlighter-modal').modal('show');
  });

  $(document).on('click', '#close-highlighter', () => {
    $('#new-highlighter-modal').modal('hide');
  });

  $(document).on('click', '#submit-highlighter', () => {
    $('#new-highlighter-modal').modal('hide');
  });
  // link to create new page
});
