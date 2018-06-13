define(['jquery'], function ($) {   //DEFINE CALL ->  this module is dependent on jQuery
                                    // parameters of callback-function gives access to loaded modules
    $('#my-app').append('<h2>jQuery Loaded</h2>');      //code is called after incuding

     //object returned when including module-1
    return {
        tellSomething: function () {
            $('#my-app').append('<p>I should tell you something…</p>');
            console.log("I should tell you something…");
        }
    };
});