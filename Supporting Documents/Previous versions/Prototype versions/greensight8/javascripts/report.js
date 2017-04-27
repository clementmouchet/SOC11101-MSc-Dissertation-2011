// THIS SCRIPT MAKES USE OF JQPLOT : http://www.jqplot.com/ A JQUERY PLOTTING AND CHARTING PLUGIN
var aAllEquipment = [];
var ComputingEquipment = 0;
var Workstation = 0;
var Desktop = 0;
var Intergated = 0;
var Notebook = 0;
var totalFootprint = 0;

// ACTIONS ON LOAD
$(document).ready(function() {
    $(window).load(function() {
        // initiate the calculator, operate changes as soon as the DOM is ready.
        // see resetCalc() for details
        loadBasket();
		allEquipment();
    });
});
// LOAD THE TABLE DATA AND BUILD THE CHART
function loadBasket() {
    // LOAD FROM CACHE
    var oBasket = JSON.parse(localStorage.getItem('oBasket'));
    // LOOP THROUGH THE SELECTION
    for (var i = 0; i < oBasket['aDeviceProfile'].length; i++) {
        var oDeviceProfile = oBasket['aDeviceProfile'][i];

        // PREPARE STATISTICS
        var footprint = Math.round(oDeviceProfile.values.quantity * oDeviceProfile.values.amount).toFixed(2);
        totalFootprint = (totalFootprint + parseInt(footprint));
        // put footprints in arrays for the chart
        // for all equipment
        aAllEquipment.push(parseInt(footprint));
        // by category
        switch (oDeviceProfile.values.type) {
        case 'Computing equipment':
            ComputingEquipment = ComputingEquipment + (parseInt(footprint));
            break;
        case 'Workstation':
            Workstation = Workstation + (parseInt(footprint));
            break;
        case 'Desktop':
            Desktop = Desktop + (parseInt(footprint));
            break;
        case 'Integrated Computers':
            Intergated = Intergated + (parseInt(footprint));
            break;
        case 'Notebook/Tablet':
            Notebook = Notebook + (parseInt(footprint));
            break;
        };

        // APPEND TO THE TABLE
        $("#results_table").append(
        '<tr id="row' + i + '">' +
        '<td id="quantity' + i + '" class="centered">' + oDeviceProfile.values.quantity + '<\/td>' +
        '<td id="description' + i + '">' + oDeviceProfile.description + '<\/td>' +
        '<td id="totalamout' + i + '" class="centered">' + Math.round(oDeviceProfile.values.quantity * oDeviceProfile.values.amount).toFixed(2) + '<\/td>' +
        '<td id="unit' + i + '">' + oDeviceProfile.values.unit + '<\/td>' +
        '<td id="perUnit' + i + '">' + oDeviceProfile.values.perUnit + '<\/td>' +
        '<td style="display:none" id="UID' + i + '">' + oDeviceProfile.values.UID + '<\/td>' +
        '<td id="avg' + i + '"class="centered">0%<\/td>' +
        '<\/tr>'
        );
        // APPLY STYLE TO THE TABLE
        $(".stripped tr").mouseover(function() {
            $(this).addClass("over");
        }).mouseout(function() {
            $(this).removeClass("over");
        });
        $(".stripped tr:even").addClass("alt");
    };
    // TOTAL
    $('#ptotal').html("The total carbon footprint for this selection is " + Math.round(totalFootprint) + " Kgs of CO2 per year");
}

function allEquipment() {
    // CLEAN UP
    $('#chartCategory').empty().height(0);
    $('#btn_all_equipment').attr("disabled", true);
    $('#btn_by_category').attr("disabled", false);
    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartAll', [aAllEquipment], {
            stackSeries: false,
            captureRightClick: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 10,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: true
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: false,
                        showGridline: false,
                        show: false,
                    },
                    showTicks: false,
                    showTickMarks: false
                },
                yaxis: {
                    padMin: 0
                }
            },
            legend: {
                show: false
            }
        });
        // Bind a listener to the "jqplotDataClick" event.
        $('#chartAll').bind('jqplotDataClick',
        function(ev, seriesIndex, pointIndex, data) {
            $('#middle_right').fadeIn('');
            $('#results').html("The carbon footprint of " + $('#quantity' + pointIndex).html() + " " + $('#description' + pointIndex).html() + " is " + $('#totalamout' + pointIndex).html() + " " + $('#unit' + pointIndex).html() + " of CO2 per " + $('#perUnit' + pointIndex).html());
            $('.over').removeClass("over");
            $('#row' + pointIndex).addClass("over");
        }
        );
    });
}

function byCategory() {
    // CLEAN UP
    $('#chartAll').empty().height(0);
	$('#middle_right').fadeOut('');
    $('#btn_by_category').attr("disabled", true);
    $('#btn_all_equipment').attr("disabled", false);
    var series = [];
    var seriesLegend = [];
    if (Workstation != 0) {
        var aWorkstation = [Workstation];
        series.push(aWorkstation);
        seriesLegend.push({
            label: 'Workstations'
        });
    };
    if (Desktop != 0) {
        var aDesktop = [Desktop];
        series.push(aDesktop);
        seriesLegend.push({
            label: 'Desktops'
        });
    };
    if (Intergated != 0) {
        var aIntergated = [Intergated];
        series.push(aIntergated);
        seriesLegend.push({
            label: 'Intergated computers'
        });
    };
    if (Notebook != 0) {
        var aNotebook = [Notebook];
        series.push(aNotebook);
        seriesLegend.push({
            label: 'Notebook & Tablets'
        });
    };
    if (ComputingEquipment != 0) {
        var aComputingEquipment = [ComputingEquipment];
        series.push(aComputingEquipment);
        seriesLegend.push({
            label: 'Computing Equipment'
        });
    };

    // BUILT CHART USING jqplot : http://www.jqplot.com/
    $(document).ready(function() {
        $.jqplot('chartCategory', series, {
            stackSeries: false,
            captureRightClick: true,
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    barMargin: 30,
                    highlightMouseDown: true
                },
                pointLabels: {
                    show: true
                }
            },
            series: seriesLegend,
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickOptions: {
                        showMark: false,
                        showGridline: false,
                        show: false,
                    },
                    showTicks: false,
                    showTickMarks: false
                },
                yaxis: {
                    padMin: 0
                }
            },
            legend: {
                show: true,
                placement: 'outside'
            },
        });
    });
}

