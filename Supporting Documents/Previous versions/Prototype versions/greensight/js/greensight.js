// ACTIONS ON LOAD
$(document).ready(function() {
    window.onload = function() {
        // USING TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
        // to perform the Ajax request and append the options returned in JSON to the select
        $("#productType").ajaxAddOption("oDataItem.php?productType=", {},
        false);
    }
});
var catSelected= false;
var brandSelected = false;

// GET LIST OF BRAND FOR SELECTED TYPE
function getBrands(productType, brand, modelName) {
	$('#modelName').empty().addOption("", "Select a model");
	if (productType != "" & brand == "") {
		if (catSelected == false) {
			$("#brand").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
	        false);
		    $('#brand').fadeIn('');
			catSelected = true;
		} else {
			$('#brand').removeOption(/./).addOption("", "Select a brand");
			$("#brand").ajaxAddOption("oDataItem.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName, {},
	        false);
			$('#modelName').fadeOut('');
			$('#quantity').fadeOut('');
			$('#modelName').removeOption(/./);
			$('#quantity').removeOption(/./);
			brandSelected = false;
		}	
	}
};

// GET LIST OF MODEL FOR SELECTED TYPE & BRAND

function getModels(productType, brand, modelName) {
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


// SET QUANTITY FOR SELECTED MODEL
function setQuantity(modelName) {
	if (modelName != "") {
	    $('#quantity').fadeIn('');
	}
};


// REQUEST FOOTPRINT TO AMEE FOR SELECTED PARAMETERS
function getFooprint(productType, brand, modelName, quantity) {
	if (productType != null & brand) {
		
	}
    $.ajax({
        url: "oProfile.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&quantity=" + quantity,
        type: "GET",
        cache: false,
        success: function(responseText) {
            $("#results").html(responseText);
        }
    });
};