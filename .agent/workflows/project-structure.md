---
description: Structure du Projet Refactorisé
---

Le projet a été refactorisé pour améliorer la maintenabilité et la lisibilité du code en extrayant les parties complexes des composants principaux vers des sous-composants spécialisés.

### 📁 Structure des Dossiers

*   `src/components/Layout/Parts/` : Composants de navigation (Menu, Recherche, etc.)
*   `src/components/Product/Parts/` : Sous-parties des détails produits (Galerie, Specs, etc.)
*   `src/components/Admin/Parts/` : Modules du panneau d'administration (Stats, Tables, Éditeur, etc.)
*   `src/components/Checkout/Parts/` : Étapes du processus de commande.

### 🚀 Avantages

1.  **Lisibilité** : Les fichiers ne dépassent plus rarement 200 lignes.
2.  **Modularité** : Chaque composant a une responsabilité unique.
3.  **Performances** : Meilleure gestion des rendus React grâce au fractionnement des composants.
4.  **Premium Aesthetics** : Les animations et transitions sont préservées et isolées dans leurs composants respectifs.

### 🛠️ Maintenance

Lors de l'ajout d'une fonctionnalité à une page existante :
1. Identifiez le composant "Parts" correspondant dans le dossier `Parts/`.
2. Si vous créez une nouvelle section complexe, préférez l'extraire vers un nouveau fichier dans `Parts/`.
