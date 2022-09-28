"use strict";
/**
 * description: department.router.menubar
 * date: 2022/3/11 10:13
 * author: 123
 * version: 1.0
 */
const ConnectionTag3 = require('../../../configs/mysql-config');
class ServiceTag3 {
    /**
     * @param:tag2_id,tag3Name
     * @Description:增加一个一级标签,返回增加标签的id
    */
    async createTag3(deportment) {
        const { tag2_id, tag3Name, } = deportment;
        const sortidsql = 'select sortid from tag3 where tag2_id=?;';
        const [sortNumber] = await ConnectionTag3.execute(sortidsql, [tag2_id]);
        const sql = 'INSERT INTO tag3 (tag2_id,tag3Name,sortid)VALUES( ?,?,?);';
        const res = await ConnectionTag3.execute(sql, [tag2_id, tag3Name, sortNumber.length + 1]);
        return res;
    }
    /**
     * @param:tag3_id
     * @Description:删除一个三级标签
    */
    async deleteTag3(deportment) {
        const { tag3_id } = deportment;
        //删除标题3
        const sql = 'DELETE  FROM tag3 WHERE tag3_id=?';
        const res = await ConnectionTag3.execute(sql, [tag3_id]);
        return res;
    }
    /**
     * @param:tag3_id,Changetag3Name,sortid
     * @Description:更改标签3
    */
    async updateTag3(deportment) {
        try {
            const { tag3_id, Changetag3Name: Changetag3Name = null, sortid: sortid = null } = deportment;
            if (Changetag3Name == null) {
                const sql = 'update tag3 set sortid=? WHERE tag3_id=?';
                const res = await ConnectionTag3.execute(sql, [sortid, tag3_id]);
                return res;
            }
            else if (sortid == null) {
                const sql = 'update tag3 set tag3Name=? WHERE tag3_id=?';
                const res = await ConnectionTag3.execute(sql, [Changetag3Name, tag3_id]);
                return res;
            }
            else {
                const sql = 'update tag3 set tag3Name=?,sortid=? WHERE tag3_id=?';
                const res = await ConnectionTag3.execute(sql, [Changetag3Name, sortid, tag3_id]);
                return res;
            }
        }
        catch (e) {
            return e;
        }
    }
    /**
     * @param:
     * @Description:查询标签3的所有标签和id
    */
    async selectTag3() {
        try {
            const sql = 'select * FROM tag3';
            const res = await ConnectionTag3.execute(sql);
            console.log(res);
            return res;
        }
        catch (e) {
            return e;
        }
    }
    /**
     * @param:tag2_id
     * @Description:根据tag2_id查询tag3
     */
    async selectTag3ByTag2(deportment) {
        try {
            const { tag2_id } = deportment;
            const sql = 'select * FROM tag3 where tag2_id=?';
            const res = await ConnectionTag3.execute(sql, [tag2_id]);
            console.log(res);
            return res;
        }
        catch (e) {
            return e;
        }
    }
    /**
     * @param:tag3_id
     * @Description:通过tag3_id查询详细数据
    */
    async selectTag3ByTag3(deportment) {
        try {
            const { tag3_id } = deportment;
            const sql = 'select * FROM tag3 where tag3_id=?';
            const res = await ConnectionTag3.execute(sql, [tag3_id]);
            console.log(res);
            return res;
        }
        catch (e) {
            return e;
        }
    }
}
module.exports = new ServiceTag3();
//# sourceMappingURL=tag3.js.map
