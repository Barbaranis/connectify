# Étape 1 : Utiliser une image Node.js pour construire l’application React
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l’application React
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l’application en production
FROM nginx:alpine

# Supprimer le contenu par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier le build de React dans Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

