
requirejs.config({
    paths: {
        "jquery": "jquery-2.2.1.min",
        'tmpl': 'tmpl'
    },
    /*
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
    */
});

require(
    [
        'model',
        'view',
        'controller',
        'jquery',
        'tmpl',

    ],

    function(Model,  View, Controller, $, tmpl) {

      $(function() {
          var firstToDoList = ['learn js', 'learn html', 'make coffe'];
          var modelInst = new Model(firstToDoList);
          var viewInst = new View(modelInst);
          var controllerInst = new Controller(modelInst, viewInst);
      })
    }
);