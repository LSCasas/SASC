import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuthToken from "@/hooks/useAuthToken";
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
} from "lucide-react";
import { logout } from "../api/auth";
import { getCurrentUser } from "../api/user";

const Sidebar = () => {
  useAuthToken();
  const [isOpen, setIsOpen] = useState(false);
  const [campusName, setCampusName] = useState("");

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

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await getCurrentUser();
        const userCampusId = user.selectedCampusId;
        const campus = user.campusId.find(
          (campus) => campus._id === userCampusId
        );
        if (campus) {
          setCampusName(campus.name);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <>
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden text-white bg-[#B0005E] p-2 rounded-md z-50"
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:flex md:w-64 h-screen bg-gradient-to-r from-[#B0005E] to-[#6C0036] p-4 absolute md:relative">
        <SidebarContent campusName={campusName} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-50 flex items-start">
          <div
            id="mobile-menu"
            className="w-64 h-full bg-gradient-to-r from-[#B0005E] to-[#6C0036] p-4"
          >
            <SidebarContent campusName={campusName} />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ campusName }) => {
  return (
    <nav className="flex flex-col gap-4">
      <div>
        <h2 className="text-white text-xl font-semibold mb-4">
          {campusName || "Cargando..."}
        </h2>
        <SidebarItem
          href="/alumnos"
          icon={<GraduationCap size={25} />}
          label="Alumnos"
        />
        <SidebarItem
          href="/tutores"
          icon={<Users size={25} />}
          label="Tutores"
        />
        <SidebarItem
          href="/docentes"
          icon={<UserCheck size={25} />}
          label="Docentes"
        />
        <SidebarItem
          href="/clases"
          icon={<BookOpen size={25} />}
          label="Clases"
        />
        <SidebarItem
          href="/instrumentos"
          icon={<Music size={25} />}
          label="Instrumentos"
        />
        <SidebarItem
          href="/horarios"
          icon={<Calendar size={25} />}
          label="Horarios"
        />
        <SidebarItem
          href="/transferencias"
          icon={<RefreshCw size={25} />}
          label="Transferencias"
        />
        <SidebarItem
          href="/exAlumnos"
          icon={<UserX size={25} />}
          label="Ex-Alumnos"
        />
      </div>

      <div className="mt-auto">
        <SidebarItem
          href="/"
          icon={<LogOut size={25} />}
          label="Salir"
          isLogout
        />
      </div>
    </nav>
  );
};

const SidebarItem = ({ href, icon, label, isLogout = false }) => {
  const router = useRouter();

  const handleClick = async (event) => {
    if (isLogout) {
      event.preventDefault();
      try {
        await logout();
        router.push(href);
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white hover:bg-white hover:text-[#B0005E] p-3 rounded-lg transition-all"
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
