#!/bin/sh
echo ----------------------------------------------------- 
echo '\tEvaluation of Arithmetic expression' 
echo ----------------------------------------------------- 
echo Enter the a value 
read a 
echo  Enter the b value 
read b 
echo 1.Addition 
echo 2.Subtraction 
echo 3.Multiplication 
echo 4.Division 
echo 5.Modules 
echo Enter your choice 
read choice 
case $choice in 
        1)echo Addition       : $(expr $a + $b);; 
        2)echo Subtraction   : $(expr $a - $b);; 
        3)echo Multiplication : $(expr $a \* $b);; 
        4)echo Division      :
                                $(expr $a / $b);;
                            
        5)echo Modules        : $(expr $a % $b);; 
        *)echo This is not a choice 
esac 
        
