<?php session_start();
$page = 'amee_calc'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            Greensight - Carbon Calculator - Results
        </title>
        <link rel="stylesheet" href="css/master.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/amee_calc_results.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/navigation.css" type="text/css" charset="utf-8">
        <link rel="stylesheet" href="css/amee_calc_results_print.css" type="text/css" media="print" charset="utf-8">
        <link rel="stylesheet" href="css/themes/base/jquery.ui.all.css" type="text/css" media="screen" charset="utf-8">
        <link rel="stylesheet" href="css/jquery.jqplot.css" type="text/css">
        <!-- libraries -->
        <script src="javascripts/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/ui/jquery-ui.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/ui/jquery.ui.widget.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/ui/jquery.ui.button.js" type="text/javascript" charset="utf-8">
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
</script><!--[if lt IE 9]><script language="javascript" type="text/javascript" src="javascripts/excanvas.js"></script><![endif]-->

        <script src="javascripts/jquery.jqplot.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/plugins/jqplot.barRenderer.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/plugins/jqplot.categoryAxisRenderer.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="javascripts/plugins/jqplot.pointLabels.min.js" type="text/javascript" charset="utf-8"></script>

    <!-- custom scripts -->

        <script src="javascripts/greensight_ui.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/greensight.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/report.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" charset="utf-8">
$(document).ready(function(){
  
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
                <div id="left" class=""></div>
                <div id="right" class="">
                    <div id="top_right" class="shadow corners">
                        <div id="chartAll"></div>
                        <div id="chartAllIn"></div>
                        <div id="chartCategory"></div>
                        <div style="clear:both"></div>
                        <div id="chartbtns">
                            <input type="button" name="btn_all_equipment" value="All Equipment" id="btn_all_equipment" onclick="allEquipment()">
                            <input type="button" name="btn_by_category" value="All categories" id="btn_by_category" onclick="byCategory()">
                            <input type="button" name="btn_all_computingequipment" value="C. Equipment" id="btn_all_computingequipment" onclick="allIn(aComputingEquipment)">
                            <input type="button" name="btn_all_workstation" value="Workstations" id="btn_all_workstation" onclick="allIn(aWorkstation)">
                            <input type="button" name="btn_all_desktop" value="Desktop" id="btn_all_desktop" onclick="allIn(aDesktop)">
                            <input type="button" name="btn_all_intergated" value="Intergated" id="btn_all_intergated" onclick="allIn(aIntergated)">
                            <input type="button" name="btn_all_notebook" value="Notebook" id="btn_all_notebook" onclick="allIn(aNotebook)">
                        </div>
                    </div>
                    <div style="clear:both"></div>
                    <div id="middle_right" class="shadow corners">
                        <p id="results" class="centered"></p>
                    </div>
                    <div id="bottom_right" class="shadow corners">
                        <table id="results_table" class="stripped" border="0" cellspacing="2" cellpadding="2" summary="equipment carbon footprint">
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
                                <th id="avg">
                                    Delta Average
                                </th>
                            </tr>
                        </table>
                        <div id="totalfootprint" class="shadow corners"><p id="ptotal"></p></div>
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
