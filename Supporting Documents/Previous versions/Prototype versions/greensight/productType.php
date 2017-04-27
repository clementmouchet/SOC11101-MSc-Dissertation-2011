<?php
include 'config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

try {
	
	
	// BROWSE FOR TYPE IN A DESKTOP AND INTEGRATED COMPUTERS
	$sProfileCategory = "/home/appliances/energystar/office/computers/desktopsAndIntegrated";

    $oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
        $sProfileCategory,
        array()
    );			

            //print_r($oDataItem['options']);
			header('Content-type: application/json');
    		echo json_encode($oDataItem['options']);


		} catch (Exception $oException) {

		    // An error occured
		    echo "Error: " . $oException->getMessage() . "\n";

		}


?>