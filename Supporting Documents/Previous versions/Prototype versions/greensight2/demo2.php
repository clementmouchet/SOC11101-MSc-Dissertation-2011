<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Script-Type" content="text/javascript">
        <meta http-equiv="Content-Style-Type" content="text/css">
        <title>
            Greensignt calculator prototype 2
        </title>
        <script src="http://code.jquery.com/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="js/jquery.selectboxes.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="js/jquery.selectboxes.pack.js" type="text/javascript" charset="utf-8">
</script>
        <script src="js/greensight.js" type="text/javascript" charset="utf-8">
</script>
        <script src="js/jquery.OnEnter.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" charset="utf-8">
</script>
    </head>
    <body>
        <h1 id="titl">
            Greensight Demo 2
        </h1>
        <div id="dcalclulator" class="shadow corners">
            <select name="productType" id="productType" class="productType" onclick="pickSelect($(productType).val(), $(brand).val(), $(modelName).val(), $(modelNumber).val(), $(category).val())" size="1">
                <option id="defaultcat" class="default" value="">
                    Select a category
                </option>
            </select><br>
            <select name="brand" id="brand" onclick="pickSelect($(productType).val(), $(brand).val(), $(modelName).val(), $(modelNumber).val(), $(category).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a brand
                </option>
            </select><br>
            <select name="modelName" id="modelName" onclick="pickSelect($(productType).val(), $(brand).val(), $(modelName).val(), $(modelNumber).val(), $(category).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model
                </option>
            </select><br>
            <select name="modelNumber" id="modelNumber" onchange="pickSelect($(productType).val(), $(brand).val(), $(modelName).val(), $(modelNumber).val(), $(category).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model Number
                </option>
            </select><br>
            <select name="category" id="category" onclick="setQuantity($(modelName).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a category
                </option>
            </select><br>
            <input type="text" name="quantity" value="" id="quantity" style="display:none" onenter="getFooprint($(productType).val(),$(brand).val(),$(modelName).val(), $(modelNumber).val(),$(category).val(), $(this).val())"><br>
            <input type="button" name="reset" value="reset" id="reset" onclick="resetCalc()">
            <div id="dresults">
                <span id="results"></span>
            </div>
        </div>
    </body>
</html>