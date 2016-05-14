var app = angular.module('Lapp');
app.controller('userController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://resplendent-fire-660.firebaseio.com/");
    var authData = ref.getAuth();
    
    $scope.reset = function()
    {
        $scope.serviceType = "";
        $scope.costPerUnit = 0;
        $scope.babysitting_numberOfhours = 0;
        $scope.grocery_numberOfhours = 0;
        
        $scope.$apply();
    }

    $scope.changeGrocery = function() 
    {
        $scope.grocery_numberOfhours = this.grocery_numberOfhours;
       
    };

    $scope.changeBabySitting = function() 
    {
        $scope.babysitting_numberOfhours = this.babysitting_numberOfhours;
       
    };

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests.orderByChild("user").equalTo(authData.uid));

    $scope.newServiceRequest = function(type, size, instructions, cost)
    {
        console.log("type: " + type);
        console.log("cost: " + cost);
        console.log("size: " + size);
        //save the new service request to firebase
        service_requests.push({user: authData.uid, name: type, createdAt:'', payment: cost, provider: "", completed:"pending"});
    }

    $scope.babySittingButtonClick = function()
    {
        this.serviceType = "babysitting";
        this.costPerUnit = 10;
        this.babysitting_numberOfhours = 0;
       
    }

    $scope.GroceryButtonOnClick = function()
    {
        this.serviceType = "grocery";
        this.costPerUnit = 8;
        this.grocery_numberOfhours = 0;
       
    }
});