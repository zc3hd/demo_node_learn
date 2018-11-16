function FN() {
  var me = this;

  me.conf = {

    // ajax的接口设置
    ajax_opts: {
      url: "/list.do",
      dataType: "json",
      type: "POST",
    },
  };
}
FN.prototype = {
  init: function() {
    var me = this;
    me._bind();
    // 拿到请求的对象体

    me._list("/");

    me._list_ev();
  },
  _bind: function() {
    var me = this;
    var fns = {

      _list: function(path) {

      	var str = '';
      	$('#app').html(str);
      	
        me.conf.ajax_opts.data = {
          pathname: path
        };
        $.ajax(me.conf.ajax_opts)
          .done(function(arr) {


            arr.forEach( function(ele, index) {

            	// 文件
            	if (ele.key==0) {
            		str+=`
								<div class="box">
						      <div class="file" url=${ele.url} >${ele.name}</div>
						    </div>
            		`;
            	}
            	// dir
            	else {
            		str+=`
								<div class="box">
						      <div class="dir" url=${ele.url} >${ele.name}</div>
						    </div>
            		`;
            	}


            });


            $('#app').html(str);
          });
      },
      // 
      _list_ev:function () {
        $('#app').on('click','.dir',function (e) {
          $(e.target).attr('url');
          // console.log($(e.target).attr('url'));
          me._list($(e.target).attr('url'));
        });
        
        // $('#app').on('click','.file',function (e) {
        //   $(e.target).attr('url');
        //   console.log($(e.target).attr('url'));
        // });
      },

































    };
    for (var key in fns) {
      me[key] = fns[key]
    };
  },
};






new FN().init();
