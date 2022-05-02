import {Injectable, Input} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class MainhelperService {
  @Input() loggedIn?: firebase.default.User | null;
  constructor(private fire:AngularFirestore) { }
  async getDoors(user: any): Promise<number> {
    this.fire.collection('Users').valueChanges().subscribe(docs => {
      docs.forEach(doc => {
          console.log(doc);
          console.log(user)
          console.log("inside mainhelper");
        // @ts-ignore
          if(doc.email === user.email){
            //@ts-ignore
            console.log(doc.doorsPassed);
            //@ts-ignore
            return doc.doorsPassed;
          }
        }
      );
    });
    return 0;
  }
}
