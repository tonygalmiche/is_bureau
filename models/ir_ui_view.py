# -*- coding: utf-8 -*-
from odoo import fields, models

class View(models.Model):
    _inherit = 'ir.ui.view'

    type = fields.Selection(selection_add=[('bureau', 'Bureau')])

    def _get_view_info(self):
        view_info = super()._get_view_info()
        view_info['bureau'] = {'icon': 'fa fa-desktop'}
        return view_info

