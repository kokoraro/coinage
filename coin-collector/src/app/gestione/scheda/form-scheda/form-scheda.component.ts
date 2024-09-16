import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Moment } from 'moment';
import * as moment from 'moment';

import { SystemService } from 'src/app/system/system.service';
import { Ambito, Parametro, Unit, Moneta, IndexedDBService, ambiti } from 'src/app/database/indexed-db.service';
import { Quantity } from '../scheda.interface';


@Component({
  selector: 'app-form-scheda',
  templateUrl: './form-scheda.component.html',
  styleUrls: ['./form-scheda.component.css']
})
export class FormSchedaComponent implements OnInit {

  scheda: FormGroup;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  private _moneta: Moneta = null;
  @Input() get moneta(): Moneta {
    return this._moneta;
  }
  set moneta(moneta: Moneta) {
    this._moneta = moneta;
    this.setForm();
  }

  ambiti: Ambito[];
  stati: Parametro[];
  sovrani: Parametro[];
  sovranitas: Parametro[];
  nominali: Parametro[];
  denominazioni: Parametro[];
  zecche: Parametro[];
  segniZecche: Parametro[];
  materiali: Parametro[];
  raritas: Parametro[];
  conservazioni: Parametro[];
  contorni: Parametro[];
  weights: Unit[];
  lengths: Unit[];
  images: string[];
  invoices: string[];
  maxDate: Date;

  private zoneSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private system: SystemService,
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getAllParametri();
  }

  ngOnDestroy(): void {
    if(this.zoneSubscription && !this.zoneSubscription.closed) {
      this.zoneSubscription.unsubscribe();
    }
  }

  private parseQuantity(quantity: string): Quantity {
    let value = '';
    let unit = '';
    let isValue = true;
    quantity = quantity.replace(' ', '');
    for(let i = 0; i < quantity.length; i++) {
      const char = quantity.charAt(i);
      if(isValue && (char >= '0' && char <= '9') || char == '.') {
        value += char;
      }
      else {
        isValue = false;
        unit += char;
      }
    }
    return new Quantity(Number(value), unit);
  }

  private initForm(): void {
    this.scheda = this.fb.group({
      codice: [ null, Validators.required ],
      ambito: [ null, Validators.required ],
      stato: [ null, Validators.required ],
      sovrano: null,
      sovranita: null,
      nominale: [ null, Validators.required ],
      denominazione: null,
      descrizione: [ null, Validators.required ],
      anno:  [ null, Validators.required ],
      segnoAnno: null,
      zecca: [ null, Validators.required ],
      segnoZecca: [ null, Validators.required ],
      tiratura: [ null, Validators.required ],
      materiale: [ null, Validators.required ],
      rarita: [ null, Validators.required ],
      conservazione: [ null, Validators.required ],
      diametro: [ null, Validators.required ],
      peso: [ null, Validators.required ],
      contorno: [ null, Validators.required ],
      valore: [ null, Validators.required ],
      immagine: [ null, Validators.required ],
      fornitore: null,
      dataAcquisto: null,
      prezzoAcquisto: null,
      fattura: null,
      perizia: false,
      note: null
    });
  }

  private setForm(): void {
    if(this.moneta) {
      this.scheda.setValue({
        codice: this.moneta.codice,
        ambito: this.moneta.ambito,
        stato: this.moneta.stato,
        sovrano: this.moneta.sovrano,
        sovranita: this.moneta.sovranita,
        nominale: this.moneta.nominale,
        denominazione: this.moneta.denominazione,
        descrizione: this.moneta.descrizione,
        anno: moment(this.moneta.anno + '-01-01'),
        segnoAnno: this.moneta.segnoAnno,
        zecca: this.moneta.zecca,
        segnoZecca: this.moneta.segnoZecca,
        tiratura: this.moneta.tiratura,
        materiale: this.moneta.materiale,
        rarita: this.moneta.rarita,
        conservazione: this.moneta.conservazione,
        diametro: this.parseQuantity(this.moneta.diametro),
        peso: this.parseQuantity(this.moneta.peso),
        contorno: this.moneta.contorno,
        valore: this.moneta.valore,
        immagine: this.moneta.immagine,
        fornitore: this.moneta.fornitore,
        dataAcquisto: (this.moneta && this.moneta.dataAcquisto) ? moment(this.moneta.dataAcquisto) : null,
        prezzoAcquisto: this.moneta.prezzoAcquisto,
        fattura: this.moneta.fattura,
        perizia: this.moneta.perizia || false,
        note: this.moneta.note 
      });
    }
  }


  private getAllParametri(): void {

    this.maxDate = new Date((new Date()).getFullYear() + 1, 0);
    this.images = this.system.getResources('images');
    this.invoices = this.system.getResources('invoices');
    this.ambiti = ambiti;

    this.db.getAllParametri('stati')
      .then(stati => {
        this.stati = stati;
      })
      .catch(error => console.error("error in getting stati: ", error));

    this.db.getAllParametri('sovrani')
      .then(sovrani => {
        this.sovrani = sovrani;
      })
      .catch(error => console.error("error in getting sovrani: ", error));

    this.db.getAllParametri('sovranita')
      .then(sovranita => {
        this.sovranitas = sovranita;
      })
      .catch(error => console.error("error in getting sovranita: ", error));
     
    this.db.getAllParametri('nominali')
      .then(nominali => {
        this.nominali = nominali;
      })
      .catch(error => console.error("error in getting nominali: ", error));

    this.db.getAllParametri('denominazioni')
      .then(denominazioni => {
        this.denominazioni = denominazioni;
      })
      .catch(error => console.error("error in getting denominazioni: ", error));

    this.db.getAllParametri('zecche')
      .then(zecche => {
        this.zecche = zecche;
      })
      .catch(error => console.error("error in getting zecche: ", error));
    
    this.db.getAllParametri('segniZecche')
      .then(segniZecche => {
        this.segniZecche = segniZecche;
      })
      .catch(error => console.error("error in getting segniZecche: ", error));

      this.db.getAllParametri('materiali')
      .then(materiali => {
        this.materiali = materiali;
      })
      .catch(error => console.error("error in getting materiali: ", error));

    this.db.getAllParametri('rarita')
      .then(rarita => {
        this.raritas = rarita;
      })
      .catch(error => console.error("error in getting rarita: ", error));

    this.db.getAllParametri('conservazioni')
      .then(conservazioni => {
        this.conservazioni = conservazioni;
      })
      .catch(error => console.error("error in getting conservazioni: ", error));
    
    this.db.getAllParametri('contorni')
      .then(contorni => {
        this.contorni = contorni;
      })
      .catch(error => console.error("error in getting contorni: ", error));

    this.db.getAllUnits('pesi')
      .then(pesi => {
        this.weights = pesi;
      })
      .catch(error => console.error("error in getting pesi: ", error));

    this.db.getAllUnits('lunghezze')
      .then(lunghezze => {
        this.lengths = lunghezze;
      })
      .catch(error => console.error("error in getting lunghezze: ", error));

  }

  get ambito(): FormControl | undefined {
    return this.scheda.get('ambito') as FormControl;
  }
  get stato(): FormControl | undefined {
    return this.scheda.get('stato') as FormControl;
  }
  get codice(): FormControl | undefined {
    return this.scheda.get('codice') as FormControl;
  }
  get sovrano(): FormControl | undefined {
    return this.scheda.get('sovrano') as FormControl;
  }
  get sovranita(): FormControl | undefined {
    return this.scheda.get('sovranita') as FormControl;
  }
  get nominale(): FormControl | undefined {
    return this.scheda.get('nominale') as FormControl;
  }
  get denominazione(): FormControl | undefined {
    return this.scheda.get('denominazione') as FormControl;
  }
  get descrizione(): FormControl | undefined {
    return this.scheda.get('descrizione') as FormControl;
  }
  get anno(): FormControl | undefined {
    return this.scheda.get('anno') as FormControl;
  }
  get segnoAnno(): FormControl | undefined {
    return this.scheda.get('segnoAnno') as FormControl;
  }
  get zecca(): FormControl | undefined {
    return this.scheda.get('zecca') as FormControl;
  }
  get segnoZecca(): FormControl | undefined {
    return this.scheda.get('segnoZecca') as FormControl;
  }
  get tiratura(): FormControl | undefined {
    return this.scheda.get('tiratura') as FormControl;
  }
  get materiale(): FormControl | undefined {
    return this.scheda.get('materiale') as FormControl;
  }
  get rarita(): FormControl | undefined {
    return this.scheda.get('rarita') as FormControl;
  }
  get conservazione(): FormControl | undefined {
    return this.scheda.get('conservazione') as FormControl;
  }
  get diametro(): FormControl | undefined {
    return this.scheda.get('diametro') as FormControl;
  }
  get peso(): FormControl | undefined {
    return this.scheda.get('peso') as FormControl;
  }
  get contorno(): FormControl | undefined {
    return this.scheda.get('contorno') as FormControl;
  }
  get valore(): FormControl | undefined {
    return this.scheda.get('valore') as FormControl;
  }
  get immagine(): FormControl | undefined {
    return this.scheda.get('immagine') as FormControl;
  }
  get fornitore(): FormControl | undefined {
    return this.scheda.get('fornitore') as FormControl;
  }
  get dataAcquisto(): FormControl | undefined {
    return this.scheda.get('dataAcquisto') as FormControl;
  }
  get prezzoAcquisto(): FormControl | undefined {
    return this.scheda.get('prezzoAcquisto') as FormControl;
  }
  get fattura(): FormControl | undefined {
    return this.scheda.get('fattura') as FormControl;
  }
  get perizia(): FormControl | undefined {
    return this.scheda.get('perizia') as FormControl;
  }
  get note(): FormControl | undefined {
    return this.scheda.get('note') as FormControl;
  }
  
  triggerResize() {
    this.zoneSubscription = this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  reset(): void {
    this.scheda.reset();
  }

  valid(): boolean {
    return this.scheda.valid;
  }

  getMoneta(): Moneta {
    let moneta: Moneta;
    if(this.scheda.valid) {
      const anno = this.anno.value ? (this.anno.value as Moment).year().toString() : null;
      const dataAcquisto = this.dataAcquisto.value ? (this.dataAcquisto.value as Moment).toISOString() : null;
      const peso: Quantity = this.peso.value;
      const diametro: Quantity = this.diametro.value;
      moneta = {
        codice: this.codice.value,
        ambito: this.ambito.value,
        stato: this.stato.value,
        sovrano: this.sovrano.value,
        sovranita: this.sovranita.value,
        nominale: this.nominale.value,
        denominazione: this.denominazione.value,
        descrizione: this.descrizione.value,
        anno: anno,
        segnoAnno: this.segnoAnno.value,
        zecca: this.zecca.value,
        segnoZecca: this.segnoZecca.value,
        tiratura: this.tiratura.value,
        materiale: this.materiale.value,
        rarita: this.rarita.value,
        conservazione: this.conservazione.value,
        diametro: diametro.value + ' ' + diametro.unit,
        peso: peso.value + ' ' + peso.unit,
        contorno: this.contorno.value,
        valore: this.valore.value,
        immagine: this.immagine.value,
        fornitore: this.fornitore.value,
        dataAcquisto: dataAcquisto,
        prezzoAcquisto: this.prezzoAcquisto.value,
        fattura: this.fattura.value,
        perizia: this.perizia.value,
        note: this.note.value
      }
      if(this.moneta) {
        moneta.id = this.moneta.id;
      }
    }
    else {
      moneta = null;
    }
    return moneta;
  }

}
