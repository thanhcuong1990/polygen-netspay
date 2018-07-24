console.log('loaded');

var date = new Date().toISOString();
date = date.replace(/\-/g, '');
date = date.replace(/\T/, ' ');
// console.log(date.slice(0, -1));
//eNETS
var key_id = '154eb31c-0f72-45bb-9249-84a1036fd1ca';
var secret_key = '38a4b473-0295-439d-92e1-ad26a8c60279';

//eNETS QR
// var key_id = 'b027dacd-1c13-4916-8b93-38fae6be2f80';
// var secret_key = '21296dd3-5bf6-4dfc-b8a2-03fbcc213b7b';

//Polygen App
// var key_id = 'b523e703-4087-422a-91f9-1466c90cded7';
// var secret_key = '64bcaebd-b5d1-45bf-afd0-f7edbfae5095';
// var UMID = 'UMID_877772003';
// var Mid = '11137066800';
// var Tid = '37066801';
// var instituition_code = '20000000001';

//NETS API web portal
// var secret_key = "f49015ce-84fd-4e9a-a24e-8aeb30d870d6"


var txnReq = {
    "ss": "1",
    "msg": {
        "netsMid": '11137066800',
        "tid": '37066801',
        "clientType": "W",
        "submissionMode": "B",
        "txnAmount": "2000",
        "currencyCode": "SGD",
        "merchantTxnRef": date.slice(0, -2),
        "merchantTxnDtm": date.slice(0, -1),
        "merchantTimeZone": "+8:00",
        "paymentType": "SALE",
        "paymentMode": "QR",
        "netsMidIndicator": "U",

        "b2sTxnEndURL":"https://sit2.enets.sg/MerchantApp/sim/b2sTxnEndURL.jsp",
        "b2sTxnEndURLParam":"",
        "s2sTxnEndURL":"https://sit2.enets.sg/MerchantApp/rest/s2sTxnEnd",
        "s2sTxnEndURLParam":""
    }
}

var concatenated_string = JSON.stringify(txnReq) + secret_key;
var byte_array = convert_to_bytes(concatenated_string);
var hashed_value = sha256.digest(byte_array);
var hmac = window.btoa(window.btoa(hashed_value));
console.log(hmac);

sendPayLoad(JSON.stringify(txnReq), hmac, key_id);

function convert_to_bytes(string) {
    var data = [];
    for (var i = 0; i < string.length; i++)
        data.push(string.charCodeAt(i));
    return data;
}