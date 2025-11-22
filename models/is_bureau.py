# -*- coding: utf-8 -*-

from odoo import models, fields, api

class IsBureauMixin(models.AbstractModel):
    _name = 'is.bureau.mixin'
    _description = 'Bureau Mixin'

    position_x = fields.Integer(string="Position X")
    position_y = fields.Integer(string="Position Y")

class IsBureauFavoris(models.Model):
    _name = 'is.bureau.favoris'
    _inherit = ['is.bureau.mixin']
    _description = 'Favoris Bureau'

    name = fields.Char(string="Nom du favoris", required=True)
    image = fields.Image(string="Image")
    color = fields.Integer(string="Couleur")
