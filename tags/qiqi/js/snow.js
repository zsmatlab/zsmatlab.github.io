/**
 * Created by lh on 2016/9/19.
 */
/**
 *
 */

function Snow(){
    var container = $("#content");
    var visualWidth = container.width();
    var visualHeight = container.height();
    var snowflakeURl = [
        'static/images/snowflake/snowflake1.png',
        'static/images/snowflake/snowflake2.png',
        'static/images/snowflake/snowflake3.png',
        'static/images/snowflake/snowflake4.png',
        'static/images/snowflake/snowflake5.png',
        'static/images/snowflake/snowflake6.png',
    ];
    /**
     * 椋橀洩鑺�
     */
    this.snowflake = function (){
        var $flakeContainer = $('#snowflake');

        //闅忔満浜х敓涓€寮犲浘
        function getImage(){
            return snowflakeURl[Math.floor(Math.random() * 6)];
        }

        /**
         * 鍒涘缓涓€涓洩鑺卞厓绱�
         */
        function  createSnowBox() {
            var  url = getImage();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        S.init()
        setInterval(function () {
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            // 闅忔満閫忔槑搴︼紝涓嶅皬浜�0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 鍒涘缓涓€涓洩鑺�
            var $flake = createSnowBox();

            $flake.css({
                left: startPositionLeft,
                opacity: randomStart}
            );

            // 鍔犲叆鍒板鍣�
            $flakeContainer.append($flake);

            // 寮€濮嬫墽琛屽姩鐢�
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //缁撴潫鍚庡垹闄�
            });
        },500)
    }
    return this;
}