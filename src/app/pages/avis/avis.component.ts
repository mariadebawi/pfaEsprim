import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvisService } from 'src/app/layouts/services/avis.service';
import Avis from '../../layouts/models/avis.model';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  avisList?: Avis[];
  closeResult = '';
  url;
  selecetdFile: File;
  imagePreview: string;
  avisForm: FormGroup;
  submitted = false;
  avis: Avis = new Avis();
  avisUpdated: Avis;
  type='Note';
  config: any;
  public labels: any = {
      previousLabel: '&nbsp;',
      nextLabel: '&nbsp;',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  objectsFilter = { type: ''  };

  constructor(private avisService: AvisService , private modalService: NgbModal , private formBuilder: FormBuilder) { 
  

  }

  ngOnInit() {
    this.avisForm = this.formBuilder.group({
      descrp: ['', Validators.required],
      datePub: ['', Validators.required],
      type: ['', Validators.required]?['', Validators.required]:this.avisUpdated,
  
  });

  this.retrieveAvis()
  }


  onChange(value : string) {
    this.type = value ;
   }

  onSelectFile(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }
  get f() { return this.avisForm.controls; }



  retrieveAvis(): void {
    this.avisService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.avisList = data;
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
       totalItems: this.avisList.length
      };

    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.avisForm.invalid) {
        return;
    }
    this.avis = ({
      descrp : this.avisForm.value.descrp,
      datePub: this.avisForm.value.datePub,
      type: this.avisForm.value.type,
      deleted : false,
      image:this.url?this.url:'',
      createdAt : Date.now(),
      updatedAt : Date.now()

    })

    this.avisService.create(this.avis).then(() => {
      Swal.fire(
        'Ajout !',
        'Votre document est crré avec succée.',
        'success'
      )
      this.submitted = true;
      this.getDismissReason('ModalDismissReasons.ESC')
    });
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

getDate(date){
  moment.locale('fr-ca'); 
  return moment(date).format('Do MMMM YYYY')
}

  open(content , avis?:Avis) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.avisUpdated= avis ;
  }

  
  onReset() {
    this.submitted = false;
    this.avisForm.reset();
}



onPageChange(event){
  this.config.currentPage = event;
}


supprimerEtudiant(e : Avis){
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas récupérer ce document',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Non, garde-le'
  }).then((result) => {
    if (result.isConfirmed) {
      this.avisService.delete(e.id)
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



onSubmitUpdated(){
  this.submitted = true;
  if (this.avisForm.invalid) {
      return;
  }
  this.avis = ({
    descrp : this.avisForm.value.descrp,
    datePub: this.avisForm.value.datePub,
    type: this.avisForm.value.type,
    deleted : false,
    image:this.url?this.url:'',
    updatedAt : Date.now()

  })

  this.avisService.update(this.avisUpdated.id , this.avis).then(() => {
    Swal.fire(
      'Modif !',
      'Votre document est modifié avec succée.',
      'success'
    )
    this.submitted = true;

  });
}




}
