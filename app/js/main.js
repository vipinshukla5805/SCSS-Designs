$(function() {
    $('#password').hideShowPassword({
        show: 'infer',
        innerToggle: true,
        toggle: {
            className: 'btn btn-toggle-password',
        },
        states: {
            shown: {
                toggle: {
                    content: '<i class="fa fa-eye" aria-hidden="true">&nbsp;</i>',
                    attr: {
                        'aria-pressed': 'true',
                        title: 'Hide Password',
                    }
                }
            },
            hidden: {
                toggle: {
                    content: '<i class="fa fa-eye-slash" aria-hidden="true">&nbsp;</i>',
                    attr: {
                        'aria-pressed': 'false',
                        title: 'Show Password',
                    }
                }
            }
        }
    });

    $('.wb-word-popover').popover({
        placement: 'top',
        // trigger: 'hover',
        template: '<div class="popover wb-popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="wb-popover-content"><span class="popover-content"></span><a class="wb-popover-star" href="javascript:void(0);"><i class="mdi mdi-star-outline"></i></button></div></div>'
    });

    $('body').on('click', function(e) {

        if (!$('.wb-word-popover').is(e.target) // ... nor a descendant of the container
            &&
            $('.wb-word-popover').has(e.target).length === 0) {
            $('.wb-word-popover').popover('hide');
        }
    });





    $('#carousel-stats').on('slid.bs.carousel', function() {


        if ($(this).find('.active .ct-chart-1').length > 0) {
            var words = 150; // 1-1000
            var filles1 = 250 * words / 1000;
            var filles2 = 250 * (1000 - words) / 1000;

            var chart1 = new Chartist.Pie('.ct-chart-1', {
                series: [filles1, filles2],
                labels: ['', '']
            }, {
                donut: true,
                donutWidth: 16,
                startAngle: 235,
                total: 360,
                showLabel: false,
                plugins: [
                    Chartist.plugins.fillDonut({
                        items: [{
                            id: '',
                            content: '<div class="wb-wordstats-chart-icon"></div><div class="wb-wordstats-chart-words"><span>' + words + '</span>/1000</div>',
                            position: 'center', //bottom, top, left, right
                            offsetY: 0, //top, bottom in px
                            offsetX: 0 //left, right in px
                        }]
                    })
                ],
            });
        }

        if ($(this).find('.active .ct-chart-2').length > 0) {
            var chart2 = new Chartist.Line('.ct-chart-2', {
                labels: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', ''],
                series: [{
                    // className: 'ct-series-orange',
                    data: [0, 17, 10, 35, 40, 51, 47],
                }]
            }, {
                fullWidth: true,
                chartPadding: 5,
                labelOffset: 5,
                axisX: {
                    showGrid: false,
                },
                axisY: {
                    axisOffset: 0,
                    high: 100,
                    low: 0,
                    offset: 0,
                    showLabel: false,
                },
            });

            chart2.on('draw', function(data) {
                if (data.type === 'point') {
                    var triangle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: 5,
                    }, 'ct-point');

                    data.element.replace(triangle);
                }
            });
        }
    })
});
