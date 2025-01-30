import { useState } from "react";
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
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gradient-to-r from-[#B0005E] to-[#6C0036] h-screen p-4 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="text-white mb-6">
        <Menu size={24} />
      </button>
      <nav className="flex flex-col gap-4">
        <SidebarItem
          href="/alumno"
          icon={<GraduationCap size={20} />}
          label="Alumno"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/padres"
          icon={<Users size={20} />}
          label="Padres"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/docente"
          icon={<UserCheck size={20} />}
          label="Docente"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/clases"
          icon={<BookOpen size={20} />}
          label="Clases"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/instrumentos"
          icon={<Music size={20} />}
          label="Instrumentos"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/horarios"
          icon={<Calendar size={20} />}
          label="Horarios"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/transferencias"
          icon={<RefreshCw size={20} />}
          label="Transferencias"
          isOpen={isOpen}
        />
        <SidebarItem
          href="/exalumnos"
          icon={<UserX size={20} />}
          label="Ex-Alumnos"
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ href, icon, label, isOpen }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white hover:bg-white hover:text-[#B0005E] p-3 rounded-lg transition-all"
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
