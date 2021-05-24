
  $(document).ready(function() {

    /*=====================
       Pre loader
     ==========================*/
    $('.loader-wrapper').fadeOut('slow', function() {
        $(this).remove();
    });
    
    /*=====================
      Tap on Top
     ==========================*/
    
    $('.tap-top').on('click', function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
      });