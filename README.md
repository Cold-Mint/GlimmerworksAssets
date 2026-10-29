# GlimmerWorks Resource Pack

UI resource pack for the GlimmerWorks game, containing layouts (RML/RCSS), fonts, textures, and colors.

## Font

- Uses [fusion-pixel-font](https://github.com/TakWolf/fusion-pixel-font) (open-source pixel CJK font).

## UI Design Guide

### Design Language

- Follows the **GNOME / Adwaita** design language: flat, modern, rounded corners, low-contrast borders, restrained colors.
- **Widgets are drawn with RCSS properties only** (`background-color`, `border`, `border-radius`,
  `vertical-gradient`), without relying on textures; textures are reserved for brand assets (logo, splash)
  and game icons.
- Colors always use **semantic CSS variables** (defined on `body` in `layouts/@core/global.rcss`),
  written exclusively in hexadecimal: opaque `#RRGGBB`, with alpha `#RRGGBBAA`.

### Color Palette

> Saturated colors (accent blue, destructive red) are shared between light/dark themes; text, surface,
> border, and semantic colors switch with the theme.

#### Light Theme (default)

| Category | Variable | Value | Description |
|---|---|---|---|
| Text | `--fg` | `#241f31` | Primary text |
| Text | `--fg-muted` | `#9a9996` | Secondary / disabled text |
| Surface | `--surface` | `#ffffff` | Panels, cards |
| Surface | `--surface-alt` | `#f6f5f4` | Inset surfaces, cards |
| Border | `--border` | `#cdc7c2` | Primary border |
| Border | `--border-light` | `#deddda` | Subtle border |
| Accent | `--accent` | `#3584e4` | Accent blue (selection / focus) |
| Accent | `--accent-hover` | `#2f76d1` | Hover |
| Accent | `--accent-active` | `#1c71d8` | Pressed |
| Accent | `--link` / `--link-hover` | `#78aeed` / `#99c1f1` | Links (on dark background) |
| Semantic | `--success` / `--success-text` | `#2ec27e` / `#26a269` | Success green |
| Semantic | `--warning` | `#e5a50a` | Warning yellow |
| Semantic | `--warning-alt` | `#e66100` | Warning orange |
| Semantic | `--danger` / `--danger-text` | `#e01b24` / `#c01c28` | Danger red |

#### Dark Theme (`@media (theme: dark)`)

| Category | Variable | Value |
|---|---|---|
| Text | `--fg` / `--fg-muted` | `#ffffff` / `#9a9996` |
| Surface | `--surface` / `--surface-alt` | `#303030` / `#3d3d3d` |
| Border | `--border` / `--border-light` | `#404040` / `#3d3d3d` |
| Semantic | `--success` / `--success-text` | `#57e389` / `#8ff0a4` |
| Semantic | `--warning` / `--warning-alt` | `#ffbe6d` / `#ffa348` |
| Semantic | `--danger` / `--danger-text` | `#ff8c82` / `#ffb4ab` |

#### Button-Specific Colors (shared by both themes)

| Category | Variable | Value |
|---|---|---|
| Normal button gradient | `--btn-top` / `--btn-bottom` | `#ffffff` → `#f2f2f2` (light) / `#3d3d3d` → `#303030` (dark) |
| Suggested button | `--accent-btn-top` / `--accent-btn-bottom` | `#3584e4` → `#2f76d1` |
| Destructive button | `--danger-btn-top` / `--danger-btn-bottom` | `#e01b24` → `#c01c28` |

### Widget Style Conventions

| Widget | Convention |
|---|---|
| **Button** | `vertical-gradient` light-gray gradient + 1dp border + 8dp radius; has `:hover` / `:active` / `[disabled]` states |
| **Suggested button** | Blue (`--accent-btn-*`), used for primary actions: start game, resume, create world, craft |
| **Destructive button** | Red (`--danger-btn-*`), used for destructive actions such as deleting a save |
| **Panel** | White/dark surface + 1dp border + 12dp radius |
| **Text input** | Surface background + border + 8dp radius; blue border on focus (`border-color: var(--accent)`) |
| **Checkbox** | Surface-colored box (6dp radius); blue fill when checked |
| **Item slot** | Light translucent `#ffffffe0` + border, drawn over the game view for visibility; selected state has a blue border + light blue fill |
| **Dropdown / option** | Surface background; hovered item blue background + white text |

> Corner radius scale: large panels 12dp, controls/buttons 8dp, item slots 6dp.

### Theming

- Light/dark themes are implemented with CSS variables + `@media (theme: dark)`; variables are defined
  and inherited on `body`.
- Engine-side switch:

  ```cpp
  context->ActivateTheme("dark", true);   // enable dark
  context->ActivateTheme("dark", false);  // back to light
  ```

### Template Reuse

- `layouts/@core/item_slot.rml`: template for the inner content of an item slot (durability bar + icon + count).
- Reference it from a document `<head>` and use it inside `data-for`:

  ```rml
  <head>
      <link type="text/template" href="../item_slot.rml"/>
  </head>
  ...
  <div class="item_slot draggable" data-for="slot : item_slots" ...>
      <template src="item_slot_content"/>
  </div>
  ```

### Technical Constraints

- The SDL_GPU render backend does not support offscreen rendering (layer / callback texture /
  clip-mask / filter), so **`box-shadow`, `filter`, and `backdrop-filter` are unavailable** —
  use borders + gradients + rounded corners to convey depth instead.
- The `prefers-color-scheme` media query is not supported; dark mode is activated manually via the
  `theme` mechanism.
- Template files must not contain top-level comments that include `<tag>` text
  (`Template::Load` uses a naive string search and would misidentify them).

## References

- [libadwaita CSS variables](https://gnome.pages.gitlab.gnome.org/libadwaita/doc/main/css-variables.html) — source of the light/dark color values.
- [libadwaita named colors](https://gnome.pages.gitlab.gnome.org/libadwaita/doc/main/named-colors.html) — legacy named-color documentation.
- [GNOME Human Interface Guidelines](https://developer.gnome.org/hig/) — design guidelines.
- [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors) — used for the initial dark palette (later replaced by Adwaita dark).

## Directory Structure

```
glimmerworks_res/
├── layouts/@core/
│   ├── global.rcss          # theme variables + base widget styles
│   ├── item_slot.rml        # item slot content template
│   ├── main/                # main menu
│   ├── pause/               # pause menu
│   ├── create_world/        # create world
│   ├── saves/               # saved games list
│   ├── load_world/          # loading screen
│   ├── inventory/           # inventory
│   ├── hotbar/              # hotbar
│   ├── storage/             # containers (chests)
│   ├── console/             # console (theme-aware terminal)
│   ├── tooltip/             # item tooltips
│   ├── ui_message/          # toast messages
│   ├── recipe_detail/       # crafting detail
│   ├── debug_panel/         # debug panel
│   ├── debug_overlay/       # debug overlay
│   └── splash/              # splash screen
├── textures/                # textures (icons, logo, splash, block/item sprites)
├── colors/                  # block/item color configs
├── fonts/                   # fonts
├── shaders/ · samplers/ · pipelines/   # render pipeline
└── manifest.toml            # resource pack metadata
```
