
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

  $(".delete_test").click(function() {
    if (confirm("Are you sure you want to delete this record?")) {
      $.ajax({
        type: 'DELETE',
        success: function(data, statusCode) {
          alert("record deleted");
          window.location.href = '/students/' + data.studentid;
        },
        error: function() {
          alert("There was an error with your request");
        }
      });
    }
  });

  $("#subject").change(function() {
    if ($("#subject").val() === "Writing") {
      $("#writingScores").css("display", "block");
    }
    else {
      $("#writingScores").css("display", "none");
    }
  });
});
