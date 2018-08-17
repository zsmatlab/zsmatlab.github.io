/**
 * 灏忓璧拌矾锛屾彁渚涘皬瀛╄蛋璺殑鎺ュ彛缁欏閮�
 */
// 鍔ㄧ敾缁撴潫浜嬩欢
    var animationEnd = (function() {
        var explorer = navigator.userAgent;
        if (~explorer.indexOf('WebKit')) {
            return 'webkitAnimationEnd';
        }
        return 'animationend';
    })();
function BoyWalk() {

	var container = $("#content");
	var swipe = new Swipe(container);
	var visualWidth = container.width();
	var visualHeight = container.height();

	function getValue(classname) {
		var $elem = $('' + classname);
		//杩斿洖璧拌矾鐨勮矾绾垮潗鏍�
		return {
			height : $elem.height(),
			top : $elem.position().top
		}
	}
	//璺殑Y杞�
	var pathY = function() {

		var data = getValue('.a_background_middle');
		return data.top + data.height / 2;
	}();

	var $boy = $("#boy");
	var boyHeight = $boy.height();
	$('#boy').css({
		top : pathY - boyHeight + 25//涓轰粈涔堣+25鐨勫亸绉婚噺鍛�
	});
	// 
	function pauseWalk(){
		$boy.addClass('pauseWalk');
	}
	//鎭㈠璧拌矾鐨勫姩浣�
	function restoreWalk() {
		$boy.removeClass('pauseWalk');
	}
	//css3鎺у埗鍔ㄤ綔鍙樺寲
	function slowWalk() {
		$boy.addClass('slowWalk');
	}
	//璁＄畻璺濈
	function calculateDist(direction, proportion) {
		return (direction == "x" ? visualWidth : visualHeight) * proportion;
	}
	//浜虹墿绉诲姩鏁堟灉
	function startRun(options, runTime) {
		var dfdPlay = $.Deferred();
		restoreWalk();
		//    	dfdPlay.done(function(){
		//    		$boy.css({
		//        		'left': options.left,
		//        		'top': options.top,
		//    			'-moz-transition': runTime,
		//    			'-webkit-transition': runTime,
		//    			'-o-transition': runTime,
		//    			'transition': runTime,
		//        	});
		//    	})
		//    	
		//    	dfdPlay.resolve(); // 鍔ㄧ敾瀹屾垚

		$boy.transition(options, runTime, 'linear', function() {
			dfdPlay.resolve(); // 鍔ㄧ敾瀹屾垚
		});

		return dfdPlay;
	}
	//寮€濮嬭蛋璺�
	function walkRun(time, dist, distY) {
		time = time || 3000;
		//鑴氬姩浣�
		slowWalk();
		//浜虹墿寮€濮嬬Щ鍔ㄨ蛋璺�
		var d1 = startRun({
			'left' : dist + 'px',
			'top' : distY ? (distY + 'px') : undefined
		}, time);
		return d1;
	}

	function walkToShop(runTime) {
		var defer = $.Deferred();
		var doorObj = $('.door');
		//闂ㄧ殑鍧愭爣
		var offsetDoor = doorObj.offset();//offset鏄拡瀵筪ocument鏂囨。鐨�
		var doorOffsetLeft = offsetDoor.left;
		//灏忕敺瀛╃殑鍧愭爣
		var offsetBoy = $boy.offset();
		var boyOffetLeft = offsetBoy.left;

		//褰撳墠闇€瑕佺Щ鍔ㄧ殑璺濈
		var instanceX = (doorOffsetLeft + doorObj.width() / 2)
				- (boyOffetLeft + $boy.width() / 2);
		var walkPlay = startRun({
			transform : 'translateX(' + instanceX + 'px), scale(0.3, 0.3)',
			opcity : 0.1
		}, 2000);
		walkPlay.done(function() {
			$boy.css({
				opacity : 0,
			})
			defer.resolve();
		});
		return defer;
	}
	


	var instanceX;
function walkOutShop(runTime){
var defer = $.Deferred();
restoreWalk();
var walkPlay = startRun({
	transform: 'scale(1,1)',
    opacity: 1
    }, runTime);
    //璧拌矾瀹屾瘯
    walkPlay.done(function() {
    defer.resolve();
    });
    return defer; 
}
//鍙栬姳
function takeFlower(){
	//璁剧疆鍙栬姳鏃堕棿涓�1s
	var defer = $.Deferred();
	setTimeout(function(){
		$boy.addClass('slowFlowerWalk');
		defer.resolve();
	}, 1000);
	return defer;
}
//淇濂冲浣嶇疆
var bridgeY = (function(){
	var data = getValue('.c_background_middle');
	return data.top;
})();
var girl = {
		elem : $('.girl'),
		getHeight: function(){
			return this.elem.height();
		},
		setOffset: function(){
			this.elem.css({
				left: visualWidth / 2,
				top:bridgeY - this.getHeight()
			})
		},
		getOffset : function(){
			return this.elem.offset();//jquery鐨勬柟娉曪紝杩斿洖鍦╠ocument鏂囨。涓殑浣嶇疆锛岃繑鍥炵殑鏄痶op鍜宭eft
		},
		getWidth: function(){
			return this.elem.width();
		},
		// 杞韩鍔ㄤ綔
        rotate: function() {
            this.elem.addClass('girl-rotate')}
	}
girl.setOffset();


return {
	//寮€濮嬭蛋璺�
	/**
	 * 鏃堕棿锛寈姣斾緥锛寉姣斾緥
	 */
	walkTo : function(time, proportionX, proportionY) {
		var distX = calculateDist('x', proportionX);
		var distY = calculateDist('y', proportionY);
		return walkRun(time, distX, distY);
	},
	stopWalk : function() {
		pauseWalk();
	},
	setColoer : function(value) {
		$boy.css('background-color', value)
	},
	//璧拌繘鍟嗗簵
	toShop : function() {
		return walkToShop.apply(null, arguments);
	},
	//璧板嚭鍟嗗簵
	outShop : function() {
		return walkOutShop.apply(null, arguments);
	},
	//鍙栬姳
	takeFlower : function(){
		return takeFlower();
	},
	restore : function(){
		this.stopWalk();
		$boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
	},
	rotate : function(callback){
		 restoreWalk();
         $boy.addClass('boy-rotate');
         // 鐩戝惉杞韩瀹屾瘯?????
         if(callback){
        	 $boy.on(animationEnd, function() {
                 callback();
                 $(this).off();
             }) 
         }
	},
	girl : girl
}

}