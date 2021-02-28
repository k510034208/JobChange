'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        id: 1,
        c_name: "株式会社XXXXX",
        url: "https://www.xxxx.com/",
        application_requirement: "・自社サービスの開発\n・チームリーダーとして活躍",
        analysis_memo: "・めがベンチャー\n・動画サービス開発に注力",
        selection_status: "書類通過",
        selection_next_date: "2021/01/31",
        selection_next_content: "１次面談",
        selection_memo: "・PMとしての経験を活用\n・新規事業創出への挑戦をアピール"
      },
      {
        id: 2,
        c_name: "株式会社YYYYYY",
        url: "https://www.yyy.com/",
        application_requirement: "・自社サービスの開発\n・チームリーダーとして活躍",
        analysis_memo: "・めがベンチャー\n・動画サービス開発に注力",
        selection_status: "書類通過",
        selection_next_date: "2021/01/31",
        selection_next_content: "最終面談",
        selection_memo: "・PMとしての経験を活用\n・新規事業創出への挑戦をアピール"
      },
      {
        id: 3,
        c_name: "株式会社ZZZZZ",
        url: "https://www.zzzz.com/",
        application_requirement: "・自社サービスの開発\n・チームリーダーとして活躍",
        analysis_memo: "・めがベンチャー\n・動画サービス開発に注力",
        selection_status: "書類通過",
        selection_next_date: "2021/01/31",
        selection_next_content: "書類選考",
        selection_memo: "・PMとしての経験を活用\n・新規事業創出への挑戦をアピール"
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, [{
      id:1
    }, {
      id:2
    }]);
  }
};
