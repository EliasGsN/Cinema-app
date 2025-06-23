# Imagem base
FROM node:20

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor porta do Vite
EXPOSE 5173

# Rodar o projeto
CMD ["npm", "run", "dev", "--", "--host"]