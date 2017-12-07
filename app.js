$(document).ready(function() {
	var email = $("#email");
	var password = $("#password");
	var form = $("#formContainer");
	var message = $("#message");
	var submitted = false;

	function showMissingValue() {
		message.css("color", "red");
		message.text("Please enter your email address and password.");
	}

	function handleSuccess() {
		submitted = false;
		message.css("color", "green");
		message.text("Login successful");
	}

	function handleUnauthorized() {
		submitted = false;
		message.css("color", "red");
		message.text("Email address or Password is wrong");
	}

	function handleDefaultError() {
		submitted = false;
		message.css("color", "red");
		message.text("An error happened. Please try again later.");
	}

	function handleAllErrors(jqXhr) {
		if (jqXhr.status === 401) {
			handleUnauthorized();
		} else {
			handleDefaultError();
		}
	}

	function makeBody() {
		return {
			email: email.val(),
			password: password.val()
		};
	}

	function callLogin(event) {
		event.preventDefault();
		var body = makeBody();
		if (body.email && body.password && !submitted) {
			submitted = true;
			$.ajax({
				url: "https://jsonplaceholder.typicode.com/posts",
				method: "POST",
				data: body,
				dataType: "json",
				success: handleSuccess,
				error: handleAllErrors
			});
		} else if (!submitted) {
			showMissingValue();
		}
	}

	form.submit(callLogin);
});
