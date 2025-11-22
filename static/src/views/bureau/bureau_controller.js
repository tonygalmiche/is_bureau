/** @odoo-module */

import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";
import { useModelWithSampleData } from "@web/model/model";
import { extractFieldsFromArchInfo } from "@web/model/relational_model/utils";
import { SearchBar } from "@web/search/search_bar/search_bar";
import { useSearchBarToggler } from "@web/search/search_bar/search_bar_toggler";

export class BureauController extends Component {
    static template = "is_bureau.BureauController";
    static props = ["*"];
    static components = { Layout, SearchBar };

    setup() {
        this.actionService = useService("action");
        this.model = useState(useModelWithSampleData(this.props.Model, this.modelParams));
        this.searchBarToggler = useSearchBarToggler();
    }

    get modelParams() {
        const { archInfo, resModel, fields: fieldsProps } = this.props;
        const { activeFields, fields } = extractFieldsFromArchInfo(archInfo, fieldsProps);

        return {
            config: {
                resModel,
                activeFields,
                fields,
            },
            limit: 80,
        };
    }

    async createRecord() {
        if (this.props.createRecord) {
            this.props.createRecord();
        } else {
            await this.actionService.switchView("form");
        }
    }

    async reorganize() {
        const records = this.model.root.records;
        const ITEM_WIDTH = 120; 
        const ITEM_HEIGHT = 140;
        const COLS = 8; 

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            
            const x = col * ITEM_WIDTH + 20;
            const y = row * ITEM_HEIGHT + 20;

            await record.update({
                position_x: x,
                position_y: y,
            });
            await record.save();
        }
    }
}
