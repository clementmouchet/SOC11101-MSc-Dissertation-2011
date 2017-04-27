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

var modelSelected = false;
var modelNumberSelected = false;

function getModelNumb(productType, brand, modelName, modelNumber, category) {
    if (productType != "" & brand != "") {
        if (modelSelected == false) {
            //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
            $("#modelNumber").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber, {},
            false);
            $('#modelNumber').fadeIn('');
            modelSelected = true;
        } else {
            $('#modelNumber').removeOption(/./).addOption("", "Select a model number");
            $("#modelNumber").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber, {},
            false);
            $('#quantity').removeOption(/./).addOption("", "Select quantity");
            $('#quantity').fadeOut('');
        }
    }
};

function getCategory(productType, brand, modelName, modelNumber, category) {
    if (productType != "" & brand != "") {
        if (modelNumberSelected == false) {
            //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
            $("#category").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category, {},
            false);
            $('#category').fadeIn('');
            modelNumberSelected = true;
        } else {
            $('#category').removeOption(/./).addOption("", "Select a category");
            $("#category").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category, {},
            false);
            $('#quantity').removeOption(/./).addOption("", "Select quantity");
            $('#quantity').fadeOut('');
        }
    }
};

        </script>
    </head>
    <body>
        <h1 id="titl">
            Greensight Demo 2
        </h1>
        <div id="dcalclulator" class="shadow corners">
            <select name="productType" id="productType" class="productType" onclick="getBrands($(this).val(), '', '')" size="1">
                <option id="defaultcat" class="default" value="">
                    Select a category
                </option>
            </select><br>
            <select name="brand" id="brand" onclick="getModels($(productType).val(),$(this).val(), '')" size="1" style="display:none">
                <option class="default" value="">
                    Select a brand
                </option>
            </select><br>
            <select name="modelName" id="modelName" onclick="getModelNumb($(productType).val(), $(brand).val(), $(this).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model
                </option>
            </select><br>
            <select name="modelNumber" id="modelNumber" onclick="getCategory($(productType).val(), $(brand).val(), $(modelName).val(),$(this).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model Number
                </option>
            </select><br>
            <select name="category" id="category" onclick="setQuantity($(modelName).val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a category
                </option>
            </select><br>
            <input type="text" name="quantity" value="" id="quantity" style="display:none" onenter="getFooprint($(productType).val(),$(brand).val(), $(modelName).val(), $(this).val())"><br>
            <div id="dresults">
                <span id="results"></span>
            </div>
        </div>
    </body>
</html>
