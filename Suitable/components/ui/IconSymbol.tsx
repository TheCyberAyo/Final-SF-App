// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'line.3.horizontal': 'menu',
  'calendar': 'event',
  'ticket': 'confirmation-number',
  'person.fill': 'person',
  'lock.fill': 'lock',
  'questionmark.circle.fill': 'help',
  'rectangle.portrait.and.arrow.right': 'logout',
  'cart': 'shopping-cart',
  'photo': 'photo-camera',
  'xmark': 'close',
  'person.2.fill': 'group',
  'checkmark.circle.fill': 'check-circle',
  'video.fill': 'videocam',
  'trash': 'delete',
  'minus': 'remove',
  'plus': 'add',
  'xmark.circle.fill': 'cancel',
  'gearshape.fill': 'settings',
  'person.badge.plus': 'person-add',
  'camera.fill': 'camera-alt',
  'paintbrush.fill': 'format-paint',
  'megaphone.fill': 'volume-up',
  'envelope.fill': 'email',
  'laptopcomputer': 'computer',
  'clock': 'access-time',
  'location': 'location-on',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];
  if (!iconName) {
    console.warn(`Icon "${name}" not found in mapping`);
    return <MaterialIcons color={color} size={size} name="help-outline" style={style} />;
  }
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
