<?php
/**
* 
*/
class Greensight extends CI_Controller
{
    
    function index()
    {
        echo "It works !";
        //$this->load->view();
    }
    
    function demo()
    {   
        $this->load->view('demo');
    }
}

?>