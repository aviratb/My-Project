$(document).ready(function () {

      $("#search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#employeeTable tr").filter(function () {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
      });

      $("#profilePic").on({
            mouseenter: function () {
                  $(this).removeClass("animated rollOut");
                  $(this).addClass("animated rollIn");
            },
            mouseleave: function () {
                  $(this).removeClass("animated rollIn");
                  $(this).addClass("animated rollOut");
            },
            click: function () {
                  $("#profileDetails").toggleClass("show");
            }
      });
});





