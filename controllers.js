var buaychiaApp = angular.module('buaychiaApp', []);

buaychiaApp.controller('ChiaCtrl', function ($scope) {
    $scope.stats = [
        {
            'model': 'price',
            'label': 'Price',
            'pre': '$',
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
            'pre': '$',
            'type': 'number',
            'post': null
        },
        {
            'model': 'omv',
            'label': 'OMV',
            'pre': '$',
            'type': 'number',
            'post': null
        }
    ];

    $scope.data = [];

    // Based on
    // http://www.lta.gov.sg/content/ltaweb/en/roads-and-motoring/owning-a-vehicle/costs-of-owning-a-vehicle/tax-structure-for-cars.html

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

    $scope.roadTax = function() {
        var engine = parseFloat($scope.data.engine);

        if (engine <= 600) {
            return Math.ceil(200 * 0.782) * 2;
        } else if (engine <= 1000) {
            return Math.ceil((200 + 0.125 * (engine - 600)) * 0.782) * 2;
        } else if (engine <= 1600) {
            return Math.ceil((250 + 0.375 * (engine - 1000)) * 0.782) * 2;
        } else if (engine <= 3000) {
            return Math.ceil((475 + 0.75 * (engine - 1600)) * 0.782) * 2;
        } else {
            return Math.ceil((1525 + 1 * (engine - 3000)) * 0.782) * 2;
        }
    }

});
