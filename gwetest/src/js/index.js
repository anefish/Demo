require('exports!./libs/zepto.touchSlider.js');

$('#risk').click(() => $('#risk-box').show());

$('.close, .risk .button').click(() => $('.cover').hide());

//滑动
$('#tab-one')[0].addEventListener('touchmove', event => event.preventDefault(), false);
$('#tab-two')[0].addEventListener('touchmove', event => event.preventDefault(), false);
$('#tab-one, #tab-two').touchSlider();