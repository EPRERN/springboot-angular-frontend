import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciasService } from './services/provincias/provincias.service';
import { PersonasService } from './services/personas/personas.service';
import { PaisesService } from './services/paises/paises.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  personaFom!: FormGroup;
  paises : any;
  provincias: any;

  constructor(public fb: FormBuilder,
              public provinciasService:ProvinciasService,
              public personasService: PersonasService,
              public paisesService:PaisesService){}

  ngOnInit(): void {
    this.personaFom = this.fb.group({
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      edad : ['',Validators.required],
      pais : ['',Validators.required],
      estado : ['',Validators.required],
    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      // console.log(resp)
    },
    error=>{console.error(error)})
  }

  guardar(){}

  cargarProvinciasPorPaisesId(event:any){
    this.provinciasService.getAllProvinciasByPais(event.target.value).subscribe(resp => {
      this.provincias = resp;
    },
    error=>{console.error(error)})
  }

  
}
