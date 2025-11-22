/** @odoo-module */

import { Component, useRef } from "@odoo/owl";
import { useDraggable } from "@web/core/utils/draggable";
import { useService } from "@web/core/utils/hooks";
import { url } from "@web/core/utils/urls";

export class BureauRenderer extends Component {
    static template = "is_bureau.BureauRenderer";
    static props = ["list", "archInfo"];

    setup() {
        this.rootRef = useRef("root");
        this.actionService = useService("action");
        this.isDragging = false;
        
        useDraggable({
            ref: this.rootRef,
            elements: ".o_bureau_item",
            onDragStart: () => { this.isDragging = true; },
            onDragEnd: () => { 
                 setTimeout(() => { this.isDragging = false; });
            },
            onDrop: (params) => this.onDrop(params),
        });
    }

    onItemClick(record) {
        if (this.isDragging) {
            return;
        }
        if (this.props.archInfo.action && this.props.archInfo.type === 'object') {
            this.actionService.doActionButton({
                resModel: record.resModel,
                resId: record.resId,
                name: this.props.archInfo.action,
                type: 'object',
            });
            return;
        }
        if (this.props.archInfo.canOpen) {
            this.actionService.switchView("form", { resId: record.resId });
        }
    }

    onDrop({ element }) {
        const recordId = element.dataset.id;
        const record = this.props.list.records.find(r => r.resId === parseInt(recordId));
        
        if (record) {
             const containerRect = this.rootRef.el.getBoundingClientRect();
             const elementRect = element.getBoundingClientRect();
             
             let newX = elementRect.left - containerRect.left;
             let newY = elementRect.top - containerRect.top;
             
             newX = Math.max(0, newX);
             newY = Math.max(0, newY);

             record.update({
                 position_x: parseInt(newX),
                 position_y: parseInt(newY),
             }).then(() => {
                 return record.save();
             });
        }
    }

    hasImage(record) {
        const imageField = this.props.archInfo.imageField;
        return imageField && record.data[imageField];
    }

    getImageUrl(record) {
        const imageField = this.props.archInfo.imageField;
        if (!imageField) return "";
        return url("/web/image", {
            model: record.resModel,
            id: record.resId,
            field: imageField,
        });
    }

    getColorClass(record) {
        const colorField = this.props.archInfo.colorField;
        if (colorField && record.data[colorField] != null) {
            return `o_color_${record.data[colorField]}`;
        }
        return "";
    }

    getBgStyle() {
        const bgColor = this.props.archInfo.bgColor;
        if (bgColor) {
            return `background: linear-gradient(to bottom right, ${bgColor}, #f0f0f0);`;
        }
        return "";
    }
}
