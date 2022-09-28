"use strict";
/**
 * description: department.router.menubar
 * date: 2022/3/11 10:13
 * author: 123
 * version: 1.0
 */
const ConnectionTag1 = require('../../../configs/mysql-config');
class ServiceTag1 {
    /**
     * @param:tag1Name,IconUrl
     * @Description:增加一个一级标签,返回增加标签的id
    */
    async createTag1(deportment) {
        const { tag1Name, IconUrl, } = deportment;
        const sql = 'INSERT INTO tag (tag1Name,IconUrl)VALUES( ?,?);';
        const res = await ConnectionTag1.execute(sql, [tag1Name, IconUrl]);
        return res;
    }
    /**
     * @param:tag1id
     * @Description:删除一个一级标签
    */
    async deleteTag1(deportment) {
        const { tag1_id } = deportment;
        //删除标题1
        const sql = 'DELETE  FROM tag WHERE id=?';
        //拿到标题2的id
        const sql2 = 'select tag2_id FROM tag2 WHERE tag1_id=?';
        //删除标题2
        const sql3 = 'DELETE  FROM tag2 WHERE tag1_id=?';
        //根据标题2的id删除标题3
        const sql4 = 'DELETE  FROM tag3 WHERE tag2_id=?';
        const res = await ConnectionTag1.execute(sql, [tag1_id]);
        const [[res2]] = await ConnectionTag1.execute(sql2, [tag1_id]);
        const res3 = await ConnectionTag1.execute(sql3, [tag1_id]);
        const res4 = await ConnectionTag1.execute(sql4, [res2.tag2_id]);
        return res4;
    }
    /**
     * @param:tag3_id,Changetag1Name,ChangeIconUrl
     * @Description:更改一级标签内容
    */
    async updateTag1(deportment) {
        const { tag3_id, Changetag1Name: Changetag1Name = null, ChangeIconUrl: ChangeIconUrl = null } = deportment;
        if (Changetag1Name == null) {
            const sql = 'update tag set IconUrl=? WHERE id=?';
            const res = await ConnectionTag1.execute(sql, [ChangeIconUrl, tag3_id]);
            return res;
        }
        else if (ChangeIconUrl == null) {
            const sql = 'update tag set tag1Name=? WHERE id=?';
            const res = await ConnectionTag1.execute(sql, [Changetag1Name, tag3_id]);
            return res;
        }
        else {
            const sql = 'update tag set tag1Name=?,IconUrl=? WHERE id=?';
            const res = await ConnectionTag1.execute(sql, [Changetag1Name, ChangeIconUrl, tag3_id]);
            return res;
        }
    }
    /**
     * @param:
     * @Description:查询所有的一级标签名字和id
    */
    async selectTag1() {
        const sql = 'select * FROM tag';
        const res = await ConnectionTag1.execute(sql);
        console.log(res, 777);
        return res;
    }
    async selectAllTag1() {
        const sql = 'select tag1Name,id FROM tag';
        const res = await ConnectionTag1.execute(sql);
        console.log(res, 777);
        return res;
    }
}
module.exports = new ServiceTag1();
//# sourceMappingURL=tag1.js.map
