$(function(){
	var autoScrollComplete = false;
	var featureList = [];
	var homeIntroTextOpen = [];
	var kvInterval;
	var kvpy = 0;
	var kvv = 0;
	var visited = false;
	
	jQuery.easing.kazshOut = function(x, t, b, c, d) {
		return x += ( 1 - x )/4;
	}
	
	function init(){
		
		
		$('.mdd').parent().hover(function(){
			$(".mdd").not(":animated").fadeIn(500,'kazshOut');
		}, function(){
			$(".mdd").fadeOut(200,'kazshOut');
		});
		
		//if($('body#home').length) $('html,body').animate({ scrollTop: 0 }, '1', 'swing', autoScrollCompleteHandler ); // リロード時にトップへ
		if($('body#home').length) autoScrollCompleteHandler();
		
		$(window).scroll( scrollHandler );
		$(window).resize( featureDetailsImageResizeHandler );
		setInterval( enterframe , 20 );
		
		// feature_details page scroll
	    $('.breadcrumb span').click(function () {
	        var i = $('.breadcrumb span').index(this)
	        var p = $('h3.section-heading').eq(i).offset().top - $(window).height()/2+50;
	        if ( i == 0 ) {
		        $('html,body').animate({ scrollTop: 0 }, 500 );
	        }else{
		        $('html,body').animate({ scrollTop: p }, 500 );
		    }
	        return false;
	    });
	    
	    // feature_details first photo
	    $('.image-block .fig:nth-child(1)').css('opacity',1);
	    
	    // feature_details imageLoaded resize
	  	$('.image-block .fig img').each(function(){
			$(this).on('load',function(){
				featureDetailsImageResizeHandler();
			});
		});
		
		// home key visual clickHandler
		$('.arrow-btn').click(function () {
			kvpy = $(window).scrollTop();
			kvInterval = setInterval( kvScroller , 16 );
			homeIntroTextOpen.forEach(function(c,i,a){
				setTimeout(function(){
					$(c.target).css('transition','all 1000ms');
					$(c.target).css('opacity',1.0);
				},c.offset);
				c.isOpen = true;
			});
		});
		
		// home intro text list pc & fade offset
		$('.section.intro .pc p,.section.intro h2,.section.intro h3,.section.intro .link_ms_01').each(function(i){
			homeIntroTextOpen.push({
				target:$(this),
				isOpen:false,
				offset:i*200+500/* トップページ　intro-copyの画像表示速度 */
			});
		});
		
		$('.section.intro .sp p').each(function(i){
			homeIntroTextOpen.push({
				target:$(this),
				isOpen:false,
				offset:(i+1)*200+500/* トップページ　intro-copyの画像表示速度 */
			});
		});
		
		// sp menu
		$(".sp-menu-trigger").click(function () {
			$(this).hide();
			$(this).next().toggleClass("onanimation");
			$('body > div:not(#sp-menu), #footer').hide();
			$('#sp-menu').fadeIn(1500);
			$('.intro_article').remove();
			$('.site-logo').animate({'opacity':0}, 500);

		});
		
		$("#sp-menu .close").click(function () {
			//add 1221 .video_fade_wrap
			$('#sp-menu').fadeOut(100);
			setTimeout(function(){
				$('.site-logo').animate({'opacity':1}, 500);
				$('.sp-menu-trigger').show();
			},500);
			setTimeout(function(){
				$('body > div:not(#sp-menu,.video_fade_wrap), #footer').fadeIn(200);
			},500);
		});
		$('#sp-menu').hide();
	}
	
	function kvScroller(){
		var ny = $(this).height()-40+1;
		var sa = ny - kvpy;
		kvv += 2;
		// infocus - ↓数字を10に調整
		kvpy += Math.min( kvv , sa / 10 );
		if ( Math.abs( sa ) < 1 ){
			kvpy = ny;
			clearInterval(kvInterval);
		}
		$(window).scrollTop(kvpy);
	}
	
	function featureDetailsImageResizeHandler(){
		// fig
		var w = $('.image-block .fig').width()+1;
		var h = $('.image-block .fig').height()+1;
		
		$('.image-block .fig img').each(function(i){
			var img = new Image();
			img.src = $(this).attr('src');
			var ow = img.width;
			var oh = img.height;
			var s = Math.max( w/ow , h/oh );
			if ( ow == 0 || oh == 0 ) {
				$(this).css('display','none');
			} else {
				var ows = Math.ceil(ow*s);
				var ohs = Math.ceil(oh*s);
				
				$(this).css('display','block');
				
				var offsetTop = (h-ohs)/2;
				var offsetLeft = (w-ows)/2;
				if ( $(this).hasClass('T')) offsetTop = 0;
				else if ( $(this).hasClass('B')) offsetTop = h-ohs;
				if ( $(this).hasClass('L')) offsetLeft = 0;
				else if ( $(this).hasClass('R')) offsetLeft = w-ows;
				
				$(this).css('width',ows).css('height',ohs).css('top',offsetTop).css('left',offsetLeft);
			}
		});
	}
	
	function scrollHandler(){
	
		var windowHeight = $(window).height();
		var scroll = $(window).scrollTop();
		
		// home intro text
		if ( autoScrollComplete ){
			homeIntroTextOpen.forEach(function(c,i,a){
				var elementPosition = $(c.target).offset().top;
				if ( !c.isOpen && elementPosition-scroll < windowHeight/3*2 ){
					$(c.target).css('transition','all 1500ms');
					$(c.target).css('opacity',1.0);
					c.isOpen = true;
				}
			});
		}
		
		// feature_detail sp img
		$('h3 .article-section img').each(function(){
			var elementPosition = $(this).offset().top;
			if (elementPosition-scroll < windowHeight/3*2 ){
				$(this).css('transition','all 1500ms');
				$(this).css('opacity',1.0);
			}else if ( scroll < elementPosition - windowHeight ){
				// $(this).css('opacity',0);
			}
		});
		
		
		// feature_detail pc img
		var n=featureList.length;
		for ( var i=0; i<n; i++ ) {
			var target = featureList[i].target;
			var elementPosition = $(target).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (elementPosition-scroll < windowHeight ){
				featureList[i].offset = 0.03;/* featureページ　feature-list-cellの画像表示速度 */
			}else if ( scroll < elementPosition - windowHeight ){
				//featureList[i].offset = -1;
			}
		}
		
		// feature_detail.html images
		var currentMenu = 0;
		
		$('h3.section-heading').each( function(i,c){
			if ( $(this).offset().top-scroll < windowHeight / 2 ) {
				$('.image-block .fig:nth-child('+(i+1)+')').css('opacity',1).css('transition','all 1500ms').css('position','absolute');
				currentMenu = i;
			}else{
				if ( i != 0 ) $('.image-block .fig:nth-child('+(i+1)+')').css('opacity',0);
			}
		});
		
		currentMenu
		$('.breadcrumb span').each( function(i,c){
			if ( i == currentMenu ) {
				$(this).addClass('current');
			}else{
				$(this).removeClass('current');
			}
		});
	}
	
	function autoScrollCompleteHandler(){
		autoScrollComplete = true;
		reloadHandler();
	}
	
	function reloadHandler(){
		featureList = [];
		$('.feature-list-cell').each(function(i,c){
			$('.image-block',this).prepend('<div class="border_effect TL"></div>');
			$('.image-block',this).prepend('<div class="border_effect BR"></div>');
			$('.number,.title,.discription,.name,img',this).css('opacity',0);
			//$('.image-block',this).css('overflow','hidden');
			//$('.image-block img',this).css('transform','scale(1.02)');
			var o={target:this, k:0, offset:0, complete:false }
			featureList.push(o);
		});
		$('.section.intro p,.section.intro h2,.section.intro h3,.section.intro .link_ms_01').each(function(i,c){$(this).css('opacity',0)});
		$('h3 .article-section img').each(function(i,c){$(this).css('opacity',0)});
		scrollHandler();
	}
	
	/* featureページ　feature-list-cellの表示順番調整 */
	function enterframe(){
		var n=featureList.length;
		for ( var i=0; i<n ; i++ ) {
			var o = featureList[i];
			if ( !o.complete && o.offset > 0 ) {
				o.k = Math.min( Math.max( 0 , o.k + o.offset ) , 2 );
				var op1 = Math.min( Math.max( 0 , o.k) , 1 );/* 1番目（日本語タイトル） */
				var op2 = Math.min( Math.max( 1 , o.k) , 2 ) - 1;/* 2番目（それ以外のテキスト） */
				var k = Math.min( Math.max( 0 , o.k) , 1 );/* 1番目（外線） */
				var op3 = Math.min( Math.max( 1 , o.k) , 2 ) - 1;/* 2番目（画像） */
				var TL = $('.border_effect.TL', o.target);
				var BR = $('.border_effect.BR', o.target);
				var w = TL.parent().width();
				var h = BR.parent().height();
				var wk = Math.floor( w * k );
				var hk = Math.floor( h * k );
				$('.discription', o.target).css('opacity',op1);
				$('.number,.title,.name', o.target).css("opacity",op2 );
				TL.width(wk-1);
				TL.height(hk-1);
				BR.width(wk-1);
				BR.height(hk-1);
				BR.css('left',w-wk);
				BR.css('top',h-hk);
				
				$('.image-block img', o.target).css('opacity',op3);
				//$('.image-block img', o.target).css('transform','scale('+(1.02-op3*0.02)+')');
				if ( o.k >= 2 ) {
					o.complete = true;
					TL.hide();
					BR.hide();
				}
			}
		}
		
		// feature_detail.html footer
		var bcHeight =  $('.breadcrumb div').height() + 60;
		var windowBottom = window.innerHeight;

		// infocus - 下記をコメントアウト
		// $('.breadcrumb').css('top', windowBottom - bcHeight );
		
	}
	
	
	// cookie
	visited = document.cookie.split( '; ' )[ 0 ].split( '=' )[ 1 ];
	reloaded = window.name == window.location.href;
	
	// cookie update
	var expire = new Date();
	expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
	document.cookie = 'visited=true; expires=' + expire.toUTCString();

	// 初回のみ言語判定
	// if ( !visited ) {
		
	// 	var language = (window.navigator.languages && window.navigator.languages[0]) ||
	// 	window.navigator.language ||
	// 	window.navigator.userLanguage ||
	// 	window.navigator.browserLanguage;
		
	// 	var isJapanese = ( language.indexOf("ja") != -1 );
		
	// 	var href = window.location.href.split('/');
	// 	var enUrl = ( href[3] == 'en' );
		
	// 	if ( isJapanese && enUrl ) {
	// 		// 日本語なのに英語URL
	// 		href.splice(3,1);
	// 		location.href = href.join('/');
	// 	} else if ( !isJapanese && !enUrl ) {
	// 		// 英語なのに日本語URL
	// 		href.splice(3,0,'en');
	// 		location.href = href.join('/');
	// 	}
		
	// }
	
	
	// if ( reloaded || !visited ) {
	// 	if($('body#home').length){
	// 		setTimeout(function(){
	// 			$('#header').fadeIn(500,'kazshOut');
	// 			$('#splash').remove();
	// 		},2450);
	// 		// infocus edit
	// 		$('body').append('<!-- Splash --><div id="splash"><img src="/assets/img/header/logo.svg" alt=""></div>');
	// 	}else{
	// 		$('#header').fadeIn(0);
	// 	}
	// }else{
	// 	$('#header').fadeIn(0);
	// }

	// 毎回ローディング
	if($('body#home').length){
			setTimeout(function(){
				$('#header').fadeIn(500,'kazshOut');
				$('#splash').remove();
			},2450);
			// infocus edit
			$('body').append('<!-- Splash --><div id="splash"><img src="assets/img/header/logo.svg" alt=""></div>');
		}else{
			$('#header').fadeIn(0);
		}
	
	window.name = window.location.href;	
	
	reloadHandler();
	scrollHandler();
	featureDetailsImageResizeHandler();
	init();
});



