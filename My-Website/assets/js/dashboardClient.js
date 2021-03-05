var id = 1;
var bounceIn = ["Right", "Down", "Left", "Up"];
var k = 0;

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

      $("#addItem :submit").on("click", function () {
            var row = [];
            var i;
            for (i = 0; i < $("#addItem :text").length; i++) {
                  row[i] = $(`#addItem :text:eq(${i})`).val();
                  if (row[i] == "") {
                        alert("Please type any message in the Message Box and then try again.");
                        return;
                  }
            }
            for (i = 0; i < $("#addItem :text").length; i++) {
                  $(`#addItem :text:eq(${i})`).val("");
            }
            for (i = 0; i < $("#addItem :text").length; i++) {
                  if (i == 0) {
                        if (id < 10000) {
                              $("#addRow").animate({}, 3000, function () {
                                    if (k == bounceIn.length) {
                                          k = 0;
                                          $(this).append(`<tr id = ${id} class="animated bounceIn${bounceIn[k]}"></tr>`);
                                    }
                                    else {
                                          $(this).append(`<tr id = ${id} class="animated bounceIn${bounceIn[k]}"></tr>`);
                                    }
                                    k++;
                              });
                        }
                        else {
                              alert("Limit for entering into the table is reached.");
                              return;
                        }
                  }
                  if (i == $("#addItem :text").length - 1) {
                        $(`#${id}`).animate({}, 3000, function () {
                              $(this).append(`<td>${row[i]}<img class = "${id}" src = "/abc/images/delete.png"></img></td>`);
                        });
                  }
                  else {
                        $(`#${id}`).animate({}, 3000, function () {
                              $(this).append(`<td>${row[i]}</td>`);
                        });
                  }
            }
            id++;
      });

      $(document).on("click", "#addRow img", function () {
            var i = $(this).attr("class");
            if (confirm("Do you really want to delete this message?")) {
                  $(`#${i}`).remove();
            }
      });

      $(".startBtn").on("click", function () {
            $(".startBtn").animate({ opacity: "0" }, 900);
            $(".startBtn").animate({ width: "hide" }, 900);
            $("#addItem :submit").animate({ opacity: "0" }, 900);
            $("#addItem :submit").animate({ width: "hide" }, 900);
            $(".box2").animate({
                  width: "300px"
            }, 3000, function () {
                  $(".box1").animate({
                        height: "180px"
                  }, 3000, function () {
                        $("#addItem :submit").click();
                        $(".box2,.box1").animate({
                              width: "50px",
                              height: "50px"
                        }, 3000, function () {
                              $(".startBtn").animate({ width: "show" }, 900);
                              $(".startBtn").animate({ opacity: "1" }, 1400);
                              $("#addItem :submit").animate({ width: "show" }, 900);
                              $("#addItem :submit").animate({ opacity: "1" }, 1400);
                        });
                  });
            });
      });
});





