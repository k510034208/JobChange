var app = new Vue({
  el: '#app',
  data: {
    analysis_memo : '',
    selection_memo : 'test',
  },
  methods: {
    updateContent: function (comp_id, type){

      var content;

      // 更新内容の取得
      if (type == 'analysis_memo'){
        content = this.analysis_memo;

      } else if(type == 'selection_memo'){
        content = this.selection_memo
      }

      // APIへの更新リクエスト
      fetch(`/api/v1/company/update`, {
        method: 'post',
        mode: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comp_id: comp_id,
          content: content,
          type:type,
        })
      })
        .then(res => {
          return res.json();
        })
        .then(json => {

          if (json.result == 'errror') {
            return;
          }

          return;
        });
    }
  },
});