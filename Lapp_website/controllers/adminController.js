var app = angular.module('Lapp');
app.controller('adminController', function($scope, $firebaseArray) 
{
    var ref = new Firebase("https://resplendent-fire-660.firebaseio.com/");
    var authData = ref.getAuth();

    //get the data for our pending service requests
    var service_requests = ref.child("service_requests");
    $scope.service_request_data = $firebaseArray(service_requests);

    $scope.service_request_data.$loaded().then(function(data) 
    {
        $scope.myAccountTotal = 0;
        angular.forEach(data, function(obj, key) 
        {
            if(obj.completed == true)
            {
                $scope.myAccountTotal += (obj.cost/100*0.2);
            }
        });
   });

    $scope.payoutProvider = function(obj) 
    {
        
    };
});