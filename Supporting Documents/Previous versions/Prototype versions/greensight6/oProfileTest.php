<?php
// Named after AMEE API, oProfile creates a profile and returns the details in a JSON object
include 'config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';
require_once "HTTP/Request.php";
echo("API and required lib loaded OK\n ");

$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : "/home/appliances/computers/generic";
$productType = ($_GET['productType']) ? $_GET['productType'] : NULL;
$brand = ($_GET['brand']) ? $_GET['brand'] : null;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : NULL;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : NULL;
$category = ($_GET['category']) ? $_GET['category'] : NULL;
$quantity = intval($_GET['quantity']) ? $_GET['quantity'] : 1;
$device = ($_GET['device']) ? $_GET['device'] : "PSU";
$rating = ($_GET['rating']) ? $_GET['rating'] : NULL;
$onStandby = ($_GET['onStandby']) ? $_GET['onStandby'] : NULL;

// if it is a computer
if ($device == 'couincouin') {} // removed for testing 
else { // if it is a device
	try {
		// Prepare the category for the new AMEE API Profile Item
		$aProfileCategory = array(
			"device" => $device,
			"rating" => $rating
		);

		// Create the AMEE API Profile
		$oProfile = new Services_AMEE_Profile();
		$sProfile = $oProfile->getUID();

		// Prepare the values for the new AMEE API Profile Items
		// Create the AMEE API Data Item
		$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);
		// The following values MUST be provided for this usage
		$aRequiredProfileItemValues = array(
			'numberOwned' => $quantity,
			'onStandby' => $onStandby
		);
		// Create the new AMEE API Profile Item
		$oProfileItem = new Services_AMEE_ProfileItem(array(
				$oProfile,
				$oDataItem,
				$aRequiredProfileItemValues
			));

		// Get the AMEE API Profile Item's info
		$aInfo = $oProfileItem->getInfo();
		echo("\nThe Array of Profile Item Information attached to this profile is:\n");
		print_r($aInfo);
		echo("\nCO2 details:\n");
		print_r($aInfo['amounts']['CO2']);
		$aData = $oProfileItem->getDataItem();
		echo("\n\nThe DataItem Object attached to this profile is:\n");
		print_r($aData);

		$sPath = 'http://stage.amee.com/data'.$oDataItem->getPath().'/'.$oDataItem->getUID();
		echo("\nThe full path of the device is:\n");
		print_r($sPath."\n");

		// Display the total GHG emissions for this AMEE API Profile Item
		echo ("\n".$aRequiredProfileItemValues['numberOwned']." ". $aProfileCategory['device']." = {$aInfo['amount']} {$aInfo['unit']} CO2/{$aInfo['perUnit']} (average value)\n");

	} catch (Exception $oException) {
		// An error occured
		echo "\nError: " . $oException->getMessage() . "\n";
	}
}
?>