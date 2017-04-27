// The code makes extensive use of jQuery http://jquery.com/ to perform ajax requests and interact with te page while maintaining minimum exchange between the server and the client.
// The selects are dynamically changin thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/ 
// It performs the Ajax request to the php script oDataItem.php and append the options Object returned in JSON to the select

// ACTIONS ON LOAD
$(document).ready(function() {
    window.onload = function() {
		// fetch productType and prevent mistakes and malfunction
		resetCalc();
    }
});

var catSelected = false;
var brandSelected = false;
var modelSelected = false;
var modelNumberSelected = false;

// CHOOSE THE RIGHT FUNCTION DEPENDING ON THE "drillOption" RETURNED FROM AMEE
function pickSelect(productType, brand, modelName, modelNumber, category) {
    //alert("trying to pick from: productType:" + productType + " brand:"+ brand + " modelName:" + modelName + " modelNumber:" + modelNumber + " category:" + category);
    $.get('drillOption.php', {
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        category: category
    },
    function(drillOption) {
        //alert(drillOption);
        switch (drillOption)
        {
        case "brand":
            getBrands(productType, brand, modelName, modelNumber, category);
            break;
        case "modelName":
            getModels(productType, brand, modelName, modelNumber, category);
            break;
        case "modelNumber":
            getModelNumb(productType, brand, modelName, modelNumber, category);
            break;
        case "category":
            getCategory(productType, brand, modelName, modelNumber, category);
            break;
        default:
            setQuantity(modelName);
        }
    });
};


// GET LIST OF BRAND FOR SELECTED TYPE
function getBrands(productType, brand, modelName, modelNumber, category) {
    $('#modelName').empty().addOption("", "Select a model");
    if (productType != "" & brand == "") {
        $("#brand").ajaxAddOption("oDataItem.php", {
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#brand').fadeIn('');
        $('#productType').attr("disabled", true);
        catSelected = true;
		$('#reset').attr("disabled", false);
    }
};

// GET LIST OF MODEL FOR SELECTED TYPE & BRAND
function getModels(productType, brand, modelName, modelNumber, category) {
    //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if (productType != "" & brand != "") {
        //alert("getting model name");
        $("#modelName").ajaxAddOption("oDataItem.php", {
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#modelName').fadeIn('');
        $('#brand').attr("disabled", true);
        brandSelected = true;
    }
};

// GET LIST OF MODEL NUMBER FOR SELECTED TYPE & BRAND & MODEL
function getModelNumb(productType, brand, modelName, modelNumber, category) {
    //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if (productType != "" & brand != "") {
        //alert("getting model number");
        $("#modelNumber").ajaxAddOption("oDataItem.php", {
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#modelNumber').fadeIn('');
        $('#modelName').attr("disabled", true);
        modelSelected = true;
        modelNumberSelected = true;
    }
};

// GET LIST OF MODEL FOR SELECTED TYPE & BRAND & MODEL & MODEL NUMBER
function getCategory(productType, brand, modelName, modelNumber, category) {
    //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if (productType != "" & brand != "") {
        if (modelNumberSelected == false) {
            modelNumber = modelName;
        }
        //alert("getting category");
        $("#category").ajaxAddOption("oDataItem.php", {
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#category').fadeIn('');
        modelNumberSelected = true;
        $('#modelNumber').attr("disabled", true);
    }
};

// SET QUANTITY FOR SELECTED MODEL
function setQuantity(modelName) {
    if (modelName != "") {
        $('#modelName').attr("disabled", true);
        $('#category').attr("disabled", true);
    } else {
        $('#brand').attr("disabled", true);
        $('#modelName').attr("disabled", true);
        $('#modelNumber').attr("disabled", true);
        $('#category').attr("disabled", true);
    }
	$('#quantity').fadeIn('');
	$('#submit').attr("disabled", false);
};


// REQUEST FOOTPRINT TO AMEE FOR SELECTED PARAMETERS
function getFooprint(productType, brand, modelName, modelNumber, category, quantity) {
	// using a get to perfom the request with all the valid parameters. Note that before getFooprint() is called no profile have been created. It is only created now.
    $.get('oProfile.php', {
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        category: category,
        quantity: quantity
    },
    function(result) {
        $("#results").append(result);
		resetCalc();
    });
};

// RESET CALCULATOR
function resetCalc() {
    // hide selects that are not available
    $('#brand').fadeOut('');
    $('#modelName').fadeOut('');
    $('#modelNumber').fadeOut('');
    $('#category').fadeOut('');
    $('#quantity').fadeOut('');

    // re-enable them
    $('#brand').attr("disabled", false);
    $('#modelName').attr("disabled", false);
    $('#modelNumber').attr("disabled", false);
    $('#category').attr("disabled", false);
    $('#quantity').attr("disabled", false);
	$('#submit').attr("disabled", true);

    // clean select options and revert to default values
    $('#productType').removeOption(/./).addOption("", "Select a category");
    $('#brand').removeOption(/./).addOption("", "Select a brand");
    $('#modelName').removeOption(/./).addOption("", "Select a model name");
    $('#modelNumber').removeOption(/./).addOption("", "Select a model number");
    $('#category').removeOption(/./).addOption("", "Select a category");
    $('#quantity').val('1');

    // restart the first select
    $("#productType").ajaxAddOption("oDataItem.php?productType=", {},
    false);
    $('#productType').attr("disabled", false);
	$('#reset').attr("disabled", true);
};