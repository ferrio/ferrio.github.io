$(document).ready(function(){

  setInterval(function() {
    var dateFuture = new Date('2022-03-05 00:00:00');
    var dateNow = new Date();
    var remainder = 0;
    var milliseconds = dateFuture - dateNow;
    var days = Math.floor(milliseconds/(24*60*60*1000));
    remainder = milliseconds%(24*60*60*1000);
    var hours = Math.floor(remainder/(60*60*1000));
    remainder = remainder%(60*60*1000);
    var minutes = Math.floor(remainder/(60*1000));
    remainder = remainder%(60*1000);
    var seconds = Math.floor(remainder/1000);


    $('#countdown_time').html(days+' Days, '+hours+' Hours, '+minutes+' Minutes, '+seconds+' Seconds');
  }, 1000);
});
