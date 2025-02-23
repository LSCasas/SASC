import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  LogOut,
  Link as LinkIcon,
  Building,
  Briefcase,
} from "lucide-react";
import { getUserById } from "../api/user";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById();
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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

  if (loading) return null;

  if (userRole !== "admin") return null;

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
        <SidebarAdminContent />
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-50 flex items-start">
          <div
            id="mobile-menu"
            className="w-64 h-full bg-gradient-to-r from-[#B0005E] to-[#6C0036] p-4"
          >
            <SidebarAdminContent />
          </div>
        </div>
      )}
    </>
  );
};

const SidebarAdminContent = () => {
  return (
    <nav className="flex flex-col gap-4">
      <div>
        <SidebarAdminItem
          href="/enlacesDeSedes"
          icon={<LinkIcon size={25} />}
          label="Enlaces de Sedes"
        />
        <SidebarAdminItem
          href="/ControlDeSedes"
          icon={<Building size={25} />}
          label="Control de Sedes"
        />
        <SidebarAdminItem
          href="/coordinadores"
          icon={<Briefcase size={25} />}
          label="Control de Coordinadores"
        />
      </div>

      <div className="mt-auto">
        <SidebarAdminItem href="/" icon={<LogOut size={25} />} label="Salir" />
      </div>
    </nav>
  );
};

const SidebarAdminItem = ({ href, icon, label }) => {
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

export default SidebarAdmin;
