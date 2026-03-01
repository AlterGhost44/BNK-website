# SCSS – struktura projektu

## Kolejność w `main.scss`
1. **Zmienne i mixiny** (`_variables.scss`, `_mixins.scss`)
2. **Baza** – reset, typografia, **klasy uniwersalne**
3. **Layout** – siatka, header, footer
4. **Komponenty** – przyciski, karty, formularze, cookies
5. **Sekcje** – hero, problem, solutions, process, cta, pricing, contact, faq, case

## Gdzie co znajdziesz

| Szukasz | Plik |
|--------|------|
| Kolory, odstępy, breakpointy | `_variables.scss` |
| Media queries, kontener, section-padding | `_mixins.scss` |
| **Klasy uniwersalne** (`.container`, `.visually-hidden`, `.text-center`) | `base/_utilities.scss` |
| Tytuły sekcji, `.section-title`, `.subtitle` | `base/_typography.scss` |
| Siatka (`.layout-container`, `.layout-grid--2`) | `layout/_grid.scss` |
| Header, nawigacja, menu mobilne | `layout/_header.scss` |
| Stopka | `layout/_footer.scss` |
| Przyciski (`.btn`, `.btn--primary`) | `components/_buttons.scss` |
| Karty (`.card`) | `components/_cards.scss` |
| Style sekcji (np. `.hero`, `.pricing`) | `sections/_*.scss` |

## Uniwersalne klasy (użycie w HTML)
- **`.container`** – wycentrowany kontener (max-width + padding)
- **`.section--white`** / **`.section--alt`** – sekcja z paddingiem + białe / szare tło
- **`.section__inner`** – wrapper wewnątrz sekcji (kontener)
- **`.visually-hidden`** – ukrycie wizualne (np. dla screen readerów)
- **`.text-center`** / **`.text-muted`** – wyrównanie i kolor tekstu

Sekcje (np. `.problem`, `.faq`) używają wewnętrznie `@extend %section-base` z mixinów – nie trzeba dodawać tych klas w HTML.
