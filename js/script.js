// COUNTER
// const counters = document.querySelectorAll('[data-counter]');

// if (counters) {
//     counters.forEach(counter_people => {
//         counter_people.addEventListener('click', e => {
//             const target = e.target;

//             if (target.closest('.counter_btn')) {
//                 if (target.closest('.counter_people').querySelector('input').value == '' && (target.classList.contains('counter_minus') || target.classList.contains('counter_plus'))
//                 ) {
//                     target.closest('.counter_people').querySelector('input').value = 0;
//                 }

//                 let value = parseInt(
//                     target.closest('.counter_people').querySelector('input')
//                         .value
//                 );

//                 if (target.classList.contains('counter_plus')) {
//                     value++;
//                 } else {
//                     --value;
//                 }

//                 if (value <= 0) {
//                     value = '';
//                     target.closest('.counter_people').querySelector('.counter_minus').classList.add('active');
//                 } else {
//                     target.closest('.counter_people').querySelector('.counter_minus').classList.remove('active');
//                 }

//                 if (value != '') {
//                     target.closest('.counter_people').querySelector('.wrap_minus').classList.add('minus_color');
//                 } else {
//                     target.closest('.counter_people').querySelector('.wrap_minus').classList.remove('minus_color');
//                 }

//                 target.closest('.counter_people').querySelector('input').value = value;
//             }
//         });
//     });
// }



const counters = document.querySelectorAll('[data-counter]');

if (counters) {
    counters.forEach(counter => {
        counter.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.counter_btn')) {
                if (target.closest('[data-counter]').querySelector('input').value == '' && (target.classList.contains('counter_minus') || target.classList.contains('counter_plus'))) {
                    target.closest('[data-counter]').querySelector('input').value = 0;
                }

                let value = parseInt(target.closest('[data-counter]').querySelector('input').value);

                if (target.classList.contains('counter_plus')) {
                    value++;
                } else {
                    --value;
                }

                if (value <= 0) {
                    value = '';
                    target.closest('[data-counter]').querySelector('.counter_minus').classList.add('active');
                } else {
                    target.closest('[data-counter]').querySelector('.counter_minus').classList.remove('active');
                }

                if (value != '') {
                    target.closest('[data-counter]').querySelector('.wrap_minus').classList.add('minus_color');
                 } else {
                     target.closest('[data-counter]').querySelector('.wrap_minus').classList.remove('minus_color');
                 }

                target.closest('[data-counter]').querySelector('input').value = value;
            }
        });
    });
}





// DRAGSCROLL - scroll area by dragging
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
})(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add' + EventListener;
    var removeEventListener = 'remove' + EventListener;
    var newScrollX, newScrollY;
    var dragged = [];
    var reset = function (i, el) {
        for (i = 0; i < dragged.length; ) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length; ) {
            (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    (cont.md = function (e) {
                        if (
                            !el.hasAttribute('nochilddrag') ||
                            _document.elementFromPoint(e.pageX, e.pageY) == cont
                        ) {
                            pushed = 1;
                            lastClientX = e.clientX;
                            lastClientY = e.clientY;
                            e.preventDefault();
                        }
                    }),
                    0
                );

                _window[addEventListener](
                    mouseup,
                    (cont.mu = function () {
                        pushed = 0;
                    }),
                    0
                );

                _window[addEventListener](
                    mousemove,
                    (cont.mm = function (e) {
                        if (pushed) {
                            (scroller = el.scroller || el).scrollLeft -=
                                newScrollX =
                                    -lastClientX + (lastClientX = e.clientX);
                            scroller.scrollTop -= newScrollY =
                                -lastClientY + (lastClientY = e.clientY);
                            if (el == _document.body) {
                                (scroller =
                                    _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }),
                    0
                );
            })(dragged[i++]);
        }
    };

    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }
    exports.reset = reset;
});