(function (global) {
    System.config({
        defaultJSExtensions: true, // So the *.js extension is automatically used for references that don't specify an extension
        paths: {
            'lib:': '../angular-compare-validator/node_modules/' // It's pointing to the node_modules folder of the main project since it should use the same dependencies
        },
        map: {
            // Reference to the main project.
            'angular-compare-validator': '../angular-compare-validator/dist',
            // Angular 2 bundles
            '@angular/core': 'lib:@angular/core/bundles/core.umd.js',
            '@angular/core/testing': 'lib:@angular/core/bundles/core-testing.umd.js',
            '@angular/forms': 'lib:@angular/forms/bundles/forms.umd.js',
            // Other libraries
            'rxjs': 'lib:rxjs'
        },
        packages: {
            rxjs: {
                main: './Rx.js' // That's the main entry file for rxjs
            }
        }
    });
})(this);
