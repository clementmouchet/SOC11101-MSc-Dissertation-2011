<?php
/**
* Named after AMEE API, oProfile creates a profile and returns the details in a JSON object
*/
include '../config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';
//echo("API and required lib loaded OK\n ");

// GET PARAMETERS
$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : NULL;
$productType = ($_GET['productType']) ? $_GET['productType'] : NULL;
$brand = ($_GET['brand']) ? $_GET['brand'] : NULL;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : NULL;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : NULL;
$category = ($_GET['category']) ? $_GET['category'] : NULL;
$quantity = intval($_GET['quantity']) ? $_GET['quantity'] : 1;
$device = ($_GET['device']) ? $_GET['device'] : NULL;
$rating = ($_GET['rating']) ? $_GET['rating'] : NULL;
$onStandby = ($_GET['onStandby']) ? $_GET['onStandby'] : NULL;
// "onStandby" doesn't seem to work, although AMEE is taking the parameter, the output is unchanged.
// http://discover.amee.com/categories/Computers_generic/data/Monitor/LCD/result/1/always?usage=default
// the script has been prepared for it though, so that as soon as it is functinal, a select will be enabled in the calclutator

/**
* getProfile returns JSON objects with the equipment description and it's footprint details.
*/
class getProfile extends Services_AMEE_ProfileItem
{
    function __construct() {}
	
	// GET COMPUTER PROFILE
	public function getComputerProfile($sProfileCategory, $productType, $brand, $modelName, $modelNumber, $category, $quantity, $device, $rating)
	{
		try {
			// Prepare the category for the new AMEE API Profile Item
			$sProfileCategory = $sProfileCategory;
			$aProfileCategory = array(
				"productType" => $productType,
				"brand" => $brand ,
				"modelName" => $modelName,
				"modelNumber" => $modelNumber,
				"category" => $category
			);

			// Create the AMEE API Profile
			$oProfile = new Services_AMEE_Profile();

			// Create the AMEE API Data Item
			$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

			$aRequiredProfileItemValues = array(
				'quantity' => $quantity
			);

			// Create the new AMEE API Profile Item
			$oProfileItem = new Services_AMEE_ProfileItem(array(
					$oProfile,
					$oDataItem,
					$aRequiredProfileItemValues
				));

			// Get the AMEE API Profile Item's info
			$aInfo = $oProfileItem->getInfo();

			// delete profile as it is not needed anymore
			$oProfile->delete();
			
			// Create a device object to be stored in the database
			$sDeviceDesc = $aProfileCategory['brand']." ".$aProfileCategory['modelName']." ".$aProfileCategory['modelNumber'];
			$aDeviceValues = array(
				"type" => $aProfileCategory['productType'],
				"quantity" => $aRequiredProfileItemValues['quantity'],
				"amount" => ($aInfo['amount']/$aRequiredProfileItemValues['quantity']), // the result is for a single unit, and rounded to 2 decimals
				"unit" => $aInfo['unit'],
				"perUnit" => $aInfo['perUnit'],
				"UID" => $oDataItem->getUID()
			);
			$oDeviceProfile = array(
				"description" => $sDeviceDesc,
				"values" => $aDeviceValues);
			
			// echo the device object in JSON
			header('Content-type: application/json');
			echo(json_encode($oDeviceProfile));

		} catch (Exception $oException) {
			// An error occured
			echo "\nError: " . $oException->getMessage() . "\n\n";
		}
	}
	
	
	// GET DEVICE PROFILE
    public function getDeviceProfile($sProfileCategory, $device, $rating, $quantity, $onStandby)
    {		
		try {
			// Prepare the category for the new AMEE API Profile Item
			$sProfileCategory = $sProfileCategory;
			$aProfileCategory = array(
				"device" => $device,
				"rating" => $rating
			);

			// Create the AMEE API Profile
			$oProfile = new Services_AMEE_Profile();

			// Create the AMEE API Data Item
			$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

			// Prepare the values for the new AMEE API Profile Item
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
			
			// delete profile as it is not needed anymore
			$oProfile->delete();
			
			// Create a device object to be stored in the database
			$sDeviceDesc = $aProfileCategory['device']. " ". $aProfileCategory['rating'];
			$aDeviceValues = array(
				"type" => 'Computing equipment',
				"quantity" => $aRequiredProfileItemValues['numberOwned'],
				"amount" => ($aInfo['amount']/$aRequiredProfileItemValues['numberOwned']), // the result is for a single unit, and rounded to 2 decimals
				"unit" => $aInfo['unit'],
				"perUnit" => $aInfo['perUnit'],
				"UID" => $oDataItem->getUID()
			);
			$oDeviceProfile = array(
				"description" => $sDeviceDesc,
				"values" => $aDeviceValues);
			
			// echo the device object in JSON
			header('Content-type: application/json');
			echo(json_encode($oDeviceProfile));

		} catch (Exception $oException) {
			// An error occured
			echo "\nError: " . $oException->getMessage() . "\n";
		}
    }
}
// select the right function depending on the equipment
if ($device == '') { // if it is a computer
	getProfile::getComputerProfile($sProfileCategory, $productType, $brand, $modelName, $modelNumber, $category, $quantity, $device, $rating);
} else { // if it is a device
	getProfile::getDeviceProfile($sProfileCategory, $device, $rating, $quantity, $onStandby);
}
?>