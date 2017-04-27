// The code makes extensive use of jQuery http://jquery.com/ to perform ajax requests and interact with te page while maintaining minimum exchange between the server and the client.
// The selects are dynamically changin thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
// It performs the Ajax request to the php script oDataItemOptions.php and append the options Object returned in JSON to the select
// ACTIONS ON LOAD
$(document).ready(function() {
    window.onload = function() {
        // initiate the calculator, operate changes as soon as the DOM is ready.
        // see resetCalc() for details
        resetCalc();
    }
});

var modelNumberSelected = false;

// CHOOSE THE RIGHT FUNCTION DEPENDING ON THE "drillOption" RETURNED FROM AMEE
function pickSelect(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating) {
    // jQuery .get() performs the ajax request (GET) with the specified parameters. {sProfileCategory: sProfileCategory, etc} and returns the callback (a string) to a function
    // console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    $.get('drillOption.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        device: device,
        rating: rating,
        category: category
    },
    // the callback is an AMEE "drillOption". It stands before the options oject and helps to determine what function to call.
    function(sdrillOption) {
        //console.log(sdrillOption);
        switch (sdrillOption)
        {
        case "productType":
            getType(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "brand":
            getBrands(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "modelName":
            getModels(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "modelNumber":
            getModelNumb(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "category":
            getCategory(sProfileCategory, productType, brand, modelName, modelNumber, category);
            break;
        case "device":
            getDevice(sProfileCategory, device, rating);
            break;
        case "rating":
            getRating(sProfileCategory, device, rating);
            break;
        default:
            setQuantity(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating);
            break;
        }
    });
};

// GET LIST OF PRODUCT TYPE FOR SELECTED CATEGORY
function getType(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    // If the "drillOption" is "productType" this function is called to dynamically load the select with the right options,
    // thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
    // it performs the Ajax request to the php script oDataItemOptions.php in the same way than the (GET) described above and append the "options Object" returned in JSON to the select
    // all the getXxxxx() function work the same way.
    if (sProfileCategory != "" & productType == "") {
        $("#results").html("The data in this category is sourced from the Energy Star website. >> http://discover.amee.com/categories/Office_Computers");
        $("#productType").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#productType').fadeIn('');
        $('#sProfileCategory').attr("disabled", true);
        $('#reset').attr("disabled", false);

    }
};

// GET LIST OF BRAND FOR SELECTED PARAMETERS
function getBrands(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    if ((productType != "" & brand == "") || (productType == "" & brand == "")) {
        $("#results").html("The data in this category is sourced from the Energy Star website. >> http://discover.amee.com/categories/Office_Computers");
        $("#brand").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#brand').fadeIn('');
        $('#sProfileCategory').attr("disabled", true);
        $('#productType').attr("disabled", true);
        $('#reset').attr("disabled", false);
    }
};

// GET LIST OF MODEL_NAME FOR SELECTED PARAMETERS
function getModels(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        $("#modelName").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#modelName').fadeIn('');
        $('#brand').attr("disabled", true);
        modelNumberSelected = true;
    }
};

// GET LIST OF MODEL_NUMBER FOR SELECTED PARAMETERS
function getModelNumb(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        //alert("getting model number");
        $("#modelNumber").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#modelNumber').fadeIn('');
        $('#modelName').attr("disabled", true);
    }
};

// GET LIST OF MODEL FOR SELECTED PARAMETERS
function getCategory(sProfileCategory, productType, brand, modelName, modelNumber, category) {
    //console.log("oDataItemOptions.php?productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    if ((productType != "" & brand != "") || (productType == "" & brand != "")) {
        if (modelNumberSelected == false) {
            modelNumber = modelName;
        }
        //alert("getting category");
        $("#category").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#category').fadeIn('');
        $('#modelNumber').attr("disabled", true);
    }
};

// GET LIST OF DEVICES
function getDevice(sProfileCategory, device, rating) {
    //console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&device=" + device + "&rating=" + rating);
    if (sProfileCategory != "") {
		$("#results").html("The data in this category is sourced from MTP. >> http://discover.amee.com/categories/Computers_generic");
        $("#device").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            device: device,
            rating: rating
        },
        false);
        $('#device').fadeIn('');
        $('#sProfileCategory').attr("disabled", true);
        $('#reset').attr("disabled", false);
    }
};

// GET LIST OF RATINGS FOR SELECTED DEVICE
function getRating(sProfileCategory, device, rating) {
    //console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&device=" + device + "&rating=" + rating);
    if (sProfileCategory != "") {
        $("#rating").ajaxAddOption("oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            device: device,
            rating: rating
        },
        false);
        $('#rating').fadeIn('');
        $('#device').attr("disabled", true);
        $('#reset').attr("disabled", false);
    }
};

// SET QUANTITY FOR SELECTED PODUCT
function setQuantity(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating, quantity) {
    // Performing a drilldown to make sure there is no "drillOption" left then proceeed
    $.get('drillOption.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        device: device,
        rating: rating,
        category: category
    },
    function(drillOption) {
        //console.log(drillOption);
        if (sProfileCategory != '' & drillOption == '') {
            if (device != "") {
                $('#device').attr("disabled", true);
                $('#rating').attr("disabled", true);
            } else {
                $('#brand').attr("disabled", true);
                $('#modelName').attr("disabled", true);
                $('#modelNumber').attr("disabled", true);
                $('#category').attr("disabled", true);
            }
            $('#quantity').fadeIn('');
            $('#submit').attr("disabled", false);
        }
    });
};

// REQUEST FOOTPRINT TO AMEE FOR SELECTED PARAMETERS
function getFooprint(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating, quantity) {
    // using a get to perfom the request with all the valid parameters. Note that before getFooprint() is called no profile have been created. It is only created now.
    //console.log(sProfileCategory + " " + productType + " " + brand + " " + modelName + " " + modelNumber + " " + category + " " + quantity + " " + device + " " + rating);
    $.getJSON('oProfile.php', {
        sProfileCategory: sProfileCategory,
        productType: productType,
        brand: brand,
        modelName: modelName,
        modelNumber: modelNumber,
        category: category,
        device: device,
        rating: rating,
        quantity: quantity,
    },
    function(oDeviceProfile, textStatus) {
        $("#results").append(oDeviceProfile.values.quantity + " " + oDeviceProfile.description + " = " + (oDeviceProfile.values.quantity * oDeviceProfile.values.amount) + " " + oDeviceProfile.values.unit + " of CO2/" + oDeviceProfile.values.perUnit + '<br>');
        resetCalc();
    });

};

// RESET CALCULATOR
function resetCalc() {
    // attr("disabled", false) re-enables selects for later use
    // fadeOut('') hide them to avoid issues
    // removeOption(/./) clean select options
    // .addOption("value", "text") revert to default values
    // this is all in jQuery, otherwise it would be much longer
    $('#productType').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a product type");
    $('#brand').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a brand");
    $('#modelName').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a model name");
    $('#modelNumber').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a model number");
    $('#category').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a category");
    $('#device').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a device");
    $('#rating').attr("disabled", false).fadeOut('').removeOption(/./).addOption("", "Select a rating");
    $('#quantity').attr("disabled", false).fadeOut('').val('1');
    // disable the submit button
    $('#submit').attr("disabled", true);

    // SET THE DATA CATEGORIES AVAILABLE
    // the list is not retreive from the server because path are not supposed to change and they require special treatments, so only the usefull path are available.
    var sProfileCategories = {
        "/home/appliances/energystar/office/computers/desktopsAndIntegrated": "Desktops & Integrated Computers",
        "/home/appliances/energystar/office/computers/workstations": "Workstations",
        "/home/appliances/energystar/office/computers/notebooksAndTablets": "Notebooks & Tablets",
        "/home/appliances/computers/generic": "Computing Equipment"
    }
    $("#sProfileCategory").addOption(sProfileCategories, false);
    $('#sProfileCategory').attr("disabled", false);
    $('#reset').attr("disabled", true);
};