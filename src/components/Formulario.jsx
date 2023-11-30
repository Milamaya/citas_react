import {useState, useEffect} from 'react';
import Error from './Error';

// eslint-disable-next-line react/prop-types
const Formulario = ({paciente, setPaciente, pacientes, setPacientes}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fechaAlta, setFechaAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(pacientes).length > 0){
      setNombre(pacientes.nombre)
      setPropietario(pacientes.propietario)
      setEmail(pacientes.email)
      setFechaAlta(pacientes.fechaAlta)
      setSintomas(pacientes.sintomas)
    }
  },[pacientes])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36) 

    return random + fecha
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    
      //Validacion del formulario
        if([nombre, propietario, email, fechaAlta, sintomas].includes('')){
          console.log('Hay al menos un campo vacio')

          setError(true)
          return;
        }
        setError(false)
         
        //Objeto de Paciente
        const objetoPaciente = {
          nombre,
          propietario,
          email,
          fechaAlta,
          sintomas         
        }

        if(pacientes.id){
          //Editando el Registro
          objetoPaciente.id = paciente.id
          const pacienteActualizado = paciente.map(pacienteState => pacienteState.id === pacientes.id ? objetoPaciente : pacienteState)

          setPaciente(pacienteActualizado)
          setPacientes({})

        }else{
          //Nuevo Regitro
          objetoPaciente.id = generarId()
          setPaciente([...paciente, objetoPaciente]) 
        }       

        //Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFechaAlta('')
        setSintomas('')

  } 

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5"> 
        <h2 className="font-black text-3xl text-center">
            Formulario
        </h2>
        <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"> 

          {error && <Error mensaje='Todos los campos son obligatorios'/> }


          <div className="mb-5 ">

            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label> 
            <input
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p- mt-2 placeholder-gray- rounded-md"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />                 
            
          </div>

          <div className="mb-5 ">

            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label> 
            <input
              id="propietario"
              type="text"
              placeholder="Nombre de Propietario"
              className="border-2 w-full p- mt-2 placeholder-gray- rounded-md"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
            />                 
            
          </div>

          <div className="mb-5 ">

            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label> 
            <input
              id="email"
              type="email"
              placeholder="Email Contacto Propietario"
              className="border-2 w-full p- mt-2 placeholder-gray- rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />                 
            
          </div>

          <div className="mb-5 ">

            <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label> 
            <input
              id="alta"
              type="date"              
              className="border-2 w-full p- mt-2 placeholder-gray- rounded-md"
              value={fechaAlta}
              onChange={(e) => setFechaAlta(e.target.value)}
            />                 
            
          </div>

          <div className="mb-5 ">

            <label htmlFor="Alta" className="block text-gray-700 uppercase font-bold">Sintomas</label> 
            <textarea
              id="sintomas"
              className="border-2 w-full p- mt-2 placeholder-gray- rounded-md"
              placeholder="Escribe los sintomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />                 
            
          </div>
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"          
            value={pacientes.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />
        
        </form>
    </div>
  )
}


export default Formulario
 