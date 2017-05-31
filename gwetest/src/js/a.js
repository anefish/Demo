import Highcharts from 'highcharts';
import Utils from './libs/utils';

//调用自定义模块
var utils = new Utils('King');
utils.sayHello();

//测试本地服务
$('#postBtn').click(function(){
    $.ajax({
        url: '/user/login',
        type: 'POST',
        data: {
            name: 'Tom',
            age: 22
        },
        success: function (data) {
            console.log('post success   -------------->');
            console.log(data);
        }
    });
});

//测试highcharts
var chart = Highcharts.chart('container', {
            chart: {
                height: 240
            },
            colors: ['#0099ff', '#ff8000'],
            title: {
                text: null
            },
            xAxis: {
                categories: ['20101121', '20101122', '20101123'],
                tickInterval: 1, //坐标轴上的刻度线的单位间隔
                tickmarkPlacement: 'on',
                labels: {
                    // formatter: function(){
                    //     return Common.dateFormat(this.value, '/')
                    //         .toString().substr(5, 5);
                    // }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                plotLines: [{
                    //value: 0,
                    //width: 1,
                    //color: '#808080'
                }],
                labels: {
                    // formatter: function(){
                    //     var p = this.value > 0 ? '+' : '';
                    //     return p + Common.floatToRate(this.value, 0);
                    // }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                borderWidth: 0,
                itemStyle: {
                    color: '#999999'
                }
            },
            series: [{
                name: '数据一',
                data: [0.111, 0.131, 0.211]
            }, {
                name: '数据二',
                data: [0.232, 0.223, 0.222]
            }],
            plotOptions: {
                line: {
                    lineWidth: 1
                },
                series: {
                    animation: false,
                    enableMouseTracking: false,
                    marker: {
                        enabled: false
                    },
                    events: {
                        legendItemClick: function(){
                            return false;
                        }
                    }
                }
            },
            credits: {
                enabled: false
            }
        });

$('#testBtn').on('click', function(){
	//测试underscore
	var tpl = require('../tpl/test.tpl');
	$('#container').append(tpl({
		list: [{
			name: 'Tom',
		},{
			name: 'Jerry'
		}]
	}));	
});

