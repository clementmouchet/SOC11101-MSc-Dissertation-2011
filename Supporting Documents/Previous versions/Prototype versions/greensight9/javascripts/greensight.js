// LOGIN FOR VALIDATION, SUBMIT AND CALLBACK
$(document).ready(function() {
    $("#login").validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength: 50

            },
            password: {
                required: true,
                minlength: 7,
                maxlength: 20

            }
        }
    });
    $("#login").submit(function() {
        if ($("#login").valid() == true) {
            var email = $('#email').val();
            var password = $('#password').val();
            var data = 'email=' + email + '&password=' + password;
            $.ajax({
                url: "php_scripts/login.php",
                type: "POST",
                data: data,
                cache: false,
                success: show_login_Response
            });
            //prevent the browser from refreshing the page
            return false;
        } else {
			$('#login_menu').effect("shake", { times:3 }, 50);
}
    });
});

function show_login_Response(responseText) {
    $('#Login_result').html(responseText).fadeIn('slow').effect("shake", { times:3 }, 50);
    if (responseText == '<p style="color: green"><b>You are now logged in !</b></p>') {
        window.location.reload();
    }
};

// SIGNUP FORM VALIDATION, SUBMIT AND CALLBACK

// UK poscode validation
jQuery.validator.addMethod('postcode',
function(value, element) {
	// short regex test
	var validpostcode = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABD-HJLNP-UW-Z]{2}$/i;
    return this.optional(element) || validpostcode.test(value);
},
'Please enter a valid UK Postcode.'
);
// form validation rules and "live" validation
$(document).ready(function() {
    $("#joinup").validate({
        rules: {
            phone: {
                required: false,
                digits: true,
                minlength: 11,
                maxlength: 12

            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            contact: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            address1: {
                required: false,
                minlength: 7,
                maxlength: 20

            },
            address2: {
                required: false,
                maxlength: 20

            },
            town: {
                required: false,
                minlength: 3,
                maxlength: 20

            },
            postcode: {
                required: false,
                postcode: true
            },

            useremail: {
                required: true,
                email: true,
                maxlength: 50

            },
            userpassword: {
                required: true,
                minlength: 7,
                maxlength: 20

            },
            password2: {
                required: true,
                minlength: 7,
                maxlength: 20,
                equalTo: "#userpassword"
            }
        }
    });

    // validation check and submit only when valid
    $("#joinup").submit(function() {
        if ($("#joinup").valid() == true) {
			var poststr = {
				name: $('#name').val(),
				contact: $('#contact').val(),
				address1: $('#address1').val(),
				address2: $('#address2').val(),
				town: $('#town').val(),
				postcode: $('#postcode').val(),
				phone: $('#phone').val(),
				email: $('#useremail').val(),
				password: $('#userpassword').val()
			}
            $.ajax({
                url: "php_scripts/members/signup.php",
                type: "POST",
                data: poststr,
                cache: false,
                //pass output to another function
                success: show_joinup_Response
            });
            //prevent the browser from refreshing the page
            return false;
        } else {
            $('#result').html('<p style="color: red"><b>Please enter all required fields</p>').fadeIn('fast').effect("shake", { times:3 }, 50).delay(10000).fadeOut('slow');
        }
    });
});

// post-submit callback output the result
function show_joinup_Response(responseText) {
    $('#joinup').hide();
    $('#result').fadeIn('slow').html(responseText);
};

// EDIT PROFILE

// form validation rules and "live" validation
$(document).ready(function() {
    $("#edit_profile").validate({
        rules: {
            phone: {
                required: false,
                digits: true,
                minlength: 11,
                maxlength: 12

            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            contact: {
                required: true,
                minlength: 3,
                maxlength: 30

            },
            address1: {
                required: false,
                minlength: 7,
                maxlength: 20

            },
            address2: {
                required: false,
                maxlength: 20

            },
            town: {
                required: false,
                minlength: 3,
                maxlength: 20

            },
            postcode: {
                required: false,
                postcode: true
            },

            useremail: {
                required: true,
                email: true,
                maxlength: 50

            },
            userpassword: {
                required: true,
                minlength: 7,
                maxlength: 20

            },
            password2: {
                required: true,
                minlength: 7,
                maxlength: 20,
                equalTo: "#userpassword"
            }
        }
    });

    // validation check and submit only when valid
    $("#edit_profile").submit(function() {
        if ($("#edit_profile").valid() == true) {
			var poststr = {
				name: $('#name').val(),
				contact: $('#contact').val(),
				address1: $('#address1').val(),
				address2: $('#address2').val(),
				town: $('#town').val(),
				postcode: $('#postcode').val(),
				phone: $('#phone').val(),
				email: $('#useremail').val(),
				password: $('#userpassword').val()
			}
            $.ajax({
                url: "php_scripts/members/edit_profile.php",
                type: "POST",
                data: poststr,
                cache: false,
                //pass output to another function
                success: show_profile_Response
            });
            //prevent the browser from refreshing the page
            return false;
        } else {
            $('#result').html('<p style="color: red"><b>Please enter all required fields</p>').fadeIn('fast').effect("shake", { times:3 }, 50).delay(10000).fadeOut('slow');
        }
    });
});

// post-submit callback output the result
function show_profile_Response(responseText) {
    $('#edit_profile').hide();
    $('#result').fadeIn('slow').html(responseText);
};