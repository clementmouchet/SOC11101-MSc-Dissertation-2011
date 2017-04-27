<?php session_start();
$page = 'home'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Home Page
        </title>
        <link rel="stylesheet" href="css/master.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/home.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/navigation.css" type="text/css" media="screen" title="no title" charset="utf-8">
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
        <script src="javascripts/jquery.cookie.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" charset="utf-8">
//<![CDATA[
                    $(document).ready(function() {
                        if ($.cookie('lastVisit')) {
                            $('#lastVisit').html("Your last Visit was on " + $.cookie('lastVisit'));
                            $('#loggedas').html("Welcome Back<br/>"+$('#session').html());
                        } else {
                            $('#lastVisit').html("Thank you for visiting our website !");
                        }
                        $.cookie('lastVisit', $.datepicker.formatDate('DD, dd MM', new Date()), { expires: 60 }, { path: '/' });
                    });
                //]]>
        </script>
    </head>
    <body>
        <div class="wrapper">
            <div id="header" class="shadow">
                <?php include 'ssi/header.php' ?>
            </div>
            <div id="navigation" class="">
                <?php include 'ssi/navigation.php' ?>
                <div style="clear:both"></div>
            </div>
            <div id="main">
                <div id="left" class="">
                    <div id="top_left" class="shadow corners">
                        <p class="centered">
                            top_left
                        </p>
                    </div>
                </div>
                <div id="right" class="">
                    <div id="top_right" class="shadow corners">
                        <p class="centered">
                            top_right
                        </p>
                    </div>
                    <div style="clear:both"></div>
                    <div id="left_right" class="shadow corners">
                        <p id="membership" class="centered">
                            MEMBERSHIP
                        </p>
                        <h4 id="loggedas">
                            <?php 
                                                        if (empty($_SESSION)) {
                                                            echo'Not registered?<br>';
                                                        } else {
                                                            echo 'logged as<br>';
                                                        }
                                                        ?> <span id="session"><?php
                                                        if (isset($_SESSION['superuser'])) {
                                                            echo '<span style="color:#930">'.$_SESSION['superuser']."</span>";
                                                        } else if (isset($_COOKIE['superuser'])) {
                                                            echo '<span style="color:#930">'.$_COOKIE['superuser']."</span>";
                                                        } else if (isset($_SESSION['user'])) {
                                                            echo '<span style="color:#663">'.$_SESSION['user']."</span>";
                                                        } else if (isset($_COOKIE['user'])) {
                                                            echo '<span style="color:#663">'.$_COOKIE['user']."</span>";
                                                        } else if (empty($_SESSION) || empty($_COOKIE['user'])) {
                                                            echo'<span><a href="signup.php">Create an account</a></span>';
                                                        }
                                                        ?></span>
                        </h4>
                        <p id="lastVisit" class="centered"></p>
                    </div>
                    <div id="right_right" class="shadow corners">
                        <p id="website_updates" class="centered">
                            WEBSITE UPDATES
                        </p>
                        <h4 class="website_updates centered">
                            no updates
                        </h4>
                    </div>
                    <div style="clear:both"></div>
                    <div id="bottom_right" class="shadow corners">
                        <p class="centered">
                            bottom_right
                        </p>
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
