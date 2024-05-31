import fs from 'fs'
import { convertKeysToSnakeCase } from './transformers'
import { KarabinerRules, KarabinerSimpleModifications } from './types'
import { app, createHyperSubLayers, open } from './utils'

const simpleModifications: KarabinerSimpleModifications[] = [
  {
    from: {
      keyCode: 'right_command',
    },
    to: [
      {
        keyCode: 'escape',
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
          keyCode: 'caps_lock',
          modifiers: {
            optional: ['any'],
          },
        },
        to: [
          {
            setVariable: {
              name: 'hyper',
              value: 1,
            },
          },
          {
            keyCode: 'left_shift',
            modifiers: ['left_command', 'left_control'],
          },
        ],
        toAfterKeyUp: [
          {
            setVariable: {
              name: 'hyper',
              value: 0,
            },
          },
        ],
        toIfAlone: [
          {
            keyCode: 'escape',
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
      b: app('Obsidian'),
      c: app('Google Chrome'),
      d: app('Discord'),
      e: app('Microsoft Edge'),
      f: app('Firefox Developer Edition'),
      g: app('Tower'),
      l: app('Linear'),
      n: app('Notion'),
      m: app('Messages'),
      s: app('Slack'),
      t: app('Outlook'),
      v: app('Visual Studio Code'),
      w: app('Warp'),
    },

    s: {
      u: {
        to: [
          {
            keyCode: 'volume_increment',
          },
        ],
      },
      j: {
        to: [
          {
            keyCode: 'volume_decrement',
          },
        ],
      },
      i: {
        to: [
          {
            keyCode: 'display_brightness_increment',
          },
        ],
      },
      k: {
        to: [
          {
            keyCode: 'display_brightness_decrement',
          },
        ],
      },
      l: {
        to: [
          {
            keyCode: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
      p: {
        to: [
          {
            keyCode: 'play_or_pause',
          },
        ],
      },
      semicolon: {
        to: [
          {
            keyCode: 'fastforward',
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            keyCode: 'spacebar',
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
        to: [{ keyCode: 'left_arrow' }],
      },
      j: {
        to: [{ keyCode: 'down_arrow' }],
      },
      k: {
        to: [{ keyCode: 'up_arrow' }],
      },
      l: {
        to: [{ keyCode: 'right_arrow' }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ keyCode: 'f', modifiers: ['right_control'] }],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ keyCode: 'j', modifiers: ['right_control'] }],
      },
      d: {
        to: [{ keyCode: 'd', modifiers: ['right_shift', 'right_command'] }],
      },
      u: {
        to: [{ keyCode: 'page_down' }],
      },
      i: {
        to: [{ keyCode: 'page_up' }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ keyCode: 'play_or_pause' }],
      },
      n: {
        to: [{ keyCode: 'fastforward' }],
      },
      b: {
        to: [{ keyCode: 'rewind' }],
      },
    },

    // r = "Raycast"
    r: {
      a: open('raycast://extensions/raycast/raycast-ai/ai-chat'),
      c: open('raycast://extensions/raycast/system/open-camera'),
      e: open(
        'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols'
      ),
      l: open('raycast://extensions/raycast/system/lock-screen'),
      n: open('raycast://script-commands/dismiss-notifications'),
      m: open('raycast://extensions/raycast/calendar/my-schedule'),
      p: open('raycast://extensions/raycast/raycast/confetti'),
      s: open('raycast://extensions/peduarte/silent-mention/index'),
    },
  }),
]

fs.writeFileSync(
  'karabiner.json',
  JSON.stringify(
    convertKeysToSnakeCase({
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
    }),
    null,
    2
  )
)
