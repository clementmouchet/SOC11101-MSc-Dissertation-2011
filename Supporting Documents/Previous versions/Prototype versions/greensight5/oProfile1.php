<?php
// Named after AMEE API, oProfile creates a profile and returns the details in a JSON object

include 'config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : "/home/appliances/computers/generic";
$productType = ($_GET['productType']) ? $_GET['productType'] : NULL;
$brand = ($_GET['brand']) ? $_GET['brand'] : null;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : NULL;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : NULL;
$category = ($_GET['category']) ? $_GET['category'] : NULL;
$quantity = intval($_GET['quantity']) ? $_GET['quantity'] : 1;
$device = ($_GET['device']) ? $_GET['device'] : NULL;
$rating = ($_GET['rating']) ? $_GET['rating'] : NULL;
$onStandby = ($_GET['onStandby']) ? $_GET['onStandby'] : NULL;

// if it is a computer
if ($device == 'couin') {
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
		$sProfile = $oProfile->getUID();

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
		// echo("\n\n\n aInfo:\n\n");
		//     print_r($aInfo);
		$aData = $oProfileItem->getDataItem();
		 echo("\n\n\n aData:\n\n");
	     print_r($aData);

		// Display the total GHG emissions for this AMEE API Profile Item
		echo ($aRequiredProfileItemValues['quantity']." ". $aProfileCategory['modelName']." = average annual CO2 ({$aInfo['unit']}/{$aInfo['unit']}): {$aInfo['amount']}\n\n");

	    // delete profile as it is not needed anymore
		$oProfile->delete();
		//echo "<br> Deleted profile item successfully\n";


	} catch (Exception $oException) {

		// An error occured
		echo "\nError: " . $oException->getMessage() . "\n\n <br>";
		print_r($aProfileCategory);
	}
} else { // if it is a device
	try {
	    // Prepare the category for the new AMEE API Profile Item
		$aProfileCategory = array(
		    "device" => "PSU",
		    "rating" => $rating
		);
		
	    // Create the AMEE API Profile
	    $oProfile = new Services_AMEE_Profile();
		$sProfile = $oProfile->getUID();
	
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
	    $aData = $oProfileItem->getDataItem();
		 echo("\n\n\n aData:\n\n");
	     print_r($oProfileItem);
	     
	     	    
	    // Display the total GHG emissions for this AMEE API Profile Item
	    echo ($aRequiredProfileItemValues['quantity']." ". $aProfileCategory['device']." - CO2 ({$aInfo['unit']}/{$aInfo['unit']}): {$aInfo['amount']}\n");

	} catch (Exception $oException) {

	    // An error occured
	    echo "\nError: " . $oException->getMessage() . "\n";

	}
}
?>