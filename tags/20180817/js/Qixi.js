/**
 * 
 */
var boy
var audio 
window.onload = function () {
	var btn = document.getElementById('btn')
	audio = document.getElementById('audio')
	// audio.pause()
	boy = BoyWalk();
	btn.onclick = function () {
		// audio.autoPlay = 'autoPlay'
		audio.setAttribute('autoplay', 'autoplay')
		audio.pause()
		// btn.style = "display: none;"
		// btn.setAttribute('display', 'none')
		try {
			audio = document.getElementById('audio')
			audio.play()
			// alert(audio == undefined)
			audio.pause()
			document.getElementsByTagName('body')[0].removeChild(btn)
			// btn.style = "display: none;"
			// alert(btn.style.display)
			// alert('ahah')
			// btn.setAttribute('display', 'none')
			// alert('xxx')
			S1.init()
		} catch (err) {
			// alert('err', err)
			audio.oncanplay = function () {
				btn.style = "display: none;"
				S1.init()
			}
		}
		// console.log('audo', audio)
		// setTimeout(init, 4000)
	}
	// audio.click()
	// S1.init()
};

function init() {
	var girl = boy.girl;
	var container = $("#content");
	var swipe = new Swipe(container);
	var snow = new Snow();
	// 闊充箰閰嶇疆
	var audioConfig = {
		enable: true, // 鏄惁寮€鍚煶涔�
		playURL: 'http://pramy.oss-cn-shenzhen.aliyuncs.com/static/music/happy.mp3', // 姝ｅ父鎾斁鍦板潃
		cycleURL: 'http://pramy.oss-cn-shenzhen.aliyuncs.com/static/music/circulation.mp3' // 姝ｅ父寰幆鎾斁鍦板潃
	};

	function Html5Audio(url, isloop) {
		// var audio = new Audio(url);
		var audio = document.getElementById('audio')
		console.log('audio', audio)
		audio.src = url		
		audio.autoPlay = true;
		audio.loop = isloop || false;
		// document.addEventListener('click', function () {
		audio.oncanplaythrough = function () {
			audio.play()
		}
		// })
		// audio.oncanplaythrough = function () {
		// 	// audio.muted = false
		// 	console.log('鍙互鎾斁浜�')
		// 	audio.play();
		// }
		
		return {
			end: function (callback) {
				audio.addEventListener('ended', function () {
					callback();
				}, false);
			}
		}
	}
	/*var birdgeY = (function(){
		var data = getValue('.c_background_middle');
		return data.top;
	})();*/
	var visualHeight = container.height();
	var visualWidth = container.width();

	function scrollTo(time, proportionX) {
		//        var d1;
		var distX = container.width() * proportionX;
		swipe.scrollTo(distX, time);
	}

	var bird = {
		elem: $('.bird'),
		fly: function () {
			this.elem.addClass('birdFly');
			this.elem.transition({
				right: container.width()
			}, 15000, 'linear');
		}
	}

	// 鍔ㄧ敾缁撴潫浜嬩欢
	var animationEnd = (function () {
		var explorer = navigator.userAgent;
		if (~explorer.indexOf('WebKit')) {
			return 'webkitAnimationEnd';
		}
		return 'animationend';
	})();



	var logo = {
		elem: $('.logo'),
		run: function () {
			this.elem.addClass('logolightSpeedIn')
				.on(animationEnd, function () {
					$(this).addClass('logoshake').off();
				});
		}
	};


	/*	$('button:first').click(function(){*/
	//		swipe.scrollTo($("#content").width(),5000);
	//		$boy.addClass('slowWalk');
	//		$boy.css({
	//			'left': width+'px',
	//			'-moz-transition': '15s',
	//			'-webkit-transition': '15s',
	//			'-o-transition': '15s',
	//			'transition': '15s',
	//		});
	//		var distX = calculateDist('x', 0.5);
	//		var distY = calculateDist('y', 0.5);
	//		walkRun(15000, distX, distY);
	// 澶槼鍏浆
	$("#sun").addClass('rotation');
	// 椋樹簯
	$(".cloud:first").addClass('cloud1Anim');
	$(".cloud:last").addClass('cloud2Anim');
	var audio1 = Html5Audio(audioConfig.playURL);
	audio1.end(function () {
		Html5Audio(audioConfig.cycleURL, true);
	})
	//绗竴娆¤蛋璺紝鑺�2000ms璧板埌x鐨�0.5鍊嶇殑鍦版柟锛�
	boy.walkTo(2000, 0.5) //杩欎釜鏃跺€欒繑鍥炵殑鏄竴涓猟effer瀵硅薄锛屽彧鏈塪effer瀵硅薄resolve涔嬪悗锛屾墠浼氭墽琛宼hen涓殑鎿嶄綔
		//绗竴娆¤蛋璺粨鏉�
		.then(function () {
			scrollTo(5000, 1); //婊戝姩鐨勭殑鏃堕棿锛屾粦鍔ㄨ窛绂荤殑姣斾緥
			bird.fly();
		})

		//绗簩娆¤蛋
		.then(function () {
			// S.init()
			return boy.walkTo(5000, 0.5); //蹇呴』闄愬埗鏈夊厛鍚庡叧绯荤殑涓€瀹氳鐢╮eturn锛燂紵
		})
		//鏆傚仠璧拌矾
		.then(function () {
			boy.stopWalk();
		})
		//寮€闂�
		.then(function () {
			return openDoor();
		})
		.then(function () {
			//寮€鐏�
			lamp.bright()
		})
		.then(function () {
			//杩涘晢搴�
			return boy.toShop(2000)
		})
		.then(function () {
			return boy.takeFlower();
		})
		.then(function () {
			//鍑哄晢搴�
			return boy.outShop(2000)
		})
		.then(function () {
			return closeDoor();
		})
		.then(function () {
			//鐏殫
			lamp.dark();

		})
		.then(function () {
			scrollTo(5000, 2); //婊戝姩鐨剎鐨勮窛绂伙紝婊戝姩鏃堕棿锛屽叾瀹炲皬鐢峰鏈韩娌℃湁绉诲姩锛岀Щ鍔ㄧ殑鏄儗鏅�

		}) //涓嬮潰鏄鐞嗘ˉ涓婄殑鐘舵€�
		.then(function () {
			return boy.walkTo(5000, 0.15); //杩欎釜鍦版柟鎹㈡垚2000濂藉儚灏辨湁闂锛侊紒锛侊紒
			
		})
		.then(function () {
			//var girlTop = girl.getOffset().top;
			return boy.walkTo(2000, 0.25, (girl.getOffset().top) / visualHeight);
			
		})
		.then(function () {
			// S.init()
			var boyWidth = $("#boy").width();
			var girlLeft = girl.getOffset().left;
			var pro = (girlLeft - boyWidth) / visualWidth;
			return boy.walkTo(2500, pro);

		})
		.then(function () {
			boy.restore();
		})
		.then(function () {
			// 澧炲姞杞韩鍔ㄤ綔 
			var d = $.Deferred();
			setTimeout(function () {
				girl.rotate();
				boy.rotate(function () {
					// 寮€濮媗ogo鍔ㄧ敾
					logo.run();
					snow.snowflake()
					d.resolve();
				});
			}, 1000);
			return d;
		})
	//            .then(snow.snowflake())
	;

	//	});
	//	$('button:last').click(function(){
	////		swipe.scrollTo($("#content").width(),5000);
	//		 var left = $boy.css('left');
	//	        // 寮哄埗鍋氫簡涓€涓敼鍙樼洰鏍噇eft鐨勫鐞�
	//	        // 鍔ㄧ敾鏄杩愯10绉�,鎵€浠ユ鏃跺姩鐢昏繕鏄病鏈夌粨鏉熺殑
	//	        $boy.css('left',left);
	//		$boy.addClass('pauseWalk');
	//		
	//		
	//	});

}

function doorAction(left, right, time) {
	var $door = $(".door");
	var doorLeft = $('.door-left');
	var doorRight = $('.door-right');
	var defer = $.Deferred();
	var count = 2;
	var complete = function () {
		if (count == 1) {
			defer.resolve();
			return;
		}
		count--;
	}
	doorLeft.transition({
		'left': left
	}, time, complete);
	doorRight.transition({
		'left': right
	}, time, complete);
	return defer;
}
//寮€闂�
function openDoor() {
	return doorAction('-50%', '100%', 2000);
}

function closeDoor() {
	return doorAction('0%', '50%', 2000);
}
//寮€闂ㄧ伅浜�
$('button:eq(2)').click(function () {
	openDoor().then(
		function () {
			lamp.bright();
		}
	);
});
//鍏抽棬鐏伃
$('button:eq(3)').click(function () {
	closeDoor().then(
		function () {
			lamp.dark();
		}
	);
});
//涓嶄綔涓哄叏灞€鍙橀噺鍙互鍚�
var lamp = {
	elem: $('.b_background'), //杩斿洖鐨勪笉鏄竴涓猲odelist鍚楋紵杩欓噷鍙互鐩存帴鎷垮埌鍚楋紵
	bright: function () {
		this.elem.addClass('lamp-bright');
	},
	dark: function () {
		this.elem.removeClass('lamp-bright');
	}
}