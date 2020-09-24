<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['name']) && empty($_POST['email']) && empty($_POST['count'])) die();

if ($_POST)
	{

	// set response code - 200 OK

	http_response_code(200);
    $personname = $_POST['name'];
    $personsubject = "Rezervácia muzikál Vražda podľa obete";
	$personemail = $_POST['email'];
    $automailer = "automailer@muzikalvrazdapodlaobete.sk";
    $reservationemail = "rezervacie@muzikalvrazdapodlaobete.sk";

	// data

    $msg = $_POST['number'] . $_POST['message'];
    $message = "";

	// Headers

	$headers1 = "MIME-Version: 1.0\r\n";
	$headers1.= "Content-type: text/html; charset=UTF-8\r\n";
    $headers1.= "From: <" . $automailer . ">";
    mail($personemail, $subject, $message, $headers);
    mail($reservationemail, $subject, $msg, $headers);

	// echo json_encode( $_POST );

	echojson_encode(array(
		"sent" => true
	));
	}
  else
	{

	// tell the user about error

	echojson_encode(["sent" => false, "message" => "Something went wrong"]);
	}

?>