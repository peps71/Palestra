# Diario Full Body

Diario degli allenamenti in palestra: programma di 12 settimane o scheda personalizzata
(oltre 100 esercizi con pesi), kg e ripetizioni di ogni serie, timer di recupero,
peso corporeo e grafici dei progressi.

È un'app **separata da TaxiManager**: repository suo, indirizzo suo, database suo.

Indirizzo: **https://peps71.github.io/palestra/**

Sull'iPhone: apri l'indirizzo in Safari → Condividi → «Aggiungi alla schermata Home».

## File

| File | A cosa serve |
|---|---|
| `index.html` | Tutta l'app |
| `sw.js` | Fa aprire l'app anche senza rete |
| `manifest.webmanifest`, `icona-*.png` | Nome e icona sulla schermata Home |
| `firestore.rules` | Regole di sicurezza del database, da incollare nella console Firebase |

## Pubblicazione su GitHub Pages (una volta sola)

GitHub → repository `palestra` → **Settings → Pages** → «Build and deployment»:
Source **Deploy from a branch**, Branch **main**, cartella **/ (root)** → Save.
Dopo un paio di minuti l'app è all'indirizzo sopra. Ogni modifica caricata su `main`
si pubblica da sola.

## Firebase: salvataggio nel cloud (una volta sola)

Finché non è collegato, l'app funziona lo stesso e salva tutto sul telefono.
Con Firebase i dati vanno nel cloud e li ritrovi su iPhone e Mac con l'accesso Google.
Si usa un progetto **nuovo**, non quello di TaxiManager.

Su [console.firebase.google.com](https://console.firebase.google.com):

1. **Aggiungi progetto** → nome `palestra` (Google Analytics non serve).
2. Nella pagina del progetto, icona **`</>` (Web)** → nome `Diario Full Body` →
   Registra app. Compare un blocco `const firebaseConfig = { apiKey: ..., ... }`:
   **copialo e mandalo a Claude**, che lo inserisce in `index.html`.
   (Non è una password: è l'indirizzo del progetto, sta comunque dentro la pagina.)
3. **Build → Authentication → Inizia → Sign-in method → Google → Abilita**,
   scegli l'email di supporto, salva.
4. **Authentication → Settings → Authorized domains → Add domain** →
   `peps71.github.io`.
5. **Build → Firestore Database → Crea database** → posizione `eur3 (europe-west)`,
   modalità produzione. Poi scheda **Rules**: incolla il contenuto di `firestore.rules`
   al posto di quello che c'è e premi **Publish**.

Al primo accesso con Google, se sul telefono ci sono già allenamenti salvati e il cloud
è vuoto, l'app li copia nel cloud da sola.

I dati salvati nella versione dentro Claude (claude.ai) non passano in automatico a
questa: sono due archivi diversi.
