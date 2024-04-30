import fs from 'fs'
import { KarabinerRules, KarabinerSimpleModifications } from './types'
import { app, createHyperSubLayers, open } from './utils'

const simpleModifications: KarabinerSimpleModifications[] = [
  {
    from: {
      key_code: 'right_command',
    },
    to: [
      {
        key_code: 'escape',
      },
    ],
  },
]

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: 'Hyper Key (⌃⌥⇧⌘)',
    manipulators: [
      {
        description: 'Caps Lock -> Hyper Key',
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            set_variable: {
              name: 'hyper',
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: 'hyper',
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: 'escape',
          },
        ],
        type: 'basic',
      },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {},
    // o = "Open" applications
    o: {
      1: app('1Password'),
      a: app('Arc'),
      c: app('Notion Calendar'),
      v: app('Visual Studio Code'),
      d: app('Discord'),
      s: app('Slack'),
      n: app('Notion'),
      t: app('Terminal'),
      // Open todo list managed via *H*ypersonic
      h: open(
        'notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026'
      ),
      w: app('Warp'),
    },

    s: {
      u: {
        to: [
          {
            key_code: 'volume_increment',
          },
        ],
      },
      j: {
        to: [
          {
            key_code: 'volume_decrement',
          },
        ],
      },
      i: {
        to: [
          {
            key_code: 'display_brightness_increment',
          },
        ],
      },
      k: {
        to: [
          {
            key_code: 'display_brightness_decrement',
          },
        ],
      },
      l: {
        to: [
          {
            key_code: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: 'play_or_pause',
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: 'fastforward',
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: 'spacebar',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: 'left_arrow' }],
      },
      j: {
        to: [{ key_code: 'down_arrow' }],
      },
      k: {
        to: [{ key_code: 'up_arrow' }],
      },
      l: {
        to: [{ key_code: 'right_arrow' }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: 'f', modifiers: ['right_control'] }],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: 'j', modifiers: ['right_control'] }],
      },
      d: {
        to: [{ key_code: 'd', modifiers: ['right_shift', 'right_command'] }],
      },
      u: {
        to: [{ key_code: 'page_down' }],
      },
      i: {
        to: [{ key_code: 'page_up' }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: 'play_or_pause' }],
      },
      n: {
        to: [{ key_code: 'fastforward' }],
      },
      b: {
        to: [{ key_code: 'rewind' }],
      },
    },

    // r = "Raycast"
    r: {
      n: open('raycast://script-commands/dismiss-notifications'),
      e: open(
        'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols'
      ),
      c: open('raycast://extensions/raycast/system/open-camera'),
      p: open('raycast://extensions/raycast/raycast/confetti'),
      a: open('raycast://extensions/raycast/raycast-ai/ai-chat'),
      s: open('raycast://extensions/peduarte/silent-mention/index'),
    },
  }),
]

fs.writeFileSync(
  'karabiner.json',
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: 'Default',
          simple_modifications: simpleModifications,
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
)
