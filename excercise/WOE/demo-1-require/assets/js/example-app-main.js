requirejs.config({
    baseUrl: "assets/js",
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min',  //Laden vom CDN, ACHTUNG: Dateiendung .js weglassen
            'lib/jquery-1.12.2.min' //FALLBACK
        ],
        //weitere Libraries
        underscore: 'lib/underscore-min',
        modernizr: 'lib/modernizr-custom-3.2.0'
    }
});

require(['jquery'], function ($) {  //jquery-Modul hereinladen, gibt Referenz-Objekt $ zurück
    $('#my-app').append('<h2>jQuery Loaded</h2>'); // Code wird bei nach Einbinden der Dependencies ausgeführt
});
