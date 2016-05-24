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
});