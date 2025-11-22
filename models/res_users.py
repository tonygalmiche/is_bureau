# -*- coding: utf-8 -*-

from odoo import models

class ResUsers(models.Model):
    _inherit = ['res.users', 'is.bureau.mixin']
    _name = 'res.users'
