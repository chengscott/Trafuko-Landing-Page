$(function() {

    $(window).on('load', function() {
        slideShow();
    });


    $(window).scroll(function() {
        if ($(document).scrollTop() >= $(window).height() - 75) {
            $('#header').addClass('white')
        } else {
            $('#header').removeClass('white')
        }

    });

    function slideShow() {
        var flg = 2;
        setInterval(function() {
            switch (flg) {
                case 1:
                    //1枚目に切り替え
                    $(".img2").fadeOut(1000);
                    $(".img1").fadeIn(1000);
                    break;

                case 2:
                    //2枚目に切り替え
                    $(".img1").fadeOut(1000);
                    $(".img2").fadeIn(1000);
                    break;
            }
            $("#debug").text(flg); //デバッグ用（ここは削除します）

            flg++;
            if (flg > 2) {
                flg = 1; //flg が 3 を越えたら 1 に戻す
            }
        }, 4000); //setInterval() で 3秒間隔で実行
    }

    // var video;
    // window.onscroll = function() {
    //     if ($(window).scrollTop() > 150) {
    //         //150ピクセル分スクロールしたら動画を一時停止
    //         if (!video.paused) {
    //             video.pause();
    //         }
    //     } else {
    //         //上部に戻ってきたら動画を再開
    //         if (video.paused) {
    //             video.play();
    //         }
    //     }
    // }

});

