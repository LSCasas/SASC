import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  Music,
  Calendar,
  RefreshCw,
  UserX,
  LogOut,
  Link as LinkIcon,
  Building,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (
          !event.target.closest("#mobile-menu") &&
          !event.target.closest("#menu-button")
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 sm:hidden text-white bg-[#B0005E] p-2 rounded-md z-50"
      >
        <Menu size={24} />
      </button>

      <div className="hidden sm:flex sm:w-64 h-screen bg-gradient-to-r from-[#B0005E] to-[#6C0036] p-4 absolute sm:relative">
        <SidebarContent />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-50 flex items-start">
          <div
            id="mobile-menu"
            className="w-64 h-full bg-gradient-to-r from-[#B0005E] to-[#6C0036] p-4"
          >
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarContent = () => {
  return (
    <nav className="flex flex-col gap-4">
      <SidebarItem
        href="/alumnos"
        icon={<GraduationCap size={20} />}
        label="Alumnos"
      />
      <SidebarItem href="/tutores" icon={<Users size={20} />} label="Tutores" />
      <SidebarItem
        href="/docentes"
        icon={<UserCheck size={20} />}
        label="Docentes"
      />
      <SidebarItem
        href="/clases"
        icon={<BookOpen size={20} />}
        label="Clases"
      />
      <SidebarItem
        href="/instrumentos"
        icon={<Music size={20} />}
        label="Instrumentos"
      />
      <SidebarItem
        href="/horarios"
        icon={<Calendar size={20} />}
        label="Horarios"
      />
      <SidebarItem
        href="/transferencias"
        icon={<RefreshCw size={20} />}
        label="Transferencias"
      />
      <SidebarItem
        href="/exAlumnos"
        icon={<UserX size={20} />}
        label="Ex-Alumnos"
      />
      <SidebarItem
        href="/enlacesDeSedes"
        icon={<LinkIcon size={20} />}
        label="Enlaces de Sedes"
      />
      <SidebarItem
        href="/ControlDeSedes"
        icon={<Building size={20} />}
        label="Control de Sedes"
      />
      <SidebarItem href="/" icon={<LogOut size={20} />} label="Salir" />
    </nav>
  );
};

const SidebarItem = ({ href, icon, label }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white hover:bg-white hover:text-[#B0005E] p-3 rounded-lg transition-all"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
