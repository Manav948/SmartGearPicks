import {
  ShieldCheck,
  Eye,
  Share2,
  Cookie,
  FileText,
  ArrowUpRight,
  Lock,
  Database,
  Mail,
  Scale,
  FileCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Link2,
  LucideIcon,
} from "lucide-react";

export function getLegalIcon(iconName?: string): LucideIcon {
  if (!iconName) return FileText;

  switch (iconName.toLowerCase()) {
    case "shield":
    case "shieldcheck":
      return ShieldCheck;
    case "eye":
      return Eye;
    case "share":
    case "share2":
      return Share2;
    case "cookie":
      return Cookie;
    case "file":
    case "filetext":
      return FileText;
    case "link":
    case "link2":
    case "arrowupright":
      return ArrowUpRight;
    case "lock":
      return Lock;
    case "database":
      return Database;
    case "mail":
      return Mail;
    case "scale":
      return Scale;
    case "filecheck":
    case "file-check":
      return FileCheck;
    case "sparkles":
      return Sparkles;
    case "check":
    case "checkcircle2":
      return CheckCircle2;
    case "alert":
    case "alerttriangle":
      return AlertTriangle;
    case "shieldalert":
    case "shield-alert":
      return ShieldAlert;
    default:
      return FileText;
  }
}
