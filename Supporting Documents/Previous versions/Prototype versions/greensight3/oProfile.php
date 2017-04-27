<?php
// Named after AMEE API, oProfile creates a profile and returns the details in a JSON object

include 'config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

$productType = ($_GET['productType']) ? $_GET['productType'] : null;
$brand = ($_GET['brand']) ? $_GET['brand'] : null;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : null;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : null;
$category = ($_GET['category']) ? $_GET['category'] : null;
$quantity = intval($_GET['quantity']) ? $_GET['quantity'] : 1;

// BROWSE FOR TYPE IN A DESKTOP AND INTEGRATED COMPUTERS
$sProfileCategory = "/home/appliances/energystar/office/computers/desktopsAndIntegrated";
$aProfileCategory = array(
	"productType" => $productType,
	"brand" => $brand ,
	"modelName" => $modelName,
	"modelNumber" => $modelNumber,
	"category" => $category);

try {

	$oProfile = new Services_AMEE_Profile();
	$sProfile = $oProfile->getUID();

	// Create the AMEE API Data Item
	$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

	// Print details
	// $aOptions = $oDataItem->getDrillDownOptions();
	//    print_r($aOptions);
	//
	//    $sPath = $oDataItem->getPath();
	//    print_r($sPath);

	// Prepare the values for the new AMEE API Profile Item
	// The following values MUST be provided for this usage
	$aRequiredProfileItemValues = array(
		'quantity' => $quantity
	);

	// Create the new AMEE API Profile Item
	$oProfileItem = new Services_AMEE_ProfileItem(array(
			$oProfile,
			$oDataItem,
			$aRequiredProfileItemValues
		));

	// Display that the AMEE API Profile Item was created successfully
	echo "\n\nCreated profile item succefully:  \n\n<br>";

	// Get the AMEE API Profile Item's info
	$aInfo = $oProfileItem->getInfo();

	// Display the total GHG emissions for this AMEE API Profile Item
	echo ($aRequiredProfileItemValues['quantity']." ". $aProfileCategory['modelName']." = average annual CO2 ({$aInfo['unit']}/{$aInfo['unit']}): {$aInfo['amount']}\n\n");

	$oProfile->delete();
	echo "<br> Deleted profile item successfully\n";


} catch (Exception $oException) {

	// An error occured
	echo "Error: " . $oException->getMessage() . "\n\n <br>";
	print_r($aProfileCategory);
}
?>