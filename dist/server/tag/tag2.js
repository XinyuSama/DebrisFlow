"use strict";
/**
 * description: department.router.menubar
 * date: 2022/3/11 10:13
 * author: 123
 * version: 1.0
 */
const ConnectionTag2 = require('../../../configs/database');
class ServiceTag2 {
    /**
     * @param:tag1_id,tag2Name
     * @Description:增加二级标签
    */
    async createTag2(deportment) {
        const { tag1_id, tag2Name } = deportment;
        const sql = 'INSERT INTO tag2 (tag1_id,tag2Name)VALUES( ?,?);';
        const res = await ConnectionTag2.execute(sql, [tag1_id, tag2Name]);
        return res;
    }
    /**
     * @param:tag2_id
     * @Description:删除一个二级标签
    */
    async deleteTag2(deportment) {
        const { tag2_id } = deportment;
        //删除标题2
        const sql = 'DELETE  FROM tag2 WHERE tag2_id=?';
        //根据标题2的id删除标题3与2对应的标题
        const sql2 = 'DELETE  FROM tag3 WHERE tag2_id=?';
        const res = await ConnectionTag2.execute(sql, [tag2_id]);
        const res2 = await ConnectionTag2.execute(sql2, [tag2_id]);
        return res2;
    }
    /**
     * @param:tag2_id,Changetag2Name
     * @Description:更新标题二
    */
    async updateTag2(deportment) {
        const { tag2_id, Changetag2Name, } = deportment;
        const sql = 'update tag2 set tag2Name=? WHERE tag2_id=?';
        const res = await ConnectionTag2.execute(sql, [Changetag2Name, tag2_id]);
        return res;
    }
    /**
     * @param:
     * @Description:查询所有的标签2名字和id
    */
    async selectTag2(deportment) {
        const { tag1_id, } = deportment;
        const sql = 'select * FROM tag2 where tag1_id=?';
        const res = await ConnectionTag2.execute(sql, [tag1_id]);
        return res;
    }
}
module.exports = new ServiceTag2();
//# sourceMappingURL=tag2.js.map
