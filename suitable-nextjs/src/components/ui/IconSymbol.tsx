// Web-compatible icon component using Lucide React icons

import React from 'react';
import {
  Home,
  Send,
  Code,
  ChevronRight,
  ChevronLeft,
  Menu,
  Calendar,
  Ticket,
  User,
  Lock,
  HelpCircle,
  LogOut,
  ShoppingCart,
  Camera,
  X,
  Users,
  CheckCircle,
  Video,
  Trash2,
  Minus,
  Plus,
  XCircle,
  Settings,
  UserPlus,
  CameraIcon,
  Paintbrush,
  Megaphone,
  Mail,
  Laptop,
  Clock,
  MapPin,
} from 'lucide-react';

type IconName = 
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'chevron.left'
  | 'line.3.horizontal'
  | 'calendar'
  | 'ticket'
  | 'person.fill'
  | 'lock.fill'
  | 'questionmark.circle.fill'
  | 'rectangle.portrait.and.arrow.right'
  | 'cart'
  | 'photo'
  | 'xmark'
  | 'person.2.fill'
  | 'checkmark.circle.fill'
  | 'video.fill'
  | 'trash'
  | 'minus'
  | 'plus'
  | 'xmark.circle.fill'
  | 'gearshape.fill'
  | 'person.badge.plus'
  | 'camera.fill'
  | 'paintbrush.fill'
  | 'megaphone.fill'
  | 'envelope.fill'
  | 'laptopcomputer'
  | 'clock'
  | 'location';

const iconMapping: Record<IconName, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  'house.fill': Home,
  'paperplane.fill': Send,
  'chevron.left.forwardslash.chevron.right': Code,
  'chevron.right': ChevronRight,
  'chevron.left': ChevronLeft,
  'line.3.horizontal': Menu,
  'calendar': Calendar,
  'ticket': Ticket,
  'person.fill': User,
  'lock.fill': Lock,
  'questionmark.circle.fill': HelpCircle,
  'rectangle.portrait.and.arrow.right': LogOut,
  'cart': ShoppingCart,
  'photo': Camera,
  'xmark': X,
  'person.2.fill': Users,
  'checkmark.circle.fill': CheckCircle,
  'video.fill': Video,
  'trash': Trash2,
  'minus': Minus,
  'plus': Plus,
  'xmark.circle.fill': XCircle,
  'gearshape.fill': Settings,
  'person.badge.plus': UserPlus,
  'camera.fill': CameraIcon,
  'paintbrush.fill': Paintbrush,
  'megaphone.fill': Megaphone,
  'envelope.fill': Mail,
  'laptopcomputer': Laptop,
  'clock': Clock,
  'location': MapPin,
};

interface IconSymbolProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export function IconSymbol({ name, size = 24, color = 'currentColor', className }: IconSymbolProps) {
  const IconComponent = iconMapping[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in mapping`);
    return <HelpCircle size={size} color={color} className={className} />;
  }
  
  return <IconComponent size={size} color={color} className={className} />;
}