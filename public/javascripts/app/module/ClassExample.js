define(function() {
    function ClassExample(el) {
        this.el = el;
    }

    ClassExample.prototype.open = function () {
        //
    };

    ClassExample.prototype.close = function () {
        //
    };

    // 객체가 아닌 생성자 함수를 반환한다.
    return ClassExample;
});

// require([  
//     'module/ClassExample'
// ], function (ClassExample) {
//     var someLayer = new ClassExample(document.getElementById('some-layer'));
//     someLayer.open();
// });
