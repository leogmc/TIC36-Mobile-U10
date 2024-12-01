# TIC36-Mobile-U10
Este repositório tem como objetivo fazer parte da atividade da Unidade 10.

## Como iniciar a aplicação:

### Passo 1: Clone o repositório em sua maquina:

git clone https://github.com/leogmc/TIC36-Mobile-U10.git

### Passo 2: Certifique-se de criar 2 terminais:
    - O primeiro deve ser inicializado na pasta "api-express" dentro da pasta *Backend(API)*
    - O segundo deve ser inicializado na pasta "restic36-app-vagacerta" dentro da pasta *Mobile*
    
#### OBSERVAÇÃO: Dentro da pasta "Services" (Mobile), verifique se o arquivo api.ts está configurado como 'http://localhost:3000/api'. Caso esteja, talvez a aplicação não encontre os endpoints corretamente pois irá depender de onde você está testando a aplicação. Caso o app não encontre as rotas, altere o "localhost" para seu IP. Por exemplo: 'http://192.xxx.x.x:3000/api' (verifique também se o servidor e a aplicação estão na mesma rede).

### Passo 3: Instale as dependências no primeiro terminal (api-express):

npm install

### Passo 4: Instale as dependências no segundo terminal (restic36-app-vagacerta):

npm install --legacy-peer-deps

### Passo 5: Inicie o servidor no primeiro terminal:

npm start

### Passo 6: Inicie o app no segundo terminal:

npx expo start

#### Informações adicionais:
- Como sugerido pelo tutor, a aplicação já irá iniciar com o banco de dados sendo populado por algumas vagas e usuários, porém foi adicionado a função de criar um novo usuário

- A função de Logout se encontra em Profile

 

    
