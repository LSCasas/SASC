import Link from "next/link";

export default function Autor() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          PROYECTO DE COOPERACIÓN
        </h1>
        <p className="text-black">
          <strong>NOMBRE DEL PROYECTO:</strong> Sistema de Administración para
          Sedes Culturales (SASC)
        </p>
        <p className="text-black">
          <strong>NOMBRE DE ESTUDIANTE:</strong> Casas González Luis Salvador
        </p>
        <p className="text-black">
          <strong>ESCUELA:</strong> Universidad Politécnica del Valle de México
        </p>
        <p className="text-black">
          <strong>OBJETIVO(S):</strong> Diseñar e implementar una plataforma
          digital que optimice la administración del programa Jóvenes por
          Tultepec, permitiendo la gestión eficiente de información, el control
          de instrumentos, el registro de actividades y la generación de
          reportes.
        </p>

        <p className="text-black">
          <strong>ÁREA O DEPARTAMENTO:</strong> Departamento de Cultura
        </p>
        <p className="text-black">
          <strong>EMPRESA:</strong> H. AYUNTAMIENTO DE TULTEPEC
        </p>
        <p className="text-black">
          <strong>DIRECCIÓN:</strong> Manzana 024, Centro, 54960 Tultepec,
          Estado de México
        </p>
        <p className="text-black">
          <strong>TELÉFONO:</strong> 55 5892 0125 EXT 112
        </p>
        <p className="text-black">
          <strong>EMAIL:</strong> educacion@tultepec.gob.mx
        </p>

        <h3 className="text-lg font-semibold mt-4 text-black">
          Agradecimientos
        </h3>
        <p className="text-black">
          Agradezco al Departamento de Cultura del H. Ayuntamiento de Tultepec
          por brindarme la oportunidad de colaborar en este proyecto. Este
          trabajo es el resultado de un esfuerzo conjunto y de un compromiso con
          la mejora continua.
        </p>

        <h3 className="text-lg font-semibold mt-4 text-black">Contacto</h3>
        <p className="text-black">
          Si deseas ponerte en contacto conmigo para colaborar en proyectos o
          recibir más información sobre mis trabajos, no dudes en escribirme a
          mi correo electrónico o visitarme en mi perfil de LinkedIn.
        </p>

        <div className="mt-4 text-center">
          <Link
            href="https://www.linkedin.com/in/luis-casas-45009129b/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Visita mi LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}
