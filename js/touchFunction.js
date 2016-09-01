/*---记录当前页--*/
var nowPage = 0
	/*---手指点击或滑动位置Y坐标变化--*/
var startY, endY, moveY
	/*--表示手指是否移动了--*/
var fingerMove = false

/*---监测  Y  执行function--*/
$(".pageBox .page").on("touchstart touchmove touchend", function(e) {
	switch(e.type) {
		case "touchstart":
			/*-拿到第一个手指在屏幕上面的Y--*/
			startY = e.originalEvent.targetTouches[0].clientY
			break;
		case "touchmove":
			fingerMove = true
			endY = e.originalEvent.targetTouches[0].clientY
			break;
		case "touchend":
			if(!fingerMove) return //手指没有移动
			fingerMove = false
			moveY = endY - startY
			if(moveY < 0) {
				//向上滑动 到下一页
				//最后一页
				if(nowPage == $(".page").size() - 1) return
				nowPage++

				$(this).addClass("toTop").next().removeClass("hidden").addClass("nextTop")
					//监测动画完成
				$(this).on("webkitAnimationEnd", function() {
					$(this).removeClass("toTop").addClass("hidden").next().removeClass("nextTop")
						//取消对动画的检测
					$(this).off("webkitAnimationEnd")
				})
			}
			if(moveY > 0) { //向下滑动 到上一页
				//第一页
				if(nowPage == 0) return
				nowPage--

				$(this).addClass("toBottom").prev().removeClass("hidden").addClass("prevBottom")
					//监测动画完成
				$(this).on("webkitAnimationEnd", function() {
					$(this).removeClass("toBottom").addClass("hidden").prev().removeClass("prevBottom")
						//取消对动画的检测
					$(this).off("webkitAnimationEnd")
				})
			}
			break;
	}
})

$(".page4 .on").click(function() {
	$(".page4 .on ").addClass("fadeIn")
	$(".page4 .bg").addClass("fadeOut")
	$(".page4 .title").addClass("fadeOut")
	$(".page4 .guide").css("display", "none")
	$(".page4 .bg1 ").addClass("fadeIn")
	$(".page4 .know ").addClass("fadeIn")
})

$(".music").click(function() {
	var audio1 = document.getElementById("audio")
	if(audio1.pause()) {
		audio1.play()
		this.src = "img/微信场景页/musicBtn.png"
	}
	
	if(!audio1.pause()){
		audio1.pause()
		this.src = "img/微信场景页/musicBtnOff.png"
	}
})
