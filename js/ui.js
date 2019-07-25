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

// 게시판 모양 변경 버튼
function chgBoard(board) {
	var listBtn = $(".chg_board .icon").find('a');
		
	if(board == 'card'){
		listBtn.parent('.card').siblings().removeClass('active');
		listBtn.parent('.card').addClass('active');

		$('.list_result_wrap').removeClass('list');
		$('.list_result_wrap').addClass(board);
	} else {
		listBtn.parent('.list').siblings().removeClass('active');
		listBtn.parent('.list').addClass('active');

		$('.list_result_wrap').removeClass('card');
		$('.list_result_wrap').addClass(board);
		
		$(".txt_ellipsis").ellipsis({
			responsive: true
		});
	}
}


$(document).ready(function() {

	//이미지 미리로드
	$("img.preload").preload();

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