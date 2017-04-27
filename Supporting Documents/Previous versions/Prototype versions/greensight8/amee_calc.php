<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Carbon Calculator
        </title>
        <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/amee_calc.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/themes/base/jquery.ui.all.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/jquery.msg.css" type="text/css" media="screen" title="no title" charset="utf-8"><!-- libraries -->

        <script src="javascripts/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/ui/jquery-ui.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/ui/jquery.ui.widget.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.selectboxes.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.selectboxes.pack.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.OnEnter.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.cookie.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.validate.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.msg.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.center.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.numeric.js" type="text/javascript" charset="utf-8">
</script><!-- custom scripts -->

        <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/calculator.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" charset="utf-8">
// ACTIONS ON LOAD
$(document).ready(function() {
    $(window).load(function() {
        // initiate the calculator, operate changes as soon as the DOM is ready.
        // see resetCalc() for details
        resetCalc();
        loadCache();
        loadListOfBaskets();
        $('#saveBasket').attr("disabled", true);
        $('#clearBasket').attr("disabled", true);
    });
    $(".qty").numeric({
        decimal: false,
        negative: false
    });
});
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
                        <table id="listOfBaskets" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <th class="centered">
                                    Saved Audits
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                        <?php
                        if (empty($_COOKIE['superuser']) || empty($_COOKIE['user'])) {
                            echo ('<p class="centered">Login or register<br>to access this function</p>');
                        }
                        ?>
                    </div>
                    <div id="bottom_left" class="shadow corners">
                        <table id="listOfBaskets" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <th class="centered">
                                    Compare saved Audits
                                </th>
                            </tr>
                        </table>
                        <?php
                        if (empty($_COOKIE['superuser']) || empty($_COOKIE['user'])) {
                            echo ('<p class="centered">Login or register<br>to access this function</p>');
                        } else {
                            echo('<tr><td><input type="button" name="compare_two" value="Compare two audits" id="compare_two" class="compare"></td></tr>');
                        }
                        ?>
                        <div id="topbar">
                            <a href="#top" id="top" class="topbtn" name="top">Top&nbsp;^</a>
                        </div>
                    </div>
                </div>
                <div id="right" class="">
                    <div id="top_right" class="shadow corners">
                        <div class="corners" id="dsrc_details">
                            <p class="" id="data_src_details">
                                To start using the calculator, select a category.<br>
                                The data is is sourced from <a href="http://www.amee.com/">AMEE</a> database.<br>
                                The source and conversion factor from your selections will be displayed here.
                            </p>
                        </div>
                        <div id="dcalclulator" class="my-skinnable-select">
                            <select name="sProfileCategory" id="sProfileCategory" class="sProfileCategory" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1">
                                <option id="defaultdatacat" class="default" value="">
                                    Select a data category
                                </option>
                            </select> <select name="productType" id="productType" class="productType" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option id="defaultcat" class="default" value="">
                                    Select a product type
                                </option>
                            </select> <select name="brand" id="brand" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a brand
                                </option>
                            </select> <select name="modelName" id="modelName" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a model
                                </option>
                            </select> <select name="modelNumber" id="modelNumber" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a model Number
                                </option>
                            </select> <select name="category" id="category" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a category
                                </option>
                            </select> <select name="device" id="device" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a Device
                                </option>
                            </select> <select name="rating" id="rating" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a Rating
                                </option>
                            </select> <select name="onStandby" id="onStandby" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                                <option class="default" value="">
                                    Select a Rating
                                </option>
                            </select> <input type="text" name="quantity" value="1" id="quantity" class="qty" style="display:none" onenter="getFooprint($('#sProfileCategory').val(),$('#productType').val(),$('#brand').val(),$('#modelName').val(), $('#modelNumber').val(),$('#category').val(),$('#device').val(), $('#rating').val(), $(this).val())"> <input type="button" name="reset" value="reset" id="reset" onclick="resetCalc()"> <input type="button" name="submit" value="submit" id="submit" onclick="getFooprint($('#sProfileCategory').val(),$('#productType').val(),$('#brand').val(),$('#modelName').val(), $('#modelNumber').val(),$('#category').val(),$('#device').val(), $('#rating').val(), $('#quantity').val())">
                        </div>
                    </div>
                    <div style="clear:both"></div>
                    <div style="clear:both"></div>
                    <div id="bottom_right" class="shadow corners">
                        <span id="results" class="centered"></span>
                        <table id="results_table" border="0" cellspacing="2" cellpadding="2" summary="equipment carbon footprint">
                            <tr>
                                <th id="qty">
                                    Qty
                                </th>
                                <th id="dsc">
                                    Description
                                </th>
                                <th id="amount">
                                    Amount
                                </th>
                                <th id="unit">
                                    Unit (CO2)
                                </th>
                                <th id="perunit">
                                    Per Unit
                                </th>
                                <th id="edit">
                                    Edit
                                </th>
                            </tr>
                        </table><input type="button" name="checkout" value="Continue" id="checkout" disabled="true" onclick="toResultsPage()" class="bottom_right_btns">
                        <input type="button" name="clearBasket" value="Clear All" id="clearBasket" class="bottom_right_btns" onclick="clearBasket()">
                        <?php
                        if (!empty($_COOKIE['superuser']) || !empty($_COOKIE['user'])) {
                            echo ('<input type="button" name="saveBasket" value="Save" id="saveBasket" class="bottom_right_btns" onclick="saveBasket()">');
                        }
                        ?>
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
