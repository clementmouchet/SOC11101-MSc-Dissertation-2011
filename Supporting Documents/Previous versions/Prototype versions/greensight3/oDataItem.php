<?php

// Named after AMEE API, oDataItem perfoms the "DrillDown" using parameters transmitted via AJAX and returns options object in JSON
include 'config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

$productType = ($_GET['productType']) ? $_GET['productType'] : null;
$brand = ($_GET['brand']) ? $_GET['brand'] : null;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : null;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : null;
$category = ($_GET['category']) ? $_GET['category'] : null;

try {
	// BROWSE FOR TYPE IN A DESKTOP AND INTEGRATED COMPUTERS
	$sProfileCategory = "/home/appliances/energystar/office/computers/desktopsAndIntegrated";
	$aProfileCategory = array(
		"productType" => $productType,
		"brand" => $brand ,
		"modelName" => $modelName,
		"modelNumber" => $modelNumber,
		"category" => $category);

	$oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
		$sProfileCategory,
		$aProfileCategory
	);

	//print_r($oDataItem['options']);
	header('Content-type: application/json');
	echo json_encode($oDataItem['options']);


} catch (Exception $oException) {

	// An error occured
	echo "Error: " . $oException->getMessage() . "\n";

}
?>