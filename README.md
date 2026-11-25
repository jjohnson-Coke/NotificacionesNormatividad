# Radiografía de correos · Normatividad (TEC360 · VPAF)

Presentación web (Vite + React + TypeScript + Framer Motion) para la sesión de alineación con Normatividad.

## Uso local

```bash
npm install
npm run dev
```

- Contenido editable (textos, cifras y notas): `src/content.ts`. La fecha de validación es `FECHA_VALIDACION`.
- Pruebas de consistencia de cifras: `npm test`
- HTML único autocontenido: `npm run build` → `dist/index.html` (abre con doble clic, funciona sin internet).

Atajos: → ← Espacio Re Pág/Av Pág · F pantalla completa · N notas del presentador · Inicio/Fin.

## Deploy en Cloudflare (Workers con archivos estáticos)

`npm run build` corre primero las pruebas: si alguna cifra no cuadra, no se genera el build y no se publica.

### Opción A · Conectar el repo en el dashboard (deploy automático en cada push)

1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → elige este repo.
2. Configuración:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - Rama de producción: `main`
3. Guardar y desplegar. La URL queda en `https://radiografia-correos-normatividad.<tu-subdominio>.workers.dev`.

### Opción B · Desde la terminal

```bash
npx wrangler login
npm run deploy
```

El nombre del Worker y la carpeta publicada están en `wrangler.jsonc`.
Para probar localmente con el runtime de Cloudflare: `npm run cf:dev`.

> La presentación es pública para quien tenga la liga. Si debe ser solo interna, activa **Cloudflare Access** sobre el Worker (Settings → Domains & Routes / Zero Trust).
