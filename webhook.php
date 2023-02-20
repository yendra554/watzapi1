<?php

$data = file_get_contents("php://input");
$event = json_decode($data, true);

if(isset($event)){
	$file = 'log.txt';
  // echo "<script>console.log('Debug Objects: ' );</script>";
// echo "<script>console.log('vikas')</script>"  
	$data =json_encode($event)."\n"; 
// {"key":{"remoteJid":"919354869926:1@s.whatsapp.net","fromMe":false,"id":"3505494866A2D2BAAF217AC01CDA65D8"},"messageTimestamp":1650873119,"pushName":"Guddu","message":{"conversation":"Hi","messageContextInfo":{"deviceListMetadata":{"recipientKeyHash":"KsehKTlyt6+Rew==","recipientTimestamp":"1650870005"},"deviceListMetadataVersion":2}},"instance_key":"63B3C892321DE","jid":"919354869926:1@s.whatsapp.net","messageType":"conversation","text":{"key":{"remoteJid":"919810947410@s.whatsapp.net","fromMe":false,"id":"3505494866A2D2BAAF217AC01CDA65D8"},"messageTimestamp":1650873119,"pushName":"Guddu","message":{"conversation":"Hi","messageContextInfo":{"deviceListMetadata":{"recipientKeyHash":"KsehKTlyt6+Rew==","recipientTimestamp":"1650870005"},"deviceListMetadataVersion":2}}}}

  $pData = array(
      
        // 'SourceRef' => 0,
        // 'uComment' => 'gdf,mgnd', 
        // 'sWalletId' => 3816, 
        // 'sWalletId' => $_REQUEST["ORDER_ID"], 
        // 'uAuto_Manual'=> 0,
        // 'uDealerId' =>1001,
        // 'uSource' => 3,
        // 'uTransType' => 0

        'name' =>$_REQUEST["remoteJid"],
        'imgmsg' => "imgmsg",
        'msg' => "testing",
        'key' => "fb868c1cda731b25e15fc4fa28cb3385",
        'number' => "917428322239"

      );

      $opts1 = array('http' =>
          array(
              'method'  => 'POST',
              'header'  => 'Content-type: application/json',
              'content' => json_encode($pData)
          )
      ); 
 
      $context1  = stream_context_create($opts1);
      $result1 = null;
      $result1 = file_get_contents('https://wtzapimarket.herokuapp.com/api/getAllList', false, $context1);

	file_put_contents($file, $data);

}

?>
