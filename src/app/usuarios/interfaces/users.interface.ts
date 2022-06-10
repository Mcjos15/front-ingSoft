export interface User {
  id_usuario?: number;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  foto?: string;
  fechaNacimiento?: Date;
  id_departamento?: number;
  correo?: string;
  celular?: string;
  cedula: string;
  id_sexo: string;
  id_distrito?: number;
  id_canton?: number;
  id_provincia?: number;
  password?:string
}
