// This port owns its application mappings. Inputs come only from the pinned local palette.
import { ANSI_ORDER } from '../scripts/palette.mjs';

const alacritty = {
files: (f) => {
    const block = (arr) => ANSI_ORDER.map((n, i) => `${n} = "${arr[i]}"`).join("\n");
    return [{
      path: `${f.slug}.toml`,
      content: `[colors.primary]
background = "${f.r("bg")}"
foreground = "${f.r("fg")}"
dim_foreground = "${f.r("fgMuted")}"
bright_foreground = "${f.r("fg")}"

[colors.cursor]
text = "${f.r("bg")}"
cursor = "${f.r("cursor")}"

[colors.vi_mode_cursor]
text = "${f.r("bg")}"
cursor = "${f.c("amber")}"

[colors.selection]
text = "CellForeground"
background = "${f.r("selection")}"

[colors.search.matches]
foreground = "${f.r("bg")}"
background = "${f.r("fgSubtle")}"

[colors.search.focused_match]
foreground = "${f.r("bg")}"
background = "${f.r("match")}"

[colors.footer_bar]
foreground = "${f.r("fg")}"
background = "${f.c("surface0")}"

[colors.hints.start]
foreground = "${f.r("bg")}"
background = "${f.r("accent")}"

[colors.hints.end]
foreground = "${f.r("bg")}"
background = "${f.r("fgMuted")}"

[colors.normal]
${block(f.ansi.normal)}

[colors.bright]
${block(f.ansi.bright)}
`,
    }];
  }
};

export function generate(flavors) {
  return [...flavors.flatMap(f => alacritty.files(f)), ...(alacritty.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
