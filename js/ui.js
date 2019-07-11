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

//popup
function layer_open(el, menuNum, title, addtxt, tel) {
    var temp = $("#" + el);
	var bg = temp.children().hasClass("bg");
	
	$(`#${el} .${menuNum}`).addClass('active on').css('width','730px');

	$('.section .cont.active').find(".area > img").attr("src", function (index, attr) {
		return attr.replace("_off.jpg", "_on.jpg");
	});

    if (bg) {
        temp.fadeIn();
        $("html").attr("style", "overflow:hidden;");
    } else {
        temp.fadeIn();
        $("html").attr("style", "overflow:hidden;");
    }

    temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
    temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");

    $(`#${el} .btn_pop_close , #${el} > .bg`).click(function(e) {
        if (bg) {
			$('.section .cont.active').find(".area > img").attr("src", function (index, attr) {
				return attr.replace("_on.jpg", "_off.jpg");
			});
			$(`#${el} .${menuNum}`).removeClass('active on').css('width','290px');
            temp.fadeOut();
            $("html").removeAttr("style");
        } else {
			$('.section .cont.active').find(".area > img").attr("src", function (index, attr) {
				return attr.replace("_on.jpg", "_off.jpg");
			});
			$(`#${el} .${menuNum}`).removeClass('active on').css('width','290px');
            temp.fadeOut();
            $("html").removeAttr("style");
        }
        e.preventDefault();
	});

    $(window).on("resize", function() {
        temp.find('.pop_wrap').css("margin-top", "-" + temp.find('.pop_wrap').outerHeight() / 2 + "px");
        temp.find('.pop_wrap').css("margin-left", "-" + temp.find('.pop_wrap').outerWidth() / 2 + "px");
	});
	
}

// 태그 추가 및 삭제
function addTag(tagBox) {
	var getTxt = $(`#${tagBox} input[type="text"]`).change().val();
	var tagRemove = '.tag_close';
	var temHtml = '';
	
	if(getTxt){
		temHtml += '<span class="tag">'+ getTxt +'<span class="tag_close">X</span></span>';
		$(`#${tagBox} .tag`).last().after(temHtml);
		$(`#${tagBox} input[type="text"]`).val('');
	} else {
		alert("입력된 내용이 없습니다. \n내용 입력 후 추가됩니다.");
	}

	$(document).on('click', tagRemove ,function(){
		$(this).parent(".tag").remove();
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

function fileUpLoad(fileTarget,imgTarget) {
	// var fileTarget = $('.filebox .upload-hidden');

    $(`#${fileTarget}`).on('change', function(){
        if(window.FileReader){
            // 파일명 추출
            var filename = $(this)[0].files[0].name;
        } 

        else {
            // Old IE 파일명 추출
            var filename = $(this).val().split('/').pop().split('\\').pop();
        };

        $(this).siblings('.upload_name').val(filename);
    });

    //preview image 
    // var imgTarget = $('.preview_image .upload-hidden');

    $(`#${imgTarget} .upload-hidden`).on('change', function(){
        var parent = $(this).parent();
		parent.next('.upload_display').remove();
		
        if(window.FileReader){
			
			//image 파일만
            if (!$(this)[0].files[0].type.match(/image\//)) return;
            
            var reader = new FileReader();
            reader.onload = function(e){
				parent.next('.upload_display').remove();
                var src = e.target.result;
				parent.after('<div class="upload_display"><div class="upload_thumb_wrap"><img src="'+src+'" alt="" class="upload_thumb"><span class="close">X</span></div></div>');
				
			}
			reader.readAsDataURL($(this)[0].files[0]);
        }

        else {
            $(this)[0].select();
            $(this)[0].blur();
            var imgSrc = document.selection.createRange().text;
            parent.after('<div class="upload_display"><div class="upload_thumb_wrap"><img class="upload_thumb"></div></div>');

            var img = $(this).siblings('.upload_display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\""+imgSrc+"\")";
		}
		
		$(document).on('click', '.close', function(){
			$(this).parent().parent().parent().find('.upload_name').val('');
			$(this).parent().parent().remove();
		});
	});
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
