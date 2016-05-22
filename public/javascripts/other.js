
$(document).ready(function() {
  $(".delete_user").click(function() {
    if (confirm("Are you sure you want to delete this student?")) {
      $.ajax({
        type: 'DELETE',
        success: function(data, statusCode) {
          alert("student deleted");
          window.location.href = '/';
        },
        error: function() {
          alert("There was an error with your request");
        }
      });
    }
  });
});
