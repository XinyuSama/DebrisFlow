"use strict";
/**
 * description: department.router.content
 * date: 2022/3/11 10:12
 * author: 123
 * version: 1.0
 */
const ConnectionMenu = require('../../../configs/database');
class Service {
    async f_getMenubar() {
        const tag1 = 'select a.id,a.tag1Name,a.IconUrl from tag a ';
        const [tagids] = await ConnectionMenu.execute(tag1);
        const tagi = `select tag2Name,tag2_id from tag2 where tag1_id=?`;
        const tagii = `select tag3Name,tag3_id from tag3 where tag2_id=?`;
        for (const tagid of tagids) {
            [tagid.tag2Name] = await ConnectionMenu.execute(tagi, [tagid.id]);
            for (const tag2idElement of tagid.tag2Name) {
                [tag2idElement.tag3Name] = await ConnectionMenu.execute(tagii, [tag2idElement.tag2_id]);
            }
        }
        return {
            tagids
        };
    }
    async b_getMenubar() {
        const tag1 = 'select a.id,a.tag1Name from tag a ';
        const [tagids] = await ConnectionMenu.execute(tag1);
        const menu1 = 'select * from b_menu';
        const menu2 = 'select *from b_menu_children';
        const [menus1] = await ConnectionMenu.execute(menu1);
        const [menus2] = await ConnectionMenu.execute(menu2);
        for (const menus1Element of menus1) {
            if (menus1Element.id == 1) {
                for (const tagidsElement of tagids) {
                    tagidsElement.authName2 = tagidsElement.tag1Name;
                    tagidsElement.path = "/" + tagidsElement.tag1Name;
                    tagidsElement["tag1Name"] = undefined;
                }
                menus1Element.children = tagids;
            }
            else {
                menus1Element.children = [];
                for (const menus2ElementElement of menus2) {
                    if (menus2ElementElement.b_menu_id == menus1Element.id) {
                        menus2ElementElement["b_menu_id"] = undefined;
                        menus1Element.children.push(menus2ElementElement);
                    }
                }
            }
        }
        return {
            menus1
        };
    }
}
module.exports = new Service();
//# sourceMappingURL=dao.user.ts.map
