// ACTIONS ON LOAD
$(document).ready(function() {
    window.onload = function() {
        // USING TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
        // to perform the Ajax request and append the options returned in JSON to the select
        $("#productType").ajaxAddOption("oDataItem.php?productType=", {},
        false);
    }
});
var catSelected = false;
var brandSelected = false;
var modelSelected = false;
var modelNumberSelected = false;

// CHOOSE THE RIGHT FUNCTION DEPENDING ON THE SELECT IT IS CALLED FROM AND THE drillOption RETURNED FROM AMEE
function pickSelect(select, productType, brand, modelName, modelNumber, category) {
    //alert("trying to pick from: productType:" + productType + " brand:"+ brand + " modelName:" + modelName + " modelNumber:" + modelNumber + " category:" + category);
	//alert("called from "+select);
	if ((catSelected & select == "productType") || (brandSelected & select == "brand") || (modelSelected & select == "modelName") || (modelNumberSelected & select == "modelNumber")) {
		productType = '';
		brand = '';
		modelName = '';
		modelNumber = '';
		category = '';
		$('#modelName').fadeOut('');
		$('#modelNumber').fadeOut('');
		$('#category').fadeOut('');
        $('#quantity').fadeOut('');
        $('#modelName').removeOption(/./);
        $('#modelNumber').removeOption(/./);
		$('#category').removeOption(/./);
		$('#quantity').removeOption(/./);
        brandSelected = false;
		modelSelected = false;
		modelNumberSelected = false;
	}
	//alert("trying to pick from: productType:" + productType + " brand:"+ brand + " modelName:" + modelName + " modelNumber:" + modelNumber + " category:" + category);
    $.get('drillOption.php', {
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        category: category
    },
    function(drillOption) {
        alert(drillOption);
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
        if (catSelected == false) {
			alert("catSelected = "+ catSelected);
            $("#brand").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
            false);
            $('#brand').fadeIn('');
            catSelected = true;
        } else {
			alert("catSelected = "+ catSelected);
            $('#brand').removeOption(/./).addOption("", "Select a brand");
            $("#brand").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
            false);
            $('#modelName').fadeOut('');
			$('#modelNumber').fadeOut('');
			$('#category').fadeOut('');
            $('#quantity').fadeOut('');
            $('#modelName').removeOption(/./);
            $('#modelNumber').removeOption(/./);
			$('#category').removeOption(/./);
			$('#quantity').removeOption(/./);
            brandSelected = false;
			modelSelected = false;
			modelNumberSelected = false;
			
        }
    }
};

// GET LIST OF MODEL FOR SELECTED TYPE & BRAND
function getModels(productType, brand, modelName, modelNumber, category) {
    if (productType != "" & brand != "") {
        if (brandSelected == false) {
            $("#modelName").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
            false);
            $('#modelName').fadeIn('');
            brandSelected = true;
        } else {
            $('#modelName').removeOption(/./).addOption("", "Select a model");
            $("#modelName").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
            false);
            $('#quantity').removeOption(/./).addOption("", "Select quantity");
            $('#quantity').fadeOut('');
        }
    }
};

// GET LIST OF MODEL NUMBER FOR SELECTED TYPE & BRAND & MODEL
function getModelNumb(productType, brand, modelName, modelNumber, category) {
    if (productType != "" & brand != "") {
        if (modelSelected == false) {
            //alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber);
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

// GET LIST OF MODEL FOR SELECTED TYPE & BRAND & MODEL & MODEL NUMBER
function getCategory(productType, brand, modelName, modelNumber, category) {
    if (productType != "" & brand != "") {
        if (modelNumberSelected == false) {
			modelNumber = modelName;
            alert("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
            $("#category").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=", {},
            false);
            $('#category').fadeIn('');
            modelNumberSelected = true;
        } else {
            $('#category').removeOption(/./).addOption("", "Select a category");
            $("#category").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=", {},
            false);
            $('#quantity').removeOption(/./).addOption("", "Select quantity");
            $('#quantity').fadeOut('');
        }
    }
};

// SET QUANTITY FOR SELECTED MODEL
function setQuantity(modelName) {
    if (modelName != "") {
        $('#quantity').fadeIn('');
    }
};


// REQUEST FOOTPRINT TO AMEE FOR SELECTED PARAMETERS
function getFooprint(productType, brand, modelName, modelNumber, category, quantity) {
    if (productType != null & brand) {

        }
    $.ajax({
        url: "oProfile.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category + "&quantity=" + quantity,
        type: "GET",
        cache: false,
        success: function(responseText) {
            $("#results").html(responseText);
        }
    });
};