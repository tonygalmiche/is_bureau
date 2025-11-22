/** @odoo-module */

import { registry } from "@web/core/registry";
import { RelationalModel } from "@web/model/relational_model/relational_model";
import { BureauArchParser } from "./bureau_arch_parser";
import { BureauController } from "./bureau_controller";
import { BureauRenderer } from "./bureau_renderer";

export const bureauView = {
    type: "bureau",
    display_name: "Bureau",
    icon: "fa fa-desktop",
    multiRecord: true,
    Controller: BureauController,
    Renderer: BureauRenderer,
    ArchParser: BureauArchParser,
    Model: RelationalModel,
    searchMenuTypes: ["filter", "favorite"],
    
    props: (genericProps, view) => {
        const { ArchParser } = view;
        const { arch, relatedModels, resModel } = genericProps;
        const archInfo = new ArchParser().parse(arch, relatedModels, resModel);

        return {
            ...genericProps,
            Model: view.Model,
            Renderer: view.Renderer,
            archInfo,
        };
    },
};

registry.category("views").add("bureau", bureauView);
