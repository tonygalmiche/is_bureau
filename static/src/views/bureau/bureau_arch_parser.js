/** @odoo-module */

import { visitXML } from "@web/core/utils/xml";
import { Field } from "@web/views/fields/field";

export class BureauArchParser {
    parse(arch, models, modelName) {
        const fieldNodes = {};
        const fieldNextIds = {};
        
        const imageField = arch.getAttribute("image_field");
        const colorField = arch.getAttribute("color_field");
        const create = arch.getAttribute("create") !== "false";
        const canOpen = arch.getAttribute("can_open") !== "0";
        const searchView = arch.getAttribute("search_view") !== "false";
        const reorganize = arch.getAttribute("reorganize") !== "false";
        const bgColor = arch.getAttribute("bg_color");
        const action = arch.getAttribute("action");
        const type = arch.getAttribute("type");

        visitXML(arch, (node) => {
            if (node.tagName === "field") {
                const fieldInfo = Field.parseFieldNode(node, models, modelName, "bureau");
                if (!(fieldInfo.name in fieldNextIds)) {
                    fieldNextIds[fieldInfo.name] = 0;
                }
                const fieldId = `${fieldInfo.name}_${fieldNextIds[fieldInfo.name]++}`;
                fieldNodes[fieldId] = fieldInfo;
                node.setAttribute("field_id", fieldId);
            }
        });

        return {
            fieldNodes,
            imageField,
            colorField,
            create,
            canOpen,
            searchView,
            reorganize,
            bgColor,
            action,
            type,
        };
    }
}
