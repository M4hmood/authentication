
$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();
        // Get the entered password
        const username = $('#username').val();
        const password = $('#password').val();
        // Send an AJAX request to the server to verify the password
        $.post('/login', { username: username, password: password }, function (data) {
            // Display the result message
            if (data == "you've successfuly logged in") {
                $('#resultMessage').text(data).css("color", "green");
            } else {
                $('#resultMessage').text(data).css("color", "red");
            }
        });
    });
});