# DALF C1 — Révision (PWA)

Application web progressive (PWA) de révision du lexique pour la préparation au **DALF C1** (Diplôme Approfondi de Langue Française).

Fonctionne hors-ligne, installable sur Android (et tout navigateur moderne), sans serveur ni base de données.

---

## Fonctionnalités

**Flashcards avec répétition espacée (SRS)** — algorithme SM-2 adapté. Chaque carte est planifiée selon sa difficulté : les mots mal maîtrisés reviennent plus tôt, les mots bien sus s'espacent progressivement.

**921 entrées lexicales** issues du manuel *Je parle français DALF C1 — Lexique* (Éditions Tegos, 2021), réparties en 12 thèmes : alimentation, environnement, urbanisme, école, consommation, espace, santé, vie en société, langues et francophonie, numérique, travail, loisirs et cultures.

**Traductions en chinois** (caractères simplifiés) affichées sur chaque carte au moment de la révélation.

**Synthèse vocale (TTS)** — prononciation du terme français via l'API Web Speech intégrée au navigateur, sans dépendance externe.

**Rythmes de session configurables** :
- Tranquille — max 10 cartes / 5 nouvelles max
- Normal — max 20 cartes / 12 nouvelles max (par défaut)
- Intensif — max 30 cartes / 20 nouvelles max

**Filtrage par thème** — possibilité de limiter une session à un thème précis.

**Suivi de la progression** — statistiques globales, graphique de progression dans le temps, tableau détaillé par thème, et compteur de jours consécutifs (streak).

**Mode hors-ligne** — service worker qui met en cache l'application au premier chargement.

---

## Structure du projet

```
dalf-c1-pwa/
├── index.html            # Application complète (HTML + CSS + JS, fichier unique)
├── data.js               # Données lexicales (921 entrées) + ressources audio
├── manifest.webmanifest  # Manifeste PWA (nom, icônes, orientation…)
├── sw.js                 # Service worker (cache hors-ligne)
├── icon-192.svg          # Icône PWA 192 × 192
└── icon-512.svg          # Icône PWA 512 × 512
```

L'application ne nécessite aucun build, aucun framework, aucune dépendance npm. Tout le code réside dans `index.html` et `data.js`.

---

## Installation et utilisation

Héberger le dossier `dalf-c1-pwa/` sur n'importe quel serveur web (hébergement mutualisé, GitHub Pages, etc.) et ouvrir l'URL dans un navigateur moderne.

### Installation sur Android

1. Ouvrir l'URL dans Chrome pour Android.
2. Appuyer sur **« Ajouter à l'écran d'accueil »** dans le menu du navigateur.

L'application s'installe comme une application native et fonctionne ensuite hors-ligne.

---

## Sources des données

| Ressource | Source |
|-----------|--------|
| Lexique (921 entrées) | *Je parle français DALF C1 — Lexique*, Éditions Tegos (2021) |

---

## Données locales

Toute la progression est stockée dans le `localStorage` du navigateur. Aucune donnée n'est transmise à un serveur.

Le bouton **« Réinitialiser la progression »** dans l'écran de progression efface l'intégralité des données locales.
