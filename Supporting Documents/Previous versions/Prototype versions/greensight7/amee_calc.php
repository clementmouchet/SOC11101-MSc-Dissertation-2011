<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Carbon Calculator
        </title>
        <link rel="stylesheet" href="css/master.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <link rel="stylesheet" href="css/amee_calc.css" type="text/css" media="screen" title="no title" charset="utf-8">
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
                    <li <?php include 'ssi/navigation/amee_calc_tab.php' ?>>
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
                        <h2 class="centered"><a href="#about">Calculator</a></h2>
                    </div>
                    <div style="clear:both"></div>
                    
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
