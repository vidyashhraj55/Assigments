  window.onload = function(){

var button=document.getElementById("btn");


button.onclick = function(){
var text=document.getElementById("name").value;


for (var i = 0; i < text.length; i++) {
{
if(text.indexOf(text.charAt(i))==text.lastIndexOf(text.charAt(i))){
var k=text.charAt(i);
break;
}
   }
  
    
}

var output = document.getElementById("demo");
output.innerHTML=k;
}
}