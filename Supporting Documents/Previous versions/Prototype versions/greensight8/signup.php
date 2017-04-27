<?php session_start();
$page = 'signup';
if($_SESSION){
    echo'<script>alert("You are already registered and logged in!")</script>';
    echo'<script>window.location="home.php"</script>';
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
	<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <title>Greensight - Signup</title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/signup.css" type="text/css" charset="utf-8">
			<script src="javascripts/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8">
	</script>
			<script src="javascripts/ui/jquery-ui.js" type="text/javascript" charset="utf-8">
	</script>
			<script src="javascripts/ui/jquery.ui.widget.js" type="text/javascript" charset="utf-8">
	</script>
			<script src="javascripts/jquery.validate.min.js" type="text/javascript" charset="utf-8">
	</script>
			<script src="javascripts/greensight.js" type="text/javascript" charset="utf-8">
	</script>
			<script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8">
	</script>
</head>

<body>
    <div class="wrapper">
        <div id="header" class="shadow">
            <?php include "ssi/header.php" ?>
        </div>

        <div id="navigation" class="">
			<?php include 'ssi/navigation.php' ?>
            <div style="clear:both"></div>
        </div>

        <div id="main">
            <div id="left" class="shadow corners">
                <div id="result" class=""></div>

                <form id="joinup" action="" method="post" class="margin">
                    <fieldset class="join" style="border:none">
                        <legend>Account creation form</legend>
                        <p><label for="name">Organisation Name:</label> <em class="required">*</em><input type="text" name="name" id="name"></p>
                        
                        <p><label for="contact">Contact Name:</label> <em class="required">*</em><input type="text" name="contact" id="contact"></p>

                        <p><label for="address1">Address :</label> <em>&nbsp;</em><input type="text" name="address1" id="address1"></p>

                        <p><label for="address2">Address :</label> <em>&nbsp;</em><input type="text" name="address2" id="address2"></p>

                        <p><label for="town">Town:</label> <em>&nbsp;</em><input type="text" name="town" id="town"></p>

                        <p><label for="postcode">Post Code:</label> <em>&nbsp;</em><input type="text" name="postcode" id="postcode"></p>

                        <p><label for="phone">Phone:</label> <em>&nbsp;</em><input type="text" name="phone" id="phone"></p>

                        <p><label for="useremail">Email:</label> <em class="required">*</em><input type="text" name="useremail" id="useremail"></p>

                        <p><label for="userpassword">Password:</label> <em class="required">*</em><input type="password" name="userpassword" id="userpassword"></p>

                        <p><label for="password2">Re-type Password:</label><em class="required">*</em><input type="password" name="password2" id="password2"></p>

                        <p><em class="required">*</em><input type="checkbox" name="agree" value="checkbox" id="agree" class="required"> <label for="agree">I agree to the terms and conditions:</label></p>

                        <p><input class="submit" type="submit" value="Submit"></p>
                    </fieldset>
                </form>
            </div>

            <div id="right" class="shadow corners">
                <div class="margin">
                    <h4 class="centered rules">Agreement</h4>

                    <ol class="rules">
                        <li>

                            <ul>
                                <li></li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="push"></div>
    </div>

    <div class="footer">
        <?php include "ssi/footer.html" ?>
    </div>
</body>
</html>
