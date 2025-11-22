# InfoSaône - Vue Bureau pour Odoo 18

Ce module ajoute un nouveau type de vue "Bureau" (Desktop) à Odoo 18, permettant un affichage et un positionnement libre des éléments (comme un bureau d'ordinateur).

## Fonctionnalités

*   **Nouveau type de vue :** Ajoute le type de vue `bureau` au système.
*   **Positionnement libre :** Utilise un mixin `is.bureau.mixin` pour stocker les coordonnées X et Y des enregistrements.
*   **Favoris de bureau :** Inclut un modèle `is.bureau.favoris` pour gérer des raccourcis ou favoris affichables sur le bureau avec :
    *   Nom
    *   Image
    *   Couleur
    *   Positionnement (X, Y)

## Détails Techniques

### Modèles

*   `is.bureau.mixin` : Modèle abstrait fournissant les champs `position_x` et `position_y`.
*   `is.bureau.favoris` : Modèle pour les éléments du bureau (hérite de `is.bureau.mixin`).
*   `res.users` : Étendu avec `is.bureau.mixin`.
*   `ir.ui.view` : Étendu pour supporter le type de vue `bureau`.

### Assets Web

Le module injecte les composants nécessaires pour le rendu de la vue Bureau dans le backend Odoo (OWL) :
*   Parser d'architecture
*   Contrôleur
*   Renderer (JS/XML/SCSS)
*   Définition de la vue

## Auteur

InfoSaône / Tony Galmiche

## Licence

AGPL-3
