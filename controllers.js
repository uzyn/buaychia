var buaychiaApp = angular.module('buaychiaApp', []);
var cache = {
    'months': null,
    'buyDate': null,
    'regDate': null
};

buaychiaApp.controller('ChiaCtrl', function ($scope, $filter) {
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
        },
        {
            'model': 'buyDate',
            'label': 'Date of purchase',
            'pre': null,
            'type': 'month',
            'post': null
        }
    ];

    // Default values
    $scope.data = {
        'price': Math.ceil(Math.random() * 50000) + 20000,
        'engine': Math.ceil(Math.random() * 2000) + 1300,
        'regDate': $filter('date')(Date.now() - Math.ceil(Math.random() * 150000000 * 1000), 'yyyy-MM'),
        'coe': Math.ceil(Math.random() * 50000) + 20000,
        'omv': Math.ceil(Math.random() * 50000) + 5000,
        'buyDate': $filter('date')(Date.now(), 'yyyy-MM')
    };

    // Calculations
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

    $scope.months = function() {
        if (cache.buyDate === $scope.data.buyDate && cache.regDate === $scope.data.regDate) {
            console.log('cached');
            return cache.months;
        }

        var buyDate = new Date($scope.data.buyDate);
        var regDate = new Date($scope.data.regDate);

        var monthsBeforeTenYrs = ((regDate.getYear()) + 10 - (buyDate.getYear())) * 12 + (regDate.getMonth()) - (buyDate.getMonth());

        var currDate = buyDate;
        var months = [];
        for (i = 0; i < monthsBeforeTenYrs; ++i) {
            currDate.setMonth(currDate.getMonth() + 1);

            months.push({
                time: currDate.getTime()
            });

        }

        months.reverse();

        cache.months = months;
        cache.buyDate = $scope.data.buyDate;
        cache.regDate = $scope.data.regDate;

        return months;
    }
});
