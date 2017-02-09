(function(){

angular.module('FSPApp').controller('FSPController', ['$scope', '$window', function($scope, $window){

    // Controller properties
    // Scope variables
    // action: {"init"}
    $scope.action = "init";   
        
}]);

angular.module('FSPApp').factory('PieceFactory', function() {
    return {
        symbol : "X",
        image : "images/cross.png"
    }
});

angular.module('FSPApp').service('PieceService', function() {
    return function(symbol, image) {
        this.symbol= symbol;
        this.image= image;
    };
});

angular.module('FSPApp').provider('Piece', function() {
    var defaultSymbol = "←";
    var defaultImage = "images/arrow-left.png";
    
    this.$get = function() {
        return function() {
            this.symbol = defaultSymbol;
            this.image = defaultImage;
        }
    };
    
    this.setSymbolImage = function(symbol, image) {
        defaultSymbol = symbol;
        defaultImage = image;
    }      

});

angular.module('FSPApp').provider('AnotherPiece', function() {
    
    this.$get = function() {
        return function(symbol, image) {
            if (symbol && image) {
                this.symbol = symbol;
                this.image = image;    
            } else {
                this.symbol = "X";
                this.image = "images/cross.png";
            }
            
        }
    };  

});

// Here we configure the Provider for the whole app
// If you comment this 3 lines the PieceProvicer will return the default symbol and image
angular.module('FSPApp').config(function(PieceProvider) {
    PieceProvider.setSymbolImage("O", "images/cercle.png");
})

angular.module('FSPApp').controller('MyPieceController', function($scope, PieceFactory, PieceService, Piece, AnotherPiece) {
    $scope.factory = PieceFactory; 
    // We must pass parameters to the Service, otherwise symbol and image will be undefined.
    // If we do not pass parameters to the service and with the current implementation it
    // will return --> Object { symbol: undefined, image: undefined }
    $scope.service = new PieceService("$", "images/dollar.png");
    // The Provider has a default configuration --> Object { symbol: "X", image: "images/cross.png" }
    // But we can configure the provider for our app, with the .config directive in the module.
    // In this case our Piece is configured for the whole app as --> Object { symbol: "O", image: "images/cercle.png" }
    $scope.provider = new Piece();
    // In this case we use another provider implementation
    $scope.anotherProvider = new AnotherPiece();
    
    console.log("factory: "+JSON.stringify($scope.factory));
    console.log("service: "+JSON.stringify($scope.service));
    console.log("provider: "+JSON.stringify($scope.provider));
    console.log("anotherProvider: "+JSON.stringify($scope.anotherProvider));
    //console.log($scope.anotherProvider);
})  

angular.module('FSPApp').controller('YourPieceController', function($scope, PieceFactory, PieceService, Piece, AnotherPiece) {
    $scope.factory = PieceFactory; 
    $scope.service = new PieceService("$", "images/dollar.png");
    $scope.provider = new Piece();
    $scope.anotherProvider = new AnotherPiece("@", "images/at.png");

    console.log("factory: "+JSON.stringify($scope.factory));
    console.log("service: "+JSON.stringify($scope.service));
    console.log("provider: "+JSON.stringify($scope.provider));
    console.log("anotherProvider: "+JSON.stringify($scope.anotherProvider));
    //console.log($scope.anotherProvider);
    
})  

/* angular.module('EventsApp').directive("addFilmsViewForm", function () {
  return {
    restrict: 'E', // type of directive
    templateUrl:"view/templates/add-films-view-form.html",
    controller: function() {
      // When the document is ready execute this code
    },
    controllerAs: 'addFilmsViewFormCtrl' // This is the alias
  };
}); */

})();
