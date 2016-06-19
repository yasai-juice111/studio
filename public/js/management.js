$(document).ready(function() {
	$('input[name="room_image"]').on('change', function(e){
        console.log("aaa")
        //  multiple指定はしてないので1個だけ入ってくるはず
        var f = e.target.files[0];
        console.log(f);
        if (f.type.match('image.*')){
            //  Reader生成
            var reader = new FileReader();
            //  Readerのロード完了時のハンドラ
            reader.onload = (function(){
                //  この時点でreader.resultにはファイルがdataURL化された文字列が入る
                $('img#picture').attr('src', reader.result);
            });
            //  dataURL形式で読み込み
            reader.readAsDataURL(f);
        }
    });

    $('#addStation').on('click', function(e) {
        var count = $('input[name="shop_nearest_station"]').length;
        $('#stations').append('<h4>【最寄駅情報' + (count+1) +'】<input type="button" class="delete_column_button" value="最寄駅' + (count+1) +'を削除する"></h4><h6>■︎駅名</h6><input type="text" name="shop_nearest_station" value=""></input><h6>■徒歩</h6><textarea name="shop_walking_time" rows="4" cols="40"></textarea>');
    });

    $('#addPrice').on('click', function(e) {
        var count = $('select[name="youbi"]').length;
        $('#prices').append('<h4>【料金プラン' + (count+1) +'】</h4><h6>■曜日</h6><select name=youbi><option value=heijitu>平日<option value=kyujitu>休日<option value=syukujitu>祝日<option value=kyusyukujitu>休日・祝日<option value=monday>月曜<option value=tuesday>火曜<option value=wednesday>水曜<option value=thursday>木曜<option value=friday>金曜<option value=saturday>土曜<option value=sunday>日曜</select><h6>■時間帯</h6><select name=since_hour><option value=00>00<option value=01>01<option value=02>02<option value=03>03<option value=04>04<option value=05>05<option value=06>06<option value=07>07<option value=08>08<option value=09>09<option value=10>10<option value=11>11<option value=12>12<option value=13>13<option value=14>14<option value=15>15<option value=16>16<option value=17>17<option value=18>18<option value=19>19<option value=20>20<option value=21>21<option value=22>22<option value=23>23</select><select name=since_minutes><option value=00>00<option value=05>05<option value=10>10<option value=15>15<option value=20>20<option value=25>25<option value=30>30<option value=35>35<option value=40>40<option value=45>45<option value=50>50<option value=55>55</select>〜<select name=from_hour><option value=00>00<option value=01>01<option value=02>02<option value=03>03<option value=04>04<option value=05>05<option value=06>06<option value=07>07<option value=08>08<option value=09>09<option value=10>10<option value=11>11<option value=12>12<option value=13>13<option value=14>14<option value=15>15<option value=16>16<option value=17>17<option value=18>18<option value=19>19<option value=20>20<option value=21>21<option value=22>22<option value=23>23</select><select name=from_minutes><option value=00>00<option value=05>05<option value=10>10<option value=15>15<option value=20>20<option value=25>25<option value=30>30<option value=35>35<option value=40>40<option value=45>45<option value=50>50<option value=55>55</select><h6>■単位時間</h6><select name=unit_time><option value=10minutes>10分<option value=15minutes>15分<option value=30minutes>30分<option value=1hour selected>1時間<option value=pack>パック</select><h6>■料金</h6><input name=price>');
    });

    // 店舗追加のイベント
    $("#studioRegistForm .remodal-confirm").on("click",function(e) {
        var titleValid = true;
        var telValid = true;
        $("#studioRegistForm input[name='studioAreaName']").prev().addClass("hidden");
        $("#studioRegistForm input[name='tel']").prev().addClass("hidden");

        var title = $("#studioRegistForm input[name='studioAreaName']").val();
        var tel = $("#studioRegistForm input[name='tel']").val();
        if (title == "" || title.match(/^[ 　\r\n\t]*$/)) {
            $("#studioRegistForm input[name='studioAreaName']").prev().removeClass("hidden");
            titleValid = false;
        } 
        if(tel == "" || tel.match(/^[ 　\r\n\t]*$/) || !tel.match(/^[0-9]+$/)) {
            $("#studioRegistForm input[name='tel']").prev().removeClass("hidden");
            telValid = false;
        } 

        if(titleValid && telValid) {
           document.studioRegist.submit();
        }
    });

    // 店舗編集のイベント
    $("#studioEditorm .remodal-confirm").on("click",function(e) {
        var titleValid = true;
        var telValid = true;
        $("#studioEditorm input[name='studioAreaName']").prev().addClass("hidden");
        $("#studioEditorm input[name='tel']").prev().addClass("hidden");

        var title = $("#studioEditorm input[name='studioAreaName']").val();
        var tel = $("#studioEditorm input[name='tel']").val();
        if (title == "" || title.match(/^[ 　\r\n\t]*$/)) {
            $("#studioEditorm input[name='studioAreaName']").prev().removeClass("hidden");
            titleValid = false;
        } 
        if(tel == "" || tel.match(/^[ 　\r\n\t]*$/) || !tel.match(/^[0-9]+$/)) {
            $("#studioEditorm input[name='tel']").prev().removeClass("hidden");
            telValid = false;
        } 

        if(titleValid && telValid) {
           document.studioEdit.submit();
        }
    });

    // スタジオ登録のイベント
    $("#studioAreaRegistForm .remodal-confirm").on("click",function(e) {
        var enableSubmitFlag = true;
        var name = $("#studioAreaRegistForm input[name='name']").val();
        var roomSize = $("#studioAreaRegistForm textarea[name='roomSize']").val();
        var maximumNumber = $("#studioAreaRegistForm input[name='maximumNumber']").val();
        if (name == "" || name.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaRegistForm .nameError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaRegistForm .nameError").addClass("hidden");
        }

        if (roomSize == "" || roomSize.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaRegistForm .roomError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaRegistForm .roomError").addClass("hidden");
        }

        if (maximumNumber == "" || maximumNumber.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaRegistForm .maximumError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaRegistForm .maximumError").addClass("hidden");
        }
        if (enableSubmitFlag) {
           document.studioAreaRegist.submit();
        }
    }); 

    // スタジオ編集のイベント
    $("#studioAreaEditForm .remodal-confirm").on("click",function(e) {
        var enableSubmitFlag = true;
        var name = $("#studioAreaEditForm input[name='name']").val();
        var roomSize = $("#studioAreaEditForm textarea[name='roomSize']").val();
        var maximumNumber = $("#studioAreaEditForm input[name='maximumNumber']").val();
        if (name == "" || name.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaEditForm .nameError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaEditForm .nameError").addClass("hidden");
        }

        if (roomSize == "" || roomSize.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaEditForm .roomError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaEditForm .roomError").addClass("hidden");
        }

        if (maximumNumber == "" || maximumNumber.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaEditForm .maximumError").removeClass("hidden");
            enableSubmitFlag = false;
        } else {
            $("#studioAreaEditForm .maximumError").addClass("hidden");
        }
        if (enableSubmitFlag) {
           document.studioAreaEdit.submit();
        }
        // var title = $("#studioAreaEditForm input[name='name']").val();
        // if (title == "" || title.match(/^[ 　\r\n\t]*$/)) {
        //     $("#studioAreaEditForm .error").removeClass("hidden");
        // } else {
        //    document.studioAreaEdit.submit();
        // }
    });

    // 料金登録のイベント
    $("#studioAreaRoomFeestructureForm .remodal-confirm").on("click",function(e) {
        var enableSubmitFlag = true;
        var price = $("#studioAreaRoomFeestructureForm input[name='price']").val();
        if (price == "" || price.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaRoomFeestructureForm .priceError").removeClass("hidden");
            enableSubmitFlag = false;
        }
        if (enableSubmitFlag) {
           document.studioFeestructureRegist.submit();
        }
    });

    // 料金編集のイベント
    $("#studioAreaRoomFeestructureFormEdit .remodal-confirm").on("click",function(e) {
        var enableSubmitFlag = true;
        var price = $("#studioAreaRoomFeestructureFormEdit input[name='price']").val();
        if (price == "" || price.match(/^[ 　\r\n\t]*$/)) {
            $("#studioAreaRoomFeestructureFormEdit .priceError").removeClass("hidden");
            enableSubmitFlag = false;
        }
        if (enableSubmitFlag) {
           document.studioFeestructureEdit.submit();
        }
    });
});