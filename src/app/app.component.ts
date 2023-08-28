import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciasService } from './services/provincias/provincias.service';
import { PersonasService } from './services/personas/personas.service';
import { PaisesService } from './services/paises/paises.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaFom!: FormGroup;
  paises: any;
  provincias: any;
  personas: any;

  constructor(public fb: FormBuilder,
    public provinciasService: ProvinciasService,
    public personasService: PersonasService,
    public paisesService: PaisesService) { }

  ngOnInit(): void {
    this.personaFom = this.fb.group({
      id:[''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      // console.log(resp)
    },
      error => { console.error(error) });


    this.personasService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => { console.error(error) }
    );

    this.personaFom.get('pais')?.valueChanges.subscribe(value => {
      this.provinciasService.getAllProvinciasByPais(value.id).subscribe(resp => {
        this.provincias = resp;
      },
        error => { console.error(error) });
    })

  }

  guardar() {
    Swal.fire({
      title: 'Excelente!',
      text: 'Persona Guardada Exitosamente!',
      icon: 'success'
    })
    this.personasService.savePersona(this.personaFom.value).subscribe(resp => {
      this.personaFom.reset();
      this.personas = this.personas.filter((persona: { id: any; })=> resp.id!==persona.id);
      this.personas.push(resp);
    },
      error => { console.error(error) })
  }


  borrar(persona: any) {
    Swal.fire({
      title: '¿ Estás seguro de eliminar el registro ?',
      showDenyButton: true,
      confirmButtonText: 'Cancelar',
      denyButtonText: `Eliminar`,
      text: '¿Estás seguro de eliminar el registro?',
      icon: 'warning',
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire('Se eliminó el registro!', '', 'error'),
          this.personasService.deletePersona(persona.id).subscribe(resp => {
            console.log(resp)
            if (resp === true) {
              this.personas.pop(persona); 
            }
            location.reload();
          });
      }
    })
    // location.reload();
  }

  editar(persona:any){
    
    this.personaFom.setValue({
      id:persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      provincia: persona.provincia,
    })
  }



  // cargarProvinciasPorPaisesId(event: any) {
  //   this.provinciasService.getAllProvinciasByPais(event.target.value).subscribe(resp => {
  //     this.provincias = resp;
  //   },
  //     error => { console.error(error) })
  // }


}
