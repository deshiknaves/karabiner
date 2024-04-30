export type KarabinerRules = {
  description?: string
  manipulators?: Manipulator[]
}

export type KarabinerSimpleModifications = {
  from: From
  to: To[]
}

export type Manipulator = {
  description?: string
  type: 'basic'
  from: From
  to?: To[]
  toAfterKeyUp?: To[]
  toIfAlone?: To[]
  parameters?: Parameters
  conditions?: Conditions[]
}

export type Parameters = {
  'basic.simultaneous_threshold_milliseconds'?: number
}

type Conditions =
  | FrontMostApplicationCondition
  | DeviceCondition
  | KeybaordTypeCondition
  | InputSourceCondition
  | VaribaleCondition
  | EventChangedCondition

type FrontMostApplicationCondition = {
  type: 'frontmost_application_if' | 'frontmost_application_unless'
  bundleIdentifiers?: string[]
  filePaths?: string[]
  description?: string
}

type DeviceCondition = {
  type:
    | 'device_if'
    | 'device_unless'
    | 'device_exists_if'
    | 'device_exists_unless'
  identifiers: Identifiers
  description?: string
}

type Identifiers = {
  vendorId?: number
  productId?: number
  locationId?: number
  isKeyboard?: boolean
  isPointingDevice?: boolean
  isTouchBar?: boolean
  isBuiltInKeyboard?: boolean
}

type KeybaordTypeCondition = {
  type: 'keyboard_type_if' | 'keyboard_type_unless'
  keyboardTypes: string[]
  description?: string
}

type InputSourceCondition = {
  type: 'input_source_if' | 'input_source_unless'
  inputSources: InputSource[]
  description?: string
}

type InputSource = {
  language?: string
  inputSourceId?: string
  inputModeId?: string
}

type VaribaleCondition = {
  type: 'variable_if' | 'variable_unless'
  name: string | number | boolean
  value: string | number
  description?: string
}

type EventChangedCondition = {
  type: 'event_changed_if' | 'event_changed_unless'
  value: boolean
  description?: string
}

export type SimultaneousFrom = {
  keyCode: KeyCode
}

export type SimultaneousOptions = {
  keyDownOrder?: 'insensitive' | 'strict' | 'strict_inverse'
  detectKeyDownUninterruptedly?: boolean
}

export type From = {
  keyCode?: KeyCode
  simultaneous?: SimultaneousFrom[]
  simultaneousOptions?: SimultaneousOptions
  modifiers?: Modifiers
}

export type Modifiers = {
  optional?: string[]
  mandatory?: string[]
}

export type To = {
  keyCode?: KeyCode
  modifiers?: string[]
  shellCommand?: string
  setVariable?: {
    name: string
    value: boolean | number | string
  }
  mouseKey?: MouseKey
  pointingButton?: string
  /**
   * Power Management plugin
   * @example: sleep system
   * @see: {@link https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/software_function/iokit_power_management_sleep_system/}
   */
  softwareFunction?: SoftwareFunction
}

export type MouseKey = {
  y?: number
  x?: number
  speedMultiplier?: number
  verticalWheel?: number
  horizontalWheel?: number
}

export type SoftwareFunction = {
  iokitPowerManagementSleepSystem?: {}
}

export type KeyCode =
  | 'caps_lock'
  | 'left_control'
  | 'left_shift'
  | 'left_option'
  | 'left_command'
  | 'right_control'
  | 'right_shift'
  | 'right_option'
  | 'right_command'
  | 'fn'
  | 'return_or_enter'
  | 'escape'
  | 'delete_or_backspace'
  | 'delete_forward'
  | 'tab'
  | 'spacebar'
  | 'hyphen'
  | 'equal_sign'
  | 'open_bracket'
  | 'close_bracket'
  | 'backslash'
  | 'non_us_pound'
  | 'semicolon'
  | 'quote'
  | 'grave_accent_and_tilde'
  | 'comma'
  | 'period'
  | 'slash'
  | 'non_us_backslash'
  | 'up_arrow'
  | 'down_arrow'
  | 'left_arrow'
  | 'right_arrow'
  | 'page_up'
  | 'page_down'
  | 'home'
  | 'end'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'
  | 'f13'
  | 'f14'
  | 'f15'
  | 'f16'
  | 'f17'
  | 'f18'
  | 'f19'
  | 'f20'
  | 'f21'
  //   not_to: true
  | 'f22'
  //   not_to: true
  | 'f23'
  //   not_to: true
  | 'f24'
  //   not_to: true
  | 'display_brightness_decrement'
  //   not_from: true
  | 'display_brightness_increment'
  //   not_from: true
  | 'mission_control'
  //   not_from: true
  | 'launchpad'
  //   not_from: true
  | 'dashboard'
  //   not_from: true
  | 'illumination_decrement'
  //   not_from: true
  | 'illumination_increment'
  //   not_from: true
  | 'rewind'
  //   not_from: true
  | 'play_or_pause'
  //   not_from: true
  | 'fastforward'
  //   not_from: true
  | 'mute'
  | 'volume_decrement'
  | 'volume_increment'
  | 'eject'
  //   not_from: true
  | 'apple_display_brightness_decrement'
  //   not_from: true
  | 'apple_display_brightness_increment'
  //   not_from: true
  | 'apple_top_case_display_brightness_decrement'
  //   not_from: true
  | 'apple_top_case_display_brightness_increment'
  //   not_from: true
  | 'keypad_num_lock'
  | 'keypad_slash'
  | 'keypad_asterisk'
  | 'keypad_hyphen'
  | 'keypad_plus'
  | 'keypad_enter'
  | 'keypad_1'
  | 'keypad_2'
  | 'keypad_3'
  | 'keypad_4'
  | 'keypad_5'
  | 'keypad_6'
  | 'keypad_7'
  | 'keypad_8'
  | 'keypad_9'
  | 'keypad_0'
  | 'keypad_period'
  | 'keypad_equal_sign'
  | 'keypad_comma'
  | 'vk_none'
  //   not_from: true
  | 'print_screen'
  | 'scroll_lock'
  | 'pause'
  | 'insert'
  | 'application'
  | 'help'
  | 'power'
  | 'execute'
  //   not_to: true
  | 'menu'
  //   not_to: true
  | 'select'
  //   not_to: true
  | 'stop'
  //   not_to: true
  | 'again'
  //   not_to: true
  | 'undo'
  //   not_to: true
  | 'cut'
  //   not_to: true
  | 'copy'
  //   not_to: true
  | 'paste'
  //   not_to: true
  | 'find'
  //   not_to: true
  | 'international1'
  | 'international2'
  //   not_to: true
  | 'international3'
  | 'international4'
  //   not_to: true
  | 'international5'
  //   not_to: true
  | 'international6'
  //   not_to: true
  | 'international7'
  //   not_to: true
  | 'international8'
  //   not_to: true
  | 'international9'
  //   not_to: true
  | 'lang1'
  | 'lang2'
  | 'lang3'
  //   not_to: true
  | 'lang4'
  //   not_to: true
  | 'lang5'
  //   not_to: true
  | 'lang6'
  //   not_to: true
  | 'lang7'
  //   not_to: true
  | 'lang8'
  //   not_to: true
  | 'lang9'
  //   not_to: true
  | 'japanese_eisuu'
  | 'japanese_kana'
  | 'japanese_pc_nfer'
  //   not_to: true
  | 'japanese_pc_xfer'
  //   not_to: true
  | 'japanese_pc_katakana'
  //   not_to: true
  | 'keypad_equal_sign_as400'
  //   not_to: true
  | 'locking_caps_lock'
  //   not_to: true
  | 'locking_num_lock'
  //   not_to: true
  | 'locking_scroll_lock'
  //   not_to: true
  | 'alternate_erase'
  //   not_to: true
  | 'sys_req_or_attention'
  //   not_to: true
  | 'cancel'
  //   not_to: true
  | 'clear'
  //   not_to: true
  | 'prior'
  //   not_to: true
  | 'return'
  //   not_to: true
  | 'separator'
  //   not_to: true
  | 'out'
  //   not_to: true
  | 'oper'
  //   not_to: true
  | 'clear_or_again'
  //   not_to: true
  | 'cr_sel_or_props'
  //   not_to: true
  | 'ex_sel'
  //   not_to: true
  | 'left_alt'
  | 'left_gui'
  | 'right_alt'
  | 'right_gui'
  | 'vk_consumer_brightness_down'
  //   not_from: true
  | 'vk_consumer_brightness_up'
  //   not_from: true
  | 'vk_mission_control'
  //   not_from: true
  | 'vk_launchpad'
  //   not_from: true
  | 'vk_dashboard'
  //   not_from: true
  | 'vk_consumer_illumination_down'
  //   not_from: true
  | 'vk_consumer_illumination_up'
  //   not_from: true
  | 'vk_consumer_previous'
  //   not_from: true
  | 'vk_consumer_play'
  //   not_from: true
  | 'vk_consumer_next'
  //   not_from: true
  | 'volume_down'
  | 'volume_up'
