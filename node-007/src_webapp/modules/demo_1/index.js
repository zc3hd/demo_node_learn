function App(argument) {
  var me = this;

  me.index = 0;
}
App.prototype = {
  init: function() {
    var me = this;
    me._bind();

    me.list();

    me.add();

    me.edit();

    me.del();

  },
  _bind: function() {
    var me = this;
    var fns = {
      add: function() {

        $('#add').on('click', function() {
          $.ajax({
              url: "/api/demo_1/add.do",
              dataType: "json",
              type: "POST",
              data: {
                name: "xx_" + me.index,
                age: "age_" + me.index,
              }
            })
            .done(function(data) {
              me.index++;
              me.list();
            });
        });
      },
      list: function() {
        $.ajax({
            url: "/api/demo_1/list.do",
            dataType: "json",
            type: "POST",
          })
          .done(function(data) {

            // console.log('list')
            // console.log(data);
            // console.log('**************************')
            var str = '';
            $('#list').html(str);

            data.forEach(function(ele, index) {
              str += `
			        <div class="item">
			          <span>${ele.name}</span>
			          <span>${ele.age||ele.info||"--"}</span>
			          <span class="edit" _id=${ele._id}>edit</span>
			          <span class="del" _id=${ele._id}>del</span>
			        </div>
			        `;
            });
            $('#list').html(str);
          });

        $.ajax({
            url: "/api/demo_1/count.do",
            dataType: "json",
            type: "POST",
          })
          .done(function(data) {

            // console.log(data);
            $('#count').html(`共 ${data.count} 条数据`);
          });
      },

      edit: function() {
        $('#list').on('click', '.edit', function(e) {

          $.ajax({
              url: "/api/demo_1/edit.do",
              dataType: "json",
              type: "POST",
              data: {
                _id: $(e.currentTarget).attr('_id')
              }
            })
            .done(function(data) {
              // me.index++;

              me.list();
            });

        });
      },

      del: function() {
        $('#list').on('click', '.del', function(e) {

          $.ajax({
              url: "/api/demo_1/del.do",
              dataType: "json",
              type: "POST",
              data: {
                _id: $(e.currentTarget).attr('_id')
              }
            })
            .done(function(data) {
              // me.index++;

              me.list();
            });

        });
      },
    };

    for (var key in fns) {
      me[key] = fns[key];
    }
  },
};

new App().init();
