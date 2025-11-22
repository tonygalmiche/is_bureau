# -*- coding: utf-8 -*-

{
  "name" : "InfoSaône - Vue Bureau pour Odoo 18",
  "version" : "0.1.0",
  "author" : "InfoSaône / Tony Galmiche",
  "category" : "InfoSaône",
  "description": """
InfoSaône - Vue Bureau pour Odoo 18
""",
  "maintainer": "InfoSaône",
  "website": "http://www.infosaone.com",
  "depends" : [
    'base',
    'web',
  ], 
  "init_xml" : [],            
  "demo_xml" : [
  ],            
  "data" : [
      'security/ir.model.access.csv',
      'views/is_bureau_views.xml',
      'views/res_users_views.xml',
  ],   
   'assets': {
        'web.assets_backend': [
            'is_bureau/static/src/views/bureau/bureau_arch_parser.js',
            'is_bureau/static/src/views/bureau/bureau_controller.js',
            'is_bureau/static/src/views/bureau/bureau_controller.xml',
            'is_bureau/static/src/views/bureau/bureau_renderer.js',
            'is_bureau/static/src/views/bureau/bureau_renderer.xml',
            'is_bureau/static/src/views/bureau/bureau_renderer.scss',
            'is_bureau/static/src/views/bureau/bureau_view.js',
        ],
    },
  "installable": True,         
  "active": False,            
  "application": True,
  "license": "AGPL-3",
}


