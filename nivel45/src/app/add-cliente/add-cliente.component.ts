import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, this.validarCedula.bind(this)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: [''],
      correo: ['', [Validators.email, this.validarCorreo.bind(this)]],
      direccion: [''],
    });
  }

  validarCedula(control: AbstractControl | null) {
    // Verificación de nulidad
    if (control === null) {
      return { 'nullControl': true };
    }

    const cedula = control.value;

    // Verificación de nulidad nuevamente después de obtener el valor
    if (cedula === null || cedula === undefined || typeof cedula !== 'string' || cedula.length !== 10) {
      return { 'invalidCedulaLength': true };
    }

    // Obtiene los dígitos de la cédula
    const digitos = cedula.split('').map(Number);

    // Aplica el algoritmo de validación
    let par = 0;
    let impar = 0;

    for (let i = 0; i < 9; i += 2) {
      let aux = 2 * digitos[i];
      if (aux > 9) {
        aux -= 9;
      }
      par += aux;
    }

    for (let i = 1; i < 9; i += 2) {
      impar += digitos[i];
    }

    const sumaTotal = par + impar;
    const digitoVerificador = (sumaTotal % 10 !== 0) ? 10 - (sumaTotal % 10) : 0;

    // Verifica que 'control' no sea 'null' antes de acceder a la propiedad 'invalid'
    if (control.invalid) {
      // Realiza acciones específicas si el control es inválido
      control.markAsTouched();
    }

    // Verifica el dígito verificador
    if (digitoVerificador !== digitos[9]) {
      return { 'invalidCedulaVerifier': true };
    }

    // La cédula es válida
    return null;
  }

  validarCorreo(control: AbstractControl) {
    const correo = control.value;

    // Utilizamos una expresión regular para validar el formato del correo
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Comprobamos si el correo coincide con el formato esperado
    return regex.test(correo) ? null : { 'invalidEmailFormat': true };
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      // Llama al servicio para insertar el cliente
      this.clienteService.insertarCliente(clienteData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Cliente insertado correctamente');
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar el cliente');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
