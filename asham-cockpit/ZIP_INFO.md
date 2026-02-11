# ZIP-Export

Die ZIP-Datei wird **nicht mehr im Repository mitgeführt**.

## ZIP lokal erzeugen
```bash
cd /workspace/cncjs
python - <<'PY'
import shutil
shutil.make_archive('asham-cockpit', 'zip', root_dir='.', base_dir='asham-cockpit')
print('asham-cockpit.zip erstellt')
PY
```

## Inhalt
- kompletter Ordner `asham-cockpit/`
- ohne `node_modules`
