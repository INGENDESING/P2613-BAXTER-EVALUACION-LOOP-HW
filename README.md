# P2613 - Evaluacion Loop WFI Baxter

Sitio web estatico de presentacion de resultados del proyecto **P2613 -- Evaluacion Hidrotermica del Loop de Sanitizacion WFI** de Laboratorios Baxter S.A., ejecutado por DML Ingenieros Consultores S.A.S.

## Descripcion

Este sitio presenta de forma interactiva los hallazgos del estudio hidraulico y termico del loop de sanitizacion WFI ante el reemplazo de Spray-Ball estaticos por limpiadores orbitales **GEA Orbital Cleaner Twister** (boquilla 3 mm). Incluye:

- Dashboard ejecutivo con hallazgos centrales
- 17 escenarios operacionales evaluados en Pipe-Flo Professional v19.1
- Analisis comparativo Spray-Ball vs. GEA Twister
- Curvas de equipos, perfiles hidraulicos y balance termico
- Documentacion de entrega (transmittal TR-001 REV0)

## Stack Tecnico

| Tecnologia | Uso |
|---|---|
| HTML5 + Tailwind CSS (CDN) | Maquetacion y estilos |
| Vanilla ES6+ | Logica interactiva |
| GSAP + ScrollTrigger | Animaciones de scroll |
| Lucide Icons | Iconografia vectorial |
| GitHub Pages | Hosting estatico |
| GitHub Actions | CI/CD automatico |

## Estructura de Carpetas

```
.
|-- .github/workflows/deploy.yml   # CI/CD para GitHub Pages
|-- assets/
|   |-- infografias/               # 17 figuras summary (ESC-01..17)
|   |-- perfiles/                  # 6 perfiles hidraulicos (01,04,05,11,16,17)
|   |-- curvas/                    # Curvas de equipo + PFD preview
|   |-- logos/                     # DML + Baxter
|-- css/
|   |-- custom.css                 # Estilos personalizados
|-- js/
|   |-- data.js                    # Datos maestros del proyecto
|   |-- app.js                     # Logica interactiva
|   |-- animations.js              # Animaciones GSAP
|-- index.html                     # SPA principal
|-- README.md                      # Este archivo
```

## Datos Maestros

Los datos tecnicos (escenarios, equipos, documentos, conclusiones) se centralizan en `js/data.js`. Cualquier actualizacion de valores numericos debe realizarse en ese archivo unico; el resto de la interfaz se renderiza dinamicamente.

**Fuente de verdad:** Informe tecnico `P2613-PR-INF-001 REV0` (30/04/2026).

## Documentos de Entrega

Los documentos grandes (PDFs, DWG, Excel) no se alojan en este repositorio por limites de tamano de GitHub Pages. Las URLs externas se configuran en el campo `url` de cada entrada en `js/data.js`. Hasta que se asignen URLs reales, los botones de descarga muestran "Bajo solicitud".

## Despliegue

El sitio se despliega automaticamente a GitHub Pages mediante GitHub Actions en cada push a la rama `main`.

### Pasos para habilitar GitHub Pages

1. Crear un nuevo repositorio en GitHub (ej. `dmlingenieros/p2613-web`).
2. Subir el contenido de esta carpeta al repo.
3. Ir a **Settings > Pages**.
4. En **Source**, seleccionar **GitHub Actions**.
5. El workflow `.github/workflows/deploy.yml` se ejecutara automaticamente.

URL resultante: `https://dmlingenieros.github.io/p2613-web/`

### Despliegue local (pruebas)

Servir la carpeta raiz con cualquier servidor estatico:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx serve)
npx serve .

# VS Code (Live Server extension)
# Click derecho en index.html > "Open with Live Server"
```

Luego abrir `http://localhost:8080`.

## Limitaciones Conocidas

- **Perfiles hidraulicos:** Disponibles para 6 de 17 escenarios (01, 04, 05, 11, 16, 17). Los restantes requieren exportacion manual desde Pipe-Flo Professional v19.1.
- **Curva bomba C218:** No se dispone de figura de curva para la bomba propuesta (ESC-17); se consulta en el informe tecnico.
- **Documentos:** Requieren configuracion de URLs externas en `js/data.js`.

## Licencia

Propietario -- DML Ingenieros Consultores S.A.S. 2026. Los datos tecnicos de Baxter son informacion confidencial del cliente.

## Contacto

**DML Ingenieros Consultores S.A.S.**
Cali, Colombia
