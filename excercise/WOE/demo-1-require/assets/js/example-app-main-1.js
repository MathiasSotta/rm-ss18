requirejs.config({
    baseUrl: "assets/js",
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min',  //Laden vom CDN, ACHTUNG: Dateiendung .js weglassen
            'lib/jquery-1.12.2.min' //FALLBACK
        ],
        //weitere Libraries aus dem lib folder laden
        underscore: 'lib/underscore-min'    ,
        modernizr: 'lib/modernizr-custom-3.2.0'
    }
});

require(['example-app/module-1'], function (main) {
    main.tellSomething();
});

