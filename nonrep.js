 function FirstNotRepeatedChar() 
{
  var output = document.getElementById("output");
  var str = document.getElementById("text").value;

 var arr = str.split('');
 var result = '';
 var count = 0; 
  for (var x = 0; x < arr.length; x++) {
   count = 0;
  for (var y = 0; y < arr.length; y++) {
  if (arr[x] === arr[y]) {
    count+= 1;
    }
   }

if (count < 2) {
  result = arr[x];
  alert(result);
  break;
  }
}
output.innerHTML = result;
}
