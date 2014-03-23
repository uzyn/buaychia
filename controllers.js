var buaychiaApp = angular.module('buaychiaApp', []);

buaychiaApp.controller('ChiaCtrl', function ($scope) {
    $scope.stats = [
        {
            'label': 'Price',
            'pre': 'SGD',
            'input-type': 'number',
            'post': null
        },
        {
            'label': 'Engine capacity',
            'pre': null,
            'input-type': 'number',
            'post': 'cc'
        },
        {
            'label': 'Registration date',
            'pre': null,
            'input-type': 'month',
            'post': null
        },
        {
            'label': 'COE',
            'pre': 'SGD',
            'input-type': 'number',
            'post': null
        },
        {
            'label': 'OMV',
            'pre': 'SGD',
            'input-type': 'number',
            'post': null
        }
    ];
});
