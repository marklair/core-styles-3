# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is an **Obsidian vault** - a personal knowledge management system using markdown files. Obsidian is a note-taking application that uses plain text markdown files stored locally. This vault contains all the development notes, plans, product requirements docs, etc. associated with a specific rails application.  Claude code will be placing all docs within this vault.

## Directory Structure

- **Root directory**: Contains individual markdown notes (`.md` files)
- **`.obsidian/`**: Obsidian configuration directory (plugins, settings, workspace state)
  - `app.json`: Application settings including link behavior and attachment folder
  - `core-plugins.json`: Enabled core plugins
  - `community-plugins.json`: Installed community plugins
  - `workspace.json`: Current workspace layout and open files
  - `hotkeys.json`: Custom keyboard shortcuts
  - `plugins/`: Installed community plugins
- **`templates/`**: Note templates (configured in `.obsidian/templates.json`)
- **`media/`**: Attachment folder for images and other media files
- **`Excalidraw/`**: Drawings created with the Excalidraw plugin

## Key Configuration

### Attachments
- Attachments are automatically stored in the `media/` folder (configured in `.obsidian/app.json`)
- Links are automatically updated when files are moved or renamed (`alwaysUpdateLinks: true`)

### Templates
- Template files are stored in `templates/` folder
- Insert template hotkey: `Mod+Shift+T`

### Community Plugins
Currently installed:
- **obsidian-excalidraw-plugin**: For creating hand-drawn diagrams
  - Drawings stored in `Excalidraw/` folder
  - Uses `.excalidraw.md` file extension
  - Auto-saves every 60 seconds on desktop

### Core Plugins Enabled
- File explorer, global search, graph view, backlink, canvas
- Daily notes, templates, command palette
- Note composer, bookmarks, outline, word count
- File recovery, sync, bases

## Working with Notes

### Creating Notes
- Notes are plain markdown files (`.md`)
- Use templates from `templates/` folder for consistent structure
- Frontmatter can include tags and other metadata

### Linking Between Notes
- Use wiki-style links: `[[Note Name]]`
- Links automatically update when files are renamed/moved
- Backlinks are tracked automatically

### Excalidraw Drawings
- Created in `Excalidraw/` folder with format: `Drawing YYYY-MM-DD HH.mm.ss.excalidraw.md`
- Can be embedded in notes using `![[Drawing name]]`
- Support for both sketch and diagram creation

### Nested Code Fences within Markdown Code Fences
When writing markdown code blocks that contain markdown, use four backticks for the outer fence and three for the inner to avoid premature fence closure:
````markdown
## Heading
The following is nested markdown:
```bash
echo "cow"
```
````

## Tagging System

**CRITICAL**: Always reference `TAGS.md` when working with tags. This file is the **source of truth** for all tagging conventions.

### Tagging Rules
- **Always consult `TAGS.md`** before adding or modifying tags in any note
- Follow the tagging conventions defined in `TAGS.md` (lowercase, hyphenated multi-word, hierarchical structure)
- Use frontmatter format for tags (YAML array under `tags:` key)
- Limit tags to 3-7 per note as specified in `TAGS.md`
- Use standard tag categories defined in `TAGS.md` (status, type, topic, source, priority)

### When Creating or Modifying Notes
1. Read `TAGS.md` to understand the tagging system
2. Apply appropriate tags following the documented conventions
3. Use existing tags when possible rather than creating new ones
4. If creating a new tag category, ensure it follows the rules in `TAGS.md`

### Tag Format
```yaml
---
tags:
  - status-tag
  - type-tag
  - topic/subtopic
---
```

## File Operations

### When Creating New Notes
- Place markdown files in the root directory or organize in subdirectories
- Media files should go in `media/` folder
- Excalidraw drawings should go in `Excalidraw/` folder

### When Modifying Configuration
- Obsidian settings are in `.obsidian/` - be careful modifying these
- Changes to `.obsidian/workspace.json` may reset the user's current workspace layout
- Plugin settings are in `.obsidian/plugins/[plugin-name]/data.json`

## Important Notes

- This is a **project notes vault** - preserve existing notes and structure
- Do not modify `.obsidian/workspace.json` unless explicitly requested (contains window layout state)
- Frontmatter format in notes should match existing patterns (YAML between `---` delimiters)
- When creating links, use wiki-style `[[Link]]` format, not markdown `[text](url)` format for internal links
