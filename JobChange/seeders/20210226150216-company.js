'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        id: 1,
        c_name: "株式会社翔泳社",
        url: "https://www.shoeisha.co.jp/",
        application_requirement: "自社メディアの開発\n企画～運用まで一貫して対応可能",
        analysis_memo: "出版社＋取次＋Webメディア",
        selection_status: "書類通過、1次面談不合格",
        selection_memo: "面談不合格後、再検討依頼資料提出もやはり不合格"
      },
      {
        id: 2,
        c_name: "DMM",
        url: "https://www.dmm.com/",
        application_requirement: "自社サービスの開発\n",
        analysis_memo: "動画サービスとかエロとか",
        selection_status: "書類通過、1次面談不合格",
        selection_memo: "同人担当の人達が面接官で萎えたため辞退"
      }
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
