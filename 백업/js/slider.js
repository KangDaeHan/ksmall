(function () {
  'use strict';
  function getData() {
    return $.getJSON('../js/data.json');
  }
 
  $.when(getData()).then(function (data) {     
    var app = {
      init: function(){
        var self = this;
        this.$window = $(window);
        this.$document = $(document);
        this.$loader = $('#loader');
        this.$loader.hide();
        this.$slider = $('.slider');
        this.$sliderView = $('.slider__wrapper');
        this.$sliderTracker = $('.slider__tracker');
        this._$count = 1; 
        this.$fadeTime = data.speed; 
        this.$width = data.width;
        this.$height = data.height;
        this.$sliders = data.sliders;
        this.renderSlides();
        this.setWidthHeight();
        setInterval(this.runSlides.bind(this), this.$fadeTime*3);
        this.$sliderDivgt = $(".slider__wrapper > div:gt(0)");
        this.$sliderDivFirst = $(".slider__wrapper > div:first");
        this.$sliderTitle = $('.slider__title');
        this.$sliderText = $('.slider__text--wrapper');
        this.$sliderLink = $('.slider__link');
        this.$trackerFirst = $(".trackers:first");
        this.$trackerSpan = $('.slider__tracker span');
        this.showFirstSlide();
      },
      setWidthHeight: function(){ //set height and width from json
        if(this.$width > 100) {this.$width = '100'}
        if(this.$height > this.$window.height()) {this.$height = this.$window.height();}
        this.$slider.width(this.$width + '%');
        this.$slider.height(this.$height + 'vh');
      },
      renderSlides: function(){ // For each object in json slider append to html slider wrapper tag
        this.$slider.show();
        for(var i = 0; i < this.$sliders .length; i++){
          this.$sliderView.append(
            `<div class = "slider__img" style = "background-image:url(` + this.$sliders [i].src + `)">
             <div class ="slider__box"><div class = "slider__info"><h2 class = "slider__title"> `
            + this.$sliders [i].title + ` </h2><div class ="slider__text--wrapper"><h5 class = "slider__text">`
            + this.$sliders [i].text + `</h5></div><button class = "slider__link">` + this.$sliders [i].btn +
            `</button></div></div></div>`
          );
          this.$sliderTracker.append(
            `<span class = "trackers"></span>`
          );
        }
      },
      showFirstSlide: function(){ // Show the first slider 
        this.$sliderDivgt.hide();
        this.$sliderDivFirst.find(this.$sliderTitle).animate({marginTop:'0px'}, 1000);
        this.$sliderDivFirst.find(this.$sliderText).delay(this.$fadeTime).animate({marginLeft:'0px'}, 1000);
        this.$sliderDivFirst.find(this.$sliderLink).delay(this.$fadeTime*2).animate({opacity:'1'}, this.$fadeTime);
        this.$trackerFirst.css('background-color','#09C');
      },
      runSlides: function(){ //slide animation fucntion
        var self = this;
        $('.slider__wrapper > div:first').fadeOut(this.$fadeTime, function(){
          $(this).find(self.$sliderTitle).animate({marginTop:'-999px'});
          $(this).find(self.$sliderText).delay(self.$fadeTime).animate({marginLeft:'3999px'});
          $(this).find(self.$sliderLink).delay(self.$fadeTime*2).animate({opacity:'0'});
          if(self._$count === self.$sliders.length){
            $(self.$trackerSpan[0]).delay(self.$fadeTime).css('background-color', '#09C');
          } else{
            $(self.$trackerSpan[0]).delay(self.$fadeTime).css('background-color', '#242424');
          }
          $(self.$trackerSpan[self._$count-1]).delay(self.$fadeTime).css('background-color', '#242424');
          $(self.$trackerSpan[self._$count]).delay(self.$fadeTime).css('background-color', '#09C');
          self._$count < self.$sliders.length ? self._$count++ : self._$count = 1;
        })
          .next()
          .delay(this.$fadeTime)
          .fadeIn(this.$fadeTime, function(){
          $(this).find(self.$sliderTitle).animate({marginTop:'0px'}, 1000);
          $(this).find(self.$sliderText).delay(self.$fadeTime).animate({marginLeft:'0px'}, 1000);
          $(this).find(self.$sliderLink).delay(self.$fadeTime*2).animate({opacity:'1'}, self.$fadeTime);
        })
          .end()
          .appendTo('.slider__wrapper');
      }
    };
    $(window).on('load',function(){
      app.init();
    });
  });
})();