MyApp
  .controller('MainCtrl', ['$scope', '$timeout', '$alert', '$http','Show', function($scope, $timeout, $alert, $http, Show) {
    $scope.map = { center: { latitude: 52.502616, longitude: 13.412187 }, zoom: 6 };
    $scope.marker = { id: 0, coords: {latitude: 52.502616, longitude: 13.412187}};
    $scope.dataList = [];
    $scope.measurement = "Temperature";
    $scope.magnitude = "degree Celcius";
    $scope.botStatus = "Marker shows the current position of the drone";
    $scope.shown = false;


    var rangeTemp = []
    var rangeLight = []
    var rangeWave = []


    var req = {
     method: 'POST',
     url: 'https://dashboard.us.enableiot.com/v1/api/accounts/e60b75da-fb41-4607-b7f5-42f913ebba5a/data/search',
     headers: {
       'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJjZjliODY1Zi1mMzk3LTQ0YTYtOGE3MC1iMjRmMTk1MTBhMDciLCJpc3MiOiJodHRwOi8vZW5hYmxlaW90LmNvbSIsInN1YiI6IjU1M2M0YjBjMTQ1Y2NiNjIyOTdlZmJkNyIsImV4cCI6IjIwMTUtMDQtMjlUMTA6Mjk6NTQuOTk4WiJ9.figVqSTwlKGJP6SBCRdIlQtwQeuLi_dHv1p4hr616PY-gEoONn57aJf0_R34EnYtIZxeGqGoaMYNffWXFYQ41ZwsqiFHnEq3BU094c3-xHsD3-2ivbKbIZNLGnyOT1lD-DbryXX2Y7LilyRog3ErgQa_cqd4oRise5-AmDshYgXmIhGqCjFxiKcB2-D92Sh6Jr_Jv7mq_558_f7WBOAtavSmnjwdedS-NZRb26iXDnVVyOvVzbX92JGPJ4fd3feo3TUBWwJeplQEbxUp7H_VrroG711mCXwRb7gT0pfRe1M-rCeyg6QAropixVHHiZoj7SnOi5zpgRpQ3_Z9n2L7mQ'
     },
     data: {
        "from": -86400,
          "targetFilter": {
            "criteria": {
              "deviceId": {"operator" : "eq", "value":"project-intel"}
            }
          },
          "metrics": [
            {
              "id": "d8fefee9-f681-4620-8055-fcf0af943e92",
              "op": "none"
            },
            {
              "id": "50e3124a-31d0-4c88-9aa5-6ce5c0b47be8",
              "op": "none"
            },
            {
              "id": "62843e67-6049-4078-87cb-e6e55788a984",
              "op": "none"
            }
          ]
      }
    }

    
    $http(req).
        success(function(data) {
          //   x=data.series[0].points.length-1;
          //   y=data.series[2].points.length-1;
          //   z=data.series[1].points.length-1;
          // for(var i=0;i<12;i++) {
          //   rangeTemp.push(data.series[1].points[x].value);
          //   rangeLight.push(data.series[2].points[y].value);
          //   rangeWave.push(parseFloat(data.series[0].points[z].value/10).toFixed(2));
          //   x--;
          //   y--;
          //   z--;
          // }
          // console.log(rangeTemp);
          // console.log(rangeLight);
          // console.log(rangeWave);
          console.log(data);
          $scope.dataList = rangeTemp;
        }).error(function(err) {
          console.log(err);
        });

    $scope.GetLight = function() {
        $scope.dataList = rangeLight;
        $scope.measurement = "Light Condition";
        $scope.magnitude = "Lux";
    };

    $scope.GetWave = function() {
        $scope.dataList = rangeWave;
        $scope.measurement = "Wave Height";
        $scope.magnitude = "meter";
    };
    $scope.GetTemp = function() {
        $scope.dataList = rangeTemp;
        $scope.measurement = "Temperature";
        $scope.magnitude = "degree Celcius";
    };
    $scope.GetDepth = function() {
        $scope.dataList = [60,62,63,62,65,66,64,62,63,62,64,66];
        $scope.measurement = "Depth";
        $scope.magnitude = "meter";
    };
    $scope.GetHumid = function() {
        $scope.dataList = [16,16,33,40,4,66,16,16,33,62,20,66];
        $scope.measurement = "Humidity";
        $scope.magnitude = "lux";
    };
    $scope.GetWind = function() {
        $scope.dataList = [4.2,3.2,1.9,66,16,16,33,62,20,66];
        $scope.measurement = "Wind Speed"
        $scope.magnitude = "m/s";
    };
    $scope.GetCurrent = function() {
        $scope.dataList = [16,33,62,20,66,40,4,33,66,16,16,16];
        $scope.measurement = "Current"
        $scope.magnitude = "m/s";
    };
    $scope.fetchDrone = function(){
        $scope.newArray = $scope.textQuery.split(',');
        $scope.newLat = $scope.newArray[0];
        $scope.newLang = $scope.newArray[1];
        $scope.map = { center: { latitude: $scope.newLat, longitude: $scope.newLang }, zoom: 4 };
        $scope.marker = { id: 1, coords: {latitude: $scope.newLat, longitude: $scope.newLang}};
        $scope.botStatus = "Drone is trying to go to the marked position!";
        $scope.shown = true;
    };
    $scope.goBack = function(){
        $scope.botStatus = "Marker shows the current position of the drone"
        $scope.map = { center: { latitude: 52.502616, longitude: 13.412187 }, zoom: 6 };
        $scope.marker = { id: 0, coords: {latitude: 52.502616, longitude: 13.412187}};
        $scope.shown = false;
    };

  }]);

MyApp.directive('bars', function ($parse) {
      var directiveDefinitionObject = {
         restrict: 'E',
         replace: false,
         scope: {data: '=chartData'},
         link: function (scope, element, attrs) {
          scope.$watch("data",function(newValue,oldValue) {
            var chart = d3.select(element[0]);
            chart.select("div").remove();
            chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             .transition().ease("elastic")
             .style("width", function(d) { 
              if (d <5) {
                d = (d/5)+4;
              }
              if (d >70) {
                d = ((d - 70)/d)+70;
              }
              return d + "%"; })
             .text(function(d) { return d; });
           });
         } 
      };
      return directiveDefinitionObject;
   });