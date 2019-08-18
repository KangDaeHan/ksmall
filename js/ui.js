// 이미지 미리 로드
$.fn.preload = function() {
	this.each(function(){
		var img = $(this);
		var dataImg = new Image();
		dataImg.onload = function() {
			img.attr("src", img.attr("data-src"));
		}
		dataImg.src = img.attr("data-src");
	});
	return this;
};

// 사이드 메뉴
function sideMenu(){
	var side = $('.side .menu_list');
	var sideLink = side.find('> li a');
	var sideSubDep = side.find('ul ul');
	var current = $('.menu_title').text().trim();

	sideLink.each(function() {
		if ( $(this).text() == current || $(this).hasClass('active')) {
			$(this).addClass('active').next().slideDown();
			if ( $(this).parent().parent().size() > 0) {
				$(this).parent().parent().prev('a').addClass('active').next().slideDown();
				$(this).parent().parent().parent().parent().prev('a').addClass('active').next().slideDown();
			}
		}
    });

	//1depth
	side.find('> li > a').on("click", function(){
		if ($(this).hasClass('active')) {
			$(this).toggleClass('active').next("ul").slideUp();
			$(this).parent('li').siblings().find('a').removeClass('active').next("ul").slideUp();
		} else {
			side.find(' li > ul').slideUp();
			$(this).next("ul").slideDown();
			$(this).parent('li').siblings().find('a').removeClass('active on');
			$(this).addClass('active').removeClass('on');
		}
		$(this).next('ul').find('li a').removeClass('active');
	});

	//2depth
	side.find(' li li > a').on("click", function(){
		if ($(this).hasClass('active')) {
			$(this).toggleClass('active').next("ul").slideUp();
			$(this).parent('li').siblings().find('a').removeClass('active').next("ul").slideUp();
			$(this).parents('ul').prev('a').addClass('on');
		} else {
			sideSubDep.slideUp();
			$(this).next("ul").slideDown();
			$(this).parent('li').siblings().find('a').removeClass('active on');
			$(this).parents('ul').prev('a').addClass('on');
			$(this).addClass('active');
		}
	});

	//3depth
	side.find(' li li li > a').on("click", function(){
		$(this).parents('ul').stop();
	});

}

// input 타입 숫자만 입력
function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		return false;
}
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

// 수량 감소
function minus(el){
	var expense = $("#" + el);
	var expenseVal = expense.val();
	expenseVal = (Number(expenseVal)-1);
	if(expenseVal >= 0){
		expense.val(expenseVal);
	}
};

// 수량 증가
function plus(el) {
	var expense = $("#" + el);
	var expenseVal = expense.val();
	expenseVal = (Number(expenseVal)+1);
	if(expense.val() <= 100){
		expense.val(expenseVal);
	}
};

// today view 리스트 펼치기
function todayList(id) {
	var list_box = $("." + id);
	if ( list_box.is(":visible") ) {
		list_box.slideUp();
		list_box.prev().children('.title').removeClass('on');
	} else {
		list_box.slideDown();
		list_box.prev().children('.title').addClass('on');
	}
}

// 스크롤 메뉴 이동
function scrollMove(seq){
	var offset = $("#" + seq).offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}

// popup
function layer_open(el, menuNum, title, addtxt, tel) {
	var temp = $("#" + el);
	var bg = temp.children().hasClass("bg");

	setTimeout(function(){

		if($('#'+ el + ' ' + '.' + menuNum)) {
		$('.section .cont').css('width','20%');
		$('#'+ el + ' ' + '.' + menuNum).addClass('active on').css('width','40%');
		$('.section .cont.active').children('.layer').css('display','none');
	}

    if (bg) {
		temp.fadeIn();
        $("html").attr("style", "overflow:hidden;");
    } else {
		temp.fadeIn();
        $("html").attr("style", "overflow:hidden;");
    }

    temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
    temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");

    $('#'+ el + ' ' + '.btn_pop_close' + ',' + '#' + el + ' ' + '.bg').click(function(e) {
        if (bg) {
			temp.fadeOut();
			$('#'+ el + ' ' + '.' + menuNum).removeClass('active on').css('width','20%');
			$('.section .cont').children('.layer').css('display','block');
            $("html").removeAttr("style");
        } else {
			temp.fadeOut();
			$('#'+ el + ' ' + '.' + menuNum).removeClass('active on').css('width','20%');
			$('.section .cont').children('.layer').css('display','block');
            $("html").removeAttr("style");
        }
        e.preventDefault();
	});

	},800);

    $(window).on("resize", function() {
        temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
        temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");
	});
}

$(document).ready(function() {

	//이미지 미리로드
	$("img.preload").preload();

	//사이드 메뉴 실행
	sideMenu();

	//사이드 메뉴 접기 / 펼치기
	$(".expand a").click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('.wrap').addClass('expansion');
			$(".side").stop().animate({
				width : "112px"
			},200);
		} else {
			$('.wrap').removeClass('expansion');
			$(".side").stop().animate({
				width : "300px"
			},200);
		}
		return false;
	});

	//tooltip
	var title_;
	var class_;
	var imgTag;

	$(".tag_tooltip").hover(function(e) {

		title_ = $(this).attr("title");
		class_ = $(this).attr("class");
		$(this).attr("title","");

		if(class_ == "img"){
			imgTag = "<img src='"+title_+"' width='100px' height:'100px' alt='' />"
		}

		$("body").append("<div id='tooltip'></div>");

			if (class_ == "img") {
				$("#tooltip").html(imgTag);
				$("#tooltip").css("width","100px");
			} else {
				$("#tooltip").css("width","auto");
				$("#tooltip").text(title_);
			}

			var pageX = $(this).offset().left - ($("#tooltip").innerWidth())/2;
			var pageY = $(this).offset().top - $("#tooltip").innerHeight() - 10;
			$("#tooltip").css({left : pageX + "px", top : pageY + "px"}).fadeIn(500);

	}, function() {

		$(this).attr("title", title_);
		$("#tooltip").remove();

	});

    $(".explanation , .txt_ellipsis").ellipsis({
        responsive: true
    });

    $(".go_top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    var chagtit = $(".news_tit");
    var chagsubmu = $(".news_content");

    chagsubmu.hide();
    chagtit.on("click", function() {
        $(".news_content:visible").slideUp();
        $(this)
            .next(".news_content:hidden")
            .slideDown();
        if ($(this).hasClass("on")) {
            $(this).toggleClass("on");
        } else {
            $(this)
                .addClass("on")
                .siblings()
                .removeClass("on");
        }

        return false;
	});
	
    $(".btn_spread").on("click", function() {
        if ($(this).hasClass("open")) {
			$(".factory_sch_wrap").css('bottom','');
			$(".factory_sch_list").hide();
			$(this).removeClass("open");
        } else {
			$(".factory_sch_wrap").css('bottom','2rem');
			$(".factory_sch_list").show();
            $(this).addClass("open");
        }
        return false;
	});
	
    $(".tab_content").hide();
    $(".tab_content:first").show();

    $(".tabs li").click(function() {
        $(".tabs li").removeClass("on");
        $(this).addClass("on");
        $(".tab_content").hide();
        var activeTab = $(this)
            .find("a")
            .attr("href");
        $(activeTab).fadeIn();
        //collection();
        return false;
    });
});