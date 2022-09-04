"use strict";
/**
 * description: department.router.menubar
 * date: 2022/3/11 10:13
 * author: 123
 * version: 1.0
 */
const ConnectionVisit = require('../../../configs/database');
class DeportmentServiceVisit {
    /**
     * @param:tagName,IconUrl
     * @Description:增加一个一级标签,返回增加标签的id
    */
    async createTag1(deportment) {
        const { tagName, IconUrl, } = deportment;
        const sql = 'INSERT INTO tag (tag,IconUrl)VALUES( ?,?);';
        const res = await ConnectionMenubarTag1.execute(sql, [tagName, IconUrl]);
        return res;
    }
}
module.exports = new DeportmentServiceVisit();
//# sourceMappingURL=visit.js.map
