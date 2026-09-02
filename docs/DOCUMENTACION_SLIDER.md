# Documentación — Slider de Imágenes (Flask + Tailwind CSS v4)

## 1. Descripción general

Este módulo implementa un **slider de imágenes** dentro del proyecto Flask `mi-proyecto`, independiente del carrusel ya existente (`/carrusel`). Se accede desde la ruta:

```
/slider
```

A diferencia del carrusel (que usa transición de tipo *slide* con puntos de navegación), el slider desarrollado aquí utiliza un enfoque distinto para diferenciarse en diseño y funcionalidad:

- Transición por **fundido (fade)** entre imágenes en lugar de desplazamiento lateral.
- **Reproducción automática (autoplay)** cada 4 segundos.
- **Barra de progreso** superior que indica visualmente el tiempo restante antes del cambio de imagen.
- **Tira de miniaturas** clicleables debajo del slider principal, con resaltado de la miniatura activa.
- **Botón de pausa/reanudación** manual.
- **Navegación por teclado** (flechas ← →).
- **Soporte de gestos táctiles (swipe)** para dispositivos móviles.
- Pausa automática al pasar el mouse sobre el slider, y reanudación al salir.

## 2. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **Python / Flask** | Backend, enrutamiento (`/slider`) y renderizado de plantillas con Jinja2 |
| **Tailwind CSS v4** | Maquetación y estilos visuales (vía CDN oficial `@tailwindcss/browser@4`, sin paso de build) |
| **CSS puro** | Transiciones de fundido y animación de la barra de progreso, complementando a Tailwind |
| **HTML5 / Jinja2** | Estructura de la plantilla `slider.html` |
| **JavaScript (Vanilla)** | Lógica de autoplay, navegación, teclado, swipe y sincronización de miniaturas |

## 3. Estructura de carpetas y archivos

Cada componente (carrusel y slider) tiene su propia carpeta dentro de `templates/` y dentro de cada subcarpeta de `static/`, para mantenerlos completamente independientes y facilitar el mantenimiento:

```
mi-proyecto/
├── app/
│   ├── __init__.py
│   ├── routes/
│   │   └── __init__.py                    # Rutas: "/", "/carrusel", "/slider"
│   ├── static/
│   │   ├── css/
│   │   │   ├── style.css                  # Estilos globales (nav, body, etc.)
│   │   │   ├── carrusel/
│   │   │   │   └── carrusel.css
│   │   │   └── slider/
│   │   │       └── slider.css             # Fade + barra de progreso
│   │   ├── js/
│   │   │   ├── carrusel/
│   │   │   │   └── carrusel.js
│   │   │   └── slider/
│   │   │       └── slider.js              # Autoplay, teclado, swipe, miniaturas
│   │   └── img/
│   │       ├── carrusel/
│   │       │   └── imagen01.jpg ... imagen08.jpg
│   │       └── slider/
│   │           └── imagen01.jpg ... imagen08.jpg
│   └── templates/
│       ├── base.html                      # Plantilla base con navegación
│       ├── carrusel/
│       │   └── carrusel.html
│       └── slider/
│           └── slider.html                # Vista del slider
├── docs/
│   └── DOCUMENTACION_SLIDER.md            # Este documento
├── app.py
└── requirements.txt
```

## 4. Rutas Flask

Definidas en `app/routes/__init__.py`:

```python
@main.route("/")
def home():
    return render_template("base.html")

@main.route("/carrusel")
def carrusel():
    return render_template("carrusel/carrusel.html")

@main.route("/slider")
def slider():
    return render_template("slider/slider.html")
```

## 5. Funcionamiento del slider (JavaScript)

El archivo `slider.js` controla:

1. **`mostrar(indice)`**: cambia la imagen activa alternando clases de opacidad (`opacity-0` / `opacity-100`) y sincroniza la miniatura resaltada.
2. **`animarProgreso()`**: usa `requestAnimationFrame` para animar la barra de progreso en función del tiempo transcurrido, reiniciándose en cada cambio de slide.
3. **Autoplay**: `setInterval` que avanza automáticamente cada 4000 ms, pausable con el botón dedicado o al pasar el mouse sobre el componente.
4. **Eventos de teclado**: `ArrowLeft` / `ArrowRight` para navegar.
5. **Eventos táctiles**: `touchstart` / `touchend` para detectar deslizamientos (swipe) en móviles.

## 6. Imágenes utilizadas

Las imágenes se encuentran en `app/static/img/slider/` (`imagen01.jpg` a `imagen08.jpg`), tomadas del Drive compartido de la clase. Para reemplazarlas por otras del mismo Drive, basta con sustituir los archivos manteniendo el mismo nombre, o actualizar las rutas `src` en `slider.html` si se usan nombres distintos.

## 7. Cómo ejecutar el proyecto localmente

```bash
# Activar entorno virtual
venv\Scripts\activate        # Windows
source venv/bin/activate     # Linux / Mac

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
python app.py
```

Luego abrir en el navegador:

```
http://127.0.0.1:5000/slider
```

## 8. Control de versiones

El desarrollo del slider se realizó en la rama `develop`, siguiendo el flujo:

```bash
git checkout develop
git add .
git commit -m "Implementar slider con Tailwind CSS v4, autoplay y miniaturas"
git push origin develop
```

Repositorio: *(agregar aquí el enlace del repositorio en GitHub)*

## 9. Criterios de evaluación cubiertos

- **Originalidad**: transición por fundido, autoplay con barra de progreso, miniaturas, control por teclado y gestos táctiles — funcionalidades no presentes en el carrusel base de clase.
- **Funcionamiento correcto en Flask**: ruta `/slider` propia, plantilla independiente extendiendo `base.html`, assets servidos vía `url_for('static', ...)`.
- **Buenas prácticas de estructura**: separación de CSS, JS e imágenes en sus respectivas carpetas dentro de `static/`, plantilla en `templates/carrusel_slider/`.
- **Estándar de código**: nombres de funciones descriptivos, comentarios explicativos, indentación consistente, uso de utilidades de Tailwind para evitar CSS repetitivo.
