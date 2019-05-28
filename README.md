# Challenge Le Closet

### Consignes générales

- cloner ce repo (_ne pas_ le forker)
- créer un repo personnel (nous envoyer le lien dès le début de l'exercice)
- faire des commits clairs et pertinents

N'hésitez pas à faire du _[shameless](https://blog.red-badger.com/2014/08/20/i-spent-3-days-with-sandi-metz-heres-what-i-learned) code_ dans un premier temps. Et si c'est le cas, commit le séparemment ! Vous ne serez pas pénalisé, bien au contraire.

Le boilerplate pour l'exercice utilise Rails 5.2.1, Ruby 2.4.3 & React 16

Lancer le back (port 3000) :

```bash
cd server
bundle install
rails db:setup
rails s
```

Lancer le front (port 3001) :

```bash
cd client
npm install
npm start
```

### Description du projet

Nous sommes une entreprise d'envoi de vêtements. Notre catalogue se compose de plusieurs produits (_Product_). Nous avons un certain nombre de pièces pour chaque produit (_Item_).

Il y a trois étapes avant l'envoi d'une pièce qui correspondent aux trois *Poste*s logistiques :

- le _picking_ où un opérateur sort les pièces nécessaires des stocks
- le _checking_ où un opérateur contrôle la qualité des pièces
- le _packing_ où un opérateur empacte la pièce et imprime le bordereau pour l'envoi

Un opérateur (_Operator_) peut changer de poste pendant la journée suivant les besoins.

### Travail demandé

_L'énoncé est volontairement très succinct. Nous souhaitons vous laisser le maximum de liberté sur les choix techniques. Si les choix effectués dans le boilerplate de l'application ne vous conviennent pas, vous êtes libres et incités à les changer._

Nous aimerions pouvoir tracker quel opérateur a réalisé telle action sur une pièce avant son envoi. A la fin de la journée, chaque opérateur se verra attribuer automatiquement un certain nombre de points suivant le nombre de pièces qu'il a traité. Un opérateur peut suivre l'évolution de ses points dans un dashboard personnel.

Ce qu'il n'est pas nécessaire de faire :

- Toute la partie logistique (ou comment réellement picker / checker / packer une pièce). Une fois la solution élaborée, seedez là
- L'authentification avant d'arriver à son dashboard personnel

### Allez plus loin

_Cette section n'est absolument pas nécessaire à la résolution du test. Voici quelques idées néamoins si vous voulez en faire plus._

- Refacto de certaines parties du code (notamment les composants front `Operators.js` & `Postes.js`)
- Suivi de l'évolution journalière du nombre de pièces pickées / checkées / packées
