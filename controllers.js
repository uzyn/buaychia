var buaychiaApp = angular.module('buaychiaApp', []);

buaychiaApp.controller('ChiaCtrl', function ($scope) {
    $scope.stats = [
        {
            'model': 'price',
            'label': 'Price',
            'pre': 'SGD',
            'type': 'number',
            'post': null
        },
        {
            'model': 'engine',
            'label': 'Engine capacity',
            'pre': null,
            'type': 'number',
            'post': 'cc'
        },
        {
            'model': 'regDate',
            'label': 'Registration date',
            'pre': null,
            'type': 'month',
            'post': null
        },
        {
            'model': 'coe',
            'label': 'COE',
            'pre': 'SGD',
            'type': 'number',
            'post': null
        },
        {
            'model': 'omv',
            'label': 'OMV',
            'pre': 'SGD',
            'type': 'number',
            'post': null
        }
    ];

    $scope.data = [];

    $scope.arf = function() {
        var omv = parseFloat($scope.data.omv);

        if (omv <= 20000) {
            return omv;
        } else if (omv <= 50000) {
            return (omv - 20000) * 1.4 + 20000;
        } else {
            return (omv - 50000) * 1.8 + 62000;
        }

    };

});
