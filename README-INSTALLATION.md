# Girard Plomberie — installation et déploiement

Ce dossier contient le projet complet et autonome du site de démonstration Girard Plomberie. Le formulaire de devis, les pièces jointes photographiques, l’e-mail adressé à l’entreprise et l’e-mail de confirmation client sont déjà intégrés.

## Informations reprises dans cette version

- Entreprise : Girard Plomberie
- Téléphone : 07 67 32 27 04
- E-mail public : girardplomberie@gmail.com
- Adresse affichée : 1–10 Avenue de France, 91300
- Réputation affichée : 4,9/5 — 195 avis Google
- Statut : concept de site non officiel, protégé contre l’indexation

Les horaires exacts et le périmètre précis d’intervention n’étaient pas visibles dans les éléments fournis. Ils sont donc signalés comme informations à confirmer, sans invention.

---

## Méthode recommandée : utiliser directement ce ZIP complet

### 1. Extraire le ZIP

```bash
cd "/Volumes/GaelSSD/WebProjects"
unzip "$HOME/Downloads/girard-plomberie-demo-complete.zip"
cd "/Volumes/GaelSSD/WebProjects/girard-plomberie-demo"
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer le fichier d’environnement local

```bash
cp .env.local.example .env.local
open -a TextEdit .env.local
```

Renseigner les valeurs suivantes :

```env
RESEND_API_KEY=re_your_actual_resend_key
QUOTE_FROM_EMAIL="Girard Plomberie <devis@forgerondigital.com>"
QUOTE_TO_EMAIL="contact@forgerondigital.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

- `RESEND_API_KEY` : clé privée créée dans Resend.
- `QUOTE_FROM_EMAIL` : adresse d’envoi utilisant un domaine vérifié dans Resend.
- `QUOTE_TO_EMAIL` : votre propre boîte de réception pendant la phase de démonstration. Ne pas utiliser l’adresse du prospect sans son accord.
- `NEXT_PUBLIC_SITE_URL` : URL locale pendant les tests, puis URL Vercel définitive.

Le fichier `.env.local` est exclu de Git et ne doit jamais être envoyé sur GitHub.

### 4. Lancer le site localement

```bash
npm run dev
```

Ouvrir :

```text
http://localhost:3000
```

Arrêter le serveur avec `Control + C`.

---

## Tester le formulaire de devis

Vérifier les quatre étapes :

1. sélectionner au moins un service et un délai ;
2. choisir le type de propriété et ajouter une description ;
3. renseigner adresse, code postal, date et moment souhaité ;
4. renseigner les coordonnées, accepter le traitement et envoyer.

### Tester les photographies

- formats acceptés : JPG, PNG et WebP ;
- maximum : 5 images ;
- maximum : 4 Mo par image ;
- maximum total côté serveur : 20 Mo.

Tester également :

- une image valide ;
- plusieurs images ;
- une image dépassant 4 Mo ;
- plus de cinq images ;
- un format non autorisé.

### Tester les e-mails

Après soumission :

- `QUOTE_TO_EMAIL` doit recevoir la demande détaillée et les photographies en pièces jointes ;
- l’adresse saisie par le client doit recevoir l’accusé de réception ;
- le bouton de réponse dans la boîte de l’entreprise doit répondre au client.

En cas d’échec, contrôler les journaux du terminal et les événements Resend.

---

## Vérifications avant GitHub

```bash
cd "/Volumes/GaelSSD/WebProjects/girard-plomberie-demo"

git status 2>/dev/null || true
grep -n ".env" .gitignore
test -f .env.local && git check-ignore -v .env.local
```

`.env.local` ne doit jamais apparaître comme fichier à committer.

---

## Créer un nouveau dépôt GitHub

Créer d’abord un dépôt vide nommé `girard-plomberie-demo` sur GitHub, sans README ni licence ajoutés automatiquement.

Puis exécuter :

```bash
cd "/Volumes/GaelSSD/WebProjects/girard-plomberie-demo"

rm -rf .git .vercel .next

git init
git branch -M main
git add .
git status
git commit -m "Initial Girard Plomberie demo"
git remote add origin https://github.com/VOTRE-UTILISATEUR/girard-plomberie-demo.git
git push -u origin main
```

Remplacer `VOTRE-UTILISATEUR` par votre identifiant GitHub.

---

## Déployer sur Vercel

1. Ouvrir Vercel.
2. Choisir **Add New → Project**.
3. Importer `girard-plomberie-demo` depuis GitHub.
4. Conserver le framework détecté : Next.js.
5. Ajouter les variables d’environnement suivantes pour Production, Preview et Development :

```env
RESEND_API_KEY=re_your_actual_resend_key
QUOTE_FROM_EMAIL="Girard Plomberie <devis@forgerondigital.com>"
QUOTE_TO_EMAIL="contact@forgerondigital.com"
NEXT_PUBLIC_SITE_URL="https://girard-plomberie-demo.vercel.app"
```

6. Déployer.
7. Copier l’URL réellement attribuée par Vercel.
8. Corriger `NEXT_PUBLIC_SITE_URL` avec cette URL si elle diffère.
9. Redéployer après modification de la variable.

### Vérification après déploiement

- ouvrir la page sur ordinateur et mobile ;
- tester le menu mobile ;
- vérifier les liens téléphone et e-mail ;
- parcourir les quatre étapes du formulaire ;
- joindre une photographie ;
- vérifier l’e-mail entreprise ;
- vérifier l’e-mail client ;
- vérifier dans `/robots.txt` que le site de démonstration est bloqué ;
- vérifier le code source pour la balise `noindex`.

---

## Alternative : dupliquer manuellement le projet Eric

Cette méthode n’est pas nécessaire puisque le ZIP fourni est déjà autonome. Elle sert uniquement si vous souhaitez reproduire le processus de duplication.

```bash
SOURCE='/Volumes/GaelSSD/WebProjects/eric-plomberie-sanitaire-eps-demo'
TARGET='/Volumes/GaelSSD/WebProjects/girard-plomberie-demo'
ZIP="$HOME/Downloads/girard-plomberie-demo-complete.zip"
TEMP_DIR="$(mktemp -d)"

rm -rf "$TARGET"
mkdir -p "$TARGET"

rsync -a \
  --exclude='.git' \
  --exclude='.vercel' \
  --exclude='.next' \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.*' \
  "$SOURCE/" "$TARGET/"

if [ -f "$SOURCE/.env.local" ]; then
  cp "$SOURCE/.env.local" "$TARGET/.env.local"
fi

unzip -q -o "$ZIP" -d "$TEMP_DIR"

PACKAGE_ROOT="$TEMP_DIR/girard-plomberie-demo"
if [ ! -d "$PACKAGE_ROOT" ]; then
  PACKAGE_ROOT="$TEMP_DIR"
fi

rm -rf "$TARGET/app" "$TARGET/public"
rsync -a "$PACKAGE_ROOT/" "$TARGET/"

rm -rf "$TARGET/.git" "$TARGET/.vercel" "$TARGET/.next" "$TARGET/node_modules"
rm -rf "$TEMP_DIR"

cd "$TARGET"
npm install
npm run dev
```

La méthode recommandée reste l’extraction directe du ZIP complet.
