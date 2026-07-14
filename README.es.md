# 👑 NT-SKILL SUPREME

<p align="center">
  <b>es Español</b> | <a href="./README.md">us English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/RELEASE-v1.0.0-blue?style=flat-square" alt="Release">
  <img src="https://img.shields.io/badge/REASONING_RULES-185-purple?style=flat-square" alt="Rules">
  <img src="https://img.shields.io/badge/UI_STYLES-80+-emerald?style=flat-square" alt="Styles">
  <img src="https://img.shields.io/badge/CLI-v1.0.0-cyan?style=flat-square" alt="CLI">
  <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=flat-square" alt="Licencia">
</p>

<p align="center">
  <b>La Skill Maestra para IAs que inyecta inteligencia de diseño, micro-interacciones táctiles, físicas 3D, psicología CRO 2026 y producción de webs comerciales en minutos.</b>
</p>

<p align="center">
  <img src="./assets/banner.png" alt="NT-SKILL SUPREME Design Intelligence" width="100%" style="border-radius: 16px;">
</p>

---

## ⚡ Instalación Multi-IA por Comandos

Instala **NT-SKILL SUPREME** al instante en tu asistente de IA preferido con un solo comando de terminal:

### 🌟 Instalación Universal Automática (Detecta todas tus IAs)
```bash
npx nt-skill-supreme init
```

### 🎯 Comandos Específicos por Plataforma

| Asistente de IA | Comando de Instalación Rápida | Ruta de Destino |
|---|---|---|
| **Google Gemini Antigravity** | `npx nt-skill-supreme init --ai antigravity` | `~/.gemini/config/skills/nt-skill-supreme` |
| **Claude Code & Desktop** | `npx nt-skill-supreme init --ai claude` | `~/.claude/skills/nt-skill-supreme` |
| **Cursor Editor** | `npx nt-skill-supreme init --ai cursor` | `.cursor/rules/nt-skill-supreme.mdc` |
| **Windsurf IDE** | `npx nt-skill-supreme init --ai windsurf` | `.windsurfrules` |
| **Trae / OpenCode / Codex** | `npx nt-skill-supreme init --ai trae` | `AGENTS.md` |

---

## 💥 La Diferencia Real: Antes vs Después

¿Por qué una web generada con **NT-SKILL SUPREME** convierte y sorprende a los clientes a primera vista?

| Característica UX / UI | ❌ Sin Skill (Generación IA Estándar) | 🚀 Con NT-SKILL SUPREME |
|---|---|---|
| **Diseño y Paletas** | Azul genérico `#3b82f6` sobre fondo blanco plano ("AI Slop") | Paletas HSL oscuras adaptativas, Glassmorphism `backdrop-blur-md` y resplandor ambiental |
| **Físicas de Clic** | Botones e imágenes estáticas, sin respuesta táctil al presionar | Respuesta táctil instantánea `:active scale(0.96)` a 100ms |
| **Hover y Mouse** | Tarjetas planas sin profundidad visual | Efecto **3D Card Hover Tilt** que persigue el cursor con reflejo especular de luz |
| **Animación de Scroll** | Cero o bibliotecas JS pesadas que causan lag | Transiciones fluidas en GPU nativas con CSS `animation-timeline: view()` |
| **Psicología CRO** | Formularios largos y textos aburridos | Regla de Valor en 3 segundos, prueba social junto al CTA y botón flotante de WhatsApp |
| **Imágenes y Fallbacks** | Cuadros vacíos o textos feos como `[Imagen Aquí]` | Fotos HD contextualmente generadas o fallbacks automáticos de Unsplash/SVG |

---

## 🛠 Demostración de Código e Interacciones

### 1. Física Táctil `:active scale(0.96)`
La skill obliga a la IA a inyectar respuestas de presión táctil inmediata en cada botón:

```css
.btn-supreme {
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Respuesta táctil instantánea al clic */
.btn-supreme:active {
  transform: scale(0.96);
}
```

### 2. Efecto 3D Tilt en Tarjetas con Reflejo Especular
```javascript
function handleTilt(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height/2) / (rect.height/2)) * -12;
  const rotateY = ((x - rect.width/2) / (rect.width/2)) * 12;
  
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
  card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
}
```

### 3. Botón Flotante de WhatsApp para Captura de Leads Directa
```html
<a href="https://wa.me/TELEFONO?text=Hola!%20Deseo%20informacion" target="_blank" class="whatsapp-float">
  <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981z"/>
  </svg>
</a>
```

---

## 🚀 Comandos Directos para Tu Agilidad Comercial

| Comando | Acción y Resultado |
|---|---|
| `/build-client-site [nicho]` | **Motor para Agencias**: Genera una web comercial completa en 1 solo archivo HTML/CSS/JS (Odontología, Gimnasio, Abogados, Restaurantes, Agencias, SaaS). |
| `/add-section [tipo]` | Inyecta secciones de producción (Header Pegajoso, Hero con Prueba Social, Switch de Precios, Acordeón FAQ, Formulario de Lead, Botón de WhatsApp). |
| `/rapid-localize` | Reemplaza placeholders con la marca, teléfono, WhatsApp y dirección del cliente en segundos. |
| `/design-audit` | Audita la web para corregir contrastes, eliminar Slop de IA y asegurar estados interactivos. |
| `/polish-ui` | Eleva el diseño aplicando sombras flotantes, desenfoques glassmorphism y fuentes tipográficas premium. |

---

## 📁 Estructura del Repositorio

```
nt-skill-supreme/
├── assets/
│   └── banner.png                    # Imagen Banner Oficial Showcase
├── SKILL.md                          # Definición Maestra de la Skill (Instrucciones de la IA)
├── AGENTS.md                         # Reglas del Sistema para Cursor, Trae, Windsurf y Codex
├── references/                       # Manuales Técnicos de Referencia
│   ├── niche-blueprints.md           # Planos de estructura comercial por industria
│   ├── component-blueprints.md       # Snippets de componentes listos para producción
│   ├── cro-and-performance.md        # Psicología de conversión en 3s y velocidad web
│   ├── motion-and-physics.md         # Animaciones CSS de scroll, Inclinación 3D e interacciones
│   ├── image-gen-and-fallbacks.md    # Generación de imágenes por IA y fallbacks Unsplash/SVG
│   ├── taste-anti-slop.md            # Reglas anti-plantillas genéricas y paletas HSL
│   ├── ui-ux-wcag.md                 # Cuadrículas de 8px y accesibilidad WCAG 2.1 AA
│   └── craft-and-polish.md           # Protocolo de auditoría visual de diseño
├── bin/cli.js                        # Script de instalación Multi-IA por terminal
└── .claude-plugin/plugin.json        # Configuración para Claude Code y Claude Desktop
```

---

## 📄 Licencia
Publicado bajo la [Licencia MIT](LICENSE). Copyright (c) 2026 NachoTorresRD.
