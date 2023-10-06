import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  addMecanico(mecanico : any) {
    mecanico.uid = this.afs.createId();
    return this.afs.collection("mecanicos/").add(mecanico);
  }

  getAllMecanicos() {
    return this.afs.collection("mecanicos/").snapshotChanges();
  }

  updateMecanico(mecanico : any) {
    return this.afs.doc("mecanicos/"+mecanico.uid).update(mecanico);
  }

  deleteMecanico(uid : string) {
    return this.afs.doc("mecanicos/"+uid).delete();
  }

  getMecanicoById(uid : any) {
    return this.afs.doc("mecanicos/"+uid).valueChanges();
  }

  addUsuarios(usuario : any) {
    usuario.uid = this.afs.createId();
    return this.afs.collection("users/").add(usuario);
  }

  getAllUsuarios() {
    return this.afs.collection("users/").snapshotChanges();
  }

  updateUsuarios(usuario : any) {
    return this.afs.doc("users/"+usuario.uid).update(usuario);
  }

  deleteUsuarios(uid : string) {
    return this.afs.doc("users/"+uid).delete();
  }

  getUsuarioById(uid : any) {
    return this.afs.doc("users/"+uid).valueChanges();
  }

  addMembresia(membresias : any) {
    membresias.uid = this.afs.createId();
    return this.afs.collection("membresias/").add(membresias);
  }

  getAllMembresia() {
    return this.afs.collection("membresias/").snapshotChanges();
  }

  updateMembresia(membresias : any) {
    return this.afs.doc("membresias/"+membresias.uid).update(membresias);
  }

  deleteMembresia(uid : string) {
    return this.afs.doc("membresias/"+uid).delete();
  }

  getMembresiaById(uid : any) {
    return this.afs.doc("membresias/"+uid).valueChanges();
  }
}
