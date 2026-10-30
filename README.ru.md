# Industrial Terminal Minimalism

[English](README.md) | [Русский](README.ru.md)

Навык для ИИ-агентов, который помогает проектировать и создавать спокойные, чёткие интерфейсы в духе промышленных терминалов: тёплые оттенки, строгая типографика, один сигнальный цвет и живая ASCII-графика. Он подстраивается под ваш проект, а не навязывает готовый шаблон.

## Что внутри

- **Палитра на основе темы проекта и цветов бренда.** Три примера — Paper menu, Research poster и Signal board — помогают начать, а `tokens.py validate-palette` проверяет контраст. Набор токенов с тёплой бумагой и графитом — отправная точка, а не обязательная палитра. Подробнее — в [руководстве по цвету](industrial-terminal-minimalism/references/palette.md).
- **Свободный выбор шрифтов:** по читаемости, назначению, поддержке языков, лицензии и запасным вариантам. Обязательного шрифта нет.
- **Проверка макетов на ширине 390, 768, 1440, 1920 и 2560 px**, с отдельными правилами для широких экранов и разрешений 2K+.
- **Living ASCII с пятью режимами:** Halftone и Grey Tiles для любых источников; Braille, Amber Glow и Old Monitor для карт, контуров, крупных надписей, плоской графики и простых 3D-форм. В Old Monitor есть пресеты свечения green/warm/cool и возможность задать любой цвет. [Подключение движка за три шага](industrial-terminal-minimalism/examples/living-ascii/README.md#integrate-the-engine-in-3-steps).
- **Четыре режима работы:** Quick Edit, Visual Restyle, Full Redesign (три направления на ваш выбор) и ASCII Artwork.
- **Токены для светлой и тёмной темы**, рекомендации по доступности и визуальной проверке, примеры реализации.

## Установка

Нужен **Python 3.10+**, только стандартная библиотека. Скачайте и распакуйте ZIP из [Releases](https://github.com/bbbAt0n/industrial-terminal-minimalism/releases) или клонируйте репозиторий:

```sh
git clone https://github.com/bbbAt0n/industrial-terminal-minimalism.git
cd industrial-terminal-minimalism
```

Для личной установки выполните `python install.py --agent <client>` из распакованной или клонированной папки. Для одного продукта рекомендуем установку в проект:

```sh
python install.py --agent codex --scope project --project "/path/to/project"
```

| Клиент | Личная установка | Вызов |
| --- | --- | --- |
| Codex | `python install.py --agent codex` | `$industrial-terminal-minimalism` |
| Claude Code | `python install.py --agent claude` | `/industrial-terminal-minimalism` |
| Grok Build | `python install.py --agent grok` | `/industrial-terminal-minimalism` |
| Antigravity App/IDE | `python install.py --agent antigravity` | `/industrial-terminal-minimalism` |
| Antigravity CLI | `python install.py --agent antigravity-cli` | `/industrial-terminal-minimalism` |

Пути отсчитываются от домашней папки при личной установке или от корня проекта. К каждому пути добавьте `/industrial-terminal-minimalism`:

| Клиент | Личная установка | В проект |
| --- | --- | --- |
| Codex | `.agents/skills` | `.agents/skills` |
| Claude Code | `.claude/skills` | `.claude/skills` |
| Grok Build | `.grok/skills` | `.grok/skills` |
| Antigravity App/IDE | `.gemini/config/skills` | `.agents/skills` |
| Antigravity CLI | `.gemini/antigravity-cli/skills` | `.agents/skills` |

Codex и Antigravity используют одну папку в проекте — для них достаточно одной копии. В IDE Antigravity навык также можно явно указать по имени в панели агента.

Добавьте `--dry-run`, чтобы посмотреть путь установки без изменений, или `--update`, чтобы обновить навык с резервной копией. При обновлении сохраните параметры области установки и пути проекта. Для ручной установки скопируйте всю [папку навыка](industrial-terminal-minimalism/) в выбранное место, сохранив вложенные файлы. В Windows вместо `python` можно использовать `py -3`, в macOS/Linux — `python3`.

Начните новую сессию и явно вызовите навык: агенты не всегда выбирают его автоматически.

## Быстрый старт

```text
$industrial-terminal-minimalism Переработай дашборд в src/ для нашего продукта телеметрии. Подбери палитру на основе цветов бренда и добавь живую ASCII-карту в первый экран.
```

## Проверки (для участников проекта, по желанию)

```sh
python -X utf8 scripts/release.py check
python -X utf8 industrial-terminal-minimalism/scripts/tokens.py check
python -X utf8 industrial-terminal-minimalism/scripts/tokens.py validate
```

## Лицензия

Распространяется по [лицензии MIT](LICENSE). Примеры Living ASCII, постеры и аудиоэтюд переданы в общественное достояние по [CC0 1.0](industrial-terminal-minimalism/examples/living-ascii/LICENSE.txt). Всё, что вы создаёте с помощью навыка, принадлежит вам. Благодарности авторам шрифтов — в [NOTICE.md](industrial-terminal-minimalism/NOTICE.md).
