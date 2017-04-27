<?php session_start();
$page = 'aboutus';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
	<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />

    <title>Greensight - About the Project &amp; Contact Form</title>
    <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8" />
    <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8" />
    <link rel="stylesheet" href="css/aboutus.css" type="text/css" charset="utf-8" />
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

    <script type="text/javascript" charset="utf-8">
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
                    <h3 class="centered"><a href="#about">About the Website</a></h3>

                    <div class="margin">
                        <h4 class="centered">Greensight was created in september 2011,<br />
                        as part of a MSc Dissertation project at Edinburgh Napier University.<br />
                        <br />
						Aims : [...]
                        </h4>

                        <p class="centered" style="color:#666633"><em>Mission statement:</em></p>

                        <div id="statement" class="margin corners">
                            <h4 class="centered margin"><i>[...]
                            </i></h4>
                        </div>
                    </div>
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
