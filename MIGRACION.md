# Guia de Migracion a GitHub Pages

## Requisitos previos
- Cuenta de GitHub (personal o organizacion)
- Git instalado localmente
- Acceso a los documentos grandes para subirlos a almacenamiento externo (OneDrive, Google Drive, Dropbox, GitHub Releases)

---

## Paso 1: Crear el repositorio en GitHub

1. Iniciar sesion en [github.com](https://github.com).
2. Click en **New repository**.
3. Nombre del repositorio: `p2613-web` (o el que prefiera).
4. Visibilidad: **Public** (requerido para GitHub Pages gratuito).
5. NO inicializar con README, .gitignore ni licencia (ya existen en el paquete).
6. Click en **Create repository**.

## Paso 2: Subir el contenido al repositorio

### Opcion A: Git CLI

```bash
# Navegar a la carpeta p2613-web
cd p2613-web

# Inicializar git
git init
git add .
git commit -m "Initial commit: P2613 web v1.0"

# Conectar con GitHub (reemplazar USUARIO)
git remote add origin https://github.com/USUARIO/p2613-web.git
git branch -M main
git push -u origin main
```

### Opcion B: GitHub Desktop / GitKraken

1. Agregar la carpeta `p2613-web` como nuevo repositorio.
2. Realizar commit inicial.
3. Publicar rama `main` en el remoto de GitHub.

### Opcion C: Subida manual (drag & drop)

1. Comprimir la carpeta `p2613-web` en un ZIP.
2. En GitHub, ir al repositorio > **Add file > Upload files**.
3. Subir los archivos. NOTA: GitHub limita archivos individuales a 25 MB y uploads web a 100 MB totales. Este metodo no es recomendado para este proyecto por la cantidad de assets.

## Paso 3: Configurar GitHub Pages

1. En el repositorio de GitHub, ir a **Settings > Pages** (en el menu lateral).
2. Bajo **Build and deployment**:
   - **Source**: GitHub Actions
3. El workflow `.github/workflows/deploy.yml` ya esta incluido en el repo; se ejecutara automaticamente en el proximo push.
4. Ir a la pestana **Actions** y verificar que el workflow "Deploy to GitHub Pages" se complete con exito (check verde).
5. Una vez completado, la URL aparecera en Settings > Pages. Ejemplo:
   ```
   https://USUARIO.github.io/p2613-web/
   ```

## Paso 4: Actualizar URLs de documentos externos (CRITICO)

Los documentos grandes (PDFs, DWG, Excel) no estan en el repo. Debe subirlos a un servicio de almacenamiento externo y actualizar las URLs en `js/data.js`.

### Opciones de almacenamiento externo

| Servicio | Pros | Cons |
|---|---|---|
| **GitHub Releases** | Gratuito, integrado con el repo, URLs permanentes | Requiere crear un release |
| **OneDrive Share** | Ya disponible en el entorno Microsoft del cliente | Links pueden expirar |
| **Google Drive** | Gratuito, facil de compartir | Links de descarga directa requieren configuracion |
| **AWS S3 / Azure Blob** | Escalable, profesional | Tiene costo |

### Ejemplo con GitHub Releases (recomendado)

1. En GitHub, ir a **Releases > Draft a new release**.
2. Tag: `v1.0-docs`
3. Titulo: `Documentos de entrega P2613`
4. Adjuntar los archivos PDF/DWG/XLSX.
5. Publicar el release.
6. Obtener la URL de cada archivo (click derecho > "Copy link address" en el release).
7. Editar `js/data.js` y reemplazar `url: null` por `url: 'https://github.com/...'` para cada documento.
8. Hacer commit y push; el sitio se redeplegara automaticamente.

### Ejemplo de actualizacion en data.js

```javascript
{ item: "1.1", category: "Informes", id: "P2613-PR-INF-001", rev: "0", 
  desc: "Informe Evaluacion Loop de Agua Nueva Condicion", pages: 46, 
  file: "P2613-PR-INF-001.pdf", 
  url: "https://github.com/USUARIO/p2613-web/releases/download/v1.0-docs/P2613-PR-INF-001.pdf" }
```

## Paso 5: Actualizar meta tags Open Graph (opcional pero recomendado)

En `index.html`, buscar las etiquetas `og:url` y `twitter:url` y reemplazar:

```html
<meta property="og:url" content="https://USUARIO.github.io/p2613-web/">
<meta property="twitter:url" content="https://USUARIO.github.io/p2613-web/">
```

## Paso 6: Verificacion post-despliegue

Abrir la URL del sitio y verificar:

- [ ] Hero carga correctamente con logos
- [ ] Dashboard muestra datos numericos correctos
- [ ] Grid de 17 escenarios carga las infografias
- [ ] Modales de escenarios funcionan
- [ ] Tabs de analisis cambian correctamente
- [ ] Perfiles hidraulicos (6 disponibles) se muestran
- [ ] Tabla de documentos muestra "Bajo solicitud" (hasta que se configuren URLs)
- [ ] No hay errores en la consola del navegador (F12 > Console)
- [ ] Responsive funciona en mobile (usar DevTools)

## Paso 7: Actualizaciones futuras

Para actualizar la web en el futuro:

1. Realizar los cambios en la carpeta local `p2613-web`.
2. `git add . && git commit -m "Descripcion del cambio"`
3. `git push origin main`
4. GitHub Actions desplegara automaticamente (verificar en pestana Actions).

---

## Solucion de problemas

### El workflow falla con "Missing assets/infografias"
Asegurarse de que la carpeta `assets/infografias/` existe en el repo y contiene los 17 PNGs.

### Las imagenes no cargan en la web desplegada
GitHub Pages es case-sensitive. Verificar que los nombres de archivo en `assets/` coincidan exactamente con las referencias en `index.html` y `js/app.js`.

### El sitio muestra 404 para algunos archivos
GitHub Pages puede tardar hasta 10 minutos en propagar cambios. Tambien verificar que el repo sea Public.

### Los documentos no se descargan
Recordar que los documentos requieren configurar el campo `url` en `js/data.js`. Hasta entonces, se muestra "Bajo solicitud".
