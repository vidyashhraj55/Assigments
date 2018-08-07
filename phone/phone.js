window.onload= function(){
	 var output = document.getElementById("demo");
	var input=document.getElementById("letter");
var button=document.getElementById("btn");
function convertPhoneLetters(input) {

var inputlength = input.length;
input = input.toLowerCase();
var phonenumber = "";
for (i = 0; i < inputlength; i++) {
var character = input.charAt(i);


switch(character){
case '0': phonenumber+="0";break;
case '1': phonenumber+="1";break;
case '2': phonenumber+="2";break;
case '3': phonenumber+="3";break;
case '4': phonenumber+="4";break;
case '5': phonenumber+="5";break;
case '6': phonenumber+="6";break;
case '7': phonenumber+="7";break;
case '8': phonenumber+="8";break;
case '9': phonenumber+="9";break;

case 'a': case 'b': case 'c': phonenumber+="2";break;
case 'd': case 'e': case 'f': phonenumber+="3";break;
case 'g': case 'h': case 'i': phonenumber+="4";break;
case 'j': case 'k': case 'l': phonenumber+="5";break;
case 'm': case 'n': case 'o': phonenumber+="6";break;
case 'p': case 'q': case 'r': case 's': phonenumber+="7";break;
case 't': case 'u': case 'v': phonenumber+="8";break;
case 'w': case 'x': case 'y': case 'z': phonenumber+="9";break;

default: phonenumber+=character;

   }
}
output.innerHTML = phonenumber;

}
button.onclick= function(){

	convertPhoneLetters(input.value);
	

	
}
 }