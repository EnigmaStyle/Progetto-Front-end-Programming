# THRIFT SHOP - E-commerce React

Un moderno e-commerce realizzato con React, Vite e JSON Server.

## 🚀 Installazione

1. Installa le dipendenze:
```bash
npm install
```

2. Avvia l'applicazione:
```bash
npm run dev
```

L'applicazione sarà disponibile su:
- Frontend: `http://localhost:5173`
- API (JSON Server): `http://localhost:3001`

## 📦 Comandi Disponibili

- `npm run dev`: Avvia il frontend e il JSON Server
- `npm run build`: Crea la build di produzione
- `npm run preview`: Anteprima della build di produzione

## 🛠️ API Disponibili

Il JSON Server fornisce le seguenti API:

### Prodotti
- `GET /products`: Lista prodotti
- `GET /products/:id`: Dettaglio prodotto
- `POST /products`: Crea prodotto (admin)
- `PUT /products/:id`: Modifica prodotto (admin)
- `DELETE /products/:id`: Elimina prodotto (admin)

### Utenti
- `GET /users`: Lista utenti (admin)
- `GET /users/:id`: Dettaglio utente
- `POST /users`: Registrazione
- `PUT /users/:id`: Modifica profilo

### Ordini
- `GET /orders`: Lista ordini
- `GET /orders/:id`: Dettaglio ordine
- `POST /orders`: Crea ordine
- `PUT /orders/:id`: Aggiorna stato ordine (admin)

### Categorie
- `GET /categories`: Lista categorie

## 🔍 Debug

### Nel Browser

1. Apri gli Strumenti per Sviluppatori (F12)
2. Vai alla scheda "Sorgenti"
3. Puoi:
   - Impostare breakpoint
   - Ispezionare variabili
   - Vedere i log nella console
   - Monitorare le richieste di rete

### In Visual Studio Code

1. Installa l'estensione "JavaScript Debugger"

2. Crea il file `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug React App",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

3. Avvia l'app: `npm run dev`
4. Premi F5 per iniziare il debug

## 📁 Struttura Progetto

```
├── public/          # File statici
├── src/            # Codice sorgente
│   ├── components/ # Componenti React
│   ├── context/    # Context React
│   ├── pages/      # Pagine
│   ├── store/      # Store Redux
│   └── main.jsx    # Entry point
└── db.json         # Database JSON Server
```

## 👥 Account Demo

### Amministratore
- Username: `admin`
- Password: `admin123`
- Accesso a tutte le funzionalità

### Utente Standard
- Username: `user`
- Password: `user123`
- Accesso limitato alle funzionalità utente