function reverse()
{
var num=document.getElementById('rev');
var output=document.getElementById('print');
var n= parseInt(num.value);

var rev = 0, rem;
while (n>0)
{
rem = n % 10;
rev = rev * 10 + rem ;
n = Math.floor(n/10);
}
output.innerHTML="The given number is : " +num.value+ " <br/> The reversed number is : " +rev+ "\n";
}