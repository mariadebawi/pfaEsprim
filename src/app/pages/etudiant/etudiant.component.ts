import { Component, OnDestroy, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/layouts/services/etudiant.service';
import Etudiant from '../../layouts/models/etudiant.model';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit , OnDestroy {
  etudiantsList?: Etudiant[];
  closeResult = '';
  url;
  selecetdFile: File;
  imagePreview: string;
  etudiantForm: FormGroup;
  submitted = false;
  etudiant: Etudiant = new Etudiant();
  etudiantUpdated: Etudiant;

  config: any;
  public labels: any = {
      previousLabel: '&nbsp;',
      nextLabel: '&nbsp;',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  objectsFilter = { nom: '' ,  numInscrp: ''  };


  constructor(private etudiantService: EtudiantService , private modalService: NgbModal , private formBuilder: FormBuilder) { 
  

  }

  ngOnInit() {
    this.etudiantForm = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    numInscrp: ['', Validators.required],
    email: ['', Validators.required],
    filiere: ['', Validators.required]?['', Validators.required]:this.etudiantUpdated,

});

    this.retrieveEtudiants() ;

   

  }

  retrieveEtudiants(): void {
    this.etudiantService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.etudiantsList = data;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
       totalItems: this.etudiantsList.length
      };

    });
  }

  onChange(value : string) {
    console.log('status')
   }

  onSelectFile(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }
  get f() { return this.etudiantForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.etudiantForm.invalid) {
        return;
    }
    this.etudiant = ({
      nom: this.etudiantForm.value.nom,
      prenom: this.etudiantForm.value.prenom,
      numInscrp: this.etudiantForm.value.numInscrp,
      email: this.etudiantForm.value.email,
      filiere: this.etudiantForm.value.filiere,
      deleted : false,
      avatar:this.url?this.url:'',
      createdAt : Date.now(),
      updatedAt : Date.now()

    })

    this.etudiantService.create(this.etudiant).then(() => {
      Swal.fire(
        'Ajout !',
        'Votre document est crré avec succée.',
        'success'
      )
      this.submitted = true;
      this.getDismissReason('ModalDismissReasons.ESC')
    });
}



getDate(date){
  moment.locale('fr-ca'); 
  return moment(date).format('Do MMMM YYYY')
}

  open(content , etudiant?:Etudiant) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.etudiantUpdated= etudiant ;
  }

  
  onReset() {
    this.submitted = false;
    this.etudiantForm.reset();
}


supprimerEtudiant(e : Etudiant){
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ce document',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, garde-le'
  }).then((result) => {
    if (result.isConfirmed) {
      this.etudiantService.delete(e.id)
      Swal.fire(
        'Supprimé !',
        'Votre document imaginaire a été supprimé.',
        'success'
      )

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annulé',
        'Votre document imaginaire est en sécurité :)',
        'error'
      )
    }
  })
}

onPageChange(event){
  this.config.currentPage = event;
}


onSubmitUpdated(){
  this.submitted = true;
  if (this.etudiantForm.invalid) {
      return;
  }
  
  this.etudiant = ({
  nom: this.etudiantForm.value.nom,
  prenom: this.etudiantForm.value.prenom,
  numInscrp: this.etudiantForm.value.numInscrp,
  email: this.etudiantForm.value.email,
  filiere: this.etudiantForm.value.filiere,
  deleted : false,
  avatar:this.url?this.url:'',
  updatedAt : Date.now()
  })

  this.etudiantService.update(this.etudiantUpdated.id , this.etudiant).then(() => {
    Swal.fire(
      'Modif !',
      'Votre document est modifié avec succée.',
      'success'
    )
    this.submitted = true;

  });
}

  getFiliere(filiere) {
    if(filiere == 'GI' ) return "genie  informatique" ;
    if(filiere == 'GI' ) return ">genie mécatronique" ;
    if(filiere == 'HID' ) return "genie industriel" ;
    else return filiere ;
  }

  private getDismissReason(reason: any): string {
    this.onReset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
