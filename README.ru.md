# Industrial Terminal Minimalism

[English](README.md) | [Русский](README.ru.md)

**v1** · Переносимый навык проектирования интерфейсов и реализации фронтенда для Codex, Claude Code, Grok Build и Antigravity.

Тёплые светлые поверхности, точная типографика, сдержанная геометрия и понятное выделение; предусмотрена полноценная тёмная тема. Стиль адаптируется к задаче продукта и не навязывает шаблон экрана. **Living ASCII Motion** охватывает авторскую, процедурную и реагирующую на реальные данные символьную графику, паузу, сокращение движения и жизненный цикл анимации. Включены токены, рекомендации по доступности, примеры реализации и визуальная проверка.

## Установка и обновление

Нужен **Python 3.10+**, без дополнительных библиотек. Скачайте и распакуйте ZIP из [Releases](https://github.com/bbbAt0n/industrial-terminal-minimalism/releases) или клонируйте репозиторий:

```sh
git clone https://github.com/bbbAt0n/industrial-terminal-minimalism.git
cd industrial-terminal-minimalism
python install.py --agent codex
```

Выполняйте команды из распакованной или клонированной папки. В Windows вместо `python` можно использовать `py -3`, в macOS/Linux — `python3`. Каждый вариант устанавливает одинаковый навык со всеми относительными ресурсами.

| Клиент | Установка для пользователя | Явный вызов |
| --- | --- | --- |
| Codex | `python install.py --agent codex` | `$industrial-terminal-minimalism` |
| Claude Code | `python install.py --agent claude` | `/industrial-terminal-minimalism` |
| Grok Build CLI | `python install.py --agent grok` | `/industrial-terminal-minimalism` |
| Antigravity App/IDE | `python install.py --agent antigravity` | App: `/industrial-terminal-minimalism`; IDE: укажите имя и проверьте Customizations |
| Antigravity CLI | `python install.py --agent antigravity-cli` | `/industrial-terminal-minimalism` |

```sh
# Просмотр без записи; установка в проект; обновление с резервной копией:
python install.py --agent codex --dry-run
python install.py --agent codex --scope project --project "/path/to/project"
python install.py --agent codex --update
```

Для другого клиента замените `codex` значением из таблицы. При обновлении проекта сохраните `--scope project --project "/path/to/project"` и добавьте `--update`. Сначала распакуйте новый релиз или выполните `git pull --ff-only` в чистом клоне. Без `--update` существующий навык не заменяется. Резервная копия сохраняется вне каталога обнаружения навыков; установщик выводит её путь. Для отката переместите новую установку в другое место и верните копию по исходному пути. Для удаления уберите только установленную папку навыка, точный путь к которой вывел установщик.

### Каталоги

Пути отсчитываются от домашнего каталога для личной установки или от выбранного корня проекта; добавьте `/industrial-terminal-minimalism`:

| Клиент | Для пользователя | Для проекта |
| --- | --- | --- |
| Codex | `.agents/skills` | `.agents/skills` |
| Claude Code | `.claude/skills` | `.claude/skills` |
| Grok Build | `.grok/skills` | `.grok/skills` |
| Antigravity App/IDE | `.gemini/config/skills` | `.agents/skills` |
| Antigravity CLI | `.gemini/antigravity-cli/skills` | `.agents/skills` |

У Codex и Antigravity общий проектный каталог: достаточно одной установки. Для ручной установки скопируйте всю [папку навыка](industrial-terminal-minimalism/) в выбранное место вместе с лицензией, уведомлениями и ресурсами. Настройки клиентов не меняются; установка и работа примеров не требуют удалённого сервиса или загрузки ресурсов.

Начните новую сессию, явно вызовите навык и попросите прочитать `SKILL.md`, `STYLE.md` и токены тем из установленной папки. Автоматический выбор зависит от клиента. Это документированные варианты установки, а не сертифицированные интеграции: см. [адаптеры и проверку активации](industrial-terminal-minimalism/adapters/README.md). В среде релиза установлен Claude Code 2.1.220, но вход не выполнен; проверить настоящую активацию не удалось. Активация в остальных клиентах и работа нативных примеров WinUI/Tk для этого релиза также не проверены. Локальные проверки установки в Windows не подтверждают совместимость клиентов в macOS/Linux.

## Лицензия и источники

Оригинальные материалы, права на которые контролирует автор проекта, распространяются по [MIT License](LICENSE), Copyright (c) 2026 bbbAt0n. Оригинальные примеры Living ASCII, постеры и аудио сохраняют существующее [посвящение CC0](industrial-terminal-minimalism/examples/living-ascii/LICENSE.txt); подробности — [область действия, происхождение и исключения](industrial-terminal-minimalism/NOTICE.md).

Навык можно использовать для создания **личных и коммерческих интерфейсов** с соблюдением применимых лицензий. Созданные сайты и приложения **не наследуют MIT автоматически**. При копировании существенных частей материалов репозитория могут действовать требования соответствующих лицензий об уведомлениях. Отдельно полученные ресурсы и зависимости сохраняют собственные лицензии.

Приватные скриншоты, загрузки с Pinterest, игровые изображения и файлы шрифтов не включены. NieR:Automata и Alien упоминаются только как эстетические ориентиры; связь с правообладателями или их одобрение не подразумеваются. Departure Mono необязателен и лицензируется отдельно. Аудит происхождения не является полной юридической проверкой.

## Материалы и проверки

Начните с [SKILL.md](industrial-terminal-minimalism/SKILL.md), [STYLE.md](industrial-terminal-minimalism/STYLE.md), [токенов](industrial-terminal-minimalism/tokens/README.md), [примеров Living ASCII](industrial-terminal-minimalism/examples/living-ascii/README.md) и [истории изменений](industrial-terminal-minimalism/CHANGELOG.md).

```sh
python scripts/release.py check
python industrial-terminal-minimalism/scripts/tokens.py check
python industrial-terminal-minimalism/scripts/tokens.py validate
```

Проверка релиза использует временные изолированные установки, проверяет суммы и ссылки и выполняет документированные варианты установки. Манифест выявляет отсутствие или изменение файлов, но не подтверждает личность издателя. Структурные проверки не доказывают визуальное качество или активацию. Исследования, тестовые приложения, приватные референсы, видеозаписи и кэши исключены из поставки.
