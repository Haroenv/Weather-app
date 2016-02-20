weatherApp.ux = (function () {
    var _errorLocation = weatherApp.get.one('.error');

    function init() {
        var cities = weatherApp.get.one('.cities'),
            body = weatherApp.get.one('body'),
            hammer = new Hammer(cities),
            historyHammer = new Hammer(body);

        _swipeLeft(hammer);
        _swipeRight(hammer);
        historyBack(historyHammer);
    };
    //define swipes
    function _swipeLeft(hammer) {
        hammer.on('swipeleft', function (ev) {
            var deleteButton = weatherApp.get.one('.' + ev.target.id);
            var info = weatherApp.get.one('a#' + ev.target.id)
            var int = 0;

            setInterval(function () {
                int++;
                if (int < 100) {
                    info.style.right = int + "px"
                    deleteButton.style.width = int + "px";
                }
            }, 1)

        });
    };
    //define swpipe right
    function _swipeRight(hammer) {
        hammer.on('swiperight', function (ev) {
            var deleteButton = weatherApp.get.one('.' + ev.target.id),
                info = weatherApp.get.one('a#' + ev.target.id),
                int = 100;

            setInterval(function () {
                int--;
                if (int > -1) {
                    info.style.right = int + "px"
                    deleteButton.style.width = int + "px";
                }
            }, 2)

        });
    };

    function historyBack(hammer) {
        hammer.on('swiperight', (ev) => {
            window.history.back();
        });
    }

    function showErr(errMessage) { //show a error on top of the app.
        _errorLocation.classList.add('show-error');
        _errorLocation.innerHTML = errMessage;

        setTimeout(function () {
            _errorLocation.classList.remove('show-error');
            _errorLocation.innerHTML = '';
        }, 4000);
    };

    return {
        init: init,
        showErr: showErr,
        historyBack: historyBack
    };

})();
