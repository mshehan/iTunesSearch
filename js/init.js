/*
/Matthew Shehan
//mshehan@my.smccd.edu
//CIS 
//114 OL
//init.js
//final
// 05-27-2016
 */
$(document).ready(function(){
    $("#search").click(function(e){
        iTunes.performSearch(); 
        e.preventDefault(); 
    });
});