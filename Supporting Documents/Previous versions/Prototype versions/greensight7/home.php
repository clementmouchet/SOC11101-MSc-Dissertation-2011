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
        <script src="javascripts/jquery-ui-1.8.16.custom.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8">
</script>
    </head>
    <body>
        <div class="wrapper">
            <div id="header" class="shadow"></div>
            <div id="navigation" class="">
                <ul id="menu" class="tabs">
                    <li <?php include 'ssi/navigation/home_tab.php' ?>>
                        <a href="home.php"><span>Home</span></a>
                        <ul class="dropdown shadow corners">
                            <li>
                                <p class="desc centered margin">
                                    Where everything starts
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="amee_calc.php"><span>AMEE Calculator</span></a>
                        <ul class="dropdown shadow corners">
                            <li>
                                <p class="desc centered margin">
                                    Calculate a carbon footprint using AMEE database
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div style="clear:both"></div>
            </div>
            <div id="main">
                <div id="left" class="">
                    <div id="top_left" class="shadow corners">
                        <p>
                            top_left
                        </p>
                    </div>
                </div>
                <div id="right" class="">
                    <div id="top_right" class="shadow corners">
                        <p>
                            top_right
                        </p>
                    </div>
                    <div style="clear:both"></div>
                    <div id="left_right" class="shadow corners">
                        <p>
                            left_right
                        </p>
                    </div>
                    <div id="right_right" class="shadow corners">
                        <p>
                            right_right
                        </p>
                    </div>
                    <div style="clear:both"></div>
                    <div id="bottom_right" class="shadow corners">
                        <p>
                            bottom_right
                        </p>
                    </div>
                </div>
            </div>
            <div class="push"></div>
        </div>
        <div class="footer">
            <p id="footerp">
                Designed by Clément Mouchet © Edinburgh Napier University 2011
            </p>
        </div>
    </body>
</html>
