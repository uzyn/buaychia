var buaychiaApp = angular.module('buaychiaApp', []);
var cache = [];

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
        if (cache.omv === $scope.data.omv) {
            return cache.arf;
        }

        var omv = parseFloat($scope.data.omv);
        var arf = 0;

        if (omv <= 20000) {
            arf = omv;
        } else if (omv <= 50000) {
            arf = (omv - 20000) * 1.4 + 20000;
        } else {
            arf = (omv - 50000) * 1.8 + 62000;
        }

        cache.omv = $scope.data.omv;
        cache.arf = arf;

        return arf;
    };

    $scope.roadTax = function() {
        if (cache.engine === $scope.data.engine) {
            return cache.roadTax;
        }

        var engine = parseFloat($scope.data.engine);
        var roadTax = 0;

        if (engine <= 600) {
            roadTax = Math.ceil(200 * 0.782) * 2;
        } else if (engine <= 1000) {
            roadTax = Math.ceil((200 + 0.125 * (engine - 600)) * 0.782) * 2;
        } else if (engine <= 1600) {
            roadTax = Math.ceil((250 + 0.375 * (engine - 1000)) * 0.782) * 2;
        } else if (engine <= 3000) {
            roadTax = Math.ceil((475 + 0.75 * (engine - 1600)) * 0.782) * 2;
        } else {
            roadTax = Math.ceil((1525 + 1 * (engine - 3000)) * 0.782) * 2;
        }

        cache.engine = $scope.data.engine;
        cache.roadTax = roadTax;

        return roadTax;
    }

    $scope.months = function() {
        if (cache.buyDate === $scope.data.buyDate && cache.regDate === $scope.data.regDate) {
            return cache.months;
        }

        var buyDate = new Date($scope.data.buyDate);
        var regDate = new Date($scope.data.regDate);

        if (buyDate.getTime() < regDate.getTime()) {
            $scope.data.regDate = $scope.data.buyDate;
            alert('Cheng hu says you cannot buy a chia before registering it.');
            return;
        }

        var monthsBeforeTenYrs = ((regDate.getYear()) + 10 - (buyDate.getYear())) * 12 + (regDate.getMonth()) - (buyDate.getMonth());

        var currDate = buyDate;
        var months = [];
        var roadTaxPerMonth = $scope.roadTax() / 12;
        var arf = $scope.arf();
        var coePerMonth = $scope.data.coe / 12 / 10;

        for (i = 0; i < monthsBeforeTenYrs; ++i) {
            var time = currDate.setMonth(currDate.getMonth() + 1);
            var ageMonth = 12 * 10 - monthsBeforeTenYrs + (i + 1);
            var ownedMonth = i;
            var roadTax = roadTaxPerMonth * (i+1);
            var totalPaid = roadTax + arf;
            var coeRebate = coePerMonth ;

            months.push({
                time: time,
                ageMonth: ageMonth,
                ownedMonth: ownedMonth,
                roadTax: roadTax,
                totalPaid: totalPaid,
                coeRebate: coeRebate
            });

        }

        months.reverse();

        cache.months = months;
        cache.buyDate = $scope.data.buyDate;
        cache.regDate = $scope.data.regDate;
        cache.monthsBeforeTenYrs = monthsBeforeTenYrs;

        return months;
    }

    $scope.monthsBeforeTenYrs = function () {
        $scope.months();
        return cache.monthsBeforeTenYrs;
    }
});
