// The code makes extensive use of jQuery http://jquery.com/ to perform ajax requests and interact with te page while maintaining minimum exchange between the server and the client.
// The selects are dynamically changin thanks to TexoTela jQuery plugin: http://www.texotela.co.uk/code/jquery/select/
// It performs the Ajax request to the php script oDataItemOptions.php and append the options Object returned in JSON to the select
var modelNumberSelected = false;

var nBofDeviceProfile = 0;
var currentAudit = null;

// SET THE DATA CATEGORIES AVAILABLE
// the list is not retreive from the server because path are not supposed to change and they require special treatments, so only the usefull path are available.
var sProfileCategories = {
    "/home/appliances/energystar/office/computers/desktopsAndIntegrated": "Desktops & Integrated Computers",
    "/home/appliances/energystar/office/computers/workstations": "Workstations",
    "/home/appliances/energystar/office/computers/notebooksAndTablets": "Notebooks & Tablets",
    "/home/appliances/computers/generic": "Computing Equipment"
}


// LOAD EXISTING BASKET
function loadCache() {
    if (localStorage.getItem("oBasket") !== null) {
        $.msg({
            bgPath: 'images/',
            autoUnblock: false,
            clickUnblock: false,
            content: '<p class="centered">A previous selection has been found in cache,<br>would you like to load it?</p>' +
            '<p class="btn-wrap centered">' +
            '<input type="button" name="yesLoad" value="Yes" id="yesLoad">&nbsp;' +
            '<input type="button" name="noLoad" value="No" id="noLoad">' +
            '</p>',
            afterBlock: function() {
                // store 'this' for other scope to use
                var self = this;
                $('#yesLoad').bind('click',
                function() {
                    try {
                        self.replace('Loading...');
                        var oBasket = JSON.parse(localStorage.getItem('oBasket'));
                        // LOOP THROUGH THE SELECTION
                        for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
                            var oDeviceProfile = oBasket['aDeviceProfile'][i];
                            localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
                            // APPEND TO THE TABLE
                            $("#results_table").append(
                            '<tr id="row' + i + '">' +
                            '<td id="quantity' + i + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
                            '<td id="description' + i + '">' + oDeviceProfile.description + '<\/td>' +
                            '<td id="totalamout' + i + '" class="centered">' + Math.round(oDeviceProfile.values.quantity * oDeviceProfile.values.amount).toFixed(2) + '<\/td>' +
                            '<td id="unit' + i + '">' + oDeviceProfile.values.unit + '<\/td>' +
                            '<td id="perUnit' + i + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
                            '<td style="display:none" id="UID' + i + '">' + oDeviceProfile.values.UID + '<\/td>' +
                            '<td id="tdedit' + nBofDeviceProfile + '"><input type="button" value="Edit" id="edit' + nBofDeviceProfile + '" onclick="editDeviceProfile(' + nBofDeviceProfile + ')"><\/td>' +
                            '<\/tr>'
                            );
                            $('#checkout').attr("disabled", false);
                            $('#saveBasket').attr("disabled", false);
                            $('#clearBasket').attr("disabled", false);
                            nBofDeviceProfile++;
                            self.unblock();
                        };
                    } catch(err) {
                        self.replace('Failed to load previous selection');
                        localStorage.clear();
                        self.unblock(3000);
                    }
                });
                $('#noLoad').bind('click',
                function() {
                    self.replace('Previous selection cleared');
                    localStorage.clear();
                    self.unblock(2000);
                });
            }
        });
    };
};

function editDeviceProfile(nBofDeviceProfile) {
    var oDeviceProfile = JSON.parse(localStorage.getItem('oDeviceProfile' + nBofDeviceProfile));
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">' + oDeviceProfile.description + '</p>' +
        '<p class="btn-wrap centered">' +
        '<label for="editqty">Quantity:&nbsp;</label><input type="text" name="editqty" value="' + oDeviceProfile.values.quantity + '" id="editqty" class="qty" size="9" style="text-align: right;"><br><br>' +
        '<input type="button" name="cancelEdit" value="Cancel" id="cancelEdit">&nbsp;' +
        '<input type="button" name="removeEdit" value="Remove" id="removeEdit">&nbsp;' +
        '<input type="button" name="saveEdit" value=" Save "id="saveEdit">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var qty = $('#editqty').val();
            $("#editqty").numeric({
                decimal: false,
                negative: false
            });
            var self = this;
            $('#cancelEdit').bind('click',
            function() {
                self.unblock();
            });
            $('#removeEdit').bind('click',
            function() {
                self.replace('Removing...');
                localStorage.removeItem('oDeviceProfile' + nBofDeviceProfile);
                $('#row' + nBofDeviceProfile).remove();
                self.unblock();
            });
            $('#saveEdit').bind('click',
            function() {
                qty = $('#editqty').val();
                self.replace('Saving...');
                oDeviceProfile.values.quantity = parseInt(qty);
                localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
                $('#quantity' + nBofDeviceProfile).html(qty);
                self.unblock();
            });
        }
    });
}

// CHOOSE THE RIGHT FUNCTION DEPENDING ON THE "drillOption" RETURNED FROM AMEE
function pickSelect(sProfileCategory, productType, brand, modelName, modelNumber, category, device, rating) {
    // jQuery .get() performs the ajax request (GET) with the specified parameters. {sProfileCategory: sProfileCategory, etc} and returns the callback (a string) to a function
    // console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&productType=" + productType + "&brand=" + brand + "&modelName=" + modelName + "&modelNumber=" + modelNumber + "&category=" + category);
    $.get('php_scripts/calculator/drillOption.php', {
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
        $("#data_src_details").html("The data in this category is sourced from the <a href='http://discover.amee.com/categories/Office_Computers'>Energy Star website</a><br>CO2 = Energy usage of appliance per year * US electricity emission factor * quantity");
        $("#productType").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
        $("#data_src_details").html("The data in this category is sourced from the <a href='http://discover.amee.com/categories/Office_Computers'>Energy Star website</a><br>CO2 = Energy usage of appliance per year * US electricity emission factor * quantity");
        $("#brand").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
        $("#modelName").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
        $("#modelNumber").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
        $("#category").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
            sProfileCategory: sProfileCategory,
            productType: productType,
            brand: brand,
            modelName: modelName,
            modelNumber: modelNumber,
            category: category
        },
        false);
        $('#category').fadeIn('');
        if (productType != '') {
            $("#data_src_details").append("<br>Category A: <= 148.0 kWh<br>Category B: <= 175.0 kWh<br>Category C: <= 209.0 kWh<br>Category D: <= 234.0 kWh");
        } else {
            $("#data_src_details").append("<br>Category A: <= 40.0 kWh<br>Category B: <= 53.0 kWh<br>Category C: <= 88.5");
        }
        $('#modelNumber').attr("disabled", true);
    }
};

// GET LIST OF DEVICES
function getDevice(sProfileCategory, device, rating) {
    //console.log("oDataItemOptions.php?sProfileCategory=" + sProfileCategory + "&device=" + device + "&rating=" + rating);
    if (sProfileCategory != "") {
        $("#data_src_details").html("The data in this category is sourced from the <a href='http://discover.amee.com/categories/Computers_generic'>MTP dataset</a><br>CO2 = Energy usage of appliance per year * UK electricity emission factor * quantity");
        $("#device").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
        $("#rating").ajaxAddOption("php_scripts/calculator/oDataItemOptions.php", {
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
    $.get('php_scripts/calculator/drillOption.php', {
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
    if (device == '') {
        if (productType == '') {
            if (sProfileCategory == "/home/appliances/energystar/office/computers/workstations") {
                productType = "Workstation";
            } else if (sProfileCategory == "/home/appliances/energystar/office/computers/notebooksAndTablets") {
                productType = "Notebook/Tablet";
            }
        }
    }
    $.getJSON('php_scripts/calculator/oProfile.php', {
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
        // Put the object into localStorage
        localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
        // Display results in the table
        $("#results_table").append(
        '<tr id="row' + nBofDeviceProfile + '">' +
        '<td id="quantity' + nBofDeviceProfile + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
        '<td id="description' + nBofDeviceProfile + '">' + oDeviceProfile.description + '<\/td>' +
        '<td id="totalamout' + nBofDeviceProfile + '" class="centered">' + Math.round(oDeviceProfile.values.quantity * oDeviceProfile.values.amount).toFixed(2) + '<\/td>' +
        '<td id="unit' + nBofDeviceProfile + '">' + oDeviceProfile.values.unit + '<\/td>' +
        '<td id="perUnit' + nBofDeviceProfile + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
        '<td style="display:none" id="UID' + nBofDeviceProfile + '">' + oDeviceProfile.values.UID + '<\/td>' +
        '<td id="tdedit' + nBofDeviceProfile + '"><input type="button" value="Edit" id="edit' + nBofDeviceProfile + '" onclick="editDeviceProfile(' + nBofDeviceProfile + ')"><\/td>' +
        '<\/tr>'
        );
        $('#checkout').attr("disabled", false);
        $('#saveBasket').attr("disabled", false);
        $('#clearBasket').attr("disabled", false);
        nBofDeviceProfile++;
        resetCalc();
    });

};
// CHECKOUT
function checkout() {
    var aBasket = {
        aDeviceProfile: [],
        timestamp: new Date()
    };
    // Retreive existing objects stored, pack into an array and put it into localStorage
    for (var i = 0; i < nBofDeviceProfile; i++) {
        if (localStorage.getItem('oDeviceProfile' + i)) {
            aBasket.aDeviceProfile.push(JSON.parse(localStorage.getItem('oDeviceProfile' + i)));
            localStorage.removeItem('oDeviceProfile' + i);
        }
    };

    localStorage.setItem('oBasket', JSON.stringify(aBasket));

    // var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    // console.log('oBasket: ', JSON.parse(localStorage.getItem('oBasket')));
    //     console.log('timestamp: ', Date(oBasket.timestamp).toString());
};

// CHECKOUT AND SHOW RESULTS
function toResultsPage() {
    checkout();
    window.location = 'amee_calc_results.php';
};
// SAVE CURRENT BASKET
function saveBasket() {
    checkout();
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">Save to your account<br></p>' +
        '<p class="btn-wrap centered">' +
        '<label for="description">Description:&nbsp;</label><input type="text" name="description" value="" id="description" size="18"><br><br>' +
        '<input type="button" name="cancelSave" value="Cancel" id="cancelSave">&nbsp;' +
        '<input type="button" name="saveSave" value=" Save "id="saveSave">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#cancelSave').bind('click',
            function() {
                self.unblock();
            });
            $('#saveSave').bind('click',
            function() {
                var dsc = $('#description').val();
                var oBasket = localStorage.getItem('oBasket');
                var user = $.cookie('email');
                self.replace('Saving...');
                $.get('php_scripts/calculator/saveBasket.php', {
                    oBasket: localStorage.getItem('oBasket'),
                    description: dsc,
                    user: $.cookie('email')
                },
                function(id, textStatus, xhr) {
                    if (id == null) {
                        self.replace('<p style="color: red" class="centered"><b>Unexpected Error,</b><br>Failed to save</p>');
                    } else {
                        self.replace('<p style="color: green" class="centered"><b>Audit saved</p>');
                        $("#listOfBaskets").append('<tr id="basket' + id + '"><td id="basketId' + id + '" style="display:none">' + id + '</td><td id="basketDesc' + id + '" class="basketDesc">' + dsc + '</td><td><input type="button" name="loadBasket' + id + '" value="Load" id="loadBasket' + id + '" class="basket_list_btns" onclick="loadBasket(' + id + ')"></td><td><input type="button" name="removeBasket' + id + '" value="Del" id="removeBasket' + id + '" class="basket_list_btns" onclick="removeBasket(' + id + ')"></td></tr>');
                        currentAudit = id;
                    }
                });
                self.unblock(3000);
            });
        }
    });
};

function loadListOfBaskets() {
    if ($.cookie('email')) {
        var user = $.cookie('email');
        $.getJSON('php_scripts/calculator/loadListOfBaskets.php', {
            user: user
        },
        function(listOfBaskets, textStatus) {
            $.each(listOfBaskets.baskets,
            function(i, basket) {
                $("#listOfBaskets").append('<tr id="basket' + basket.id + '"><td id="basketId' + basket.id + '" style="display:none">' + basket.id + '</td><td id="basketDesc' + basket.id + '" class="basketDesc">' + basket.description + '</td><td><input type="button" name="loadBasket' + basket.id + '" value="Load" id="loadBasket' + basket.id + '" class="basket_list_btns" onclick="loadBasket(' + basket.id + ')"></td><td><input type="button" name="removeBasket' + basket.id + '" value="Del" id="removeBasket' + basket.id + '" class="basket_list_btns" onclick="removeBasket(' + basket.id + ')"></td></tr>'
                )
            });
        });
    }
}

// LOAD SELECTED BASKET
function loadBasket(id) {
    var description = $('#basketDesc' + id).html();
    var date = new Date();
    $.getJSON('php_scripts/calculator/loadBasket.php', {
        id: id
    },
    function(basket, textStatus) {
        var oBasket = JSON.parse(basket);
        date = Date(oBasket.timestamp).toString();
    });

    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">This will clear all current selection and load the selection named:<br><br><b>"' + description + '"</b><br><br>created on:<br><br>' + date + '</p>' +
        '<p class="btn-wrap centered">' +
        '<input type="button" name="cancelLoadDb" value="Cancel" id="cancelLoadDb">&nbsp;' +
        '<input type="button" name="loadDb" value=" Load "id="loadDb">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#cancelLoadDb').bind('click',
            function() {
                self.unblock();
            });
            $('#loadDb').bind('click',
            function() {
                var user = $.cookie('email');
                localStorage.clear();
                $('#results_table tr:not(:first)').remove();
                $.getJSON('php_scripts/calculator/loadBasket.php', {
                    id: id
                },
                function(oBasket, textStatus) {
                    localStorage.setItem('oBasket', oBasket);
                    try {
                        var oBasket = JSON.parse(localStorage.getItem('oBasket'));
                        // LOOP THROUGH THE SELECTION
                        for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
                            var oDeviceProfile = oBasket['aDeviceProfile'][i];
                            localStorage.setItem('oDeviceProfile' + nBofDeviceProfile, JSON.stringify(oDeviceProfile));
                            // APPEND TO THE TABLE
                            $("#results_table").append(
                            '<tr id="row' + i + '">' +
                            '<td id="quantity' + i + 1 + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
                            '<td id="description' + i + '">' + oDeviceProfile.description + '<\/td>' +
                            '<td id="totalamout' + i + '" class="centered">' + Math.round(oDeviceProfile.values.quantity * oDeviceProfile.values.amount).toFixed(2) + '<\/td>' +
                            '<td id="unit' + i + '">' + oDeviceProfile.values.unit + '<\/td>' +
                            '<td id="perUnit' + i + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
                            '<td style="display:none" id="UID' + i + '">' + oDeviceProfile.values.UID + '<\/td>' +
                            '<td id="tdedit' + nBofDeviceProfile + '"><input type="button" value="Edit" id="edit' + nBofDeviceProfile + '" onclick="editDeviceProfile(' + nBofDeviceProfile + ')"><\/td>' +
                            '<\/tr>'
                            );
                            $('#checkout').attr("disabled", false);
                            nBofDeviceProfile++;
                        };
                        currentAudit = id;
                        $.cookie('currentAudit', id);
                        $('#saveBasket').attr("disabled", false);
                        $('#clearBasket').attr("disabled", false);
                    } catch(err) {
                        self.replace('Failed to load from the database');
                        localStorage.clear();
                    }
                });
                self.unblock();
            });
        }
    });
};

// REMOVE SELECTED BASKET FROM DATABSE
function removeBasket(id) {
    var description = $('#basketDesc' + id).html();
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">This will remove  the audit:<br><br><b>"' + description + '"</b><br><br>from the database</p>' +
        '<p class="btn-wrap centered">' +
        '<input type="button" name="cancelRemove" value="Cancel" id="cancelRemove">&nbsp;' +
        '<input type="button" name="remove" value=" Delete "id="remove">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#cancelRemove').bind('click',
            function() {
                self.unblock();
            });
            $('#remove').bind('click',
            function() {
                $.get('php_scripts/calculator/removeBasket.php', {
                    id: id
                },
                function(echo) {
                    if (echo == 9) {
                        self.replace('<p style="color: red" class="centered"><b>Unexpected Error,</b><br>Failed to delete</p>');
                    } else if (echo == 1) {
                        self.replace('<p style="color: green" class="centered"><b>Audit deleted</p>');
                        $('#basket' + id).remove();
                        if (id == currentAudit) {
                            $.cookie('currentAudit', null);
                            currentAudit = null;
                        }
                    }
                });
                self.unblock(1000);
            });
        }
    });

};

// CLEAR CURRENT BASKET from table and cache
function clearBasket() {
    // found in the databse, would you like to delete it? // won't work, no uid...
    // clear aBasket, oDeviceProfile if exists
    // empty table
    $.msg({
        bgPath: 'images/',
        autoUnblock: false,
        clickUnblock: false,
        content: '<p class="centered">This will clear the entire selection,<br>continue?</p>' +
        '<p class="btn-wrap centered">' +
        '<input type="button" name="yesClear" value="Yes" id="yesClear">&nbsp;' +
        '<input type="button" name="noClear" value="No" id="noClear">' +
        '</p>',
        afterBlock: function() {
            // store 'this' for other scope to use
            var self = this;
            $('#yesClear').bind('click',
            function() {
                self.replace('Clearing...');
                localStorage.clear();
                $('#results_table tr:not(:first)').remove();
                currentAudit = null;
                $('#saveBasket').attr("disabled", true);
                $('#clearBasket').attr("disabled", true);
                $('#checkout').attr("disabled", true);
                $.cookie('currentAudit', null);
                currentAudit = null;
                self.unblock();
            });
            $('#noClear').bind('click',
            function() {
                self.replace('Canceled');
                self.unblock(500);
            });
        }
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
    $('#reset').attr("disabled", true);

    $("#data_src_details").fadeOut().html("To start using the calculator, select a category.<br>The data is is sourced from <a href='http://www.amee.com/'>AMEE</a> database.<br>The source and conversion factor from your selections will be displayed here.").fadeIn();
    $("#sProfileCategory").addOption(sProfileCategories, false).attr("disabled", false);
};