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
      this.personas.push(resp);
    },
      error => { console.error(error) })
  }


  borrar(){
    Swal.fire({
      title:'Eliminar Registro',
      text:'¿Estás seguro de eliminar el registro?',
      icon:'warning',
    })
  }
  // cargarProvinciasPorPaisesId(event: any) {
  //   this.provinciasService.getAllProvinciasByPais(event.target.value).subscribe(resp => {
  //     this.provincias = resp;
  //   },
  //     error => { console.error(error) })
  // }


}
