/**
 *椤甸潰婊戝姩 
 * 
 */

function Swipe(container){
//	var container = $("#content");
	var element = container.find(":first");
	//var slides = container.find("li");
	var slides = element.find(">");
	var width = container.width();
	var height = container.height();
	//婊戝姩瀵硅薄
	var swipe = {};
	
	element.css({
        width  : (slides.length * width) + 'px',
        height : height + 'px'
    });
	//璁剧疆姣忎竴涓猯i鐨勫楂�
	$.each(slides, function(index){
		var slide = slides.eq(index); //鑾峰彇鍒版瘡涓€涓猯i鍏冪礌
		slide.css({
			width: width +'px',
			height: height +'px'
		});
	});
	/**
	 * 绉诲姩璺濈鍜岄€熷害
	 */
	swipe.scrollTo = function (x, speed){
		element.css({
			'transition-timing-function': 'linear',
			'transition-duration': speed+'ms',
			'transform':  'translate3d(-' + x + 'px,0px,0px)'
		});
		return this;
	}
	return swipe;
}