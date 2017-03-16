$(function() {
    $(window).on('load', function() {
        // kv_pc();
        fig_scale();
    });

    $(window).on('resize', function() {
        // kv_pc();
        fig_scale();
    });

   $(window).scroll(function() {
    	if($(document).scrollTop() >= 30){
    		$('.kv span').css('display', 'none');;
    	}else{
    		$('.kv span').fadeIn();
    	}
    });

   function fig_scale(){
    var rate = $(window).width() / $(window).height();
    if(rate < 1.55){
        $('.fig.scale img').css({
            'transform': 'scale(0.7)',
            'margin-left': '25px'
        });
    }else{
        $('.fig.scale img').css({
            'transform': 'scale(1)',
            'margin-left': '0'
        });
    }
   }

    function kv_pc() {
        var h = $(window).width() / 2000 * 1334;
        $('.pc-block li').css('height', h);

        if ($('.pc-block li').height() > $(window).height()) {
            $('.kv span').css({
                top: '90vh',
                bottom: 'auto'
            });
        } else {
            $('.kv span').css({
                top: 'auto',
                bottom: '75px'
            });
        }
    }

    function article_intro() {
        setTimeout(function() {
            $('.intro_article .lead').fadeIn(800);
        },100);

        setTimeout(function() {
        	$('.intro_article').fadeOut(800);
        },1700);
    }
    article_intro();

    function fade_move() {
        var $html = $('html');
        var $trigger = $(document.getElementById('trigger_move_on'));
        var $close = $(document.getElementById('close_video_btn'))
        var $target = $(document.getElementById('video_fade_wrap'));

        var video = $html.find('.topvideo');
        var videoWrap = document.getElementById('wrap_topvideo');
        var thumb = document.getElementById('topvideothumb');
        
        var $video = $(video);
        var $videoWrap = $(videoWrap);
        var $thumb = $(thumb);
        
        var wTop;
        var speed = 400;
        var flag = true;
        var ytPlayer;

        // IFrame Player API の読み込み
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        $('#wrap_topvideo').css({
                'opacity':0,
                'width':'100%',
                'height':$(window).innerWidth() * 0.5625
        });

        // YouTubeの埋め込み
        function onYouTubeIframeAPIReady() {
            if(flag){
                if($('body').hasClass('en')){
                    ytPlayer = new YT.Player(
                        'topvideo', // 埋め込む場所の指定
                        {
                            width: '100%', // プレーヤーの幅
                            height: '100%', // プレーヤーの高さ
                            videoId: '6AM5jA7San8', // YouTubeのID
                            events: {
                              'onReady': onPlayerReady
                            },
                            playerVars: {
                                rel: 0, // 再生終了後に関連動画を表示するかどうか設定
                            }
                        }
                    )
                } else {
                    ytPlayer = new YT.Player(
                        'topvideo', // 埋め込む場所の指定
                        {
                            width: '100%', // プレーヤーの幅
                            height: '100%',
                            videoId: '6AM5jA7San8', // YouTubeのID
                            events: {
                              'onReady': onPlayerReady
                            },
                            playerVars: {
                                rel: 0, // 再生終了後に関連動画を表示するかどうか設定
                            }
                        }
                    )
                }
            }
        }

        function ratio(vObj){
            var $w = $(window);
            var wH = $w.innerHeight();
            var wW = $w.innerWidth();



            //console.log(vObj);
            var vH = vObj.innerHeight();
            var vW = vObj.innerWidth();

            if(vObj == $thumb){
                if(wW >1240){
                    var rR = 2.4;
                } else {
                    var rR = vW / vH ;
                }

                var rW = wW/wH;

                if(rR > rW){
                    vObj.addClass('is-width');
                    vObj.removeClass('is-height');
                } else{
                    vObj.addClass('is-height');
                    vObj.removeClass('is-width');
                }
            } else {
                if(wW >1240){
                    var rR = 2.4;
                } else {
                    var rR = vW / vH ;
                }

                var rW = wW/wH;


               if(wW > 1024){
                    if(vH > (wH - 300)){           
                        vObj.css({
                            'width':'100%',
                            'height':wH  - 150,
                            'max-width':(wH  - 150) / 0.5625,
                            'max-height':wH  - 150
                        });
                    } else if(vW > wW){      
                        vObj.css({
                            'width':'100%',
                            'height':$(window).innerWidth() * 0.5625,
                            'max-width':'none',
                            'max-height':'none'
                        });
                    } else {        
                        if(rR > rW){
                            vObj.css({
                                'width':'100%',
                                'height':$(window).innerWidth() * 0.5625,
                                'max-width':'none',
                                'max-height':'none'
                            });
                        } else{
                            vObj.css({
                                'width':wH / 0.5625 ,
                                'height':wH,
                                'max-width':'none',
                                'max-height':'none'
                            });
                        }
                    }
                } else {
                    if(vH > (wH - 200)){
                        vObj.css({
                            'width':'100%',
                            'height':wH  - 200,
                            'max-width':(wH  - 150) / 0.5625,
                            'max-height':wH  - 150
                        });
                    } else {
                        if(rR > rW){
                            vObj.css({
                                'width':'100%',
                                'height':$(window).innerWidth() * 0.5625,
                                'max-width':'none',
                                'max-height':'none'
                            });
                        } else{
                            vObj.css({
                                'width':(wH  - 150) / 0.5625 ,
                                'height':wH  - 150,
                                'max-width':'none',
                                'max-height':'none'
                            });
                        }
                    }
                }   

            }

        };

        ratio($thumb);

        $(window).on('resize',function(){
             var video = document.getElementById('wrap_topvideo');
             var $video = $(video);

            ratio($video);
            ratio($thumb);
        });

        $(window).on('onmaximize onminimize',function(){
             var video = document.getElementById('wrap_topvideo');
             var $video = $(video);

            setTimeout(function(){
                ratio($video);
                ratio($thumb);
            },1000);
        });

        function onPlayerReady(event) {
             flag = false;
            　
             if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
                  && navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
             } else {
                 // 再生を開始します。
                 event.target.playVideo();
             }

             $('#wrap_topvideo').stop().delay(300).animate({
                'opacity':1
             },1000);
        };


        //クリックで実行
        $trigger.on('click',function(e){
            //video.load();
            wTop = $(window).scrollTop();
            $target.stop().fadeIn(0,function(){
                onYouTubeIframeAPIReady();
                $(this).animate({
                    opacity:1
                },speed,'swing',function(){
                    if(!flag){

                        if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
                            && navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
                        } else {
                            ytPlayer.playVideo();
                        }
                        $('#wrap_topvideo').stop().delay(300).animate({
                            'opacity':1
                        },1000);
                    }
                    var video = document.getElementById('wrap_topvideo');
                    var $video = $(video);
                    ratio($video);
                    thumb.pause();
                    $html.addClass('is-fixed').css('top', 0 * wTop);
                });
            });
        });
        $close.on('click',function(e){
            ratio($thumb);
            $target.animate({
                opacity:0
            },speed,'swing',function(){
                $(this).hide();
                ytPlayer.stopVideo();
                $html.removeClass('is-fixed').prop( { scrollTop: wTop } );
                thumb.play();
                $('#wrap_topvideo').css({
                    'opacity':0
                });
            });
        });
    };
    fade_move();
});

