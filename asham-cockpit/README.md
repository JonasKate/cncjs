# ASHAM Cockpit (MVP)

Mobile/Tablet/PC-fähiges Cockpit auf Basis von **Vite + React + TypeScript + React Router + Capacitor**.

## MVP-Entscheidungen
- Sync-Button „Jetzt synchronisieren“ ruft primär `POST /cases/:id/sync` auf. Falls Endpoint nicht existiert, wird automatisch ein Reload (`GET`) als Fallback genutzt.
- Cockpit-Module sind im MVP read-only im UI, API-Methode für `PUT /cases/:id/modules/:moduleKey` ist bereits vorbereitet.
- Wenn keine `VITE_API_BASE_URL` gesetzt ist, läuft die App vollständig im Mock-Modus.

## Setup
```bash
npm i
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Capacitor (Store-App Workflow)
```bash
npm run build
npx cap sync android
npx cap sync ios
npx cap open android
npx cap open ios
```

## ENV
Siehe `.env.example`:
```bash
VITE_API_BASE_URL=
```
Wenn leer, werden lokale Mock-Daten (`src/mock/*`) genutzt.

## App-Struktur
- Login mit Token-Speicherung über Capacitor Preferences
- Tabs: Inbox, Aktiv, Archiv, Einstellungen
- Fallakte mit Modulen, Assets, Timeline, manueller Aktualisierung und Export-Anstoß
- Branding/White-Label read-only über `GET /brand`
- Enterprise-Branches über `GET /branches` auswählbar

## ZIP erzeugen (optional)
Wenn du eine ZIP für den Download brauchst, kannst du sie im Repo-Root erzeugen:

```bash
cd /workspace/cncjs
python - <<'PY2'
import shutil
shutil.make_archive('asham-cockpit', 'zip', root_dir='.', base_dir='asham-cockpit')
print('asham-cockpit.zip erstellt')
PY2
```
