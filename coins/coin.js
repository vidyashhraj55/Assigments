window.onload = function(){
  var button = document.getElementById("btn");
  var output = document.getElementById("demo");
  var amount=document.getElementById("amm");
  var ru10 = document.getElementById("ru10");
  var ru5 = document.getElementById("ru5");
  var ru2 = document.getElementById("ru2");
  var ru1 = document.getElementById("ru1");
  var count = 0;
  var left;
  var amountTocoins = function(amount, coins) 
    {
     if (amount === 0) 
      {
         return [];
       } 
     else
       {
         if (amount >= coins[0]) 
           {
            left = (amount - coins[0]);
            count++;
            return [coins[0]].concat( amountTocoins(left, coins) );
            } 
          else
            {
             coins.shift();
             return   (amount, coins);
            }
        }
        
    } 

  var calcCoins = function(amount, coins) {
    //console.log(amount, coins);
    var result = [];
    for(var i=0;i<coins.length;i++) {
      var rem = amount % coins[i];
      console.log(rem);
      var times = ((amount-rem)/coins[i]);    
      for(var j=0;j<times;j++) result.push(coins[i]);
      amount = rem;
      console.log(times);
     if((rem != 0) && (!coins[i+1]))
     {    
      for(var z=0;z<rem;z++) result.push(1);
     }
    }
    return result;
  }
  button.onclick = function() {
    var coins = [];
    if(ru10.checked) coins.push(10); 
    if(ru5.checked) coins.push(5);
    if(ru2.checked) coins.push(2);
    if(ru1.checked) coins.push(1);
    // coins.push(10);
    // coins.push(5);
    // coins.push(2);
    // coins.push(1);

    
    
    // var result = amountTocoins(amount.value, coins);
    

    if(coins.length == 0){
         var array_elements = calcCoins(amount.value, [1]) ;
     array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
              document.getElementById("demo1").innerHTML =  current + ' coins --> ' + cnt + ' times<br>';
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        document.getElementById("demo2").innerHTML =  current + ' coins --> ' + cnt + ' times<br>';
    }
    }
    else{
     var array_elements = calcCoins(amount.value, coins) ;
     array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
              document.getElementById("demo1").innerHTML =  current + ' coins--> ' + cnt + ' times<br>';
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        document.getElementById("demo2").innerHTML =  current + ' coins --> ' + cnt + ' times<br>';
    }

    }
}
}