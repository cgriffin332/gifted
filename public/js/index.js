$(document).ready(function () {
  // Sets up Foundation JavaScript
  $(document).foundation();

  // LOGIN PAGE
  //=================================================================
  // Received Gifts Image Event Listener
  $(".giftsReceivedImg").on("click", function (event) {
    window.location.href = "/received";
  });

  // Sent Gifts Image Event Listener
  $(".giftsSentImg").on("click", function (event) {
    window.location.href = "/sent";
  });

  // Login Button Event Listener
  $("#loginBtn").on("click", function (event) {
    event.preventDefault();

    // Retrieves the User's entered Email
    const userEmail = $("#userEmail").val().trim();

    // AJAX Call - Checks to see if the user's account is valid
    $.get("/api/user/" + userEmail)
      .then(function (response) {
        console.log(response);
        boolean = true;
        $("#userEmail").val("");
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // SIGN UP PAGE
  //=================================================================
  // Create Account Button Event Listener
  $("#createAccountBtn").on("click", function (event) {
    event.preventDefault();

    // Retrieves the User's entered Name and Email
    const newUser = {
      name: $("#userName").val().trim(),
      email: $("#userEmail").val().trim(),
    };

    // AJAX Call - Creates a new User Account
    $.post("/api/add/user", newUser)
      .then(function (response) {
        console.log(response);

        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // FUNCTIONS for RECEIVED and SENT GIFTS PAGE
  //=================================================================
  // Deletes a gift in the database
  function deleteGift(type, id) {
    $.ajax(`/api/${type}/${id}`, {
      type: "DELETE",
    }).then(() => {});
  }

  // Changes a row to forms for the user to edit
  function editGifts(tableRow) {
    for (let i = 0; i < tableRow.length; i++) {
      tableRow[i].children[0].setAttribute("class", "displayNone");
      tableRow[i].children[1].removeAttribute("class");
    }
    tableRow[5].children[0].setAttribute("class", "displayNone");
    for (let j = 1; j < 5; j++) {
      tableRow[5].children[j].removeAttribute("class");
    }
  }

  // Updates a gift in the database
  function updateGift(type, editedGift) {
    $.ajax(`/api/edit/${type}`, { type: "PUT", data: editedGift }).then(() => {
      location.reload();
    });
  }

  // RECEIVED and SENT GIFTS PAGE
  //=================================================================
  // Edit Button Event Listener
  $(".editbtn").on("click", function (event) {
    if ($(this).text() === "edit") {
      $(this).text("submit");

      const tableRow = $(this).parent().siblings();
      // update visible state
      editGifts(tableRow);
    } else if ($(this).text() === "submit") {
      $(this).text("edit");

      const id = $(this).data("id");
      const userId = 1;
      let type = "";
      let editedGift = {};

      if (location.pathname === "/received") {
        editedGift = {
          id: id,
          user_id: userId,
          senderName: $("#editedSender" + id).val(),
          senderAddress: $("#editedAddress" + id).val(),
          giftReceived: $("#editedGift" + id).val(),
          occasion: $("#editedOccasion" + id).val(),
          dateReceived: $("#editedDate" + id).val(),
          thankYou: $('input[name="thankYou"]:checked').val(),
        };
        type = "received";
      } else if (location.pathname === "/sent") {
        editedGift = {
          id: id,
          user_id: userId,
          receiverName: $("#editedReceiver" + id).val(),
          receiverAddress: $("#editedAddress" + id).val(),
          giftSent: $("#editedGift" + id).val(),
          occasion: $("#editedOccasion" + id).val(),
          dateSent: $("#editedDate" + id).val(),
          cost: $("#editedCost" + id).val(),
        };
        type = "sent";
      }
      updateGift(type, editedGift);
    }
  });

  // Delete Button Event Listener
  $(".deletebtn").on("click", function () {
    const id = $(this).data("id");

    if (location.pathname === "/received") {
      deleteGift("received", id);
    } else if (location.pathname === "/sent") {
      deleteGift("sent", id);
    }
  });

  //reload page on closing of modal
  $(".modalClose").on("click", function () {
    location.reload();
  });

  // FUNCTIONS for ADD GIFTS PAGE
  //=================================================================
  function addGift(type, newGift) {
    $.post(`/api/add/${type}`, newGift).then();
  }

  // ADD GIFTS PAGES
  //=================================================================
  let userId = 1;
  $(".addGift").on("click", function (event) {
    event.preventDefault();
    let type = "";
    let newGift = {};

    if (location.pathname === "/add/received") {
      newGift = {
        user_id: userId,
        senderName: $("#senderName").val(),
        senderAddress: $("#senderAddress").val(),
        giftReceived: $("#giftReceived").val(),
        occasion: $("#occasionReceived").val(),
        dateReceived: $("#dateReceived").val(),
        thankYou: $('input[name="thankYou"]:checked').val(),
      };
      type = "received";
    } else if (location.pathname === "/add/sent") {
      newGift = {
        user_id: userId,
        receiverName: $("#receiverName").val(),
        receiverAddress: $("#receiverAddress").val(),
        giftSent: $("#giftSent").val(),
        occasion: $("#occasionSent").val(),
        dateSent: $("#dateSent").val(),
        cost: $("#cost").val(),
      };
      type = "sent";
    }
    addGift(type, newGift);
  });
});
